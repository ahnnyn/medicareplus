<?php
    include("../model/bacsi.php");
    
    class cBacSi {
        public function layDanhSachBacSi() {
            $p = new mBacSi();
            $result = $p->layDanhSachBacSi();
            
            if (!$result) {
                echo json_encode(["error" => "Lỗi truy vấn cơ sở dữ liệu"]);
                return;
            }
    
            $bacSiList = [];

            if (is_array($result)) { // Nếu là mảng, không dùng fetch_assoc()
                $bacSiList = $result;
            } else { // Nếu là mysqli_result, dùng fetch_assoc()
                while ($row = $result->fetch_assoc()) {
                    $bacSiList[] = [
                        "id" => $row["maBacSi"],
                        "name" => $row["hoTen"],
                        "image" => $row["hinhAnh"]
                    ];
                }
            }

            echo json_encode(["data" => $bacSiList]);
        }

        public function layThongTinBacSiByKhoa($maKhoa) {
            if (!$maKhoa) {
                echo json_encode(["error" => "Thiếu mã khoa"]);
                return;
            }
        
            $model = new mBacSi();
            $result = $model->layThongTinBacSiByKhoa($maKhoa);
        
            if (isset($result["error"])) {
                echo json_encode($result); // Trả về lỗi từ Model nếu có
                return;
            }
        
            $bacSiList = [];
        
            if (is_array($result)) { 
                // Nếu Model trả về danh sách bác sĩ dạng mảng
                foreach ($result as $row) {
                    $bacSiList[] = [
                        "maBacSi" => $row["maBacSi"],
                        "hoTen" => $row["hoTen"],
                        "hinhAnh" => $row["hinhAnh"]
                    ];
                }
            }
        
            echo json_encode(["bacSiList" => $bacSiList]);
            return;
        }

        public function layThongTinBacSiByMaBS($maBacSi) {
            if (!$maBacSi) {
                echo json_encode(["error" => "Thiếu mã bác sĩ"]);
                return;
            }
        
            $model = new mBacSi();
            $result = $model->layThongTinBacSiByID($maBacSi);
        
            if (!$result) {
                echo json_encode(["error" => "Không tìm thấy thông tin bác sĩ"]);
                return;
            }
        
            // Trả về dữ liệu dưới dạng JSON
            header("Content-Type: application/json");
            echo json_encode(["data" => $result]);
        }
        
        
        public function layKhungGioKham($maBacSi, $ngayKham){
            $p = new mBacSi();
            $result = $p->layKhungGioKham($maBacSi, $ngayKham);
            
            if (!$result) {
                echo json_encode(["error" => "Lỗi truy vấn cơ sở dữ liệu"]);
                return;
            }
            $khungGioList = [];
            if (is_array($result)) { // Nếu là mảng, không dùng fetch_assoc()
                $khungGioList = $result;
            } else { // Nếu là mysqli_result, dùng fetch_assoc()
                while ($row = $result->fetch_assoc()) {
                    $khungGioList[] = [
                        "id" => $row["maKhungGio"],
                        "time" => $row["khungGio"]
                    ];
                }
            }
            echo json_encode(["data" => $khungGioList]);
            
        }

        public function updateThongTinBacSi($maBacSi, $hoTen, $gioiTinh, $soDienThoai, $email, $diaChi, $giaKham, $hinhAnh, $moTa, $maKhoa) {
            // Call the model to update the doctor's information
            $p = new mBacSi();
            $result = $p->capNhatThongTinBacSi($maBacSi, $hoTen, $gioiTinh, $soDienThoai, $email, $diaChi, $giaKham, $hinhAnh, $moTa, $maKhoa);
            
            // Check if the result indicates success or failure
            if (isset($result['success'])) {
                echo json_encode(["status" => true, "message" => $result['success']]);
            } else {
                echo json_encode(["status" => false, "error" => $result['error']]);
            }
        }
        
    }
?>