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
    
 }
?>
