<?php
 include("../model/lichkham.php");

 class cLichKham {
    function layDanhSachLichKhamBacSi($maBacSi) {
        $p = new mLichKham();
        $result = $p->layDanhSachLichKham($maBacSi);

        if (isset($result["error"])) {
            echo json_encode(["error" => $result["error"]]);
            return;
        }

        echo json_encode($result);
    }
 }
?>
