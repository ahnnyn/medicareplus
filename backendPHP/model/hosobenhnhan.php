<?php
require_once("../config/database.php");

class mHoSoBenhNhan {
    public function layHoSoBenhNhan($id) {
        if (!is_numeric($id) || $id <= 0) {
            return ["success" => false, "message" => "Mã bệnh nhân không hợp lệ"];
        }

        $p = new connectdatabase();
        $pdo = $p->connect();
        if (!$pdo) {
            return ["success" => false, "message" => "Không thể kết nối database"];
        }

        try {
            $query = $pdo->prepare("
                SELECT * FROM hosobenhnhan hs 
                JOIN benhnhan bn ON bn.maBenhNhan = hs.maBenhNhan 
                WHERE hs.maBenhNhan = :id
            ");
            $query->bindParam(":id", $id, PDO::PARAM_INT);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_ASSOC);

            return ["success" => true, "data" => $result];
        } catch (PDOException $e) {
            return ["success" => false, "message" => "Lỗi truy vấn: " . $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function taoHoSoBenhNhan($maBenhNhan, $hoTenBenhNhan, $ngaySinh, $gioiTinh, $ngheNghiep, $CCCD, $diaChi) {
        $p = new connectdatabase();
        $pdo = $p->connect();
        if (!$pdo) {
            return ["success" => false, "message" => "Không thể kết nối database"];
        }

        try {
            $query = $pdo->prepare("
                INSERT INTO hosobenhnhan (maBenhNhan, hoTenBenhNhan, ngaySinh, gioiTinh, ngheNghiep, CCCD, diaChi)
                VALUES (:maBenhNhan, :hoTenBenhNhan, :ngaySinh, :gioiTinh, :ngheNghiep, :CCCD, :diaChi)
            ");
            $query->bindParam(":maBenhNhan", $maBenhNhan, PDO::PARAM_INT);
            $query->bindParam(":hoTenBenhNhan", $hoTenBenhNhan);
            $query->bindParam(":ngaySinh", $ngaySinh);
            $query->bindParam(":gioiTinh", $gioiTinh, PDO::PARAM_INT); // 0 hoặc 1
            $query->bindParam(":ngheNghiep", $ngheNghiep);
            $query->bindParam(":CCCD", $CCCD);
            $query->bindParam(":diaChi", $diaChi);

            $success = $query->execute();
            if ($success) {
                return ["success" => true, "message" => "Tạo hồ sơ bệnh nhân thành công"];
            } else {
                return ["success" => false, "message" => "Tạo hồ sơ bệnh nhân thất bại"];
            }
        } catch (PDOException $e) {
            return ["success" => false, "message" => "Lỗi truy vấn: " . $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }
    public function capNhatHoSoBenhNhan($maBenhNhan, $hoTenBenhNhan, $ngaySinh, $gioiTinh, $ngheNghiep, $CCCD, $diaChi) {
        $p = new connectdatabase();
        $pdo = $p->connect();
        if (!$pdo) {
            return ["success" => false, "message" => "Không thể kết nối database"];
        }
        try {
            $queryStr = "
                UPDATE hosobenhnhan 
                SET hoTenBenhNhan = :hoTenBenhNhan, ngaySinh = :ngaySinh, gioiTinh = :gioiTinh, ngheNghiep = :ngheNghiep, CCCD = :CCCD, diaChi = :diaChi
            ";
            $queryStr .= " WHERE maBenhNhan = :maBenhNhan";

            $query = $pdo->prepare($queryStr);

            $query->bindParam(":hoTenBenhNhan", $hoTenBenhNhan);
            $query->bindParam(":ngaySinh", $ngaySinh);
            $query->bindParam(":gioiTinh", $gioiTinh, PDO::PARAM_INT);
            $query->bindParam(":ngheNghiep", $ngheNghiep);
            $query->bindParam(":CCCD", $CCCD);
            $query->bindParam(":diaChi", $diaChi);
            $query->bindParam(":maBenhNhan", $maBenhNhan, PDO::PARAM_INT);

            $success = $query->execute();
            if ($success) {
                return ["success" => true, "message" => "Cập nhật hồ sơ bệnh nhân thành công"];
            } else {
                return ["success" => false, "message" => "Cập nhật hồ sơ bệnh nhân thất bại"];
            }
        } catch (PDOException $e) {
            return ["success" => false, "message" => "Lỗi truy vấn: " . $e->getMessage()];
        }
    }

    public function xoaHoSoBenhNhan($maBenhNhan) {
        $p = new connectdatabase();
        $pdo = $p->connect();
        if (!$pdo) {
            return ["success" => false, "message" => "Không thể kết nối database"];
        }
        try {
            $query = $pdo->prepare("
                DELETE FROM hosobenhnhan WHERE maBenhNhan = :maBenhNhan
            ");
            $query->bindParam(":maBenhNhan", $maBenhNhan, PDO::PARAM_INT);
            $query->execute();

            return ["success" => true, "message" => "Xóa hồ sơ bệnh nhân thành công"];
        } catch (PDOException $e) {
            return ["success" => false, "message" => "Lỗi truy vấn: " . $e->getMessage()];
        }
    }
}
?>
