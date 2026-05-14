<?php
declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

$pdo = culturall_pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
culturall_require_roles(['admin']);

if ($method === 'GET') {
    $statusFilter = strtolower(trim((string) ($_GET['status'] ?? 'all')));
    $allowed = ['all', 'pendente', 'publicado', 'oculto', 'recusado'];
    if (!in_array($statusFilter, $allowed, true)) {
        $statusFilter = 'all';
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
            l.loccidade,
            l.locdistrito,
            o.orgnome,
            o.orgemail
        FROM evento e
        INNER JOIN categoria c ON c.idcategoria = e.evidcategoria
        INNER JOIN localizacao l ON l.idlocalizacao = e.evidlocalizacao
        INNER JOIN organizador o ON o.idorganizador = e.evidorganizador
    SQL;

    $params = [];
    if ($statusFilter !== 'all') {
        $sql .= ' WHERE e.evestado = :status';
        $params['status'] = $statusFilter;
    }

    $sql .= ' ORDER BY e.evdatasubmissao DESC, e.idevento DESC';
    $statement = $pdo->prepare($sql);
    $statement->execute($params);

    culturall_json_response([
        'ok' => true,
        'events' => array_map(static function (array $row): array {
            return [
                'id' => (int) $row['idevento'],
                'title' => (string) $row['evtitulo'],
                'description' => (string) ($row['evdescricao'] ?? ''),
                'startDate' => (string) $row['evdatainicio'],
                'endDate' => (string) ($row['evdatafim'] ?? ''),
                'price' => (float) $row['evvalor'],
                'ticketUrl' => (string) ($row['evlinkbilhete'] ?? ''),
                'status' => (string) $row['evestado'],
                'submittedAt' => (string) $row['evdatasubmissao'],
                'approvedAt' => (string) ($row['evdataaprovacao'] ?? ''),
                'rejectReason' => (string) ($row['evmotivorecusa'] ?? ''),
                'isRecurring' => (int) ($row['evrecorrente'] ?? 0) === 1,
                'recurringPattern' => (string) ($row['evperiodicidade'] ?? ''),
                'recurringDays' => (string) ($row['evdiasrecorrencia'] ?? ''),
                'category' => (string) $row['catnome'],
                'city' => (string) $row['loccidade'],
                'district' => (string) $row['locdistrito'],
                'organizer' => (string) $row['orgnome'],
                'organizerEmail' => (string) $row['orgemail'],
            ];
        }, $statement->fetchAll())
    ]);
}

if ($method === 'PATCH') {
    $payload = culturall_read_json_body();
    $eventId = (int) ($payload['eventId'] ?? 0);
    $action = strtolower(trim((string) ($payload['action'] ?? '')));
    $reason = trim((string) ($payload['reason'] ?? ''));

    if ($eventId <= 0 || !in_array($action, ['approve', 'reject', 'hide', 'show', 'delete'], true)) {
        culturall_json_response([
            'ok' => false,
            'message' => 'Pedido inválido.'
        ], 422);
    }

    $pdo->beginTransaction();

    try {
        $lookup = $pdo->prepare('SELECT idevento FROM evento WHERE idevento = :eventId LIMIT 1');
        $lookup->execute(['eventId' => $eventId]);
        if (!$lookup->fetchColumn()) {
            throw new RuntimeException('Evento não encontrado.');
        }

        if ($action === 'delete') {
            $delete = $pdo->prepare('DELETE FROM evento WHERE idevento = :eventId');
            $delete->execute(['eventId' => $eventId]);
            $pdo->commit();

            culturall_json_response(['ok' => true]);
        }

        $update = $pdo->prepare(
            'UPDATE evento
             SET evestado = :status,
                 evdataaprovacao = CASE WHEN :status = "publicado" THEN NOW() ELSE evdataaprovacao END,
                 evmotivorecusa = CASE WHEN :status = "recusado" THEN :reason ELSE evmotivorecusa END
             WHERE idevento = :eventId'
        );

        $status = match ($action) {
            'approve', 'show' => 'publicado',
            'hide' => 'oculto',
            'reject' => 'recusado',
            default => 'publicado'
        };

        $update->execute([
            'status' => $status,
            'reason' => $action === 'reject' ? ($reason !== '' ? $reason : 'Recusado pelo administrador.') : null,
            'eventId' => $eventId,
        ]);

        $pdo->commit();
    } catch (Throwable $exception) {
        $pdo->rollBack();
        culturall_json_response([
            'ok' => false,
            'message' => $exception->getMessage()
        ], 500);
    }

    culturall_json_response(['ok' => true]);
}

culturall_json_response([
    'ok' => false,
    'message' => 'Método não suportado.'
], 405);