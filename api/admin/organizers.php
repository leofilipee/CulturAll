<?php
declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

$pdo = culturall_pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
culturall_require_roles(['admin']);

if ($method === 'GET') {
    $statement = $pdo->query(
        'SELECT o.idorganizador, o.orgnome, o.orgemail, o.orginicio, o.orgestado,
                COUNT(e.idevento) AS totalEventos
         FROM organizador o
         LEFT JOIN evento e ON e.evidorganizador = o.idorganizador
         GROUP BY o.idorganizador, o.orgnome, o.orgemail, o.orginicio, o.orgestado
            ORDER BY FIELD(o.orgestado, "pendente", "aprovado", "suspenso"), o.idorganizador DESC'
    );

    $organizers = array_map(static function (array $row): array {
        return [
            'id' => (int) $row['idorganizador'],
            'name' => (string) $row['orgnome'],
            'email' => (string) $row['orgemail'],
            'registeredAt' => (string) $row['orginicio'],
            'status' => (string) $row['orgestado'],
            'eventCount' => (int) $row['totalEventos'],
        ];
    }, $statement->fetchAll());

    culturall_json_response([
        'ok' => true,
        'organizers' => $organizers
    ]);
}

if ($method === 'PATCH') {
    $payload = culturall_read_json_body();
    $email = strtolower(trim((string) ($payload['email'] ?? '')));
    $status = strtolower(trim((string) ($payload['status'] ?? '')));

    if ($email === '' || !in_array($status, ['aprovado', 'suspenso'], true)) {
        culturall_json_response([
            'ok' => false,
            'message' => 'Email ou estado inválido.'
        ], 422);
    }

    $statement = $pdo->prepare('UPDATE organizador SET orgestado = :status WHERE LOWER(orgemail) = LOWER(:email)');
    $statement->execute([
        'status' => $status,
        'email' => $email,
    ]);

    culturall_json_response([
        'ok' => true
    ]);
}

culturall_json_response([
    'ok' => false,
    'message' => 'Método não suportado.'
], 405);