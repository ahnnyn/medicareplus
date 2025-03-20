<?php
require_once("../model/user.php");

class cUser {
    private $userModel;

    public function __construct() {
        $this->userModel = new mUser();
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function login($username, $matKhau) {
        $user = $this->userModel->login($username, $matKhau);
        if ($user) {
            $_SESSION['maTaiKhoan'] = $user['maTaiKhoan'];
            $_SESSION['username'] = $user['username'];
            return ['success' => true, 'message' => 'Đăng nhập thành công', 'user' => $user];
        }
        return ['success' => false, 'message' => 'Sai tài khoản hoặc mật khẩu'];
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
