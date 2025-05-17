<?php
require_once("../model/userbenhnhan.php");

class cUser {
    private $userModel;

    public function __construct() {
        $this->userModel = new mUser();
    }

    public function getThongTinBenhNhan($username, $matKhau) {
        return $this->userModel->layThongTinBenhNhan($username, $matKhau);
    }
    public function logout() {
        session_destroy();
        return ['success' => true, 'message' => 'Đăng xuất thành công'];
    }

    public function getCurrentUser() {
        if (isset($_SESSION['maTaiKhoan'])) {
            return ['success' => true, 'username' => $_SESSION['username']];
        }
        return ['success' => false, 'message' => 'Chưa đăng nhập'];
    }
    public function luuThongTin($email, $hoTen, $soDienThoai, $username, $matKhau) {  
        $result = $this->userModel->dangKy($email, $hoTen, $soDienThoai, $username, $matKhau);
        if ($result) {
            return ['success' => true, 'message' => 'Đăng ký thành công'];
        } else {
            return ['success' => false, 'message' => 'Đăng ký thất bại'];
        }
    }
    public function updateMatKhauBenhNhan($maTaiKhoan, $maBenhNhan, $username, $matKhauCu, $matKhauMoi){
        if($this->userModel->capNhatMatKhauBenhNhan($maTaiKhoan, $maBenhNhan, $username, $matKhauCu, $matKhauMoi)){
            return ['success' => true, 'message' => 'Đổi mật khẩu thành công'];
        } else {
            return ['success' => false, 'message' => 'Đổi mật khẩu thất bại'];
        }
    }
}

?>
