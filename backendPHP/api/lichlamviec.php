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
include("../controller/lichlamviec.php");

if (isset($_GET["action"])) {
    $p = new cLichLamViec(); // Thêm dòng này

    switch ($_GET["action"]) {
        case "getLichLamViec":
            if (isset($_GET["maBacSi"]) && !empty($_GET["maBacSi"])) {
                $p->getLichLamViec($_GET["maBacSi"]);
            } else {
                echo json_encode(["error" => "Thiếu hoặc sai mã bác sĩ hoặc ngày làm việc"]);
            }
            break;
            case "getLichLamViecTheoNgay":
                if (isset($_GET["maBacSi"]) && !empty($_GET["maBacSi"]) && isset($_GET["ngayLamViec"]) && !empty($_GET["ngayLamViec"])) {
                    $p->getLichLamViec($_GET["maBacSi"], $_GET["ngayLamViec"]);
                } else {
                    echo json_encode(["error" => "Thiếu hoặc sai mã bác sĩ hoặc ngày làm việc"]);
                }
                break;
            case "dang-ky-gio-kham":
                $data = json_decode(file_get_contents("php://input"), true);
            
                if (!isset($data["maBacSi"], $data["ngayLamViec"], $data["maKhungGio"])) {
                    echo json_encode(["error" => "Thiếu thông tin"]);
                    return;
                }
            
                $maBacSi = $data["maBacSi"];
                $ngayLamViec = $data["ngayLamViec"];
                $maKhungGio = $data["maKhungGio"]; // PHẢI LÀ MẢNG
                $hinhThucKham = isset($data["hinhThucKham"]) ? $data["hinhThucKham"] : null; // Có thể không có
            
                $p = new mLichLamViec();
                $result = $p->themLichLamViecBacSi($maBacSi, $ngayLamViec, $maKhungGio, $hinhThucKham);
            
                echo json_encode($result);
                break;            
        default:
            echo json_encode(["error" => "Thao tác không hợp lệ"]);
    }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}

?>
