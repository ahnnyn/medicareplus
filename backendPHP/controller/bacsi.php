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

        public function updateThongTinBacSi($maBacSi, $hoTen, $gioiTinh, $soDienThoai, $email, $diaChi, $giaKham, $hinhAnh, $moTa, $maKhoa){
            $p = new mBacSi();
            $result = $p->capNhatThongTinBacSi($maBacSi, $hoTen, $gioiTinh, $soDienThoai, $email, $diaChi, $giaKham, $hinhAnh, $moTa, $maKhoa);
            
            if (!$result) {
                echo json_encode(["error" => "Lỗi truy vấn cơ sở dữ liệu"]);
                return;
            }
            echo json_encode(["data" => "Cập nhật thông tin bác sĩ thành công"]);
        }
        public function search() {
            // Kiểm tra xem có tham số 'hoTen' không
            if (isset($_GET['hoTen']) && !empty($_GET['hoTen'])) {
                $tenBacSi = $_GET['hoTen'];  // Lấy giá trị tên bác sĩ từ query string

                $p = new mBacSi();
                // Gọi phương thức tìm kiếm bác sĩ theo tên và truyền tham số vào
                $result = $p->searchBacSi($tenBacSi);  

                // Kiểm tra nếu có lỗi trong quá trình tìm kiếm
                if (isset($result['error'])) {
                    echo json_encode($result);  // Nếu có lỗi, trả về lỗi
                    return;
                }

                // Trả về kết quả tìm kiếm dưới dạng JSON
                echo json_encode(["data" => $result]);  
            } else {
                // Nếu không có tham số tenkhoa, trả về lỗi
                echo json_encode(["error" => "Thiếu tên bác sĩ để tìm kiếm"]);
            }
        }
    }
?>