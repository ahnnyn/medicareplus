<?php
include("../model/lichlamviec.php");

class cLichLamViec {
    public function getLichLamViec($maBacSi)
    {
        header('Content-Type: application/json; charset=utf-8');
        $p = new mLichLamViec();
        $result = $p->layLichLamViecTheoNgay($maBacSi);

        if (isset($result['error'])) {
            http_response_code(500); // Lỗi truy vấn
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
            return;
        }

        if (empty($result)) {
            http_response_code(404); // Không có dữ liệu
            echo json_encode(["error" => "Không tìm thấy lịch làm việc"], JSON_UNESCAPED_UNICODE);
            return;
        }

        http_response_code(200); // Thành công
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    public function themLichLamViec($maBacSi, $ngayLamViec, $maKhungGio) {
        header('Content-Type: application/json; charset=utf-8');
        $p = new mLichLamViec();
    
        // Kiểm tra phương thức yêu cầu (chỉ chấp nhận POST)
        if ($_SERVER["REQUEST_METHOD"] !== "POST") {
            http_response_code(405); // Phương thức không được phép
            echo json_encode(["error" => "Chỉ chấp nhận yêu cầu POST"]);
            return;
        }
    
        // Nhận dữ liệu từ request (dạng JSON)
        $data = json_decode(file_get_contents("php://input"), true);
    
        // Kiểm tra dữ liệu đầu vào
        if (!isset($data['maBacSi'], $data['ngayLamViec'], $data['maKhungGio'])) {
            http_response_code(400); // Lỗi yêu cầu không hợp lệ
            echo json_encode(["error" => "Thiếu thông tin cần thiết"]);
            return;
        }
    
        // Lấy giá trị từ request
        $maBacSi = intval($data['maBacSi']);
        $ngayLamViec = $data['ngayLamViec'];
        $maKhungGio = $data['maKhungGio'];
    
        // Gọi model để thêm lịch làm việc
        $result = $p->themLichLamViecBacSi($maBacSi, $ngayLamViec, $maKhungGio);
    
        // Trả về phản hồi JSON
        if (isset($result["error"])) {
            http_response_code(500); // Lỗi server
            echo json_encode($result);
        } else {
            http_response_code(201); // Thành công (tạo dữ liệu)
            echo json_encode($result);
        }
    }
    
}
?>
