<?php
include("../config/database.php");
class mUpload {
    public function uploadfile($name, $tmp_name, $folder) {
        // Ensure a unique file name by using microtime(true)
        $filename = microtime(true) . "_" . basename($name);
        $des = $folder . "/" . $filename;
        
        if (move_uploaded_file($tmp_name, $des)) {
            return $filename; // Return only the filename for easier processing
        }
        
        return false; // Return false in case of failure
    }
}

?>