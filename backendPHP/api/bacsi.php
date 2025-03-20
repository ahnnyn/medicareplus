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
                $p->layThongTinBacSiByKhoa($_GET["maKhoa"]);
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
        default:
            echo json_encode(["error" => "Thao tác không hợp lệ"]);
    }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}
?>
