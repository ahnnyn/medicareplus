<?php
    include("../model/chuyenkhoa.php");
    
    class cChuyenKhoa {
        public function layDanhSachChuyenKhoa() {
            $p = new mChuyenKhoa();
            $result = $p->layDanhSachChuyenKhoa();
            
            if (!$result) {
                echo json_encode(["error" => "Lỗi truy vấn cơ sở dữ liệu"]);
                return;
            }
    
            $chuyenKhoaList = [];

            if (is_array($result)) { // Nếu là mảng, không dùng fetch_assoc()
                $chuyenKhoaList = $result;
            } else { // Nếu là mysqli_result, dùng fetch_assoc()
                while ($row = $result->fetch_assoc()) {
                    $chuyenKhoaList[] = [
                        "id" => $row["maKhoa"],
                        "name" => $row["tenKhoa"],
                        "image" => $row["hinhAnh"]
                    ];
                }
            }

            echo json_encode(["data" => $chuyenKhoaList]);
        }

        public function layThongTinChuyenKhoaById($id) {
            $p = new mChuyenKhoa();
            $stmt = $p->layThongTinChuyenKhoaById($id);
            
            if (!$stmt) {
                echo json_encode(["error" => "Lỗi truy vấn cơ sở dữ liệu"]);
                return;
            }
        
            // Lấy dữ liệu từ kết quả truy vấn
            $chuyenKhoa = $stmt->fetch(PDO::FETCH_ASSOC);
        
            if (!$chuyenKhoa) {
                echo json_encode(["error" => "Không tìm thấy chuyên khoa"]);
                return;
            }
        
            // Trả về dữ liệu dưới dạng JSON
            header("Content-Type: application/json");
            echo json_encode(["data" => $chuyenKhoa]);
        }
        public function search() {
            // Kiểm tra xem có tham số 'tenkhoa' không
            if (isset($_GET['tenkhoa']) && !empty($_GET['tenkhoa'])) {
                $tenkhoa = $_GET['tenkhoa'];  // Lấy giá trị tên chuyên khoa từ query string

                $p = new mChuyenKhoa();
                // Gọi phương thức tìm kiếm chuyên khoa theo tên và truyền tham số vào
                $result = $p->searchChuyenKhoa($tenkhoa);  

                // Kiểm tra nếu có lỗi trong quá trình tìm kiếm
                if (isset($result['error'])) {
                    echo json_encode($result);  // Nếu có lỗi, trả về lỗi
                    return;
                }

                // Trả về kết quả tìm kiếm dưới dạng JSON
                echo json_encode(["data" => $result]);  
            } else {
                // Nếu không có tham số tenkhoa, trả về lỗi
                echo json_encode(["error" => "Thiếu tên chuyên khoa để tìm kiếm"]);
            }
        }
        
    }
?>