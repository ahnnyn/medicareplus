<?php
include("../model/khunggio.php");

class cKhungGio {
    public function getKhungGioTheoCa()
    {
        header('Content-Type: application/json; charset=utf-8');
        $p = new mKhungGio();
        $result = $p->layKhungGioTheoCa();

        if (isset($result['error'])) {
            http_response_code(500); // Lỗi truy vấn
            echo json_encode($result);
            return;
        }

        if (!$result || empty($result)) {
            http_response_code(404); // Không có dữ liệu
            echo json_encode(["error" => "Không tìm thấy lịch làm việc"]);
            return;
        }

        http_response_code(200); // Thành công
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    public function getKhungGio()
    {
        header('Content-Type: application/json; charset=utf-8');
        $p = new mKhungGio();
        $result = $p->layKhungGio();

        if (isset($result['error'])) {
            http_response_code(500); // Lỗi truy vấn
            echo json_encode($result);
            return;
        }

        if (!$result || empty($result)) {
            http_response_code(404); // Không có dữ liệu
            echo json_encode(["error" => "Không tìm thấy lịch làm việc"]);
            return;
        }

        http_response_code(200); // Thành công
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }
}


?>