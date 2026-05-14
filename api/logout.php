<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

culturall_require_method(['POST', 'GET']);
culturall_destroy_session();

culturall_json_response([
    'ok' => true
]);