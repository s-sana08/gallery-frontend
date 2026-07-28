<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once __DIR__.'/../app/controllers/ApiProductController.php';

$controller = new ApiProductController();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller->createProduct();
} else {
    $controller->getProducts();
}

?>