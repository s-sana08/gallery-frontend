<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gallery</title>

<style>

body {
  font-family: Arial, sans-serif;
}

.gallery-container {
  column-count: 4;
  column-gap: 15px;
  padding: 10px;
}


.gallery {
  display: inline-block;
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: 0.3s;
}

.gallery:hover {
  border-color: #777;
  transform: scale(1.02);
}


.gallery img {
  width: 100%;
  height: auto;
  display: block;
}


.gallery h3 {
  padding: 10px;
  margin: 0;
  font-size: 16px;
}

.desc {
  padding: 10px;
  font-size: 14px;
  color: #555;
}


@media (max-width: 900px) {
  .gallery-container {
    column-count: 2;
  }
}

@media (max-width: 500px) {
  .gallery-container {
    column-count: 1;
  }
}

</style>
</head>

<body>

<h2>Gallery</h2>
<a href="index.php?action=add-product">Add Product</a>

<div class="gallery-container">

<?php foreach ($allProducts as $product) : ?>

<div class="gallery">

    <img src="/backend/public/<?= htmlspecialchars($product['image'], ENT_QUOTES, 'UTF-8'); ?>" alt="product">

    <h3>
        <?= htmlspecialchars($product['name'], ENT_QUOTES, 'UTF-8'); ?>
        - Rs: <?= htmlspecialchars($product['price'], ENT_QUOTES, 'UTF-8'); ?>
    </h3>

    <div class="desc">
        <?= htmlspecialchars($product['description'], ENT_QUOTES, 'UTF-8'); ?>
    </div>

</div>

<?php endforeach; ?>

</div>

</body>
</html>