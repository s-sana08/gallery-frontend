
<?php if(isset($_GET['status']) && $_GET['status'] === 'error'): ?>
    <p style="color:red;">Please fill all fields / invalid email / password too short</p>
<?php endif; ?>

<?php if(isset($_GET['status']) && $_GET['status'] === 'exist'): ?>
    <p style="color:red;">Email already exists</p>
<?php endif; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
</head>
<body>
    <h2>Registration</h2>
    <form method="POST" action="index.php?action=register">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" value="<?=htmlspecialchars($_SESSION['name'] ?? '', ENT_QUOTES, 'UTF-8');?>" required />
<label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" value="<?=htmlspecialchars($_SESSION['email'] ?? '', ENT_QUOTES, 'UTF-8');?>" required />
<label for="password">Password</label>
        <input type="password" id="password" name="password" minlength="6" placeholder="Enter your password" required />

        <input type="hidden" name="csrf_token" id="csrf_token" value="<?=htmlspecialchars($_SESSION['csrf_token'],ENT_QUOTES,'UTF-8'); ?>">

        <button type="submit">Register</button>
        <p>Already have an account? → <a href="index.php?action=login">Login</a></p>
    </form>
     
</body>
</html>