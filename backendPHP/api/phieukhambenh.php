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
include("../controller/phieukhambenh.php");

$p = new cPhieuKhamBenh();
if (isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "tao-phieu-kham":
            $data = json_decode(file_get_contents("php://input"), true);
        
            $maHoSo = $data['idHoSo'] ?? null;
            $maBacSi = $data['idBS'] ?? null;
            $tenBN = $data['hoTen'] ?? null;
            $ngayKham = $data['ngayKham'] ?? null;
            $tienSu = $data['tienSu'] ?? null;
            $chuanDoan = $data['chuanDoan'] ?? null;
            $lyDoKham = $data['lyDoKham'] ?? null;
        
            $result = $p->taoPhieuKhamMoi($maHoSo, $maBacSi, $tenBN, $ngayKham, $tienSu, $chuanDoan, $lyDoKham);
            echo json_encode($result);
            break;
        
        
        default:
            echo json_encode(["error" => "Thao tác không hợp lệ"]);
    }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}
?>
