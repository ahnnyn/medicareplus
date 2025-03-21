<?php
function cors() {
    $allowed_origins = [
        'http://localhost:3000',
        'http://localhost:3003',
        'http://localhost:3001',
    ];

    if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit(0); // Dừng xử lý nếu là preflight request
    }
}

cors();
?>
