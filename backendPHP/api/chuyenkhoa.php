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
include("../controller/chuyenkhoa.php");

$p = new cChuyenKhoa();
if (isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "getAllChuyenKhoa":
            $p->layDanhSachChuyenKhoa();
            break;
        case "getChuyenKhoaById":
            if (isset($_GET["maKhoa"])) {
                $p->layThongTinChuyenKhoaById($_GET["maKhoa"]);
            } else {
                echo json_encode(["error" => "Thiếu mã khoa"]);
            }
            break;
            case "search":
                if (isset($_GET["tenkhoa"])) {
                    $tenkhoa = $_GET["tenkhoa"];
                    $p->search($tenkhoa);
                } else {
                    echo json_encode(["error" => "Thiếu tên chuyên khoa để tìm kiếm"]);
                }
                break;
        default:
            echo json_encode(["error" => "Thao tác không hợp lệ"]);
    }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}
?>
