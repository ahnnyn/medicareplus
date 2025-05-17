<?php
require_once("../model/vaitro.php");

class cVaiTro {
    public function getDanhSachVaiTro() {
        $p = new mVaiTro();
        $result = $p->layDanhSachVaiTro();

        if (!$result) {
            return ["error" => "Lỗi truy vấn cơ sở dữ liệu"];
        }

        return ["data" => $result];
    }

    public function insertVaiTro($tenVaiTro) {
        $p = new mVaiTro();
        $result = $p->themVaiTro($tenVaiTro);

        if ($result) {
            return ["success" => true, "message" => "Thêm vai trò thành công"];
        } else {
            return ["success" => false, "message" => "Thêm vai trò thất bại"];
        }
    }

    public function updateVaiTro($maVaiTro, $tenVaiTro) {
        $p = new mVaiTro();
        $result = $p->suaVaiTro($maVaiTro, $tenVaiTro);

        if ($result) {
            return ["success" => true, "message" => "Cập nhật vai trò thành công"];
        } else {
            return ["success" => false, "message" => "Cập nhật vai trò thất bại"];
        }
    }

    public function deleteVaiTro($maVaiTro) {
        $p = new mVaiTro();
        $result = $p->xoaVaiTro($maVaiTro);

        if (isset($result['success'])) {
            return ['success' => true];
        } else {
            return ['success' => false, 'error' => $result['error'] ?? 'Lỗi không xác định'];
        }
    }
}
?>
