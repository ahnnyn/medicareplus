<?php
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

include("../controller/bacsi.php");

$p = new cBacSi();

if (isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "getAllDoctors":
            $p->layDanhSachBacSi();
            break;
        case "getBacSiByChuyenKhoa":
            if (isset($_GET["maKhoa"])) {
                $p->getThongTinBacSiByKhoa($_GET["maKhoa"]);
            } else {
                echo json_encode(["error" => "Thiếu mã khoa"]);
            }
            break;
        case "getBacSiByID":
            if (isset($_GET["maBacSi"])) {
                $p->layThongTinBacSiByMaBS($_GET["maBacSi"]);
            } else {
                echo json_encode(["error" => "Thiếu mã bác sĩ"]);
            }
            break;
        case "getAvailableTimeSlots":
            if (isset($_GET["maBacSi"]) && isset($_GET["ngayKham"])) {
                $p->layKhungGioKham($_GET["maBacSi"], $_GET["ngayKham"]);
            } else {
                echo json_encode(["error" => "Thiếu mã bác sĩ hoặc ngày khám"]);
            }
            break;
            case 'update-thongtin-bacsi':
                $data = json_decode(file_get_contents("php://input"), true);
            
                // Kiểm tra xem tất cả tham số quan trọng có đủ không
                if (
                    isset($data['maBacSi']) && isset($data['hoTen']) && 
                    isset($data['gioiTinh']) && isset($data['soDienThoai']) && 
                    isset($data['email']) && isset($data['diaChi']) && 
                    isset($data['giaKham']) && isset($data['hinhAnh']) && 
                    isset($data['maKhoa'])
                ) {
                    // Nếu moTa không được truyền vào, mặc định là rỗng
                    $moTa = isset($data['moTa']) ? $data['moTa'] : '';
            
                    // Gọi controller để cập nhật thông tin bác sĩ
                    $p = new mBacSi();
                    $result = $p->capNhatThongTinBacSi(
                        $data['maBacSi'], $data['hoTen'], $data['gioiTinh'], 
                        $data['soDienThoai'], $data['email'], $data['diaChi'], 
                        $data['giaKham'], $data['hinhAnh'], $moTa, $data['maKhoa']
                    );
            
                    // Kiểm tra kết quả từ việc cập nhật thông tin bác sĩ
                    if (isset($result['success'])) {
                        echo json_encode(["status" => true, "message" => "Cập nhật thông tin bác sĩ thành công!"]);
                    } else {
                        echo json_encode(["status" => false, "error" => "Cập nhật thông tin bác sĩ thất bại!"]);
                    }
                } else {
                    echo json_encode(["status" => false, "error" => "Thiếu thông tin bác sĩ"]);
                }
                break;
            case "search":
                if (isset($_GET["hoTen"])) {
                    $tenBacSi = $_GET["hoTen"];
                    $p->search($tenBacSi);
                } else {
                    echo json_encode(["error" => "Thiếu tên bác sĩ để tìm kiếm"]);
                }
                break;
            default:
                echo json_encode(["error" => "Thao tác không hợp lệ"]);
        }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}
?>
