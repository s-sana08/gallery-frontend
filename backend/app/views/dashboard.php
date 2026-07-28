
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dashboard</title>
</head>
<body>
    <h2>Welcome <?= htmlspecialchars($name) ?> (<?= htmlspecialchars($email) ?> - <?= htmlspecialchars($role) ?>)</h2>
    <br>
    
    <form method="POST" action="index.php?action=logout">
    <button type="submit">Logout</button>
</form>
</body>
</html>