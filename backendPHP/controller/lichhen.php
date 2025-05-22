<?php
include("../model/lichhen.php");

class cLichHen {
    public function getDanhSachLichHen($maBenhNhan) {
        $p = new mLichHen();
        $result = $p->layDanhSachLichHen($maBenhNhan);

        if (isset($result["error"])) {
            echo json_encode(["error" => $result["error"]]);
            return;
        }

        echo json_encode($result);
    }

    public function updateLichHen($maLich, $maBacSi, $maKhungGio, $ngayKham, $lyDoKham, $hinhThucKham) {
        $p = new mLichHen();
        $result = $p->capNhatLichHen($maLich, $maBacSi, $maKhungGio, $ngayKham, $lyDoKham, $hinhThucKham);

        if (isset($result['success']) && $result['success'] === true) {
            return ['success' => true];
        } else {
            return ['success' => false, 'error' => $result['error'] ?? 'Lỗi không xác định'];
        }
    }

    public function deleteLichHen($maLich) {
        $p = new mLichHen();
        $result = $p->xoaLichHen($maLich);

        return $result;
    }
    
}
?>
