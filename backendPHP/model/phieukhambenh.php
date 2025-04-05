<?php
    include("../config/database.php");

    class mPhieuKhamBenh {
        public function taoPhieuKhamBenh($maHoSo, $maBacSi, $tenBN, $ngayKham, $tienSu, $chuanDoan, $lyDoKham) {
            // Kiểm tra các tham số đầu vào
            if (!is_numeric($maHoSo) || !is_numeric($maBacSi)) {
                return json_encode(["status" => false, "message" => "Mã hồ sơ hoặc mã bác sĩ không hợp lệ!"]);
            }
        
            $maHoSo = (int)$maHoSo;
            $maBacSi = (int)$maBacSi;
        
            // Kết nối và xử lý database
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    $query = $pdo->prepare("INSERT INTO phieukhambenh (maHoSo, maBacSi, hoTenBenhNhan, ngayKham, tienSu, chanDoan, lyDoKham) 
                                            VALUES (:maHoSo, :maBacSi, :tenBN, :ngayKham, :tienSu, :chuanDoan, :lyDoKham)");
                    $query->bindParam(":maHoSo", $maHoSo, PDO::PARAM_INT);
                    $query->bindParam(":maBacSi", $maBacSi, PDO::PARAM_INT);
                    $query->bindParam(":tenBN", $tenBN);
                    $query->bindParam(":ngayKham", $ngayKham);
                    $query->bindParam(":tienSu", $tienSu);
                    $query->bindParam(":chuanDoan", $chuanDoan);
                    $query->bindParam(":lyDoKham", $lyDoKham);
                    $success = $query->execute();
                    
                    if ($success) {
                        return json_encode(["status" => true, "message" => "Tạo phiếu khám bệnh thành công"]);
                    } else {
                        return json_encode(["status" => false, "message" => "Tạo phiếu khám bệnh thất bại"]);
                    }
                } catch (PDOException $e) {
                    return json_encode(["status" => false, "error" => "Lỗi truy vấn: " . $e->getMessage()]);
                }
            } else {
                return json_encode(["status" => false, "error" => "Không thể kết nối database"]);
            }
        }
            
        
    }
?>
