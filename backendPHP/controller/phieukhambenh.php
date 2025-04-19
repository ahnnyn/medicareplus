<?php
include("../model/phieukhambenh.php");
class cPhieuKhamBenh {
    public function taoPhieuKhamMoi($maHoSo, $maBacSi, $maLichKham, $tenBN, $ngayKham, $khungGio, $tienSu, $chuanDoan, $lyDoKham) {
        // Kiểm tra các tham số
        if (empty($maHoSo) || empty($maBacSi) || empty($tenBN) || empty($ngayKham) || empty($tienSu) || empty($chuanDoan) || empty($lyDoKham)) {
            echo json_encode(["status" => false, "message" => "Dữ liệu không hợp lệ!"]);
            return;
        }
        
        // Xử lý tạo phiếu khám
        $model = new mPhieuKhamBenh(); 
        $result = $model->taoPhieuKhamBenh($maHoSo, $maBacSi, $maLichKham, $tenBN, $ngayKham, $khungGio, $tienSu, $chuanDoan, $lyDoKham);
        return json_encode($result);
    }

    public function getThongTinPhieuKham($maLichKham, $ngayKham, $khungGio) {
        
        // Xử lý lấy thông tin phiếu khám
        $model = new mPhieuKhamBenh(); 
        $result = $model->layThongTinPhieuKham($maLichKham, $ngayKham, $khungGio);
        return $result;
    }

    public function updateThongTinPhieuKham($maPhieuKham, $tienSu, $chuanDoan, $lyDoKham) {
        // Xử lý cập nhật thông tin phiếu khám
        $model = new mPhieuKhamBenh(); 
        $result = $model->capNhatThongTinPhieuKhamBenh($maPhieuKham, $tienSu, $chuanDoan, $lyDoKham);
        return json_encode($result);
    }
    public function getAllPhieuKhamBenh($maHoSo) {
        
        // Xử lý lấy thông tin phiếu khám
        $model = new mPhieuKhamBenh(); 
        $result = $model->layAllPhieuKhamBenh($maHoSo);
        return $result;
    }
}

