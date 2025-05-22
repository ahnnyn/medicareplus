<?php
    include("../config/database.php");

    class mPhieuKhamBenh {
        public function taoPhieuKhamBenh($maHoSo, $maBacSi, $maLichKham, $tenBN, $ngayKham, $khungGio, $tienSu, $chuanDoan, $lyDoKham, $donThuoc, $emailBenhNhan, $tenBacSi) {
            if (!is_numeric($maHoSo) || !is_numeric($maBacSi) || !is_numeric($maLichKham) || empty($tenBN) || empty($ngayKham) || empty($khungGio) || empty($tienSu) || empty($chuanDoan) || empty($lyDoKham)) {
                echo json_encode(["status" => false, "message" => "Vui lòng nhập đầy đủ thông tin!"]);
                exit;
            }

            $maHoSo = (int)$maHoSo;
            $maBacSi = (int)$maBacSi;
            $maLichKham = (int)$maLichKham;

            $p = new connectdatabase();
            $pdo = $p->connect();
            if ($pdo) {
                try {
                    $pdo->beginTransaction();

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
                        $maPhieuKham = $pdo->lastInsertId();

                        // Chỉ tạo đơn thuốc nếu có đơn thuốc
                        if (is_array($donThuoc) && count($donThuoc) > 0) {
                            $queryDonThuoc = $pdo->prepare("INSERT INTO donthuoc (maPhieuKhamBenh, ngayTao) 
                                                            VALUES (:maPhieuKham, :ngayTao)");
                            $queryDonThuoc->bindParam(":maPhieuKham", $maPhieuKham, PDO::PARAM_INT);
                            $queryDonThuoc->bindParam(":ngayTao", $ngayKham);
                            $queryDonThuoc->execute();

                            $maDonThuoc = $pdo->lastInsertId();

                            foreach ($donThuoc as $thuoc) {
                                $queryChiTiet = $pdo->prepare("INSERT INTO chitiet_donthuoc (maDonThuoc, tenThuoc, lieuDung, soLanDungTrongNgay, soNgay, ghiChu) 
                                    VALUES (:maDonThuoc, :tenThuoc, :lieuDung, :soLanDung, :soNgay, :ghiChu)");
                                $queryChiTiet->bindParam(":maDonThuoc", $maDonThuoc, PDO::PARAM_INT);
                                $queryChiTiet->bindParam(":tenThuoc", $thuoc['tenThuoc']);
                                $queryChiTiet->bindParam(":lieuDung", $thuoc['lieuLuong']);
                                $queryChiTiet->bindParam(":soLanDung", $thuoc['soLanDungTrongNgay']);
                                $queryChiTiet->bindParam(":soNgay", $thuoc['soNgayDung'], PDO::PARAM_INT);
                                $queryChiTiet->bindParam(":ghiChu", $thuoc['ghiChu']);
                                $queryChiTiet->execute();
                            }
                        }

                        $pdo->commit();
                        return (["status" => true, "message" => "Tạo phiếu khám bệnh thành công"]);
                    } else {
                        return (["status" => false, "message" => "Tạo phiếu khám bệnh thất bại"]);
                    }
                } catch (PDOException $e) {
                    $pdo->rollBack();
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

            $query = $pdo->prepare("
                SELECT 
                    pkb.*, 
                    dt.*, 
                    GROUP_CONCAT(
                        CONCAT(
                            '{',
                            '\"maThuoc\":\"', ctdt.maThuoc, '\",',
                            '\"maDonThuoc\":\"', ctdt.maDonThuoc, '\",',
                            '\"tenThuoc\":\"', ctdt.tenThuoc, '\",',
                            '\"lieuLuong\":\"', ctdt.lieuDung, '\",',
                            '\"soLanDungTrongNgay\":\"', ctdt.soLanDungTrongNgay, '\",',
                            '\"soNgayDung\":\"', ctdt.soNgay, '\",',
                            '\"ghiChu\":\"', ctdt.ghiChu, '\"',
                            '}'
                        ) SEPARATOR ','
                    ) AS danhSachDonThuoc
                FROM phieukhambenh pkb
                LEFT JOIN donthuoc dt ON pkb.maPhieu = dt.maPhieuKhamBenh
                LEFT JOIN chitiet_donthuoc ctdt ON dt.maDonThuoc = ctdt.maDonThuoc
                WHERE pkb.maLichKham = :maLichKham
                AND pkb.ngayKham = :ngayKham
                AND pkb.khungGioKham = :khungGio
                GROUP BY pkb.maPhieu
                LIMIT 1;
            ");

            $query->bindParam(":maLichKham", $maLichKham, PDO::PARAM_INT);
            $query->bindParam(":ngayKham", $ngayKham);
            $query->bindParam(":khungGio", $khungGio);
            $query->execute();

            $result = $query->fetch(PDO::FETCH_ASSOC);

            // Xử lý chuỗi danhSachDonThuoc thành mảng JSON
            if ($result && isset($result['danhSachDonThuoc']) && !empty($result['danhSachDonThuoc'])) {
                $jsonString = '[' . $result['danhSachDonThuoc'] . ']';
                $decodedList = json_decode($jsonString, true);
                $result['danhSachDonThuoc'] = is_array($decodedList) ? $decodedList : [];
            } else {
                $result['danhSachDonThuoc'] = [];
            }

            return $result;
        }

        public function capNhatThongTinPhieuKhamBenh($maPhieuKham, $tienSu, $chuanDoan, $lyDoKham, $donThuoc, $maLichKham, $ngayKham, $khungGio, $emailBenhNhan, $tenBacSi) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if (!$pdo) {
                return [
                    "status" => false,
                    "message" => "Không thể kết nối cơ sở dữ liệu."
                ];
            }

            try {
                // Bắt đầu transaction
                $pdo->beginTransaction();

                // Cập nhật thông tin phiếu khám bệnh
                $query = $pdo->prepare("UPDATE phieukhambenh SET tienSu = :tienSu, chanDoan = :chuanDoan, lyDoKham = :lyDoKham WHERE maPhieu = :maPhieuKham");
                $query->bindParam(":maPhieuKham", $maPhieuKham, PDO::PARAM_INT);
                $query->bindParam(":tienSu", $tienSu);
                $query->bindParam(":chuanDoan", $chuanDoan);
                $query->bindParam(":lyDoKham", $lyDoKham);
                $isUpdated = $query->execute();

                if (!$isUpdated) {
                    throw new Exception("Cập nhật phiếu khám thất bại.");
                }

                if (empty($donThuoc)) {
                    // Nếu không có đơn thuốc thì xóa đơn thuốc cũ và chi tiết
                    $queryDeleteCT = $pdo->prepare("DELETE FROM chitiet_donthuoc WHERE maDonThuoc IN (SELECT maDonThuoc FROM donthuoc WHERE maPhieuKhamBenh = :maPhieuKham)");
                    $queryDeleteCT->bindParam(":maPhieuKham", $maPhieuKham, PDO::PARAM_INT);
                    $queryDeleteCT->execute();

                    $queryDeleteDT = $pdo->prepare("DELETE FROM donthuoc WHERE maPhieuKhamBenh = :maPhieuKham");
                    $queryDeleteDT->bindParam(":maPhieuKham", $maPhieuKham, PDO::PARAM_INT);
                    $queryDeleteDT->execute();
                } else {
                    // Nếu có đơn thuốc
                    // Kiểm tra xem đã có đơn thuốc chưa
                    $queryCheck = $pdo->prepare("SELECT maDonThuoc FROM donthuoc WHERE maPhieuKhamBenh = :maPhieuKham");
                    $queryCheck->bindParam(":maPhieuKham", $maPhieuKham, PDO::PARAM_INT);
                    $queryCheck->execute();
                    $maDonThuoc = $queryCheck->fetchColumn();

                    if (!$maDonThuoc) {
                        // Nếu chưa có thì tạo mới
                        $queryInsertDonThuoc = $pdo->prepare("INSERT INTO donthuoc (maPhieuKhamBenh, ngayTao) VALUES (:maPhieuKham, NOW())");
                        $queryInsertDonThuoc->bindParam(":maPhieuKham", $maPhieuKham, PDO::PARAM_INT);
                        $queryInsertDonThuoc->execute();
                        $maDonThuoc = $pdo->lastInsertId();
                    } else {
                        // Nếu có rồi thì xóa chi tiết đơn thuốc cũ để cập nhật lại
                        $queryDeleteChiTiet = $pdo->prepare("DELETE FROM chitiet_donthuoc WHERE maDonThuoc = :maDonThuoc");
                        $queryDeleteChiTiet->bindParam(":maDonThuoc", $maDonThuoc, PDO::PARAM_INT);
                        $queryDeleteChiTiet->execute();
                    }

                    // Thêm lại các chi tiết đơn thuốc
                    foreach ($donThuoc as $thuoc) {
                        $queryChiTiet = $pdo->prepare("INSERT INTO chitiet_donthuoc (maDonThuoc, tenThuoc, lieuDung, soLanDungTrongNgay, soNgay, ghiChu) 
                            VALUES (:maDonThuoc, :tenThuoc, :lieuDung, :soLanDung, :soNgay, :ghiChu)");
                        $queryChiTiet->bindParam(":maDonThuoc", $maDonThuoc, PDO::PARAM_INT);
                        $queryChiTiet->bindParam(":tenThuoc", $thuoc['tenThuoc']);
                        $queryChiTiet->bindParam(":lieuDung", $thuoc['lieuLuong']);
                        $queryChiTiet->bindParam(":soLanDung", $thuoc['soLanDungTrongNgay']);
                        $queryChiTiet->bindParam(":soNgay", $thuoc['soNgayDung'], PDO::PARAM_INT);
                        $queryChiTiet->bindParam(":ghiChu", $thuoc['ghiChu']);
                        $queryChiTiet->execute();
                    }
                }

                // Commit mọi thay đổi
                $pdo->commit();

                return [
                    "status" => true,
                    "message" => "Cập nhật phiếu khám bệnh thành công."
                ];
            } catch (Exception $e) {
                $pdo->rollBack();
                return [
                    "status" => false,
                    "message" => "Lỗi: " . $e->getMessage()
                ];
            }
        }

        public function layAllPhieuKhamBenh($maHoSo) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            
            if ($pdo) {
                try {
                    $query = $pdo->prepare("
                        SELECT 
                            pkb.*, 
                            bs.hoTen, 
                            hs.gioiTinh, 
                            hs.ngaySinh, 
                            hs.ngheNghiep, 
                            hs.CCCD, 
                            hs.diaChi, 
                            lk.giaKham, 
                            bn.soDienThoai,
                            GROUP_CONCAT(
                                CONCAT(
                                    '{',
                                    '\"maThuoc\":\"', IFNULL(ctdt.maThuoc, ''), '\",',
                                    '\"tenThuoc\":\"', IFNULL(ctdt.tenThuoc, ''), '\",',
                                    '\"lieuDung\":\"', IFNULL(ctdt.lieuDung, ''), '\",',
                                    '\"soLanDungTrongNgay\":\"', IFNULL(ctdt.soLanDungTrongNgay, ''), '\",',
                                    '\"soNgay\":\"', IFNULL(ctdt.soNgay, ''), '\",',
                                    '\"ghiChu\":\"', IFNULL(ctdt.ghiChu, ''), '\"',
                                    '}'
                                )
                                SEPARATOR ','
                            ) AS donThuoc
                        FROM phieukhambenh pkb
                        JOIN hosobenhnhan hs ON hs.maHoSo = pkb.maHoSo
                        JOIN bacsi bs ON bs.maBacSi = pkb.maBacSi
                        JOIN lichkham lk ON lk.maLich = pkb.maLichKham
                        JOIN benhnhan bn ON bn.maBenhNhan = hs.maBenhNhan
                        LEFT JOIN donthuoc dt ON dt.maPhieuKhamBenh = pkb.maPhieu
                        LEFT JOIN chitiet_donthuoc ctdt ON ctdt.maDonThuoc = dt.maDonThuoc
                        WHERE hs.maHoSo = :maHoSo
                        GROUP BY pkb.maPhieu
                    ");
                    
                    $query->bindParam(":maHoSo", $maHoSo, PDO::PARAM_INT);
                    $query->execute();
                    $results = $query->fetchAll(PDO::FETCH_ASSOC);

                    if (!$results) {
                        return ["error" => "Không có phiếu khám nào"];
                    }

                    // Chuyển chuỗi JSON đơn thuốc thành mảng
                    foreach ($results as &$row) {
                        if (!empty($row['donThuoc'])) {
                            $jsonString = '[' . $row['donThuoc'] . ']';
                            $decoded = json_decode($jsonString, true);
                            $row['donThuoc'] = is_array($decoded) ? $decoded : [];
                        } else {
                            $row['donThuoc'] = [];
                        }
                    }

                    return $results;
                } catch (PDOException $e) {
                    return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
                }
            } else {
                return ["error" => "Không thể kết nối database"];
            }
        }   
    }
?>
