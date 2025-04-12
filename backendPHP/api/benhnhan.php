<?php
require_once("../vendor/autoload.php");
require_once("../controller/userbenhnhan.php");
require_once("../controller/benhnhan.php");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "your_secret_key"; // Thay bằng key bảo mật

// Danh sách origin được phép truy cập
$allowed_origins = [
    'http://localhost:3000',
    'http://localhost:3003',
    'http://localhost:3001',
];

// Xử lý CORS
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
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

// Khởi tạo đối tượng User Controller
$p = new cUser();
$pd = new cBenhNhan();
header('Content-Type: application/json');
// $requestMethod = $_SERVER["REQUEST_METHOD"];

if (isset($_GET['action'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    switch ($_GET['action']) {
        case 'login':
            echo json_encode($p->layThongTinBenhNhan($data['username'], $data['matKhau']));
            break;

        case 'register':
            echo json_encode($p->luuThongTinBenhNhan($data['email'], $data['hoTen'], $data['soDienThoai'], $data['username'], $data['matKhau']));
            break;

        case 'currentUser':
            $user = verifyJWT();
            if ($user) {
                echo json_encode(["success" => true, "user" => $user, "message" => "Đăng nhập thành công!"]);
            } else {
                echo json_encode(["success" => false, "message" => "Token không hợp lệ"]);
            }
            break;

        case 'getThongTinBenhNhan':
            if (isset($_GET['maBenhNhan'])) {
                $pd->layThongTinCaNhanBenhNhan($_GET['maBenhNhan']);
            }else {
                echo json_encode(["error" => "Thiếu hoặc sai mã bệnh nhân"]);
            }
            break;
        case 'quenMatKhau':
            $email = $_GET["email_doimk"] ?? '';
            if (empty($email)) {
                echo json_encode(["success" => false, "message" => "Vui lòng nhập email"]);
                exit;
            }
                $pd->quenMatKhau($email);
            break;
        case 'doiMatKhau':
            header("Content-Type: application/json"); // Đảm bảo API trả về JSON
    
            $data = json_decode(file_get_contents("php://input"), true);
        
            error_log("🔍 Dữ liệu nhận được từ React: " . json_encode($data));
        
            $idAcc = $data["_idAcc"] ?? null;
            $idBN = $data["idBN"] ?? null;
            $username = $data["username"] ?? null;
            $matKhau = $data["matKhau"] ?? null;
            $matKhauMoi = $data["matKhauMoi"] ?? null;
        
            if (!$idAcc || !$idBN || !$username || !$matKhau || !$matKhauMoi) {
                echo json_encode(["success" => false, "message" => "Thiếu thông tin đầu vào"]);
                exit;
            }
        
            $result = $p->updateMatKhauBenhNhan($idAcc, $idBN, $username, $matKhau, $matKhauMoi);
        
            if (is_array($result) && isset($result["success"])) {
                echo json_encode($result);
            } else {
                echo json_encode(["success" => false, "message" => "Lỗi xử lý dữ liệu"]);
            }
            exit;
            break;
        case 'updateThongTinBenhNhan':
            $data = json_decode(file_get_contents("php://input"), true);
            // Kiểm tra xem tất cả tham số quan trọng có đủ không
            if (
                isset($data['maBenhNhan']) && isset($data['hoTen']) && 
                isset($data['gioiTinh']) && isset($data['soDienThoai']) && 
                isset($data['email']) && isset($data['diaChi']) && 
                isset($data['hinhAnh'])
            ) {
                        
                // Gọi controller để cập nhật thông tin bệnh nhân
                $result = $pd->updateThongTinBenhNhan(
                    $data['maBenhNhan'], $data['hoTen'], $data['gioiTinh'], 
                    $data['soDienThoai'], $data['email'], 
                    $data['diaChi'], $data['hinhAnh']
                );
        
                // Kiểm tra kết quả từ việc cập nhật thông tin bệnh nhân
                if (isset($result['success'])) {
                    echo json_encode(["status" => true, "message" => "Cập nhật thông tin bệnh nhân thành công!"]);
                } else {
                    echo json_encode(["status" => false, "error" => "Cập nhật thông tin bệnh nhân thất bại!"]);
                }
            } else {
                echo json_encode(["status" => false, "error" => "Thiếu thông tin bệnh nhân"]);
            }
            break;
        default:
            echo json_encode(['success' => false, 'message' => 'Action không hợp lệ!']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Phương thức không hợp lệ!']);
}

?>
