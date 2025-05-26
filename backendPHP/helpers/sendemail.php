<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';


class EmailService {
    function guiEmailThongBao($email, $hoTen, $username, $matKhau) {
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
            $mail->Username = 'medicareplus.vn@gmail.com';
            $mail->Password = 'cmlu wkcy vgob pmce'; 
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('medicareplus.vn@gmail.com', 'Hệ thống chăm sóc sức khỏe Medicareplus');
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
    public function sendEmailLichKham($email, $hoTen, $ngayKham, $gioKham, $hinhThucKham) {
        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'medicareplus.vn@gmail.com';
            $mail->Password = 'cmlu wkcy vgob pmce';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('medicareplus.vn@gmail.com', 'Hệ thống chăm sóc sức khỏe Medicareplus');
            $mail->addAddress($email, $hoTen);

            $mail->isHTML(true);
            $mail->Subject = 'Xác nhận đặt lịch khám thành công';
            $mail->Body = "
                <p>Chào <strong>$hoTen</strong>,</p>
                <p>Bạn đã đặt lịch khám thành công tại hệ thống chăm sóc sức khỏe Medicareplus.</p>
                <p><strong>Ngày khám:</strong> $ngayKham</p>
                <p><strong>Ca khám:</strong> $gioKham</p>
                <p><strong>Hình thức khám:</strong> $hinhThucKham</p>
                <p>Vui lòng đến đúng giờ hoặc truy cập phòng khám trực tuyến nếu có.</p>
                <p>Trân trọng,<br>Medicareplus</p>
            ";

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Lỗi gửi email lịch khám: " . $mail->ErrorInfo);
            return false;
        }
    }

    public function sendEmailPhieuKhamBenh($email, $hoTen, $ngayKham, $gioKham, $hinhThucKham) {
        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'medicareplus.vn@gmail.com';
            $mail->Password = 'cmlu wkcy vgob pmce';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('medicareplus.vn@gmail.com', 'Hệ thống chăm sóc sức khỏe Medicareplus');
            $mail->addAddress($email, $hoTen);

            $mail->isHTML(true);
            $mail->Subject = 'Xác nhận đặt lịch khám thành công';
            $mail->Body = "
                <p>Chào <strong>$hoTen</strong>,</p>
                <p>Bạn đã đặt lịch khám thành công tại hệ thống chăm sóc sức khỏe Medicareplus.</p>
                <p><strong>Ngày khám:</strong> $ngayKham</p>
                <p><strong>Ca khám:</strong> $gioKham</p>
                <p><strong>Hình thức khám:</strong> $hinhThucKham</p>
                <p>Vui lòng đến đúng giờ hoặc truy cập phòng khám trực tuyến nếu có.</p>
                <p>Trân trọng,<br>Medicareplus</p>
            ";

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Lỗi gửi email lịch khám: " . $mail->ErrorInfo);
            return false;
        }
    }

    public function sendEmailPhieuKhamBenhChiTiet($email, $hoTenBN, $tenBacSi, $ngayKham, $gioKham, $lyDoKham, $tienSu, $chuanDoan, $danhSachDonThuoc = [])
    {
        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'medicareplus.vn@gmail.com';
            $mail->Password = 'cmlu wkcy vgob pmce';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('medicareplus.vn@gmail.com', 'Hệ thống chăm sóc sức khỏe Medicareplus');
            $mail->addAddress($email, $hoTenBN);

            $mail->isHTML(true);
            $mail->Subject = 'Chi tiết phiếu khám bệnh từ Medicareplus';

            $thuocHTML = '';
            if (!empty($danhSachDonThuoc) && is_array($danhSachDonThuoc)) {
                $thuocHTML .= "
                    <table style='width:100%; border-collapse: collapse; margin-top: 10px;'>
                        <thead>
                            <tr style='background-color:#e0f7fa; color:#00695c;'>
                                <th style='padding:10px; border:1px solid #ccc;'>Tên thuốc</th>
                                <th style='padding:10px; border:1px solid #ccc;'>Liều dùng</th>
                                <th style='padding:10px; border:1px solid #ccc;'>Số lần/ngày</th>
                                <th style='padding:10px; border:1px solid #ccc;'>Số ngày</th>
                                <th style='padding:10px; border:1px solid #ccc;'>Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>";
                foreach ($danhSachDonThuoc as $thuoc) {
                    $thuocHTML .= "
                        <tr>
                            <td style='padding:8px; border:1px solid #ccc;'>{$thuoc['tenThuoc']}</td>
                            <td style='padding:8px; border:1px solid #ccc;'>{$thuoc['lieuLuong']}</td>
                            <td style='padding:8px; border:1px solid #ccc;'>{$thuoc['soLanDungTrongNgay']}</td>
                            <td style='padding:8px; border:1px solid #ccc;'>{$thuoc['soNgayDung']}</td>
                            <td style='padding:8px; border:1px solid #ccc;'>{$thuoc['ghiChu']}</td>
                        </tr>";
                }
                $thuocHTML .= "</tbody></table>";
            } else {
                $thuocHTML = "<p><em>Không có đơn thuốc được kê.</em></p>";
            }

            $mail->Body = "
            <div style='font-family: Roboto, Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;'>
                <div style='background-color: #009688; color: white; padding: 20px; text-align: center;'>
                    <h2 style='margin: 0;'>PHIẾU KHÁM BỆNH</h2>
                    <p style='margin: 0;'>Medicareplus - Hệ thống chăm sóc sức khỏe</p>
                </div>
                <div style='padding: 20px; background-color: #fafafa;'>
                    <p>Xin chào <strong>$hoTenBN</strong>,</p>
                    <p>Dưới đây là thông tin chi tiết phiếu khám bệnh của bạn:</p>
                    <ul style='list-style: none; padding-left: 0;'>
                        <li><strong>👨‍⚕️ Bác sĩ:</strong> $tenBacSi</li>
                        <li><strong>📅 Ngày khám:</strong> $ngayKham</li>
                        <li><strong>🕒 Khung giờ:</strong> $gioKham</li>
                    </ul>

                    <p><strong>📝 Lý do khám:</strong> $lyDoKham</p>
                    <p><strong>📚 Tiền sử bệnh:</strong> $tienSu</p>
                    <p><strong>🩺 Chẩn đoán:</strong> $chuanDoan</p>

                    <h3 style='color: #009688;'>💊 ĐƠN THUỐC</h3>
                    $thuocHTML

                    <p style='margin-top: 30px;'>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc tổng đài hỗ trợ.</p>

                    <p style='margin-top: 20px;'>Trân trọng,<br><strong>Medicareplus</strong></p>
                </div>
                <div style='background-color: #eeeeee; text-align: center; padding: 10px; font-size: 12px; color: #555;'>
                    © " . date('Y') . " Medicareplus. Mọi quyền được bảo lưu.
                </div>
            </div>";

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Lỗi gửi email phiếu khám: " . $mail->ErrorInfo);
            return false;
        }
    }


}