<?php
require_once __DIR__.'/../config/Database.php';


class Product{

    private $db;

    function __construct(){
     
        $dbconn =new Database();
        $this->db = $dbconn->connect();
    }

    function createProduct($name,$price,$description,$imagepath,$user_id){
        $stmt = $this->db->prepare("INSERT INTO products (name,image,price,description,user_id) VALUES(?,?,?,?,?)");
        return $stmt->execute([$name,$imagepath,$price,$description,$user_id]);
    }

    function getAllProducts()
    {

        $stmt = $this->db->prepare("SELECT * FROM products WHERE status=? ORDER BY id DESC");
        $stmt->execute(['active']);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


}
?>