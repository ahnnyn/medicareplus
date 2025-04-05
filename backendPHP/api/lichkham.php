<?php
include("../controller/lichKham.php");

$p = new cLichKham();
if (isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "lich-kham-by-bac-si":
            if (isset($_GET["maBacSi"]) && !empty($_GET["maBacSi"])) { 
                $p->layDanhSachLichKhamBacSi($_GET["maBacSi"]);
            } else {
                echo json_encode(["error" => "Thiếu hoặc sai mã bác sĩ"]);
            }
            break;
        default:
            echo json_encode(["error" => "Thao tác không hợp lệ"]);
    }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}

?>