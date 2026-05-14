<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

culturall_require_method(['GET']);

$user = culturall_current_user();

if (!$user) {
    culturall_json_response([
        'ok' => false,
        'message' => 'Sessão inexistente.'
    ], 401);
}

culturall_json_response([
    'ok' => true,
    'user' => $user
]);