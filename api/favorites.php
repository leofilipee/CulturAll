<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$pdo = culturall_pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$user = culturall_require_login();

if ($method === 'GET') {
    $statement = $pdo->prepare(
        'SELECT f.favidevento
         FROM favorito f
         INNER JOIN utilizador u ON u.idutilizador = f.favidutilizador
         WHERE u.idutilizador = :userId
         ORDER BY f.idfavorito DESC'
    );
    $statement->execute(['userId' => (int) $user['id']]);

    culturall_json_response([
        'ok' => true,
        'favorites' => array_map('intval', $statement->fetchAll(PDO::FETCH_COLUMN))
    ]);
}

if ($method === 'POST') {
    $payload = culturall_read_json_body();
    $eventId = (int) ($payload['eventId'] ?? 0);

    if ($eventId <= 0) {
        culturall_json_response([
            'ok' => false,
            'message' => 'Evento inválido.'
        ], 422);
    }

    $exists = $pdo->prepare('SELECT idfavorito FROM favorito WHERE favidutilizador = :userId AND favidevento = :eventId LIMIT 1');
    $exists->execute([
        'userId' => (int) $user['id'],
        'eventId' => $eventId,
    ]);

    if ($exists->fetchColumn()) {
        $delete = $pdo->prepare('DELETE FROM favorito WHERE favidutilizador = :userId AND favidevento = :eventId');
        $delete->execute([
            'userId' => (int) $user['id'],
            'eventId' => $eventId,
        ]);

        culturall_json_response([
            'ok' => true,
            'favorite' => false
        ]);
    }

    $insert = $pdo->prepare('INSERT INTO favorito (favidutilizador, favidevento) VALUES (:userId, :eventId)');
    $insert->execute([
        'userId' => (int) $user['id'],
        'eventId' => $eventId,
    ]);

    culturall_json_response([
        'ok' => true,
        'favorite' => true
    ], 201);
}

if ($method === 'DELETE') {
    $payload = culturall_read_json_body();
    $eventId = (int) ($payload['eventId'] ?? 0);

    if ($eventId <= 0) {
        culturall_json_response([
            'ok' => false,
            'message' => 'Evento inválido.'
        ], 422);
    }

    $delete = $pdo->prepare('DELETE FROM favorito WHERE favidutilizador = :userId AND favidevento = :eventId');
    $delete->execute([
        'userId' => (int) $user['id'],
        'eventId' => $eventId,
    ]);

    culturall_json_response([
        'ok' => true
    ]);
}

culturall_json_response([
    'ok' => false,
    'message' => 'Método não suportado.'
], 405);