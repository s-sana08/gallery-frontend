<?php

require_once __DIR__.'/../models/Product.php';
class ProductController{

    private $product;

    function __construct(){
         $this->product = new Product();
    }

    function addProduct(){
         if($_SERVER['REQUEST_METHOD'] =='GET'){
            if(empty($_SESSION['csrf_token'])){
                $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
            }
            require_once __DIR__.'/../views/add-product.php';
            return;
        }elseif($_SERVER['REQUEST_METHOD'] == 'POST'){
             if(!isset($_SESSION['csrf_token']) || $_SESSION['csrf_token'] !== $_POST['csrf_token']){
                die("Invalid CSRF Token");
            }

            $name = trim((string)($_POST['name'] ?? ''));
            $price = (int)($_POST['price'] ?? 0);
            $description = trim((string)($_POST['description'] ?? ''));

            $file = $_FILES['uploadfile'];


            if(empty($name) || $price <= 0 || empty($description)){
               
                header("Location: index.php?action=add-product&status=error");
                exit;
            }

            if (empty($_FILES['uploadfile']['name'])) {
                    header("Location: index.php?action=add-product&status=error");
                    exit;
                }

                $file_name = time() . "_" . basename($_FILES['uploadfile']['name']);
                $temp_name = $_FILES['uploadfile']['tmp_name'];

                $uploadPath = __DIR__ . "/../../public/uploads/" . $file_name;

                if (!move_uploaded_file($temp_name, $uploadPath)) {
                    header("Location: index.php?action=add-product&status=error");
                    exit;
                }

                $imagepath = "uploads/" . $file_name;

                $user_id = $_SESSION['user_id'];

                $products = $this->product->createProduct($name,$price,$description,$imagepath,$user_id);

                if ($products) {
                    header("Location: index.php?action=dashboard");
                    exit;
                } else {
                    header("Location: index.php?action=add-product&status=error");
                    exit;
                }
            
        }else{
            die("Invalid Request");
        }
    }

    function showProducts() {
       $allProducts = $this->product->getAllProducts();

       require_once __DIR__.'/../views/gallery.php';
    }
    
  
}
?>