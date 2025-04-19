<?php
    include("../config/database.php");

    class mPhieuKhamBenh {
        public function taoPhieuKhamBenh($maHoSo, $maBacSi, $maLichKham, $tenBN, $ngayKham, $khungGio, $tienSu, $chuanDoan, $lyDoKham) {
            // Kiểm tra các tham số đầu vào
            if (!is_numeric($maHoSo) || !is_numeric($maBacSi) || !is_numeric($maLichKham) || empty($tenBN) || empty($ngayKham) || empty($khungGio) || empty($tienSu) || empty($chuanDoan) || empty($lyDoKham)) {
                return json_encode(["status" => false, "message" => "Vui lòng nhập đầy đủ thông tin!"]);
                return json_encode(["status" => false, "message" => "Mã hồ sơ hoặc mã bác sĩ không hợp lệ!"]);
            }
        
            $maHoSo = (int)$maHoSo;
            $maBacSi = (int)$maBacSi;
            $maLichKham = (int)$maLichKham;
            
        
            // Kết nối và xử lý database
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    $query = $pdo->prepare("INSERT INTO phieukhambenh (maHoSo, maBacSi, maLichKham, hoTenBenhNhan, ngayKham, khungGioKham, tienSu, chanDoan, lyDoKham) 
                                            VALUES (:maHoSo, :maBacSi, :maLichKham, :tenBN, :ngayKham, :khungGio, :tienSu, :chuanDoan, :lyDoKham)");
                    $query->bindParam(":maHoSo", $maHoSo, PDO::PARAM_INT);
                    $query->bindParam(":maBacSi", $maBacSi, PDO::PARAM_INT);
                    $query->bindParam(":maLichKham", $maLichKham, PDO::PARAM_INT);
                    $query->bindParam(":tenBN", $tenBN);
                    $query->bindParam(":ngayKham", $ngayKham);
                    $query->bindParam(":khungGio", $khungGio);
                    $query->bindParam(":tienSu", $tienSu);
                    $query->bindParam(":chuanDoan", $chuanDoan);
                    $query->bindParam(":lyDoKham", $lyDoKham);
                    $success = $query->execute();
                    
                    if ($success) {
                        return (["status" => true, "message" => "Tạo phiếu khám bệnh thành công"]);
                    } else {
                        return (["status" => false, "message" => "Tạo phiếu khám bệnh thất bại"]);
                    }
                } catch (PDOException $e) {
                    return (["status" => false, "error" => "Lỗi truy vấn: " . $e->getMessage()]);
                }
            } else {
                return (["status" => false, "error" => "Không thể kết nối database"]);
            }
        }
            
        public function layThongTinPhieuKham($maLichKham, $ngayKham, $khungGio) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if (!$pdo) return false;
        
            $query = $pdo->prepare("SELECT * FROM phieukhambenh WHERE maLichKham = :maLichKham AND ngayKham = :ngayKham AND khungGioKham = :khungGio");
            $query->bindParam(":maLichKham", $maLichKham, PDO::PARAM_INT);
            $query->bindParam(":ngayKham", $ngayKham);
            $query->bindParam(":khungGio", $khungGio);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_ASSOC); // chỉ lấy 1 dòng
            return $result;
        }
        
        // Trong model (KHÔNG echo nữa, chỉ return)
        public function capNhatThongTinPhieuKhamBenh($maPhieuKham, $tienSu, $chuanDoan, $lyDoKham) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if (!$pdo) return [
                "status" => false,
                "message" => "Không thể kết nối cơ sở dữ liệu."
            ];

            $query = $pdo->prepare("UPDATE phieukhambenh SET tienSu = :tienSu, chanDoan = :chuanDoan, lyDoKham = :lyDoKham WHERE maPhieu = :maPhieuKham");
            $query->bindParam(":maPhieuKham", $maPhieuKham, PDO::PARAM_INT);
            $query->bindParam(":tienSu", $tienSu);
            $query->bindParam(":chuanDoan", $chuanDoan);
            $query->bindParam(":lyDoKham", $lyDoKham);
            $isUpdated = $query->execute();

            if ($isUpdated) {
                return ["status" => true, "message" => "Cập nhật phiếu khám thành công!"];
            } else {
                return ["status" => false, "message" => "Cập nhật phiếu khám thất bại."];
            }
        }
        public function layAllPhieuKhamBenh($maHoSo) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo){
                try {
                    $query = $pdo->prepare("
                    SELECT pkb.*, bs.hoTen, hs.gioiTinh, hs.ngaySinh, hs.ngheNghiep, hs.CCCD, hs.diaChi, lk.giaKham, bn.soDienThoai
                        FROM phieukhambenh pkb 
                        JOIN hosobenhnhan hs ON hs.maHoSo = pkb.maHoSo
                        JOIN bacsi bs ON bs.maBacSi = pkb.maBacSi
                        JOIN lichkham lk ON lk.maLich = pkb.maLichKham
                        JOIN benhnhan bn ON bn.maBenhNhan = hs.maBenhNhan
                        WHERE hs.maHoSo = :maHoSo
                    ");
                    $query->bindParam(":maHoSo", $maHoSo, PDO::PARAM_INT);
                    $query->execute();
                    $result = $query->fetchAll(PDO::FETCH_ASSOC);
                    if (!$result) {
                        return ["error" => "Không có phiếu khám nào"];
                    }
                    return $result;
                }catch(PDOException $e) {
                    return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
                }
            } else {
                return ["error" => "Không thể kết nối database"];
            }
        }   
    }
?>
