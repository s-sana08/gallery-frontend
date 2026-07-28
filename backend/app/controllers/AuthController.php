<?php

require_once __DIR__.'/../models/User.php';
class AuthController{

    private $auth;

    function __construct(){
         $this->auth = new User();
    }


    function checkAuth(){
        if(empty($_SESSION['user_id'])){
            header("Location: index.php?action=login");
                exit;
        }
        
    }
    function register(){

        if($_SERVER['REQUEST_METHOD'] =='GET'){
            if(empty($_SESSION['csrf_token'])){
                $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
            }
            require_once __DIR__.'/../views/register.php';
            return;
        }elseif($_SERVER['REQUEST_METHOD'] == 'POST'){

            if(!isset($_SESSION['csrf_token']) || $_SESSION['csrf_token'] !== $_POST['csrf_token']){
                die("Invalid CSRF Token");
            }

            $name = trim((string)($_POST['name'] ?? ''));
            $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
            $password = $_POST['password'] ?? '';

            if(empty($name) || empty($email) || empty($password)){
                $_SESSION['name'] = $name;
                $_SESSION['email'] = $email;
                header("Location: index.php?action=register&status=error");
                exit;
            }

            $check= $this->auth->getUserByEmail($email);
            if($check){
                $_SESSION['name'] = $name;
                $_SESSION['email'] = $email;
                header("Location: index.php?action=register&status=exist");
                exit;
            }

            $hashPassword = password_hash($password,PASSWORD_DEFAULT);
            $user=$this->auth->createUser($name,$email,$hashPassword);
            if($user){
                unset($_SESSION['csrf_token']);
                unset($_SESSION['name']);
                unset($_SESSION['email']);
                header("Location: index.php?action=login");
                exit;
            }else{
                header("Location: index.php?action=register&status=error");
                exit;
            }

        }else{
            die("Inavlid Request");
        }
    }

    function login(){
         if($_SERVER['REQUEST_METHOD'] =='GET'){
            if(empty($_SESSION['csrf_token'])){
                $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
            }
            require_once __DIR__.'/../views/login.php';
            return;
        }elseif($_SERVER['REQUEST_METHOD'] == 'POST'){

            if(!isset($_SESSION['csrf_token']) || $_SESSION['csrf_token'] !== $_POST['csrf_token']){
                die("Invalid CSRF Token");
            }

           
            $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
            $password = $_POST['password'] ?? '';

            if(empty($email) || empty($password)){
                
                header("Location: index.php?action=login&status=error");
                exit;
            }
            
            $user=$this->auth->getUserByEmail($email);


            if($user && password_verify($password,$user['password'])){

                unset($_SESSION['csrf_token']);
                session_regenerate_id(true);
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['name'] = $user['name'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['role'] = $user['role'];

                
                header("Location: index.php?action=dashboard");
                exit;
            }else{
                header("Location: index.php?action=login&status=error");
                exit;
            }

        }else{
            die("Invalid Request");
        }
    }

    function dashboard(){


        $name=$_SESSION['name']??'';
        $email=$_SESSION['email']??'';
        $role=$_SESSION['role']??'';
        require_once __DIR__.'/../views/dashboard.php';
       
    }

    function logout(){
        $_SESSION=[];
        session_destroy();
        header("Location: index.php?action=login");
        exit;
    }

}
?>