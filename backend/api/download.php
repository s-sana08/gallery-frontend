<?php

$baseDir = __DIR__ . "/../public/uploads/";

if (!isset($_GET['file'])) {
    die("No file specified");
}

$file = basename($_GET['file']);
$filePath = $baseDir . $file;

if (!file_exists($filePath)) {
    die("File not found");
}

// 👇 file type detect (simple way)
$extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));

$mimeTypes = [
    "jpg" => "image/jpeg",
    "jpeg" => "image/jpeg",
    "png" => "image/png",
    "gif" => "image/gif",
    "webp" => "image/webp"
];

$mimeType = $mimeTypes[$extension] ?? "application/octet-stream";

// 👇 headers
header("Content-Description: File Transfer");
header("Content-Type: " . $mimeType);
header("Content-Disposition: attachment; filename=\"" . $file . "\"");
header("Content-Length: " . filesize($filePath));

ob_clean();
flush();

readfile($filePath);
exit;