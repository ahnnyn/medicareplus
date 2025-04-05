<?php
include("../config/database.php");
class mUpload {
    public function uploadfile($name, $tmp_name, $folder) {
        $des = $folder . "/" . time() . "_" . $name; // Đổi tên file tránh trùng lặp
        return move_uploaded_file($tmp_name, $des);
    }
}
?>