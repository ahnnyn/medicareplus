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
                            lk.trangThaiThanhToan
                        FROM lichkham lk 
                        JOIN bacsi bs ON lk.maBacSi = bs.maBacSi 
                        JOIN khunggio kg ON lk.maKhungGio = kg.maKhungGio
                        JOIN benhnhan bn ON lk.maBenhNhan = bn.maBenhNhan
                        JOIN hosobenhnhan hsb ON bn.maBenhNhan = hsb.maBenhNhan
                        WHERE lk.maBenhNhan = :maBenhNhan 
");

                    $query->bindParam(":maBenhNhan", $maBacSi, PDO::PARAM_INT);
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

        // public function capNhatTrangThaiLichKham($maBacSi, $maLichKham, $trangThai) {
        //     $validStatuses = ['Chờ khám', 'Đã khám', 'Đã hủy']; // Valid enum values for database
        //     if (!in_array($trangThai, $validStatuses)) {
        //         return ["status" => false, "error" => "Trạng thái không hợp lệ"];
        //     }
        
        //     $p = new connectdatabase();
        //     $pdo = $p->connect();
        //     if ($pdo) {
        //         try {
        //             if (!is_numeric($maLichKham)) {
        //                 return ["status" => false, "error" => "Mã lịch khám không hợp lệ"];
        //             }
        
        //             $query = $pdo->prepare("UPDATE lichkham SET trangThai = :trangThai WHERE maLich = :maLichKham AND maBacSi = :maBacSi");
        //             $query->bindParam(":maBacSi", $maBacSi, PDO::PARAM_INT);
        //             $query->bindParam(":trangThai", $trangThai, PDO::PARAM_STR);
        //             $query->bindParam(":maLichKham", $maLichKham, PDO::PARAM_INT);
        
        //             $success = $query->execute();
        //             if ($success) {
        //                 return ["status" => true];
        //             } else {
        //                 return ["status" => false, "error" => "Không thể thực thi câu lệnh UPDATE"];
        //             }
        
        //         } catch (PDOException $e) {
        //             return ["status" => false, "error" => "Lỗi PDO: " . $e->getMessage()];
        //         }
        //     } else {
        //         return ["status" => false, "error" => "Không thể kết nối CSDL"];
        //     }
        // }
    }
?>
