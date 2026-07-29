<?php
session_start();

require_once __DIR__ . '/../app/models/User.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $userModel = new User();
    $user = $userModel->getUserByEmail($email);

    if ($user && password_verify($password, $user['password'])) {
        
        $_SESSION['user_id'] = $user['id'];

        echo json_encode([
            "status" => "success",
            "user_id" => $user['id'],
            "role" => $user['role']
        ]);

    } else {
        echo json_encode([
            "status" => "error"
        ]);
    }
}