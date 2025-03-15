<?php
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
        default:
            echo json_encode(["error" => "Thao tác không hợp lệ"]);
    }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}
?>
