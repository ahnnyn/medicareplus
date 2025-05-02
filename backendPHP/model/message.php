<?php
include("../config/database.php");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Nếu bạn sử dụng Composer
class mMessage {
    
    private $pdo;

    public function __construct() {
        $db = new connectdatabase();
        $this->pdo = $db->connect();
    }

    // Tạo cuộc trò chuyện mới
    public function taoTroChuyen() {
        if (!$this->pdo) {
            return ['success' => false, 'message' => 'Không thể kết nối database'];
        }
    
        // Lấy dữ liệu từ POST (đảm bảo dữ liệu đúng)
        $doctorInfo = json_decode(file_get_contents("php://input"), true)["doctorInfo"];
        $patientInfo = json_decode(file_get_contents("php://input"), true)["patientInfo"];
    
        // Kiểm tra thông tin bác sĩ và bệnh nhân
        if (!$doctorInfo['maBacSi'] || !$patientInfo['emailBenhNhan']) {
            return ['success' => false, 'message' => 'Thông tin bác sĩ hoặc bệnh nhân không hợp lệ'];
        }
    
        $start_time = date("Y-m-d H:i:s");
        $status = 'in_progress';
    
        try {
            // Thêm cuộc trò chuyện vào database
            $query = $this->pdo->prepare("INSERT INTO cuoctrochuyen (bacsi_id, benhnhan_id, start_time, status) 
                                          VALUES (:bacsi_id, :benhnhan_id, :start_time, :status)");
    
            // Liên kết tham số
            $query->bindParam(':bacsi_id', $doctorInfo['maBacSi']);
            $query->bindParam(':benhnhan_id', $patientInfo['hoTenBenhNhan']); // Có thể cần sửa để lấy ID bệnh nhân
            $query->bindParam(':start_time', $start_time);
            $query->bindParam(':status', $status);
    
            if ($query->execute()) {
                $cuoctrochuyen_id = $this->pdo->lastInsertId();
    
                // Gửi email cho bệnh nhân
                $this->guiEmailThongBao($patientInfo['emailBenhNhan'], $cuoctrochuyen_id, $start_time);
    
                return [
                    'success' => true,
                    'cuoctrochuyen_id' => $cuoctrochuyen_id,
                    'start_time' => $start_time,
                    'status' => $status
                ];
            } else {
                return ['success' => false, 'message' => 'Tạo cuộc trò chuyện thất bại'];
            }
        } catch (PDOException $e) {
            return ['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()];
        }
    }
    
    
    // Hàm gửi email
    private function guiEmailThongBao($benhnhan_id, $cuoctrochuyen_id, $start_time) {
        $query = $this->pdo->prepare("SELECT email FROM benhnhan WHERE id = :benhnhan_id");
        $query->bindParam(':benhnhan_id', $benhnhan_id);
        $query->execute();
        $benhnhan = $query->fetch(PDO::FETCH_ASSOC);
    
        if (!$benhnhan) {
            return false;
        }
    
        $mail = new PHPMailer(true);
    
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.example.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'your-email@example.com';
            $mail->Password = 'your-email-password';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
    
            $mail->setFrom('your-email@example.com', 'Hệ thống Tư vấn');
            $mail->addAddress($benhnhan['email']);
            $mail->isHTML(true);
            $mail->Subject = 'Thông báo tạo phòng trò chuyện';
            $mail->Body = 'Chào bạn, <br>Cuộc trò chuyện với bác sĩ đã được tạo thành công. <br>ID: ' . $cuoctrochuyen_id . '<br>Thời gian bắt đầu: ' . $start_time . '<br>Chúc bạn sức khỏe!';
    
            $mail->send();
            return true;
        } catch (Exception $e) {
            // Không echo lỗi, chỉ return false
            return false;
        }
    }
    

    // Lấy thông tin cuộc trò chuyện
    public function layTroChuyen($cuoctrochuyen_id) {
        if (!$this->pdo) {
            return ["error" => "Không thể kết nối database"];
        }

        try {
            $query = $this->pdo->prepare("SELECT * FROM cuoctrochuyen WHERE id = :id");
            $query->bindParam(":id", $cuoctrochuyen_id);
            $query->execute();
            return $query->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
        }
    }

    // Lưu tin nhắn
    public function luuTinNhan() {
        if (!$this->pdo) {
            return ["error" => "Không thể kết nối database"];
        }

        try {
            $cuoctrochuyen_id = $_POST['cuoctrochuyen_id'];
            $nguoigui = $_POST['nguoigui'];
            $noidung = $_POST['noidung'];
            $loaitinnhan = $_POST['loaitinnhan']; // dạng text, image, file, video
            $thoigian = date("Y-m-d H:i:s");

            $query = $this->pdo->prepare("INSERT INTO tinnhan (cuoctrochuyen_id, nguoigui, noidung, loaitinnhan, thoigian) 
                VALUES (:cuoctrochuyen_id, :nguoigui, :noidung, :loaitinnhan, :thoigian)");
            $query->bindParam(":cuoctrochuyen_id", $cuoctrochuyen_id);
            $query->bindParam(":nguoigui", $nguoigui);
            $query->bindParam(":noidung", $noidung);
            $query->bindParam(":loaitinnhan", $loaitinnhan);
            $query->bindParam(":thoigian", $thoigian);

            if ($query->execute()) {
                return ["success" => "Tin nhắn đã được lưu thành công"];
            } else {
                return ["error" => "Lỗi khi lưu tin nhắn"];
            }
        } catch (PDOException $e) {
            return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
        }
    }

    // Kết thúc cuộc trò chuyện
    public function ketThucTroChuyen() {
        if (!$this->pdo) {
            echo json_encode(['success' => false, 'message' => 'Không thể kết nối database']);
            return;
        }

        $cuoctrochuyen_id = $_POST['cuoctrochuyen_id'];
        $end_time = date("Y-m-d H:i:s");
        $status = 'completed';

        try {
            $query = $this->pdo->prepare("UPDATE cuoctrochuyen SET end_time = :end_time, status = :status WHERE id = :id");
            $query->bindParam(":end_time", $end_time);
            $query->bindParam(":status", $status);
            $query->bindParam(":id", $cuoctrochuyen_id);

            if ($query->execute()) {
                echo ['success' => true];
            } else {
                echo ['success' => false];
            }
        } catch (PDOException $e) {
            echo ['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()];
        }
    }
}
?>
