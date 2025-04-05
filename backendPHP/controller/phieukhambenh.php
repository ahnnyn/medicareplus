<?php
include("../model/phieukhambenh.php");
class cPhieuKhamBenh {
    public function taoPhieuKhamMoi($maHoSo, $maBacSi, $tenBN, $ngayKham, $tienSu, $chuanDoan, $lyDoKham) {
        // Kiểm tra các tham số
        if (empty($maHoSo) || empty($maBacSi) || empty($tenBN) || empty($ngayKham) || empty($tienSu) || empty($chuanDoan) || empty($lyDoKham)) {
            echo json_encode(["status" => false, "message" => "Dữ liệu không hợp lệ!"]);
            return;
        }
        
        // Xử lý tạo phiếu khám
        $model = new mPhieuKhamBenh(); 
        $result = $model->taoPhieuKhamBenh($maHoSo, $maBacSi, $tenBN, $ngayKham, $tienSu, $chuanDoan, $lyDoKham);
        return $result;
    }
}

