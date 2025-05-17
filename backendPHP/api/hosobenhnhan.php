<?php
require_once("../controller/hosobenhnhan.php");

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

// Khởi tạo đối tượng User Controller
$pd = new cHoSoBenhNhan();
header('Content-Type: application/json');

if (isset($_GET['action'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    switch ($_GET['action']) {
        case 'getHoSoBenhNhan':
            if (isset($_GET['maBenhNhan'])) {
                $pd->getHoSoBenhNhan($_GET['maBenhNhan']);
            } else {
                echo json_encode(["error" => "Thiếu hoặc sai mã bệnh nhân"]);
            }
            break;
        case 'taoHoSo':
            $maBenhNhan = $data['maBenhNhan'] ?? null;
            $hoTenBenhNhan = $data['hoTenBenhNhan'] ?? null;
            $ngaySinh = $data['ngaySinh'] ?? null;
            $gioiTinh = $data['gioiTinh'] ?? null;
            $ngheNghiep = $data['ngheNghiep'] ?? null;
            $CCCD = $data['CCCD'] ?? null;
            $diaChi = $data['diaChi'] ?? null;
            $result = $pd->taoHoSo($maBenhNhan, $hoTenBenhNhan, $ngaySinh, $gioiTinh, $ngheNghiep, $CCCD, $diaChi);
            echo json_encode($result);
            break;
        case 'updateHoSo':
            $data = json_decode(file_get_contents("php://input"), true);
            // Kiểm tra xem tất cả tham số quan trọng có đủ không
            if (
                isset($data['maBenhNhan']) && isset($data['hoTenBenhNhan']) && 
                isset($data['gioiTinh']) && 
                isset($data['ngaySinh']) && isset($data['ngheNghiep']) && 
                isset($data['CCCD']) && isset($data['diaChi'])
            ) {
                        
                // Gọi controller để cập nhật thông tin bệnh nhân
                $result = $pd->updateHoSoBenhNhan(
                    $data['maBenhNhan'], $data['hoTenBenhNhan'], $data['ngaySinh'], $data['gioiTinh'], 
                    $data['ngheNghiep'], $data['CCCD'], $data['diaChi']
                );
                if (isset($result['success']) && $result['success'] === true) {
                    echo json_encode(["status" => true, "message" => "Cập nhật thông tin hồ sơ bệnh nhân thành công!"]);
                } else {
                    echo json_encode(["status" => false, "error" => "Cập nhật thông tin hồ sơ bệnh nhân thất bại!"]);
                }
            } else {
                echo json_encode(["status" => false, "error" => "Thiếu thông tin hồ sơ bệnh nhân"]);
            }
            break;
        case 'xoaHoSo':
            if (isset($_GET['maBenhNhan'])) {
                $maBenhNhan = intval($_GET['maBenhNhan']);
                $result = $pd->deleteHoSoBenhNhan($maBenhNhan);
                // Kiểm tra nếu 'success' có giá trị true từ backend
                echo json_encode($result);
            } else {
                echo json_encode(["success" => false, "message" => "Thiếu mã bệnh nhân"]);
            }
            break;
        default:
            echo json_encode(['success' => false, 'message' => 'Action không hợp lệ!']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Phương thức không hợp lệ!']);
}
?>
