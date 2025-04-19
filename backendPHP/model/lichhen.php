<?php
    include("../config/database.php");

    class mLichHen {
        public function layDanhSachLichHen($maBenhNhan) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    if (!is_numeric($maBenhNhan)) {
                        return ["error" => "Mã bệnh nhân không hợp lệ"];
                    }
                    
                    $query = $pdo->prepare("SELECT 
                            bn.maBenhNhan, 
                            bn.hoTen, 
                            bn.soDienThoai, 
                            bn.email, 
                            bn.diaChi, 
                            bn.hinhAnh, 
                            bs.maBacSi, 
                            bs.hoTen AS tenBacSi,
                            bs.soDienThoai AS soDienThoaiBacSi,
                            lk.maKhungGio, 
                            hsb.maHoSo,
                            lk.maLich,
                            kg.khungGio, 
                            lk.giaKham, 
                            lk.ngayKham, 
                            lk.lyDoKham, 
                            lk.trangThai, 
                            lk.trangThaiThanhToan,
                            kh.tenKhoa
                        FROM lichkham lk 
                        JOIN bacsi bs ON lk.maBacSi = bs.maBacSi 
                        JOIN khunggio kg ON lk.maKhungGio = kg.maKhungGio
                        JOIN benhnhan bn ON lk.maBenhNhan = bn.maBenhNhan
                        JOIN hosobenhnhan hsb ON bn.maBenhNhan = hsb.maBenhNhan
                        JOIN khoa kh ON kh.maKhoa = bs.maKhoa
                        WHERE lk.maBenhNhan = :maBenhNhan 
");

                    $query->bindParam(":maBenhNhan", $maBenhNhan, PDO::PARAM_INT);
                    $query->execute();
                    $data = $query->fetchAll(PDO::FETCH_ASSOC);
                    
                    if (!$data) {
                        return ["error" => "Không có lịch khám nào"];
                    }
                    
                    return $data;
                } catch (PDOException $e) {
                    return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
                }
            } else {
                return ["error" => "Không thể kết nối database"];
            }
        }
        public function updateLichHen($maLich, $maBacSi, $maKhungGio, $ngayKham, $lyDoKham) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if (!$pdo) {
                return ["success" => false, "message" => "Không thể kết nối database"];
            }
            try {
                $queryStr = "
                    UPDATE lichkham 
                    SET maBacSi = :maBacSi, maKhungGio = :maKhungGio, ngayKham = :ngayKham, lyDoKham = :lyDoKham
                ";
                $queryStr .= "WHERE maLich = :maLich";
    
                $query = $pdo->prepare($queryStr);
    
                $query->bindParam(":maBacSi", $maBacSi, PDO::PARAM_INT);
                $query->bindParam(":maKhungGio", $maKhungGio, PDO::PARAM_INT);
                $query->bindParam(":ngayKham", $ngayKham);
                $query->bindParam(":lyDoKham", $lyDoKham);
                $query->bindParam(":maLich", $maLich, PDO::PARAM_INT);
    
                $success = $query->execute();
                if ($success) {
                    return ["success" => true, "message" => "Cập nhật lịch hẹn thành công"];
                } else {
                    return ["success" => false, "message" => "Cập nhật lịch hẹn thất bại"];
                }
            } catch (PDOException $e) {
                return ["success" => false, "message" => "Lỗi truy vấn: " . $e->getMessage()];
            }
        }
        public function deleteLichHen($maLich) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if (!$pdo) {
                return ["success" => false, "message" => "Không thể kết nối database"];
            }
            try {
                $query = $pdo->prepare("
                    UPDATE lichkham 
                    SET trangThai = 'Hủy' where maLich = :maLich
                ");
                $query->bindParam(":maLich", $maLich, PDO::PARAM_INT);
                $query->execute();
    
                return ["success" => true, "message" => "Xóa lịch hẹn thành công"];
            } catch (PDOException $e) {
                return ["success" => false, "message" => "Lỗi truy vấn: " . $e->getMessage()];
            }
        }
    }
?>
