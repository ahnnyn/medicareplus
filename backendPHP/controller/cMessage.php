<?php
include("../model/message.php");

class cMessage {


    public function saveTinNhan(){
        $p = new mMessage();
        $result = $p->luuTinNhan();

        if (isset($result["error"])) {
            echo json_encode(["error" => $result["error"]]);
            return;
        }
        return json_encode($result);

    }

    public function fetchTinNhan($lichhen_id) {
        $p = new mMessage();
        $result = $p->layTinNhan($lichhen_id);
        
        if (isset($result["error"])) {
            echo json_encode(["success" => false, "error" => $result["error"]]);
            return;
        }
    
        echo json_encode([
            "success" => true,
            "data" => $result
        ]);
    }
    
    

}

?>
