<?php
require_once("../controller/vaitro.php");

header('Content-Type: application/json'); // Đảm bảo trả về JSON

$c = new cVaiTro();
$action = $_GET["action"] ?? '';

switch ($action) {
    case "layDanhSachVaiTro":
        $result = $c->getDanhSachVaiTro();
        echo json_encode($result);
        break;

    case "themVaiTro":
        $data = json_decode(file_get_contents("php://input"), true);
        $tenVaiTro = $data["tenVaiTro"] ?? null;
        if (!$tenVaiTro) {
            echo json_encode(["status" => false, "error" => "Thiếu tên vai trò"]);
            break;
        }
        $result = $c->insertVaiTro($tenVaiTro);
        if (isset($result['success']) && $result['success'] === true) {
            echo json_encode(["status" => true, "message" => "Thêm vai trò thành công!"]);
        } else {
            echo json_encode(["status" => false, "error" => "Thêm vai trò thất bại!"]);
        }
        break;

    case "suaVaiTro":
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['maVaiTro']) && isset($data['tenVaiTro'])) {
            $result = $c->updateVaiTro($data['maVaiTro'], $data['tenVaiTro']);
            if (isset($result['success']) && $result['success'] === true) {
                echo json_encode(["status" => true, "message" => "Cập nhật vai trò thành công!"]);
            } else {
                echo json_encode(["status" => false, "error" => "Cập nhật vai trò thất bại!"]);
            }
        } else {
            echo json_encode(["status" => false, "error" => "Thiếu thông tin"]);
        }
        break;

    case "xoaVaiTro":
        if (isset($_GET['maVaiTro'])) {
                $maVaiTro = intval($_GET['maVaiTro']);
                $result = $c->deleteVaiTro($maVaiTro);
                echo json_encode($result); // Dùng luôn kết quả trả về từ model
            } else {
                echo json_encode(["success" => false, "message" => "Thiếu mã vai trò"]);
            }
        break;

    default:
        echo json_encode(["status" => false, "error" => "Hành động không hợp lệ"]);
        break;
}
