<?php

require_once __DIR__.'/../models/Product.php';

class ApiProductController
{
    private $product;

    function __construct(){
      
        $this->product = new Product();
    }

    function getProducts()
    {
        header("Content-Type: application/json");

        $data = $this->product->getAllProducts();

        echo json_encode($data);
        exit;
    }

    function createProduct()
    {
        $name = $_POST['name'] ?? '';
        $price = (int)($_POST['price'] ?? 0);
        $description = $_POST['description'] ?? '';

        if (empty($name) || $price <= 0 || empty($description)) {
            echo json_encode(["status" => "error"]);
            exit;
        }

        if (empty($_FILES['uploadfile']['name'])) {
            echo json_encode(["status" => "no_image"]);
            exit;
        }

        $file_name = time() . "_" . basename($_FILES['uploadfile']['name']);
        $temp_name = $_FILES['uploadfile']['tmp_name'];

        $uploadPath = __DIR__ . "/../../public/uploads/" . $file_name;

        move_uploaded_file($temp_name, $uploadPath);

        $imagepath = "uploads/" . $file_name;

        $user_id = 1; // abhi fixed admin

        $this->product->createProduct($name, $price, $description, $imagepath, $user_id);

        echo json_encode(["status" => "success"]);
        exit;
    }


}

