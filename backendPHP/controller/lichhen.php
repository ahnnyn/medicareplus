<?php
include("../model/lichhen.php");

class cLichHen {
    public function layDanhSachLichHen($maBenhNhan) {
        $p = new mLichHen();
        $result = $p->layDanhSachLichHen($maBenhNhan);

        if (isset($result["error"])) {
            echo json_encode(["error" => $result["error"]]);
            return;
        }

        echo json_encode($result);
    }

    public function updateLichHen($maLich, $maBacSi, $maKhungGio, $ngayKham, $lyDoKham) {
        $p = new mLichHen();
        $result = $p->updateLichHen($maLich, $maBacSi, $maKhungGio, $ngayKham, $lyDoKham);
    
        if (isset($result['success'])) {
            return ['success' => true];
        } else {
            return ['success' => false, 'error' => $result['error'] ?? 'Lỗi không xác định'];
        }
    }
    public function deleteLichHen($maLich) {
        $p = new mLichHen();
        $result = $p->deleteLichHen($maLich);

        if (isset($result['success'])) {
            return ['success' => true];
        } else {
            return ['success' => false, 'error' => $result['error'] ?? 'Lỗi không xác định'];
        }
    }
}
?>
