<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;port=3306;dbname=culturall;charset=utf8mb4','root','root', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $email = 'admin@cultural.pt';
    $check = $pdo->prepare('SELECT idutilizador FROM utilizador WHERE LOWER(utemail)=LOWER(:email)');
    $check->execute(['email' => $email]);
    $found = $check->fetch();
    if ($found) {
        echo "exists\n";
        exit(0);
    }

    $pdo->beginTransaction();
    $pdo->prepare('INSERT INTO utilizador (utnome, utemail, utpasswordhash, utinicio, uttipo, utestado) VALUES (:name, :email, :pw, CURDATE(), :type, :estado)')
        ->execute([
            'name' => 'Admin Cultural',
            'email' => $email,
            'pw' => 'admin123',
            'type' => 4,
            'estado' => 'ativo'
        ]);

    $pdo->prepare('INSERT INTO administrador (adidutilizador) SELECT idutilizador FROM utilizador WHERE LOWER(utemail)=LOWER(:email)')
        ->execute(['email' => $email]);

    $pdo->commit();
    echo "created\n";
} catch (Throwable $e) {
    echo "error: " . $e->getMessage() . "\n";
    exit(1);
}
