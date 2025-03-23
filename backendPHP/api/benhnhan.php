<?php
require_once("../vendor/autoload.php"); // Thêm dòng này
require_once("../controller/user.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "your_secret_key"; // Thay bằng key bảo mật

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

// Hàm xác thực token JWT
function verifyJWT() {
    global $secret_key;
    $headers = getallheaders();
    
    if (!isset($headers['Authorization'])) {
        return null;
    }
    
    $token = str_replace("Bearer ", "", $headers['Authorization']);

    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        return (array) $decoded->data; // Chuyển object thành array
    } catch (Exception $e) {
        return null;
    }
}

// Khởi tạo đối tượng user controller
$p = new cUser();
header('Content-Type: application/json');
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === 'POST' && isset($_GET['action']) && $_GET['action'] === 'login') {
    $data = json_decode(file_get_contents("php://input"), true);
    echo json_encode($p->layThongTin($data['username'], $data['matKhau']));
} elseif ($requestMethod === 'POST' && isset($_GET['action']) && $_GET['action'] === 'currentUser') {
    $user = verifyJWT();
    if ($user) {
        echo json_encode(["success" => true, "user" => $user, "message"=>"Đăng nhập thành công!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Token không hợp lệ"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Đăng xuất thành công!']);
}

?>
