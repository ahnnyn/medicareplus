<?php
require_once("../config/database.php");
require_once("../vendor/autoload.php"); // Thêm dòng này

use Firebase\JWT\JWT;

class mUser {
    private $secret_key = "your_secret_key"; // Thay bằng key bảo mật của bạn

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
                
                if ($user) {
                    // Xóa mật khẩu trước khi trả về để bảo mật
                    unset($user['matKhau']);

                    // Tạo payload cho JWT
                    $payload = [
                        "iat" => time(),
                        "exp" => time() + 3600, // Token hết hạn sau 1 giờ
                        "data" => [
                            "maTaiKhoan" => $user['maTaiKhoan'],
                            "username" => $user['username']
                        ]
                    ];

                    // Tạo token JWT
                    $jwt = JWT::encode($payload, $this->secret_key, 'HS256');

                    return [
                        "success" => true,
                        "message" => "Đăng nhập thành công",
                        "user" => $user, // Trả về object thay vì JSON string
                        "token" => $jwt
                    ];
                }
                return ["success" => false, "message" => "Sai tài khoản hoặc mật khẩu"];
            } catch (PDOException $e) {
                return ["success" => false, "message" => "Lỗi hệ thống", "error" => $e->getMessage()];
            }
        }
        return ["success" => false, "message" => "Lỗi kết nối CSDL"];
    }
}
?>
