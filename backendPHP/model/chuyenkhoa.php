<?php
    include("../config/database.php");

    class mChuyenKhoa{
        public function layDanhSachChuyenKhoa(){
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    $query = $pdo->query("SELECT * FROM khoa");
                    $data = $query->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } catch (PDOException $e) {
                    return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
                }
            } else {
                return ["error" => "Không thể kết nối database"];
            }
        }

        public function layThongTinChuyenKhoaById($id) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    $query = $pdo->prepare("SELECT * FROM khoa WHERE maKhoa = :id");
                    $query->bindParam(":id", $id);
                    $query->execute();
                    return $query;
                } catch (PDOException $e) {
                    return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
                }
            } else {
                return ["error" => "Không thể kết nối database"];
            }
        }
    }
?>