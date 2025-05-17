<?php
require_once("../model/user.php");

class cUser {
    private $userModel;

    public function __construct() {
        $this->userModel = new mUser();
    }

    public function getThongTinNguoiDung($username, $matKhau) {
        return $this->userModel->layThongTinNguoiDung($username, $matKhau);
    }
    public function logout() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start(); // Đảm bảo session đã khởi tạo trước khi hủy
        }
    
        if (!empty($_SESSION)) {
            session_destroy(); // Hủy session
            $_SESSION = []; // Xóa toàn bộ biến session
        }
    
        return ['success' => true, 'message' => 'Đăng xuất thành công'];
    }
    

    public function getCurrentUser() {
        if (isset($_SESSION['maTaiKhoan'])) {
            return ['success' => true, 'username' => $_SESSION['username']];
        }
        return ['success' => false, 'message' => 'Chưa đăng nhập'];
    }

    public function updateMatKhauBacSi($maTaiKhoan, $maBacSi, $username, $matKhauCu, $matKhauMoi){
        if($this->userModel->capNhatMatKhauBacSi($maTaiKhoan, $maBacSi, $username, $matKhauCu, $matKhauMoi)){
            return ['success' => true, 'message' => 'Đổi mật khẩu thành công'];
        } else {
            return ['success' => false, 'message' => 'Đổi mật khẩu thất bại'];
        }
    }
}

?>
