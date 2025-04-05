<?php
include("../model/calamviec.php");

class cCaLamViec {
    public function getCaLamViec() {
        $p = new mCaLamViec();
        $result = $p->layCaLamViec();

        // Log kết quả trả về từ mô hình
        echo "Dữ liệu trả về: ";
        var_dump($result);

        if (isset($result["error"])) {
            // Nếu có lỗi trong truy vấn, trả về thông báo lỗi
            echo json_encode(["error" => $result["error"]]);
            return;
        }

        // Trả về kết quả dữ liệu
        echo json_encode($result);
    }
}
?>
