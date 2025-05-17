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
                            lk.phuongthucthanhtoan,
                            lk.hinhThucKham,
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
        public function capNhatLichHen($maLich, $maBacSi, $maKhungGio, $ngayKham, $lyDoKham, $hinhThucKham) {
            $p = new connectdatabase();
            $pdo = $p->connect();

            if (!$pdo) {
                return ["success" => false, "message" => "Không thể kết nối database"];
            }

            try {
                $pdo->beginTransaction();

                // Lấy thông tin lịch cũ
                $stmtOld = $pdo->prepare("SELECT lh.maKhungGio, lh.ngayKham, llv.maLichLamViec
                                        FROM lichkham lh
                                        JOIN lichlamviec llv ON lh.maBacSi = llv.maBacSi 
                                                            AND lh.ngayKham = llv.ngayLamViec 
                                                            AND lh.hinhThucKham = llv.hinhThucKham
                                        WHERE lh.maLich = ?");
                $stmtOld->execute([$maLich]);
                $old = $stmtOld->fetch(PDO::FETCH_ASSOC);

                if (!$old) {
                    throw new Exception("Không tìm thấy lịch cũ");
                }

                // Cập nhật chi tiết lịch làm việc cũ thành "available"
                $stmtUpdateOld = $pdo->prepare("UPDATE chitiet_lichlamviec 
                                                SET trangThaiDatLich = 'available' 
                                                WHERE khungGio_ID = ? AND lichLamViec_ID = ?");
                $stmtUpdateOld->execute([$old['maKhungGio'], $old['maLichLamViec']]);

                // Lấy ID lịch làm việc mới
                $stmtNew = $pdo->prepare("SELECT maLichLamViec 
                                        FROM lichlamviec 
                                        WHERE maBacSi = ? AND ngayLamViec = ? AND hinhThucKham = ?");
                $stmtNew->execute([$maBacSi, $ngayKham, $hinhThucKham]);
                $newLich = $stmtNew->fetch(PDO::FETCH_ASSOC);

                if (!$newLich) {
                    throw new Exception("Không tìm thấy lịch làm việc mới");
                }

                // Cập nhật chi tiết lịch làm việc mới thành "book"
                $stmtUpdateNew = $pdo->prepare("UPDATE chitiet_lichlamviec 
                                                SET trangThaiDatLich = 'booked' 
                                                WHERE khungGio_ID = ? AND lichLamViec_ID = ?");
                $stmtUpdateNew->execute([$maKhungGio, $newLich['maLichLamViec']]);

                // Cập nhật lịch khám
                $stmtUpdateLich = $pdo->prepare("UPDATE lichkham 
                                                SET maBacSi = ?, maKhungGio = ?, ngayKham = ?, lyDoKham = ?, hinhThucKham = ?
                                                WHERE maLich = ?");
                $stmtUpdateLich->execute([$maBacSi, $maKhungGio, $ngayKham, $lyDoKham, $hinhThucKham, $maLich]);

                $pdo->commit();
                return ["success" => true, "message" => "Cập nhật lịch hẹn thành công"];
            } catch (Exception $e) {
                $pdo->rollBack();
                return ["success" => false, "message" => "Lỗi: " . $e->getMessage()];
            }
        }

        public function xoaLichHen($maLich) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if (!$pdo) {
                return ["success" => false, "message" => "Không thể kết nối database"];
            }
            try {
                $query = $pdo->prepare("
                    UPDATE lichkham 
                    SET trangThai = 'Đã hủy' where maLich = :maLich
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
