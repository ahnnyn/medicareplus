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
        case "update-trang-thai-lich-kham":
            if (isset($_GET["maBacSi"]) && !empty($_GET["maBacSi"]) && isset($_GET["maLichKham"]) && !empty($_GET["maLichKham"]) && isset($_GET["trangThai"]) && !empty($_GET["trangThai"])) {
                $validStatuses = ['Chờ khám', 'Đã khám', 'Đã hủy']; // Valid statuses

                $trangThai = $_GET["trangThai"];
                if (!in_array($trangThai, $validStatuses)) {
                    echo json_encode(["status" => false, "error" => "Trạng thái không hợp lệ"]);
                    break;
                }

                $result = $p->updateTrangThaiLichKham($_GET["maBacSi"], $_GET["maLichKham"], $trangThai);
                echo json_encode($result);
            } else {
                echo json_encode(["status" => false, "error" => "Thiếu hoặc sai tham số"]);
            }
            break;
            case "dat-lich-kham-moi":
                $data = json_decode(file_get_contents("php://input"), true);
                //file_put_contents("debug.json", json_encode($data));

                
                if (
                    isset($data["maBenhNhan"]) && !empty($data["maBenhNhan"]) &&
                    isset($data["maBacSi"]) && !empty($data["maBacSi"]) &&
                    isset($data["khungGioKham"]) && !empty($data["khungGioKham"]) &&
                    isset($data["tenBenhNhan"]) && !empty($data["tenBenhNhan"]) &&
                    isset($data["giaKham"]) && !empty($data["giaKham"]) &&
                    isset($data["ngayKhamBenh"]) && !empty($data["ngayKhamBenh"]) &&
                    isset($data["lyDoKham"]) && !empty($data["lyDoKham"])
                    && isset($data["hinhThucThanhToan"]) && !empty($data["hinhThucThanhToan"])
                ) {
                    $result = $p->createLichKham(
                        $data["maBenhNhan"],
                        $data["maBacSi"],
                        $data["khungGioKham"],
                        $data["tenBenhNhan"], // dùng ?? tránh lỗi nếu thiếu
                        $data["giaKham"],
                        $data["ngayKhamBenh"],
                        $data["lyDoKham"],
                        $data["hinhThucThanhToan"]
                    );
            
                    header('Content-Type: application/json');
                    echo json_encode($result);
                } else {
                    echo json_encode(["status" => false, "error" => "Thiếu hoặc sai tham số"]);
                }
                break;
            
        case "cap-nhat-thanh-toan":
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data["maLichKham"]) && !empty($data["maLichKham"]) && isset($data["trangThaiThanhToan"]) && !empty($data["trangThaiThanhToan"])) {
                $validStatuses = ['Chưa thanh toán', 'Đã thanh toán']; // Valid enum values for database
                $trangThaiThanhToan = $data["trangThaiThanhToan"];
                if (!in_array($trangThaiThanhToan, $validStatuses)) {
                    echo json_encode(["status" => false, "error" => "Trạng thái không hợp lệ"]);
                    break;
                }
                $result = $p->updateTrangThaiThanhToan($data["maLichKham"], $data["trangThaiThanhToan"]);
                echo json_encode($result);
            } else {
                echo json_encode(["status" => false, "error" => "Thiếu hoặc sai tham số"]);
            }
            break;
        default:
            echo json_encode(["error" => "Thao tác không hợp lệ"]);
    }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}

?>