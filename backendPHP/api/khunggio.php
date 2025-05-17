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
include("../controller/khunggio.php");

$p = new cKhungGio();
if (isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "getKhungGioTheoCa":
            $p->getKhungGioTheoCa();
            break;
        case "getKhungGio":
            $p->getKhungGio();
            break;
        case "getKhungGioByNgay":
            $maBacSi = $_GET["maBacSi"] ?? null;
            $hinhThucKham = $_GET["hinhThucKham"] ?? null;
            $ngayLamViec = $_GET["ngayLamViec"] ?? null;
            $maLichDangSua = $_GET["maLichDangSua"] ?? null;

            if (!empty($maBacSi) && !empty($hinhThucKham) && !empty($ngayLamViec)) {
                $p->getKhungGioTheoNgay($maBacSi, $hinhThucKham, $ngayLamViec, $maLichDangSua);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Thiếu mã bác sĩ, hình thức khám hoặc ngày làm việc"], JSON_UNESCAPED_UNICODE);
            }
            break;
        default:
            echo json_encode(["error" => "Thao tác không hợp lệ"]);
    }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}
?>
