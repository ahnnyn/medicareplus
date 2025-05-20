<?php
require_once("../config/database.php");
require_once("../vendor/autoload.php"); // Thêm dòng này

use Firebase\JWT\JWT;

class mUser {
    private $secret_key = "your_secret_key"; // Thay bằng key bảo mật của bạn

    public function layThongTinNguoiDung($username, $matKhau) {
        $db = new connectdatabase();
        $pdo = $db->connect();
    
        if ($pdo) {
            try {
                // Use Prepared Statement to prevent SQL Injection
                // $stmt = $pdo->prepare("SELECT tk.*, bs.* FROM taikhoan tk JOIN bacsi bs ON tk.maTaiKhoan = bs.maTaiKhoan WHERE tk.username = :username and tk.maVaiTro = 2");
                // $stmt->bindParam(':username', $username);
                // $stmt->execute();
                
                // $user = $stmt->fetch(PDO::FETCH_ASSOC);
                
                // if ($user && password_verify($matKhau, $user['matKhau'])) {
                //     // Remove the password from the user data before returning
                //     unset($user['matKhau']);
    
                //     // Create payload for JWT
                //     $payload = [
                //         "iat" => time(),
                //         "exp" => time() + 3600, // Token expires after 1 hour
                //         "data" => [
                //             "maTaiKhoan" => $user['maTaiKhoan'],
                //             "username" => $user['username'],
                //         ]
                //     ];
    
                //     // Generate JWT token
                //     $jwt = JWT::encode($payload, $this->secret_key, 'HS256');
    
                //     return [
                //         "success" => true,
                //         "message" => "Đăng nhập thành công",
                //         "user" => $user,
                //         "token" => $jwt
                //     ];
                // } else {
                //     return ["success" => false, "message" => "Sai tài khoản hoặc mật khẩu"];
                // }
            $stmt = $pdo->prepare("SELECT * FROM taikhoan WHERE username = :username");
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user || !password_verify($matKhau, $user['matKhau'])) {
                return ["success" => false, "message" => "Sai tài khoản hoặc mật khẩu"];
            }

            unset($user['matKhau']);

            // Lấy thông tin chi tiết theo vai trò
            if ($user['maVaiTro'] == 2) {
                // Bác sĩ
                $stmt = $pdo->prepare("SELECT * FROM bacsi WHERE maTaiKhoan = :maTaiKhoan");
                $stmt->bindParam(':maTaiKhoan', $user['maTaiKhoan']);
                $stmt->execute();
                $detail = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($detail) {
                    $user = array_merge($user, $detail);
                }
            } elseif ($user['maVaiTro'] == 1) {
                // Quản trị viên
                $stmt = $pdo->prepare("SELECT * FROM taikhoan WHERE maTaiKhoan = :maTaiKhoan");
                $stmt->bindParam(':maTaiKhoan', $user['maTaiKhoan']);
                $stmt->execute();
                $admin = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($admin) {
                    $user = array_merge($user, $admin);
                }
            }

            $payload = [
                "iat" => time(),
                "exp" => time() + 3600,
                "data" => [
                    "maTaiKhoan" => $user['maTaiKhoan'],
                    "username" => $user['username'],
                    "maVaiTro" => $user['maVaiTro']
                ]
            ];

            $jwt = JWT::encode($payload, $this->secret_key, 'HS256');

            return [
                "success" => true,
                "message" => "Đăng nhập thành công",
                "user" => $user,
                "token" => $jwt
            ];
            } catch (PDOException $e) {
                return ["success" => false, "message" => "Lỗi hệ thống", "error" => $e->getMessage()];
            }
        } else {
            return ["success" => false, "message" => "Lỗi kết nối CSDL"];
        }
    }
    

    public function capNhatMatKhauBacSi($maTaiKhoan, $maBacSi, $username, $matKhauCu, $matKhauMoi) {
        $db = new connectdatabase();
        $pdo = $db->connect();
    
        if (!$pdo) {
            return ["success" => false, "message" => "Lỗi kết nối CSDL"];
        }
    
        try {
            // Lấy mật khẩu từ DB
            $stmt = $pdo->prepare("SELECT matKhau FROM taikhoan WHERE maTaiKhoan = :maTaiKhoan");
            $stmt->bindParam(':maTaiKhoan', $maTaiKhoan, PDO::PARAM_INT);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if (!$user) {
                return ["success" => false, "message" => "Không tìm thấy tài khoản"];
            }
    
            // Kiểm tra mật khẩu cũ
            if (!password_verify($matKhauCu, $user['matKhau'])) {
                return ["success" => false, "message" => "Sai mật khẩu cũ"];
            }
    
            // Hash mật khẩu mới
            $hashMatKhauMoi = password_hash($matKhauMoi, PASSWORD_BCRYPT, ["cost" => 12]);
    
            // Cập nhật mật khẩu mới
            $stmt = $pdo->prepare("UPDATE taikhoan SET username = :username, matKhau = :matKhauMoi WHERE maTaiKhoan = :maTaiKhoan");
            $stmt->bindParam(':maTaiKhoan', $maTaiKhoan, PDO::PARAM_INT);
            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
            $stmt->bindParam(':matKhauMoi', $hashMatKhauMoi, PDO::PARAM_STR);
            $stmt->execute();
    
            if ($stmt->rowCount() > 0) {
                return ["success" => true, "message" => "Cập nhật mật khẩu thành công"];
            } else {
                return ["success" => false, "message" => "Không có thay đổi hoặc lỗi xảy ra"];
            }
        } catch (PDOException $e) {
            error_log("Lỗi cập nhật mật khẩu: " . $e->getMessage());
            return ["success" => false, "message" => "Đã xảy ra lỗi, vui lòng thử lại"];
        }
    }
}
?>
