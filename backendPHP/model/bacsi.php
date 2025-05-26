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
                                        bs.trangThai,
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
    $maKhoa = (int)$maKhoa;  // ép kiểu cho chắc

    if (!$maKhoa) {
        return ["error" => "Thiếu hoặc không hợp lệ mã khoa"];
    }

    $p = new connectdatabase();
    $pdo = $p->connect();

    if (!$pdo) {
        return ["error" => "Không thể kết nối database"];
    }

    try {
        $query = $pdo->prepare("
            SELECT 
                bs.*, 
                GROUP_CONCAT(DISTINCT llv.hinhThucKham ORDER BY llv.hinhThucKham SEPARATOR ', ') AS danhSachHinhThucKham
            FROM bacsi bs
            JOIN khoa k ON bs.maKhoa = k.maKhoa
            LEFT JOIN lichLamViec llv ON bs.maBacSi = llv.maBacSi
            WHERE k.maKhoa = :maKhoa
            GROUP BY bs.maBacSi
        ");
        $query->bindValue(":maKhoa", $maKhoa, PDO::PARAM_INT);  // hoặc PDO::PARAM_STR cũng ok
        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result ?: ["error" => "Không có bác sĩ nào thuộc chuyên khoa này"];
    } catch (PDOException $e) {
        return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
    } finally {
        $pdo = null;
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
        public function timBacSi($name) {
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
        public function themBacSi($hoTen, $gioiTinh, $ngaySinh, $soDienThoai, $email, $diaChi, $giaKham, $hinhAnh, $moTa, $maKhoa,$username, $matKhau, $maVaiTro) {
            $p = new connectdatabase();
            $pdo = $p->connect();

            if ($pdo) {
                try {
                    // Bắt đầu transaction để đảm bảo dữ liệu nhất quán
                    $pdo->beginTransaction();
                    $hashedPassword = password_hash($matKhau, PASSWORD_BCRYPT);
                    // 1. Thêm tài khoản
                    $queryTaiKhoan = $pdo->prepare("INSERT INTO taikhoan (username, matKhau, maVaiTro) VALUES (:username, :matKhau, :maVaiTro)");
                    $queryTaiKhoan->bindParam(':username', $username);
                    $queryTaiKhoan->bindParam(':matKhau', $hashedPassword); // Nên hash trước khi gọi hàm này
                    $queryTaiKhoan->bindParam(':maVaiTro', $maVaiTro);
                    $queryTaiKhoan->execute();

                    // Lấy id tài khoản vừa thêm
                    $maTaiKhoan = $pdo->lastInsertId();

                    // 2. Thêm bác sĩ
                    $queryBacSi = $pdo->prepare("INSERT INTO bacsi 
                        (hoTen, gioiTinh, ngaySinh, soDienThoai, email, diaChi, giaKham, hinhAnh, moTa, maKhoa, maTaiKhoan, trangThai)
                        VALUES
                        (:hoTen, :gioiTinh, :ngaySinh, :soDienThoai, :email, :diaChi, :giaKham, :hinhAnh, :moTa, :maKhoa, :maTaiKhoan, 'Đang hoạt động')
                    ");
                    $queryBacSi->bindParam(':hoTen', $hoTen);
                    $queryBacSi->bindParam(':gioiTinh', $gioiTinh);
                    $queryBacSi->bindParam(':ngaySinh', $ngaySinh);
                    $queryBacSi->bindParam(':soDienThoai', $soDienThoai);
                    $queryBacSi->bindParam(':email', $email);
                    $queryBacSi->bindParam(':diaChi', $diaChi);
                    $queryBacSi->bindParam(':giaKham', $giaKham);
                    $queryBacSi->bindParam(':hinhAnh', $hinhAnh);
                    $queryBacSi->bindParam(':moTa', $moTa);
                    $queryBacSi->bindParam(':maKhoa', $maKhoa);
                    $queryBacSi->bindParam(':maTaiKhoan', $maTaiKhoan);
                    $queryBacSi->execute();

                    // Commit transaction
                    $pdo->commit();

                    return true;
                } catch (PDOException $e) {
                    // Rollback nếu có lỗi
                    $pdo->rollBack();
                    return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
                }
            } else {
                return ["error" => "Không thể kết nối database"];
            }
        }

        public function xoaBacSi($maBacSi) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    $stmt = $pdo->prepare("UPDATE bacsi SET trangThai = 'Ẩn' WHERE maBacSi = :maBacSi");
                    $stmt->bindParam(':maBacSi', $maBacSi, PDO::PARAM_INT);
                    $stmt->execute(); 
                    return ["success" => true, "message" => "Xóa bác sĩ thành công"];
                } catch (PDOException $e) {
                    return ["success" => false, "message" => "Lỗi truy vấn: " . $e->getMessage()];
                }
            }
            return ["success" => false, "message" => "Không thể kết nối database"];
        }
    }
?>