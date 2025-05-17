<?php
    include("../model/benhnhan.php");

    class cBenhNhan {
        public function getThongTinCaNhanBenhNhan($maBenhNhan) {
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
        public function updateThongTinBenhNhan($maBenhNhan, $hoTen, $gioiTinh, $ngaySinh, $soDienThoai, $email, $diaChi, $hinhAnh) {
            $p = new mBenhNhan();
            $result = $p->capNhatThongTinBenhNhan($maBenhNhan, $hoTen, $gioiTinh, $ngaySinh, $soDienThoai, $email, $diaChi, $hinhAnh);
        
            if (isset($result['success'])) {
                return ['success' => true];
            } else {
                return ['success' => false, 'error' => $result['error'] ?? 'Lỗi không xác định'];
            }
        }   
        public function getDanhSachBenhNhan() {
            $p = new mBenhNhan();
            $result = $p->layDanhSachBenhNhan();
            
            if (!$result || isset($result['error'])) {
                echo json_encode(["error" => $result['error'] ?? "Lỗi truy vấn cơ sở dữ liệu"]);
                return;
            }

            echo json_encode(["data" => $result]);
        }

    }
?>