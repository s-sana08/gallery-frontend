<?php
require_once __DIR__ . '/../app/config/session.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

require_once __DIR__.'/../app/controllers/ApiProductController.php';

$controller = new ApiProductController();


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (
    !isset($_POST['csrf_token']) ||
    !isset($_SESSION['csrf_token']) ||
    $_POST['csrf_token'] !== $_SESSION['csrf_token']
) {
    echo json_encode([
        "status" => "csrf_invalid",
        "sent" => $_POST['csrf_token'] ?? null,
        "session" => $_SESSION['csrf_token'] ?? null
    ]);
    exit;
}
  
    if (isset($_POST['delete'])) {

        if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
            echo json_encode(["status" => "unauthorized"]);
            exit;
        }

        $controller->deleteProduct();
    }

 
    elseif (isset($_POST['update'])) {

        if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
            echo json_encode(["status" => "unauthorized"]);
            exit;
        }

        $controller->updateProduct();
    }


    else {

        if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
            echo json_encode(["status" => "unauthorized"]);
            exit;
        }

        $controller->createProduct();
    }

} else {
  
    $controller->getProducts();
}
?>