<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once __DIR__.'/../app/controllers/ApiProductController.php';

$controller = new ApiProductController();

// OPTIONS request handle
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // ❌ DELETE (ADMIN ONLY)
    if (isset($_POST['delete'])) {

        if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
            echo json_encode(["status" => "unauthorized"]);
            exit;
        }

        $controller->deleteProduct();
    }

    // ✏️ UPDATE (ADMIN ONLY)
    elseif (isset($_POST['update'])) {

        if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
            echo json_encode(["status" => "unauthorized"]);
            exit;
        }

        $controller->updateProduct();
    }

    // ➕ CREATE (ADMIN ONLY)
    else {

        if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
            echo json_encode(["status" => "unauthorized"]);
            exit;
        }

        $controller->createProduct();
    }

} else {
    // 📥 GET (PUBLIC)
    $controller->getProducts();
}
?>