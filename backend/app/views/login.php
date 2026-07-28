<?php

if(empty($_SESSION['csrf_token'])){
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<?php if(isset($_GET['status']) && $_GET['status'] === 'error'): ?>
    <p style="color:red;">Invalid email or password</p>
<?php endif; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <form method="POST" action="index.php?action=login">
        <input type="email" name="email" placeholder="Enter your email" required />

        <input type="password" name="password" id="password" placeholder="Enter your password" required />

        <input type="hidden" name="csrf_token" id="csrf_token" value="<?=htmlspecialchars($_SESSION['csrf_token'] ?? '', ENT_QUOTES, 'UTF-8');?>">

        <button type="submit">login</button>
        <p>Don't have an account? → <a href="index.php?action=register">Register</a></p>
    </form>
        
</body>
</html>