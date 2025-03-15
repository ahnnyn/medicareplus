<?php
    include("../config/database.php");

    class mBacSi{
        public function layDanhSachBacSi(){
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    $query = $pdo->query("SELECT * FROM bacsi bs JOIN khoa k on bs.maKhoa = k.maKhoa");
                    $data = $query->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } catch (PDOException $e) {
                    return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
                }
            } else {
                return ["error" => "Không thể kết nối database"];
            }
        }

        public function layThongTinBacSiByKhoa($maKhoa) {
            if (!$maKhoa) {
                return ["error" => "Thiếu mã khoa"];
            }
        
            $p = new connectdatabase();
            $pdo = $p->connect();
        
            if (!$pdo) {
                return ["error" => "Không thể kết nối database"];
            }
        
            try {
                $query = $pdo->prepare("
                    SELECT bs.* FROM bacsi bs 
                    JOIN khoa k ON bs.maKhoa = k.maKhoa 
                    WHERE k.maKhoa = :maKhoa
                ");
                $query->bindParam(":maKhoa", $maKhoa, PDO::PARAM_INT);
                $query->execute();
                
                $result = $query->fetchAll(PDO::FETCH_ASSOC);  // Lấy tất cả bác sĩ
                return $result ?: ["error" => "Không có bác sĩ nào thuộc chuyên khoa này"];
            } catch (PDOException $e) {
                return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
            } finally {
                $pdo = null;  // Đóng kết nối
            }
        }

        public function layThongTinBacSiById($id) {
            if (!$id) {
                return ["error" => "Thiếu mã bác sĩ"];
            }
            $p = new connectdatabase();
            $pdo = $p->connect();
            if (!$pdo) {
                return ["error" => "Không thể kết nối database"];
            }
            try {
                $query = $pdo->prepare("SELECT * FROM bacsi bs join khoa k on bs.maKhoa = k.maKhoa WHERE bs.maBacSi = :id");
                $query->bindParam(":id", $id, PDO::PARAM_INT);
                $query->execute();
                $result = $query->fetch(PDO::FETCH_ASSOC);
                return $result ?: ["error" => "Không tìm thấy bác sĩ"];
            } catch (PDOException $e) {
                return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
            } finally {
                $pdo = null;
            }
        }
        
        public function layKhungGioKham($maBacSi, $ngayKham) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    $query = $pdo->prepare("
                        SELECT kg.maKhungGio, kg.khungGio 
                        FROM khunggio kg
                        JOIN calamviec cv ON kg.maCaLamViec = cv.maCaLamViec
                        JOIN lichlamviec llv ON cv.maCaLamViec = llv.maCa
                        WHERE llv.maBacSi = :maBacSi1
                        AND llv.ngayLamViec = :ngayKham1
                        AND kg.maKhungGio NOT IN (
                            SELECT lk.maKhungGio 
                            FROM lichkham lk
                            WHERE lk.maBacSi = :maBacSi2
                            AND lk.ngayKham = :ngayKham2
                        );
                    ");
                    $query->bindParam(":maBacSi1", $maBacSi, PDO::PARAM_INT);
                    $query->bindParam(":ngayKham1", $ngayKham, PDO::PARAM_STR);
                    $query->bindParam(":maBacSi2", $maBacSi, PDO::PARAM_INT);
                    $query->bindParam(":ngayKham2", $ngayKham, PDO::PARAM_STR);
                    $query->execute();
                    return $query->fetchAll(PDO::FETCH_ASSOC);
                } catch (PDOException $e) {
                    return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
                }
            } else {
                return ["error" => "Không thể kết nối database"];
            }
        }
        
    }
?>