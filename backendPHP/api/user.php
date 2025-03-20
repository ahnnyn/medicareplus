<?php
// Danh sách origin được phép truy cập
$allowed_origins = [
    'http://localhost:3000',
    'http://localhost:3003',
    'http://localhost:3001',
];

// Lấy origin từ request
if (!empty($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

// Xử lý request OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Import file controller user.php
require_once("../controller/user.php");

// Khởi tạo đối tượng user controller
$p = new cUser();
header('Content-Type: application/json');
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === 'POST' && isset($_GET['action']) && $_GET['action'] === 'login') {
    $data = json_decode(file_get_contents("php://input"), true);
    echo json_encode($p->login($data['username'], $data['matKhau']));
} elseif ($requestMethod === 'POST' && isset($_GET['action']) && $_GET['action'] === 'logout') {
    echo json_encode($p->logout());
} elseif ($requestMethod === 'POST' && isset($_GET['action']) && $_GET['action'] === 'currentUser') {
    echo json_encode($p->getCurrentUser());
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}

?>
