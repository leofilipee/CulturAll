<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$pdo = culturall_pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $statusFilter = strtolower(trim((string) ($_GET['status'] ?? 'published')));
    $allowedStatuses = ['published', 'pending', 'hidden', 'rejected', 'all'];
    if (!in_array($statusFilter, $allowedStatuses, true)) {
        $statusFilter = 'published';
    }

    $currentUser = culturall_current_user();
    if (($currentUser['accountType'] ?? '') !== 'admin' && $statusFilter === 'all') {
        $statusFilter = 'published';
    }

    $sql = <<<SQL
        SELECT
            e.idevento,
            e.evtitulo,
            e.evdescricao,
            e.evdatainicio,
            e.evdatafim,
            e.evvalor,
            e.evlinkbilhete,
            e.evestado,
            e.evdatasubmissao,
            e.evdataaprovacao,
            e.evmotivorecusa,
            e.evrecorrente,
            e.evperiodicidade,
            e.evdiasrecorrencia,
            c.catnome,
            l.locmorada,
            l.loccidade,
            l.locdistrito,
            o.orgnome,
            o.orgemail,
            (
                SELECT img.imgurl
                FROM imagem img
                WHERE img.imgidevento = e.idevento AND img.imgtipo = 'capa'
                ORDER BY img.idimagem ASC
                LIMIT 1
            ) AS imagem_capa
        FROM evento e
        INNER JOIN categoria c ON c.idcategoria = e.evidcategoria
        INNER JOIN localizacao l ON l.idlocalizacao = e.evidlocalizacao
        INNER JOIN organizador o ON o.idorganizador = e.evidorganizador
    SQL;

    $conditions = [];
    $params = [];

    if ($statusFilter !== 'all') {
        $conditions[] = 'e.evestado = :status';
        $params['status'] = $statusFilter === 'published' ? 'publicado' : ($statusFilter === 'pending' ? 'pendente' : ($statusFilter === 'hidden' ? 'oculto' : 'recusado'));
    }

    if ($conditions) {
        $sql .= ' WHERE ' . implode(' AND ', $conditions);
    }

    $sql .= ' ORDER BY e.evdatainicio DESC, e.idevento DESC';

    $statement = $pdo->prepare($sql);
    $statement->execute($params);
    $events = array_map(static function (array $row): array {
        $priceValue = (float) ($row['evvalor'] ?? 0);
        $isFree = abs($priceValue) < 0.001;

        return [
            'id' => (int) $row['idevento'],
            'title' => (string) $row['evtitulo'],
            'description' => (string) ($row['evdescricao'] ?? ''),
            'dateLabel' => date('d/m/Y H:i', strtotime((string) $row['evdatainicio'])),
            'dateBucket' => 'Publicado',
            'eventDate' => (string) $row['evdatainicio'],
            'location' => trim((string) $row['locmorada'] . ', ' . (string) $row['loccidade']),
            'city' => (string) $row['loccidade'],
            'district' => (string) $row['locdistrito'],
            'category' => (string) $row['catnome'],
            'priceLabel' => $isFree ? 'Entrada Gratuita' : '€' . number_format($priceValue, 0, ',', '.'),
            'priceType' => $isFree ? 'Gratuito' : 'Pago',
            'views' => 0,
            'ticketUrl' => (string) ($row['evlinkbilhete'] ?? ''),
            'status' => (string) $row['evestado'],
            'statusLabel' => match ((string) $row['evestado']) {
                'publicado' => 'Publicado',
                'pendente' => 'Pendente',
                'oculto' => 'Oculto',
                'recusado' => 'Recusado',
                default => 'Publicado'
            },
            'isRecurring' => (int) ($row['evrecorrente'] ?? 0) === 1,
            'recurringPattern' => (string) ($row['evperiodicidade'] ?? ''),
            'recurringDays' => (string) ($row['evdiasrecorrencia'] ?? ''),
            'submittedAt' => (string) ($row['evdatasubmissao'] ?? ''),
            'approvedAt' => (string) ($row['evdataaprovacao'] ?? ''),
            'rejectReason' => (string) ($row['evmotivorecusa'] ?? ''),
            'organizer' => (string) $row['orgnome'],
            'organizerEmail' => (string) $row['orgemail'],
            'image' => (string) ($row['imagem_capa'] ?: 'img/events/default-event.jpg')
        ];
    }, $statement->fetchAll());

    culturall_json_response([
        'ok' => true,
        'events' => $events
    ]);
}

