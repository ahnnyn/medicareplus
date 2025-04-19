<?php
    require_once("../config/database.php");

    class mBenhNhan{
        public function layThongTinCaNhanBenhNhan($id) {
            if (!is_numeric($id) || $id <= 0) {
                return ["success" => false, "message" => "Mã bệnh nhân không hợp lệ"];
            }
        
            if (empty($id)) {
                return ["success" => false, "message" => "Thiếu mã bệnh nhân"];
            }
        
            $p = new connectdatabase();
            $pdo = $p->connect();
            if (!$pdo) {
                return ["success" => false, "message" => "Không thể kết nối database"];
            }
        
            try {
                $query = $pdo->prepare("
                    SELECT * FROM benhnhan bn 
                    JOIN taikhoan tk ON bn.maTaiKhoan = tk.maTaiKhoan 
                    WHERE bn.maBenhNhan = :id
                ");
                $query->bindParam(":id", $id, PDO::PARAM_INT);
                $query->execute();
                $result = $query->fetch(PDO::FETCH_ASSOC);
        
                // if (!$result) {
                //     return ["success" => false, "message" => "Không tìm thấy bệnh nhân"];
                // }
        
                return ["success" => true, "data" => $result];
            } catch (PDOException $e) {
                return ["success" => false, "message" => "Lỗi truy vấn: " . $e->getMessage()];
            } finally {
                $pdo = null;
            }
        }
        public function layThongTinBenhNhanQuaEmail($email) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if (!$pdo) return false;
    
            $query = $pdo->prepare("SELECT * FROM benhnhan WHERE email = :email");
            $query->bindParam(":email", $email);
            $query->execute();
            return $query->fetch(PDO::FETCH_ASSOC);
        }
        public function capNhatMatKhau($maBenhNhan, $matKhauMoi) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if (!$pdo) return false;
    
            $query = $pdo->prepare("UPDATE benhnhan SET matKhau = :matKhau WHERE maBenhNhan = :id");
            $query->bindParam(":matKhau", $matKhauMoi);
            $query->bindParam(":id", $maBenhNhan);
            return $query->execute();
        }
        
        public function capNhatThongTinBenhNhan($maBenhNhan, $hoTen, $gioiTinh, $ngaySinh, $soDienThoai, $email, $diaChi, $hinhAnh){
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    error_log("ID: " . $maBenhNhan);
                    $queryStr = "
                        UPDATE benhnhan
                        SET hoTen = :hoTen, 
                            gioiTinh = :gioiTinh,
                            ngaySinh = :ngaySinh,
                            soDienThoai = :soDienThoai, 
                            email = :email,
                            diaChi = :diaChi, 
                            hinhAnh = :hinhAnh
                    ";

                    $queryStr .= " WHERE maBenhNhan = :maBenhNhan";
            
                    $query = $pdo->prepare($queryStr);
                
                    $query->bindParam(":maBenhNhan", $maBenhNhan, PDO::PARAM_INT);
                    $query->bindParam(":hoTen", $hoTen, PDO::PARAM_STR);
                    $query->bindParam(":gioiTinh", $gioiTinh, PDO::PARAM_STR);
                    $query->bindParam(":ngaySinh", $ngaySinh, PDO::PARAM_STR);
                    $query->bindParam(":soDienThoai", $soDienThoai, PDO::PARAM_STR);
                    $query->bindParam(":email", $email, PDO::PARAM_STR);
                    $query->bindParam(":diaChi", $diaChi, PDO::PARAM_STR);
                    $query->bindParam(":hinhAnh", $hinhAnh, PDO::PARAM_STR);
                    $query->execute();
                    return ["success" => "Cập nhật thông tin bệnh nhân thành công"];
                } catch (PDOException $e) {
                    return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
                }
            } else {
                return ["error" => "Không thể kết nối database"];
            }
        }      
    }
?>