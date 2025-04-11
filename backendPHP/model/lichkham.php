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

        public function capNhatTrangThaiLichKham($maBacSi, $maLichKham, $trangThai) {
            $validStatuses = ['Chờ khám', 'Đã khám', 'Đã hủy']; // Valid enum values for database
            if (!in_array($trangThai, $validStatuses)) {
                return ["status" => false, "error" => "Trạng thái không hợp lệ"];
            }
        
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    if (!is_numeric($maLichKham)) {
                        return ["status" => false, "error" => "Mã lịch khám không hợp lệ"];
                    }
        
                    $query = $pdo->prepare("UPDATE lichkham SET trangThai = :trangThai WHERE maLich = :maLichKham AND maBacSi = :maBacSi");
                    $query->bindParam(":maBacSi", $maBacSi, PDO::PARAM_INT);
                    $query->bindParam(":trangThai", $trangThai, PDO::PARAM_STR);
                    $query->bindParam(":maLichKham", $maLichKham, PDO::PARAM_INT);
        
                    $success = $query->execute();
                    if ($success) {
                        return ["status" => true];
                    } else {
                        return ["status" => false, "error" => "Không thể thực thi câu lệnh UPDATE"];
                    }
        
                } catch (PDOException $e) {
                    return ["status" => false, "error" => "Lỗi PDO: " . $e->getMessage()];
                }
            } else {
                return ["status" => false, "error" => "Không thể kết nối CSDL"];
            }
        }

        public function taoLichKhamMoi($maBenhNhan, $maBacSi, $maKhungGio, $tenBenhNhan, $giaKham, $ngayKham, $lyDoKham, $hinhThucThanhToan) {
            $p = new connectdatabase();
            $pdo = $p->connect();
        
            if ($pdo) {
                try {
                    if (!is_numeric($maBenhNhan) || !is_numeric($maBacSi) || !is_numeric($maKhungGio) || !is_numeric($giaKham)) {
                        return ["status" => false, "error" => "Thông tin không hợp lệ"];
                    }
        
                   // Chuyển đổi sang chuỗi ngày đúng định dạng
                    $ngayKhamFormatted = DateTime::createFromFormat('Y-m-d', $ngayKham);

                    if (!$ngayKhamFormatted) {
                        return ["status" => false, "error" => "Ngày khám không hợp lệ"];
                    }

                    $ngayKhamStr = $ngayKhamFormatted->format('Y-m-d');

        
                    $query = $pdo->prepare("INSERT INTO lichkham (maBenhNhan, maBacSi, maKhungGio, hoTenBenhNhan, giaKham, ngayKham, lyDoKham, phuongthucthanhtoan) 
                        VALUES (:maBenhNhan, :maBacSi, :maKhungGio, :tenBenhNhan, :giaKham, :ngayKham, :lyDoKham, :phuongthucthanhtoan)");
        
                    $query->bindParam(":maBenhNhan", $maBenhNhan, PDO::PARAM_INT);
                    $query->bindParam(":maBacSi", $maBacSi, PDO::PARAM_INT);
                    $query->bindParam(":maKhungGio", $maKhungGio, PDO::PARAM_INT);
                    $query->bindParam(":giaKham", $giaKham, PDO::PARAM_INT);
                    $query->bindParam(":tenBenhNhan", $tenBenhNhan, PDO::PARAM_STR);
                    $query->bindParam(":ngayKham", $ngayKhamStr, PDO::PARAM_STR);
                    $query->bindParam(":lyDoKham", $lyDoKham, PDO::PARAM_STR);
                    $query->bindParam(":phuongthucthanhtoan", $hinhThucThanhToan, PDO::PARAM_STR);
        
                    $success = $query->execute();
                    $maLichKham = $pdo->lastInsertId();
                    if ($success) {
                        return [
                            "status" => true,
                            "message" => "Tạo lịch khám thành công",
                            "maLichKham" => $maLichKham
                        ];
                    } else {
                        return ["status" => false, "error" => "Không thể thực thi câu lệnh INSERT"];
                    }
        
                } catch (PDOException $e) {
                    return ["status" => false, "error" => "Lỗi PDO: " . $e->getMessage()];
                }
            } else {
                return ["status" => false, "error" => "Không thể kết nối CSDL"];
            }
        }
        

        public function capNhatTrangThaiThanhToan($maLichKham, $trangThaiThanhToan) {
            $validStatuses = ['Chưa thanh toán', 'Đã thanh toán']; // Valid enum values for database
            if (!in_array($trangThaiThanhToan, $validStatuses)) {
                return ["status" => false, "error" => "Trạng thái không hợp lệ"];
            }
        
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    if (!is_numeric($maLichKham)) {
                        return ["status" => false, "error" => "Mã lịch khám không hợp lệ"];
                    }
        
                    $query = $pdo->prepare("UPDATE lichkham SET trangThaiThanhToan = :trangThaiThanhToan WHERE maLich = :maLichKham");
                    $query->bindParam(":trangThaiThanhToan", $trangThaiThanhToan, PDO::PARAM_STR);
                    $query->bindParam(":maLichKham", $maLichKham, PDO::PARAM_INT);
        
                    $success = $query->execute();
                    if ($success) {
                        return ["status" => true];
                    } else {
                        return ["status" => false, "error" => "Không thể thực thi câu lệnh UPDATE"];
                    }
        
                } catch (PDOException $e) {
                    return ["status" => false, "error" => "Lỗi PDO: " . $e->getMessage()];
                }
            } else {
                return ["status" => false, "error" => "Không thể kết nối CSDL"];
            }
        }
    }
?>
