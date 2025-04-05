<?php
include("../model/upload.php");
class cUpload {
    public function uploadfile($name, $tmp_name, $folder) {
        $model = new mUpload();
        $result = $model->uploadfile($name, $tmp_name, $folder);
        if ($result) {
            echo json_encode(["success" => true, "message" => "Upload thành công", "filename" => $name]);
        } else {
            echo json_encode(["success" => false, "message" => "Upload thất bại"]);
        }
    }
}
?>