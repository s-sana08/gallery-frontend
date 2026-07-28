<?php
session_start();

require_once __DIR__.'/../app/controllers/AuthController.php';
require_once __DIR__.'/../app/controllers/ProductController.php';

$action = $_GET['action'] ?? 'gallery';

$authController = new AuthController();
$productController = new ProductController();


if ($action !== 'login' && $action !== 'register' && $action !== 'logout' && $action !== 'gallery') {
    $authController->checkAuth();
}

if ($action == 'register') {
    $authController->register();   

} elseif ($action == 'login') {
    $authController->login();  

} elseif ($action == 'logout') {
    $authController->logout();

}elseif ($action == 'add-product') {
    $productController->addProduct();

}elseif ($action == 'gallery') {
    $productController->showProducts();

}else {
    $productController->showProducts();
}