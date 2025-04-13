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

    // public function updateTrangThaiLichKham($maBacSi, $maLichKham, $trangThai) {
    //     $p = new mLichKham();
    //     $result = $p->capNhatTrangThaiLichKham($maBacSi, $maLichKham, $trangThai);
    //     return $result;
    // }
    
 }
?>
