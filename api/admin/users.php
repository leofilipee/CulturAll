<?php
declare(strict_types=1);

require __DIR__ . '/../bootstrap.php';

$pdo = culturall_pdo();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
culturall_require_roles(['admin']);

if ($method === 'GET') {
    $statement = $pdo->query(
        'SELECT u.idutilizador, u.utnome, u.utemail, u.utinicio, u.utestado, t.tutipo,
                COUNT(f.idfavorito) AS totalFavoritos
         FROM utilizador u
         INNER JOIN tipoutilizador t ON t.idtipoutilizador = u.uttipo
         LEFT JOIN favorito f ON f.favidutilizador = u.idutilizador
         GROUP BY u.idutilizador, u.utnome, u.utemail, u.utinicio, u.utestado, t.tutipo
         ORDER BY u.idutilizador DESC'
    );

    $users = array_map(static function (array $row): array {
        $isActive = culturall_user_is_active($row['utestado'] ?? 'ativo');
        return [
            'id' => (int) $row['idutilizador'],
            'name' => (string) $row['utnome'],
            'email' => (string) $row['utemail'],
            'registeredAt' => (string) $row['utinicio'],
            'status' => culturall_user_status_code($isActive),
            'estado' => $isActive,
            'isActive' => $isActive,
            'type' => (string) $row['tutipo'],
            'roleLabel' => culturall_role_label((string) $row['tutipo']),
            'favoriteCount' => (int) $row['totalFavoritos'],
        ];
    }, $statement->fetchAll());

    culturall_json_response([
        'ok' => true,
        'users' => $users
    ]);
}

if ($method === 'PATCH') {
    $payload = culturall_read_json_body();
    $email = strtolower(trim((string) ($payload['email'] ?? '')));

    $isActive = null;
    if (array_key_exists('estado', $payload)) {
        $isActive = filter_var($payload['estado'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
    } elseif (array_key_exists('isActive', $payload)) {
        $isActive = filter_var($payload['isActive'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
    } elseif (array_key_exists('status', $payload)) {
        $status = strtolower(trim((string) $payload['status']));
        if (in_array($status, ['ativo', 'active', '1', 'true'], true)) {
            $isActive = true;
        }

        if (in_array($status, ['inativo', 'inactive', '0', 'false'], true)) {
            $isActive = false;
        }
    }

    if ($email === '' || !is_bool($isActive)) {
        culturall_json_response([
            'ok' => false,
            'message' => 'Email ou estado booleano inválido.'
        ], 422);
    }

    $status = culturall_user_status_code($isActive);

    $statement = $pdo->prepare('UPDATE utilizador SET utestado = :status WHERE LOWER(utemail) = LOWER(:email)');
    $statement->execute([
        'status' => $status,
        'email' => $email,
    ]);

    culturall_json_response([
        'ok' => true,
        'email' => $email,
        'status' => $status,
        'estado' => $isActive,
        'isActive' => $isActive
    ]);
}

culturall_json_response([
    'ok' => false,
    'message' => 'Método não suportado.'
], 405);