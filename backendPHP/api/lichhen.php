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
                $p->layDanhSachLichHen($_GET["maBenhNhan"]);
            } else {
                echo json_encode(["error" => "Thiếu hoặc sai mã bệnh nhân"]);
            }
            break;
        // case "update-trang-thai-lich-kham":
        //     if (isset($_GET["maBacSi"]) && !empty($_GET["maBacSi"]) && isset($_GET["maLichKham"]) && !empty($_GET["maLichKham"]) && isset($_GET["trangThai"]) && !empty($_GET["trangThai"])) {
        //         $validStatuses = ['Chờ khám', 'Đã khám', 'Đã hủy']; // Valid statuses

        //         $trangThai = $_GET["trangThai"];
        //         if (!in_array($trangThai, $validStatuses)) {
        //             echo json_encode(["status" => false, "error" => "Trạng thái không hợp lệ"]);
        //             break;
        //         }

        //         $result = $p->updateTrangThaiLichKham($_GET["maBacSi"], $_GET["maLichKham"], $trangThai);
        //         echo json_encode($result);
        //     } else {
        //         echo json_encode(["status" => false, "error" => "Thiếu hoặc sai tham số"]);
        //     }
        //     break;
        default:
            echo json_encode(["error" => "Thao tác không hợp lệ"]);
    }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}

?>