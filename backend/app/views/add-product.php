<?php

if(empty($_SESSION['csrf_token'])){
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<?php if(isset($_GET['status']) && $_GET['status'] === 'error'): ?>
    <p style="color:red;">Fields are required</p>
<?php endif; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product</title>
</head>
<body>
    <h2>Add Product</h2>
    <form method="POST" action="index.php?action=add-product" enctype="multipart/form-data">
        <input type="text" name="name" placeholder="Enter your Product Name" required />

        <input type="file" name="uploadfile" id="uploadfile"  required />

        <input type="number" name="price" id="price" placeholder="Enter your price" required />

        <textarea name="description" id="description" placeholder="Enter your description"></textarea>

        <input type="hidden" name="csrf_token" id="csrf_token" value="<?=htmlspecialchars($_SESSION['csrf_token'] ?? '', ENT_QUOTES, 'UTF-8');?>">

        <button type="submit">Save</button>
        <a href="index.php?action=dashboard">Dashboard</a>
    </form>
        
</body>
</html>