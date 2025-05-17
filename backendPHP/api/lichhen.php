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
include("../controller/lichhen.php");

$p = new cLichHen();
if (isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "lich-hen":
            if (isset($_GET["maBenhNhan"]) && !empty($_GET["maBenhNhan"])) { 
                $p->getDanhSachLichHen($_GET["maBenhNhan"]);
            } else {
                echo json_encode(["error" => "Thiếu hoặc sai mã bệnh nhân"]);
            }
            break;
        case 'updateLichHen':
            $data = json_decode(file_get_contents("php://input"), true);

            if (
                !empty($data['maLich']) &&
                !empty($data['maBacSi']) &&
                !empty($data['maKhungGio']) &&
                !empty($data['ngayKham']) &&
                isset($data['lyDoKham']) &&
                !empty($data['hinhThucKham'])
            ) {
                $result = $p->updateLichHen(
                    $data['maLich'],
                    $data['maBacSi'],
                    $data['maKhungGio'],
                    $data['ngayKham'],
                    $data['lyDoKham'],
                    $data['hinhThucKham']
                );

                if (isset($result['success']) && $result['success'] === true) {
                    http_response_code(200);
                    echo json_encode([
                        "status" => true,
                        "message" => "Cập nhật lịch hẹn thành công!"
                    ], JSON_UNESCAPED_UNICODE);
                } else {
                    http_response_code(500);
                    echo json_encode([
                        "status" => false,
                        "error" => $result['error'] ?? "Cập nhật lịch hẹn thất bại!"
                    ], JSON_UNESCAPED_UNICODE);
                }
            } else {
                http_response_code(400);
                echo json_encode([
                    "status" => false,
                    "error" => "Thiếu thông tin lịch hẹn"
                ], JSON_UNESCAPED_UNICODE);
            }
            break;
        case 'xoaLichHen':
            if (isset($_GET['maLich'])) {
                $maLich = intval($_GET['maLich']);
                $result = $p->deleteLichHen($maLich);
                echo json_encode($result); // Dùng luôn kết quả trả về từ model
            } else {
                echo json_encode(["success" => false, "message" => "Thiếu mã lịch"]);
            }
            break;
        
        
        default:
            echo json_encode(["error" => "Thao tác không hợp lệ"]);
    }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}

?>