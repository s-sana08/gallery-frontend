<?php
require_once __DIR__ . '/../app/config/session.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

echo json_encode([
  "role" => $_SESSION['role'] ?? null
]);