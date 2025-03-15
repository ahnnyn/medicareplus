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
        
    }
?>