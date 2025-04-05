<?php
    include("../config/database.php");

    class mLichKham {
        public function layDanhSachLichKham($maBacSi) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    if (!is_numeric($maBacSi)) {
                        return ["error" => "Mã bác sĩ không hợp lệ"];
                    }
                    
                    $query = $pdo->prepare("SELECT 
                                                bn.maBenhNhan, 
                                                bn.hoTen, 
                                                bn.soDienThoai, 
                                                bn.email, 
                                                bn.diaChi, 
                                                bn.hinhAnh, 
                                                bs.maBacSi, 
                                                lk.maKhungGio, 
                                                kg.khungGio, 
                                                lk.giaKham, 
                                                lk.ngayKham, 
                                                lk.lyDoKham, 
                                                lk.trangThai, 
                                                lk.trangThaiThanhToan
                                               
                                            FROM lichkham lk 
                                            JOIN bacsi bs ON lk.maBacSi = bs.maBacSi 
                                            JOIN khunggio kg ON lk.maKhungGio = kg.maKhungGio
                                            JOIN benhnhan bn ON lk.maBenhNhan = bn.maBenhNhan
                                            WHERE lk.maBacSi = :maBacSi
                                            
                                            ");
                    $query->bindParam(":maBacSi", $maBacSi, PDO::PARAM_INT);
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
    }
?>