if ($method === 'POST') {
    $user = culturall_require_roles(['organizador', 'admin']);
    $payload = culturall_read_json_body();

    $title = trim((string) ($payload['title'] ?? ''));
    $description = trim((string) ($payload['description'] ?? ''));
    $startDate = trim((string) ($payload['startDate'] ?? ''));
    $endDate = trim((string) ($payload['endDate'] ?? ''));
    $price = (float) ($payload['price'] ?? 0);
    $ticketUrl = trim((string) ($payload['ticketUrl'] ?? ''));
    $categoryName = trim((string) ($payload['category'] ?? ''));
    $locationStreet = trim((string) ($payload['locationStreet'] ?? ''));
    $locationCity = trim((string) ($payload['locationCity'] ?? ''));
    $locationDistrict = trim((string) ($payload['locationDistrict'] ?? ''));
    $imageUrls = $payload['images'] ?? [];
    $isRecurring = !empty($payload['isRecurring']);
    $recurringPattern = trim((string) ($payload['recurringPattern'] ?? ''));
    $recurringDays = trim((string) ($payload['recurringDays'] ?? ''));

    if ($title === '' || $startDate === '' || $categoryName === '' || $locationCity === '' || $locationDistrict === '') {
        culturall_json_response([
            'ok' => false,
            'message' => 'Título, data inicial, categoria e localização são obrigatórios.'
        ], 422);
    }

    $pdo->beginTransaction();

    try {
        $categoryId = null;
        $categoryStatement = $pdo->prepare('SELECT idcategoria FROM categoria WHERE catnome = :name LIMIT 1');
        $categoryStatement->execute(['name' => $categoryName]);
        $categoryId = $categoryStatement->fetchColumn() ?: null;

        if (!$categoryId) {
            $insertCategory = $pdo->prepare('INSERT INTO categoria (catnome) VALUES (:name)');
            $insertCategory->execute(['name' => $categoryName]);
            $categoryId = (int) $pdo->lastInsertId();
        }

        $locationId = null;
        $locationStatement = $pdo->prepare(
            'SELECT idlocalizacao FROM localizacao WHERE locmorada <=> :street AND loccidade = :city AND locdistrito = :district LIMIT 1'
        );
        $locationStatement->execute([
            'street' => $locationStreet !== '' ? $locationStreet : null,
            'city' => $locationCity,
            'district' => $locationDistrict,
        ]);
        $locationId = $locationStatement->fetchColumn() ?: null;

        if (!$locationId) {
            $insertLocation = $pdo->prepare(
                'INSERT INTO localizacao (locmorada, loccidade, locdistrito) VALUES (:street, :city, :district)'
            );
            $insertLocation->execute([
                'street' => $locationStreet !== '' ? $locationStreet : null,
                'city' => $locationCity,
                'district' => $locationDistrict,
            ]);
            $locationId = (int) $pdo->lastInsertId();
        }

        $organizerStatement = $pdo->prepare('SELECT idorganizador FROM organizador WHERE orgidutilizador = :userId LIMIT 1');
        $organizerStatement->execute(['userId' => (int) $user['id']]);
        $organizerId = (int) ($organizerStatement->fetchColumn() ?: 0);

        if ($organizerId <= 0) {
            throw new RuntimeException('O utilizador autenticado não tem perfil de organizador.');
        }

        $insertEvent = $pdo->prepare(
            'INSERT INTO evento (
                evtitulo, evdescricao, evdatainicio, evdatafim, evvalor, evlinkbilhete, evestado,
                evdatasubmissao, evrecorrente, evperiodicidade, evdiasrecorrencia,
                evidcategoria, evidlocalizacao, evidorganizador
             ) VALUES (
                :title, :description, :startDate, :endDate, :price, :ticketUrl, :status,
                NOW(), :isRecurring, :recurringPattern, :recurringDays,
                :categoryId, :locationId, :organizerId
             )'
        );
        $insertEvent->execute([
            'title' => $title,
            'description' => $description !== '' ? $description : null,
            'startDate' => $startDate,
            'endDate' => $endDate !== '' ? $endDate : null,
            'price' => $price,
            'ticketUrl' => $ticketUrl !== '' ? $ticketUrl : null,
            'status' => 'pendente',
            'isRecurring' => $isRecurring ? 1 : 0,
            'recurringPattern' => $recurringPattern !== '' ? $recurringPattern : null,
            'recurringDays' => $recurringDays !== '' ? $recurringDays : null,
            'categoryId' => $categoryId,
            'locationId' => $locationId,
            'organizerId' => $organizerId,
        ]);

        $eventId = (int) $pdo->lastInsertId();

        if (is_array($imageUrls)) {
            $insertImage = $pdo->prepare(
                'INSERT INTO imagem (imglegenda, imgurl, imgtipo, imgidevento) VALUES (:caption, :url, :type, :eventId)'
            );

            foreach ($imageUrls as $index => $imageUrl) {
                $normalizedUrl = trim((string) $imageUrl);
                if ($normalizedUrl === '') {
                    continue;
                }

                $insertImage->execute([
                    'caption' => $index === 0 ? $title : null,
                    'url' => $normalizedUrl,
                    'type' => $index === 0 ? 'capa' : 'galeria',
                    'eventId' => $eventId,
                ]);
            }
        }

        $pdo->commit();
    } catch (Throwable $exception) {
        $pdo->rollBack();
        culturall_json_response([
            'ok' => false,
            'message' => $exception->getMessage()
        ], 500);
    }

    culturall_json_response([
        'ok' => true,
        'message' => 'Evento criado com sucesso.',
        'eventId' => $eventId
    ], 201);
}

culturall_json_response([
    'ok' => false,
    'message' => 'Método não suportado.'
], 405);