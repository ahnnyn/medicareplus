<?php
require_once("../config/database.php");

class mCaLamViec {
    public function layCaLamViec() {
        $p = new connectdatabase();
        $pdo = $p->connect(); // Kết nối database

        if ($pdo) {
            try {
                $query = $pdo->query("SELECT * FROM calamviec");
                $data = $query->fetchAll(PDO::FETCH_ASSOC);
                return $data;
            } catch (PDOException $e) {
                return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
            }
        } else {
            return ["error" => "Không thể kết nối database"];
        }
    }
}
?>
