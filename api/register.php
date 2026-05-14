<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

culturall_require_method(['POST']);

$payload = culturall_read_json_body();
$name = trim((string) ($payload['name'] ?? ''));
$email = strtolower(trim((string) ($payload['email'] ?? '')));
$password = (string) ($payload['password'] ?? '');
$confirmPassword = (string) ($payload['confirmPassword'] ?? '');
$accountType = strtolower(trim((string) ($payload['accountType'] ?? 'lambda')));

if ($name === '' || $email === '' || $password === '' || $confirmPassword === '') {
    culturall_json_response([
        'ok' => false,
        'message' => 'Nome, email e palavra-passe são obrigatórios.'
    ], 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    culturall_json_response([
        'ok' => false,
        'message' => 'O email indicado não é válido.'
    ], 422);
}

if ($password !== $confirmPassword) {
    culturall_json_response([
        'ok' => false,
        'message' => 'As palavras-passe não coincidem.'
    ], 422);
}

if (strlen($password) < 6) {
    culturall_json_response([
        'ok' => false,
        'message' => 'A palavra-passe deve ter pelo menos 6 caracteres.'
    ], 422);
}

if (!in_array($accountType, ['lambda', 'organizador'], true)) {
    culturall_json_response([
        'ok' => false,
        'message' => 'Tipo de conta inválido.'
    ], 422);
}

$pdo = culturall_pdo();

$existingUser = $pdo->prepare('SELECT idutilizador FROM utilizador WHERE LOWER(utemail) = LOWER(:email) LIMIT 1');
$existingUser->execute(['email' => $email]);
if ($existingUser->fetchColumn()) {
    culturall_json_response([
        'ok' => false,
        'message' => 'Já existe uma conta com este email.'
    ], 409);
}

try {
    $pdo->beginTransaction();

    $typeName = $accountType === 'organizador' ? 'organizador' : 'registado';
    $typeStatement = $pdo->prepare('SELECT idtipoutilizador FROM tipoutilizador WHERE tutipo = :type LIMIT 1');
    $typeStatement->execute(['type' => $typeName]);
    $userTypeId = (int) ($typeStatement->fetchColumn() ?: 0);

    if ($userTypeId <= 0) {
        $insertType = $pdo->prepare('INSERT INTO tipoutilizador (tutipo) VALUES (:type)');
        $insertType->execute(['type' => $typeName]);
        $userTypeId = (int) $pdo->lastInsertId();
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    if ($passwordHash === false) {
        culturall_json_response([
            'ok' => false,
            'message' => 'Não foi possível proteger a palavra-passe.'
        ], 500);
    }

    $userState = 'ativo';

    $insertUser = $pdo->prepare(
        'INSERT INTO utilizador (utnome, utemail, utpasswordhash, utinicio, uttipo, utestado)
         VALUES (:name, :email, :passwordHash, CURDATE(), :typeId, "ativo")'
    );
    $insertUser->execute([
        'name' => $name,
        'email' => $email,
        'passwordHash' => $passwordHash,
        'typeId' => $userTypeId,
    ]);

    $userId = (int) $pdo->lastInsertId();

    if ($accountType === 'organizador') {
        $insertOrganizer = $pdo->prepare(
            'INSERT INTO organizador (orgnome, orgemail, orginicio, orgestado, orgidutilizador)
             VALUES (:name, :email, CURDATE(), :status, :userId)'
        );
        $insertOrganizer->execute([
            'name' => $name,
            'email' => $email,
            'status' => 'pendente',
            'userId' => $userId,
        ]);
    }

    $pdo->commit();

    if ($accountType === 'organizador') {
        culturall_json_response([
            'ok' => true,
            'pending' => true,
            'message' => 'Conta de organizador criada e pendente de aprovação.'
        ], 201);
    }

    $sessionUser = [
        'id' => $userId,
        'email' => $email,
        'name' => $name,
        'roleLabel' => culturall_role_label('registado'),
        'accountType' => culturall_account_type('registado'),
        'location' => ''
    ];

    culturall_store_session_user($sessionUser);

    culturall_json_response([
        'ok' => true,
        'message' => 'Conta criada com sucesso.',
        'user' => $sessionUser
    ], 201);
} catch (Throwable $exception) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    culturall_json_response([
        'ok' => false,
        'message' => 'Não foi possível criar a conta neste momento.'
    ], 500);
}