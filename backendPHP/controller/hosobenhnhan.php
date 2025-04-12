<?php
require_once("../model/hosobenhnhan.php");

class cHoSoBenhNhan {
    // Hàm lấy hồ sơ bệnh nhân
    public function layHoSoBenhNhan($maBenhNhan) {
        // Kiểm tra xem mã bệnh nhân có hợp lệ không
        if (empty($maBenhNhan) || !is_numeric($maBenhNhan)) {
            echo json_encode(["error" => "Mã bệnh nhân không hợp lệ"]);
            return;
        }

        // Tạo đối tượng model
        $model = new mHoSoBenhNhan();
        $result = $model->layHoSoBenhNhan($maBenhNhan);

        // Kiểm tra kết quả trả về
        if (!$result || $result["success"] === false) {
            echo json_encode(["error" => "Không tìm thấy thông tin hồ sơ bệnh nhân"]);
            return;
        }

        // Trả về dữ liệu hồ sơ bệnh nhân dưới dạng JSON
        echo json_encode($result);
    }
    public function taoHoSoBenhNhan($maBenhNhan, $hoTenBenhNhan, $ngaySinh, $gioiTinh, $ngheNghiep, $CCCD, $diaChi) {
        
        if (empty($maBenhNhan) || empty($hoTenBenhNhan) || empty($ngaySinh) || empty($gioiTinh) || empty($ngheNghiep) || empty($CCCD) || empty($diaChi)) {
            echo json_encode(["status" => false, "message" => "Dữ liệu không hợp lệ!"]);
            return;
        }

        // Gọi model để thêm dữ liệu vào cơ sở dữ liệu
        $model = new mHoSoBenhNhan();
        $result = $model->taoHoSoBenhNhan($maBenhNhan, $hoTenBenhNhan, $ngaySinh, $gioiTinh, $ngheNghiep, $CCCD, $diaChi);

        // Trả về kết quả
        return $result;
    }
}
?>
