<?php
require_once("../config/database.php");

class mUser {
    public function login($username, $matKhau) {
        $db = new connectdatabase();
        $pdo = $db->connect();

        if ($pdo) {
            try {
                // Sử dụng Prepared Statement để tránh SQL Injection
                $stmt = $pdo->prepare("SELECT * FROM taikhoan WHERE username = :username AND matKhau = :matKhau");
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':matKhau', $matKhau);
                $stmt->execute();
                
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                return $user ?: null;
            } catch (PDOException $e) {
                return null;
            }
        }
        return null;
    }
}
?>
