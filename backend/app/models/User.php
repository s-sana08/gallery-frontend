<?php
require_once __DIR__.'/../config/Database.php';


class User{

    private $db;

    function __construct(){
     
        $dbconn =new Database();
        $this->db = $dbconn->connect();
    }

    function createUser($name,$email,$password){
        $stmt = $this->db->prepare("INSERT INTO users (name,email,password) VALUES(?,?,?)");
        return $stmt->execute([$name,$email,$password]);
    }

    function getUserByEmail($email){
        $stmt= $this->db->prepare("SELECT id,name,email,password,role FROM users WHERE email=? AND status = ? LIMIT 1");
        $stmt->execute([$email,'active']);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

}
?>