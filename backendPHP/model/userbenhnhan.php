<?php
require_once("../config/database.php");
require_once("../vendor/autoload.php"); // Thêm dòng này

use Firebase\JWT\JWT;

class mUser {
    private $secret_key = "your_secret_key"; // Thay bằng key bảo mật của bạn

    public function layThongTinBenhNhan($username, $matKhau) {
        $db = new connectdatabase();
        $pdo = $db->connect();

        if ($pdo) {
            try {
                // Sử dụng Prepared Statement để tránh SQL Injection
                $stmt = $pdo->prepare("SELECT tk.*, bn.* FROM taikhoan tk JOIN benhnhan bn ON tk.maTaiKhoan = bn.maTaiKhoan WHERE tk.username = :username");
                $stmt->bindParam(':username', $username);
                $stmt->execute();
                
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($user && password_verify($matKhau, $user['matKhau'])) {
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
    public function luuThongTinBenhNhan($email, $hoTen, $soDienThoai, $username, $matKhau) {
        $db = new connectdatabase();
        $pdo = $db->connect();
    
        if ($pdo) {
            try {
                // Kiểm tra email đã tồn tại chưa
                $stmtCheck = $pdo->prepare("SELECT COUNT(*) FROM benhnhan WHERE email = :email");
                $stmtCheck->execute([':email' => $email]);
                if ($stmtCheck->fetchColumn() > 0) {
                    return ["success" => false, "message" => "Tài khoản đã tồn tại! Vui lòng chọn email khác!"];
                }
    
                $pdo->beginTransaction();
    
                // Mã hóa mật khẩu trước khi lưu
                $hashedPassword = password_hash($matKhau, PASSWORD_BCRYPT);
    
                // Thêm vào bảng `taikhoan`
                $stmt1 = $pdo->prepare("INSERT INTO taikhoan (username, matKhau, maVaiTro) VALUES (:username, :matKhau, 3)");
                $stmt1->execute([':username' => $username, ':matKhau' => $hashedPassword]);
                $maTaiKhoan = $pdo->lastInsertId();
    
                if (!$maTaiKhoan) {
                    throw new Exception("Lỗi khi tạo tài khoản");
                }
    
                // Thêm vào bảng `benhnhan`
                $stmt2 = $pdo->prepare("INSERT INTO benhnhan (email, hoTen, soDienThoai, maTaiKhoan) 
                                        VALUES (:email, :hoTen, :soDienThoai, :maTaiKhoan)");
                $stmt2->execute([
                    ':email' => $email,
                    ':hoTen' => $hoTen,
                    ':soDienThoai' => $soDienThoai,
                    ':maTaiKhoan' => $maTaiKhoan
                ]);
    
                if ($stmt2->rowCount() === 0) {
                    throw new Exception("Lỗi khi tạo bệnh nhân");
                }
    
                $pdo->commit();
                return ["success" => true, "message" => "Đăng ký tài khoản thành công"];
    
            } catch (Exception $e) {
                if ($pdo->inTransaction()) {
                    $pdo->rollBack();
                }
                return ["success" => false, "message" => "Lỗi hệ thống", "error" => $e->getMessage()];
            }
        }
        return ["success" => false, "message" => "Lỗi kết nối CSDL"];
    }
    public function capNhatMatKhauBenhNhan($maTaiKhoan, $maBenhNhan, $username, $matKhauCu, $matKhauMoi) {
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
