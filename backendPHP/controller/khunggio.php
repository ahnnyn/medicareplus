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
    public function getKhungGioTheoNgay($maBacSi = null, $hinhThucKham = null, $ngayLamViec = null, $maLichDangSua = null) {
        header('Content-Type: application/json; charset=utf-8');

        // Kiểm tra phương thức
        if ($_SERVER["REQUEST_METHOD"] !== "GET") {
            http_response_code(405);
            echo json_encode(["error" => "Chỉ chấp nhận yêu cầu GET"]);
            return;
        }

        // Lấy dữ liệu từ query string nếu không được truyền từ tham số
        $maBacSi = $maBacSi ?? $_GET['maBacSi'] ?? null;
        $hinhThucKham = $hinhThucKham ?? $_GET['hinhThucKham'] ?? null;
        $ngayLamViec = $ngayLamViec ?? $_GET['ngayLamViec'] ?? null;
        $maLichDangSua = $maLichDangSua ?? $_GET['maLichDangSua'] ?? null;

        // Kiểm tra dữ liệu đầu vào
        if (empty($maBacSi) || empty($hinhThucKham) || empty($ngayLamViec)) {
            http_response_code(400);
            echo json_encode(["error" => "Thiếu mã bác sĩ, hình thức khám hoặc ngày làm việc"]);
            return;
        }

        // Gọi model
        $p = new mKhungGio();
        $result = $p->layKhungGioTheoNgay($maBacSi, $hinhThucKham, $ngayLamViec, $maLichDangSua);

        // Xử lý kết quả
        if (isset($result["error"])) {
            http_response_code(500);
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
            return;
        }

        if (empty($result)) {
            http_response_code(404);
            echo json_encode(["error" => "Không có khung giờ phù hợp"], JSON_UNESCAPED_UNICODE);
            return;
        }

        // Trả về kết quả
        http_response_code(200);
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }
}


?>