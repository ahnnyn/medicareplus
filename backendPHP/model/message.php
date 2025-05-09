<?php
include("../config/database.php");

class mMessage {
    
    private $pdo;

    public function __construct() {
        $db = new connectdatabase();
        $this->pdo = $db->connect();
    }
    public function luuTinNhan() {
        if (!$this->pdo) return ["error" => "Không thể kết nối database"];
    
        try {
            // Nhận dữ liệu JSON từ body request
            $data = json_decode(file_get_contents("php://input"), true);
    
            // Lấy các giá trị từ JSON
            $lichhen_id = $data['lichhen_id'] ?? null;
            $nguoigui_id = $data['nguoigui_id'] ?? null;
            $role = $data['role'] ?? null;
            $noidung = $data['noidung'] ?? '';
            $loaitinnhan = $data['loaitinnhan'] ?? 'text';
            $file_url = $data['file_url'] ?? null;
            $thoigian = $data['thoigian'] ?? date("Y-m-d H:i:s");
    
            // Kiểm tra đầu vào
            if (empty($lichhen_id) || empty($nguoigui_id) || empty($role)) {
                return ["error" => "Thiếu thông tin bắt buộc (appointmentId, senderId, role)"];
            }
    
            $validRoles = ['bacsi', 'benhnhan'];
            $validTypes = ['text', 'file', 'image', 'video'];
    
            if (!in_array($role, $validRoles) || !in_array($loaitinnhan, $validTypes)) {
                return ["error" => "Giá trị 'role' hoặc 'loaitinnhan' không hợp lệ"];
            }
    
            $query = $this->pdo->prepare("
                INSERT INTO tinnhan (lichhen_id, nguoigui_id, role, noidung, loaitinnhan, file_url, thoigian)
                VALUES (:lichhen_id, :nguoigui_id, :role, :noidung, :loaitinnhan, :file_url, :thoigian)
            ");
    
            $query->bindParam(":lichhen_id", $lichhen_id, PDO::PARAM_INT);
            $query->bindParam(":nguoigui_id", $nguoigui_id, PDO::PARAM_INT);
            $query->bindParam(":role", $role, PDO::PARAM_STR);
            $query->bindParam(":noidung", $noidung, PDO::PARAM_STR);
            $query->bindParam(":loaitinnhan", $loaitinnhan, PDO::PARAM_STR);
            $query->bindParam(":file_url", $file_url, PDO::PARAM_STR);
            $query->bindParam(":thoigian", $thoigian, PDO::PARAM_STR);
    
            $query->execute();
            return ["success" => true];
    
        } catch (PDOException $e) {
            error_log("Lỗi khi lưu tin nhắn: " . $e->getMessage());
            return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
        }
    }
    
    
      

public function layTinNhan($lichhen_id) {
    if (!$this->pdo) return ["error" => "Không thể kết nối database"];

    try {
        $query = $this->pdo->prepare("SELECT * FROM tinnhan WHERE lichhen_id = :lichhen_id ORDER BY thoigian ASC");
        $query->bindParam(":lichhen_id", $lichhen_id);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return ["error" => "Lỗi truy vấn: " . $e->getMessage()];
    }
}

    


}
?>
