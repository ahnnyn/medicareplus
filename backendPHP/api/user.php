<?php
require_once("../vendor/autoload.php"); // Load thư viện JWT
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

// Debug kiểm tra action
error_log("Action nhận được: " . ($_GET['action'] ?? 'Không có action'));

// Xử lý các action API
if ($requestMethod === 'POST' && isset($_GET['action'])) {
    $action = $_GET['action'];

    if ($action === 'login') {
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($p->getThongTinNguoiDung($data['username'], $data['password']));

    } elseif ($action === 'currentUser') {
        $user = verifyJWT();
        if ($user) {
            echo json_encode(["success" => true, "user" => $user, "message" => "Đăng nhập thành công!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Token không hợp lệ"]);
        }

    } elseif ($action === 'doi-mat-khau') {
        header("Content-Type: application/json"); // Đảm bảo API trả về JSON
    
        $data = json_decode(file_get_contents("php://input"), true);
    
        error_log("🔍 Dữ liệu nhận được từ React: " . json_encode($data));
    
        $idAcc = $data["idAcc"] ?? null;
        $idBS = $data["idBS"] ?? null;
        $username = $data["username"] ?? null;
        $password = $data["password"] ?? null;
        $passwordMoi = $data["passwordMoi"] ?? null;
    
        if (!$idAcc || !$idBS || !$username || !$password || !$passwordMoi) {
            echo json_encode(["success" => false, "message" => "Thiếu thông tin đầu vào"]);
            exit;
        }
    
        $result = $p->updateMatKhauBacSi($idAcc, $idBS, $username, $password, $passwordMoi);
    
        if (is_array($result) && isset($result["success"])) {
            echo json_encode($result);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi xử lý dữ liệu"]);
        }
        exit;
    }elseif ($action === 'logout') {
        $result = $p->logout();
    
        // Đảm bảo header là JSON
        header('Content-Type: application/json');
        echo json_encode($result);
        exit; // Dừng script để tránh in thêm dữ liệu không mong muốn
    }

} else {
    echo json_encode(["success" => false, "message" => "Phương thức không hợp lệ"]);
}

?>
