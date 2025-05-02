<?php
include("../model/message.php");

class cMessage {

    public function createTroChuyen() {
        $p = new mMessage();
        $result = $p->taoTroChuyen();
    
        echo json_encode($result);
    }
    

    public function getTroChuyen($cuoctrochuyen_id) {
        $p = new mMessage();
        $result = $p->layTroChuyen($cuoctrochuyen_id);

        if (isset($result["error"])) {
            echo json_encode(["error" => $result["error"]]);
            return;
        }

        return json_encode($result);


    }

    public function saveTinNhan(){
        $p = new mMessage();
        $result = $p->luuTinNhan();

        if (isset($result["error"])) {
            echo json_encode(["error" => $result["error"]]);
            return;
        }

        return json_encode($result);

    }

    public function endTroChuyen(){
        $p = new mMessage();
        $result = $p->ketThucTroChuyen();

        if (isset($result["error"])) {
            echo json_encode(["error" => $result["error"]]);
            return;
        }

        return json_encode($result);
    }

}

?>
