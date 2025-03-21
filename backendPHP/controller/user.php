<?php
require_once("../model/user.php");

class cUser {
    private $userModel;

    public function __construct() {
        $this->userModel = new mUser();
    }

    public function login($username, $matKhau) {
        return $this->userModel->login($username, $matKhau);
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
}

?>
