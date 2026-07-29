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
    
    function deleteProduct($id)
    {
        $stmt = $this->db->prepare("UPDATE products SET status=?  WHERE id=? AND status=? ");
        return $stmt->execute(['inactive',$id,'active']);
    }

    function updateProduct($id, $name, $price, $description, $imagepath = null)
    {
        if ($imagepath) {
            $stmt = $this->db->prepare(
                "UPDATE products SET name=?, price=?, description=?, image=? WHERE id=?"
            );
            return $stmt->execute([$name, $price, $description, $imagepath, $id]);
        } else {
            $stmt = $this->db->prepare(
                "UPDATE products SET name=?, price=?, description=? WHERE id=?"
            );
            return $stmt->execute([$name, $price, $description, $id]);
        }
    }


}
?>