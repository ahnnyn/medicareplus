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
        // Tìm kiếm chuyên khoa trong cơ sở dữ liệu
        public function searchChuyenKhoa($name) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    // Sử dụng LIKE để tìm kiếm tên chuyên khoa theo từ khóa
                    $query = $pdo->prepare("SELECT * FROM khoa WHERE tenKhoa LIKE :name");
                    $searchTerm = "%$name%";  // Thêm dấu % vào đầu và cuối từ khóa để tìm kiếm phần tử chứa tên chuyên khoa
                    $query->bindParam(":name", $searchTerm);
                    $query->execute();
                    
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