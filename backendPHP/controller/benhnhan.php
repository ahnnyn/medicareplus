<?php
    include("../model/benhnhan.php");
    require '../vendor/autoload.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    class cBenhNhan {
        public function layThongTinCaNhanBenhNhan($maBenhNhan) {
            if (!$maBenhNhan) {
                echo json_encode(["error" => "Thiếu mã bệnh nhân"]);
                return;
            }
        
            $model = new mBenhNhan();
            $result = $model->layThongTinCaNhanBenhNhan($maBenhNhan);
        
            if (!$result) {
                echo json_encode(["error" => "Không tìm thấy thông tin bệnh nhân"]);
                return;
            }
        
            // Trả về dữ liệu dưới dạng JSON
            header("Content-Type: application/json");
            echo json_encode($result);
        }
        public function quenMatKhau($email) {
            $model = new mBenhNhan();
            $thongTin = $model->layThongTinBenhNhanQuaEmail($email);
    
            if (!$thongTin) {
                echo json_encode(["success" => false, "message" => "Không tìm thấy tài khoản với email này"]);
                return;
            }
    
            $matKhauMoi = substr(str_shuffle("abcdefghijklmnopqrstuvwxyz0123456789"), 0, 6);
            $matKhauHash = password_hash($matKhauMoi, PASSWORD_BCRYPT);
    
            $model->capNhatMatKhau($thongTin['maBenhNhan'], $matKhauHash);
    
            // Gửi email
            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'your_email@gmail.com'; // lấy từ .env nếu muốn
                $mail->Password   = 'your_password';
                $mail->SMTPSecure = 'tls';
                $mail->Port       = 587;
    
                $mail->setFrom('your_email@gmail.com', 'Admin');
                $mail->addAddress($email);
                $mail->isHTML(true);
                $mail->Subject = 'Lấy lại mật khẩu';
                $mail->Body    = "<p>Mật khẩu mới của bạn là: <strong style='color: green;'>$matKhauMoi</strong></p>";
    
                $mail->send();
                echo json_encode(["success" => true, "message" => "Mật khẩu mới đã được gửi đến email của bạn"]);
            } catch (Exception $e) {
                echo json_encode(["success" => false, "message" => "Không gửi được email: {$mail->ErrorInfo}"]);
            }
        }
        public function updateThongTinBenhNhan($maBenhNhan, $hoTen, $gioiTinh, $soDienThoai, $email, $diaChi, $hinhAnh){
            $p = new mBenhNhan();
            $result = $p->capNhatThongTinBenhNhan($maBenhNhan, $hoTen, $gioiTinh, $soDienThoai, $email, $diaChi, $hinhAnh);
            
            if (isset($result['success'])) {
                echo json_encode(["status" => true, "message" => $result['success']]);
            } else {
                echo json_encode(["status" => false, "error" => $result['error']]);
            }
        }
    }
?>