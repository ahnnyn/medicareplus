<?php
require_once("../config/database.php");

class mVaiTro {

    public function layDanhSachVaiTro() {
        $p = new connectdatabase();
        $pdo = $p->connect();
        if ($pdo) {
            try {
                $query = $pdo->query("SELECT * FROM vaitro ORDER BY maVaiTro DESC;");
                $data = $query->fetchAll(PDO::FETCH_ASSOC);
                return $data;
            } catch (PDOException $e) {
                return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
            }
        }
        return ["error" => "Không thể kết nối database"];
    }

public function themVaiTro($tenVaiTro) {
    $p = new connectdatabase();
    $pdo = $p->connect();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO vaitro (tenVaiTro, trangThai) VALUES (:tenVaiTro, 'Đang hoạt động')");
            $stmt->bindParam(':tenVaiTro', $tenVaiTro);
            $success = $stmt->execute();
            if ($success) {
                return ["success" => true];
            } else {
                return ["error" => "Thêm vai trò thất bại"];
            }
        } catch (PDOException $e) {
            return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
        }
    }
    return ["error" => "Không thể kết nối database"];
}


    public function suaVaiTro($maVaiTro, $tenVaiTro) {
        $p = new connectdatabase();
        $pdo = $p->connect();
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE vaitro SET tenVaiTro = :tenVaiTro WHERE maVaiTro = :maVaiTro");
                $stmt->bindParam(':tenVaiTro', $tenVaiTro);
                $stmt->bindParam(':maVaiTro', $maVaiTro, PDO::PARAM_INT);
                $stmt->execute();
                return ["success" => "Cập nhật thành công"];
            } catch (PDOException $e) {
                return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
            }
        }
        return ["error" => "Không thể kết nối database"];
    }

public function xoaVaiTro($maVaiTro) {
    $p = new connectdatabase();
    $pdo = $p->connect();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("UPDATE vaitro SET trangThai = 'Ẩn' WHERE maVaiTro = :maVaiTro");
            $stmt->bindParam(':maVaiTro', $maVaiTro, PDO::PARAM_INT);
            $stmt->execute(); 
            return ["success" => true, "message" => "Xóa vai trò thành công"];
        } catch (PDOException $e) {
            return ["success" => false, "message" => "Lỗi truy vấn: " . $e->getMessage()];
        }
    }
    return ["success" => false, "message" => "Không thể kết nối database"];
}


}
?>
