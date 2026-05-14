<?php
$base = 'http://127.0.0.1:8001/api/login.php';
$payload = ['email' => 'admin@cultural.pt', 'password' => 'admin123'];
$ctx = stream_context_create(['http' => ['method' => 'POST', 'header' => "Content-Type: application/json\r\n", 'content' => json_encode($payload)]]);
$result = @file_get_contents($base, false, $ctx);
$statusLine = $http_response_header[0] ?? '';
echo $statusLine . "\n";
echo $result ?: '(sem corpo)';
