<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

function guiEmailThongBao($email, $hoTen, $username, $matKhau) {
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'tuyenduyen24112002@gmail.com';   // Gmail thật của bạn
        $mail->Password = 'mulceystderrhzgj';  
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('tuyenduyen24112002@gmail.com', 'Hệ thống chăm sóc sức khỏe Medicareplus');
        $mail->addAddress($email, $hoTen);

        $mail->isHTML(true);
        $mail->Subject = 'Thông tin tài khoản bác sĩ tại Hệ thống chăm sóc sức khỏe Medicareplus';
        $mail->Body = "
            <p>Chào <strong>$hoTen</strong>,</p>
            <p>Bạn đã được tạo tài khoản bác sĩ tại Hệ thống chăm sóc sức khỏe toàn diện cho bạn và gia đình.</p>
            <p><strong>Username:</strong> $username</p>
            <p><strong>Password:</strong> $matKhau</p>
            <p>Vui lòng đăng nhập và đổi mật khẩu ngay sau lần đăng nhập đầu tiên.</p>
            <p>Trân trọng,<br>Hệ thống chăm sóc sức khỏe Medicareplus</p>
        ";

        $mail->send();
        return true;
    } catch (Exception $e) {
        return "Lỗi gửi email: {$mail->ErrorInfo}";
    }
}
