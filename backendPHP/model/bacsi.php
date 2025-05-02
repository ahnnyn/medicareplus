<?php
    include("../config/database.php");

    class mBacSi{
        public function layDanhSachBacSi(){
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    $query = $pdo->query("SELECT 
                                        bs.maBacSi, 
                                        bs.hoTen, 
                                        bs.gioiTinh, 
                                        bs.ngaySinh, 
                                        bs.soDienThoai, 
                                        bs.email, 
                                        bs.diaChi, 
                                        bs.giaKham,
                                        bs.hinhAnh, 
                                        bs.moTa, 
                                        bs.maKhoa, 
                                        bs.maTaiKhoan, 
                                        k.tenKhoa, 
                                        GROUP_CONCAT(DISTINCT llv.hinhThucKham) AS hinhThucKham
                                    FROM 
                                        bacsi bs 
                                    JOIN 
                                        khoa k ON bs.maKhoa = k.maKhoa
                                    LEFT JOIN  
                                        lichlamviec llv ON bs.maBacSi = llv.maBacSi
                                    GROUP BY 
                                        bs.maBacSi
                                    ");
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
                $query = $pdo->prepare("SELECT bs.maBacSi, bs.hoTen, bs.gioiTinh, bs.ngaySinh, bs.soDienThoai, bs.email, bs.diaChi, bs.giaKham, bs.hinhAnh, bs.moTa, bs.maKhoa, k.tenKhoa,tk.maTaiKhoan, tk.username, tk.matKhau, vt.tenVaiTro, GROUP_CONCAT(DISTINCT llv.ngayLamViec) AS danhSachNgayLamViec
                                        FROM bacsi bs join khoa k on bs.maKhoa = k.maKhoa join taiKhoan tk on bs.maTaiKhoan = tk.maTaiKhoan
                                        JOIN vaitro vt ON tk.maVaiTro = vt.maVaiTro
                                        LEFT JOIN lichlamviec llv ON bs.maBacSi = llv.maBacSi WHERE bs.maBacSi = :id GROUP BY bs.maBacSi");
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

        public function capNhatThongTinBacSi($maBacSi, $hoTen, $gioiTinh, $soDienThoai, $email, $diaChi, $giaKham, $hinhAnh, $moTa, $maKhoa) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    // Check if `maBacSi` is correctly received
                    error_log("Doctor ID: " . $maBacSi);
                    
                    // If moTa is empty or null, set it as NULL
                    $moTa = ($moTa === '' || $moTa === null) ? null : $moTa;
                    
                    // Prepare the SQL query
                    $queryStr = "
                        UPDATE bacsi
                        SET hoTen = :hoTen, 
                            gioiTinh = :gioiTinh, 
                            soDienThoai = :soDienThoai, 
                            email = :email,
                            diaChi = :diaChi, 
                            giaKham = :giaKham,
                            hinhAnh = :hinhAnh, 
                            maKhoa = :maKhoa
                    ";
                    
                    // Add moTa to the query only if it's not null
                    if ($moTa !== null) {
                        $queryStr .= ", moTa = :moTa";
                    }
            
                    $queryStr .= " WHERE maBacSi = :maBacSi";
            
                    $query = $pdo->prepare($queryStr);
            
                    // Bind parameters
                    $query->bindParam(":maBacSi", $maBacSi, PDO::PARAM_INT);
                    $query->bindParam(":hoTen", $hoTen, PDO::PARAM_STR);
                    $query->bindParam(":gioiTinh", $gioiTinh, PDO::PARAM_STR);
                    $query->bindParam(":soDienThoai", $soDienThoai, PDO::PARAM_STR);
                    $query->bindParam(":email", $email, PDO::PARAM_STR);
                    $query->bindParam(":diaChi", $diaChi, PDO::PARAM_STR);
                    $query->bindParam(":giaKham", $giaKham, PDO::PARAM_STR);
                    $query->bindParam(":hinhAnh", $hinhAnh, PDO::PARAM_STR);
                    $query->bindParam(":maKhoa", $maKhoa, PDO::PARAM_INT);
            
                    // Bind moTa if it's not null
                    if ($moTa !== null) {
                        $query->bindParam(":moTa", $moTa, PDO::PARAM_STR);
                    }
            
                    // Execute the query
                    $query->execute();
                    
                    return ["success" => "Cập nhật thông tin bác sĩ thành công"];
                } catch (PDOException $e) {
                    return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
                }
            } else {
                return ["error" => "Không thể kết nối database"];
            }
        }    
        // Tìm kiếm bác sĩ trong cơ sở dữ liệu
        public function searchBacSi($name) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    // Sử dụng LIKE để tìm kiếm tên bác sĩ theo từ khóa
                    $query = $pdo->prepare("SELECT * FROM bacsi WHERE hoTen LIKE :name");
                    $searchTerm = "%$name%";  // Thêm dấu % vào đầu và cuối từ khóa để tìm kiếm phần tử chứa tên bác sĩ
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