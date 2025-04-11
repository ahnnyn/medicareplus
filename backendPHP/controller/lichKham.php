<?php
 include("../model/lichkham.php");

 class cLichKham {
    public function layDanhSachLichKhamBacSi($maBacSi) {
        $p = new mLichKham();
        $result = $p->layDanhSachLichKham($maBacSi);

        if (isset($result["error"])) {
            echo json_encode(["error" => $result["error"]]);
            return;
        }

        echo json_encode($result);
    }

    public function updateTrangThaiLichKham($maBacSi, $maLichKham, $trangThai) {
        $p = new mLichKham();
        $result = $p->capNhatTrangThaiLichKham($maBacSi, $maLichKham, $trangThai);
        return $result;
    }

    public function createLichKham($maBenhNhan, $maBacSi, $maKhungGio, $tenBenhNhan, $giaKham, $ngayKham,$lyDoKham, $hinhThucThanhToan) {
        $p = new mLichKham();
        $result = $p->taoLichKhamMoi($maBenhNhan, $maBacSi, $maKhungGio, $tenBenhNhan, $giaKham, $ngayKham,$lyDoKham, $hinhThucThanhToan);
        return $result;
    }

    public function updateTrangThaiThanhToan($maLichKham, $trangThaiThanhToan) {
        $p = new mLichKham();
        $result = $p->capNhatTrangThaiThanhToan($maLichKham, $trangThaiThanhToan);
        return $result;
    }
    
 }
?>
