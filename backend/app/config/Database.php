<?php

class Database{
    private $host='localhost';
    private $dbname ='gallery_app';
    private $username ='root';
    private $password = '';

    public $conn;
    function connect(){
        $this->conn = null;

        try{
            $this->conn = new PDO("mysql:host={$this->host};dbname={$this->dbname};charset=utf8mb4",$this->username,$this->password,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);
        }catch(PDOException $e){
            die("DB Connection Failed :".$e->getMessage());
        }

        return $this->conn;
    }
}


?>