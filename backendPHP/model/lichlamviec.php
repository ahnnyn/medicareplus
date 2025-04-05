<?php
include("../config/database.php");

class mLichLamViec {
    private $pdo;

    public function __construct() {
        $p = new connectdatabase();
        $this->pdo = $p->connect(); // Kết nối database
    }

    // Lấy lịch làm việc theo ngày của bác sĩ
    public function layLichLamViecTheoNgay($maBacSi, $ngayLamViec)
    {
        if (!$this->pdo) {
            return ["error" => "Không thể kết nối database"];
        }

        // Kiểm tra mã bác sĩ hợp lệ
        if (!is_numeric($maBacSi)) {
            return ["error" => "Mã bác sĩ không hợp lệ"];
        }

        // Kiểm tra định dạng ngày làm việc
        $date = DateTime::createFromFormat('Y-m-d', $ngayLamViec);
        if (!$date || $date->format('Y-m-d') !== $ngayLamViec) {
            return ["error" => "Ngày làm việc không hợp lệ"];
        }

        try {
            $sql = "SELECT 
                        *
                    FROM lichlamviec llv
                    JOIN chitiet_lichlamviec ct ON llv.maLichLamViec = ct.lichLamViec_ID 
                    JOIN calamviec cl ON cl.maCa = ct.caLamViec_ID
                    JOIN khungGio kg ON ct.khungGio_ID = kg.maKhungGio 
                    WHERE llv.maBacSi = :maBacSi 
                    AND llv.ngayLamViec = :ngayLamViec";

            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':maBacSi', $maBacSi, PDO::PARAM_INT);
            $stmt->bindParam(':ngayLamViec', $ngayLamViec, PDO::PARAM_STR);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC); // Trả về mảng liên kết đầy đủ

            return $result ?: []; // Nếu không có dữ liệu, trả về mảng rỗng
        } catch (PDOException $e) {
            return ['error' => 'Lỗi truy vấn: ' . $e->getMessage()];
        }
    }

    // Thêm lịch làm việc của bác sĩ
    public function themLichLamViecBacSi($maBacSi, $ngayLam, $khungGioList) {
        if (!$this->pdo) return ["error" => "Không thể kết nối database"];
        if (!is_numeric($maBacSi) || !is_array($khungGioList)) return ["error" => "Dữ liệu đầu vào không hợp lệ"];
    
        $date = DateTime::createFromFormat('Y-m-d', $ngayLam);
        if (!$date || $date->format('Y-m-d') !== $ngayLam) return ["error" => "Ngày làm việc không hợp lệ"];
    
        try {
            // Kiểm tra xem ngày làm việc đã có trong bảng lichlamviec hay chưa
            $sql = "SELECT maLichLamViec FROM lichlamviec WHERE maBacSi = :maBacSi AND ngayLamViec = :ngayLamViec";
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':maBacSi', $maBacSi, PDO::PARAM_INT);
            $stmt->bindParam(':ngayLamViec', $ngayLam, PDO::PARAM_STR);
            $stmt->execute();

            // Nếu ngày đã có trong bảng lichlamviec, lấy maLichLamViec và cập nhật khung giờ trong chitiet_lichlamviec
            if ($stmt->rowCount() > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $maLichLamViec = $row['maLichLamViec'];
                
                // Lấy danh sách khung giờ cũ
                $sqlOld = "SELECT khungGio_ID FROM chitiet_lichlamviec WHERE lichLamViec_ID = :maLichLamViec";
                $stmtOld = $this->pdo->prepare($sqlOld);
                $stmtOld->bindParam(':maLichLamViec', $maLichLamViec, PDO::PARAM_INT);
                $stmtOld->execute();
                $oldKhungGioList = $stmtOld->fetchAll(PDO::FETCH_COLUMN);

                // Xử lý xóa và thêm khung giờ
                // Đảm bảo xử lý tham số đúng cách
                $toDelete = array_diff($oldKhungGioList, $khungGioList);
                $toAdd = array_diff($khungGioList, $oldKhungGioList);
                if (!empty($toDelete)) {
                    $in = implode(',', array_fill(0, count($toDelete), '?'));
                    $sqlDelete = "DELETE FROM chitiet_lichlamviec WHERE lichLamViec_ID = ? AND khungGio_ID IN ($in)";
                    $stmtDel = $this->pdo->prepare($sqlDelete);
                    $stmtDel->execute(array_merge([$maLichLamViec], $toDelete));
                }

                // Thêm khung giờ mới
                foreach ($toAdd as $khungGio) {
                    $sqlGetCa = "SELECT maCaLamViec FROM khungGio WHERE maKhungGio = :khungGio";
                    $stmtGetCa = $this->pdo->prepare($sqlGetCa);
                    $stmtGetCa->bindParam(':khungGio', $khungGio, PDO::PARAM_INT);
                    $stmtGetCa->execute();
                    if ($stmtGetCa->rowCount() > 0) {
                        $maCaLamViec = $stmtGetCa->fetch(PDO::FETCH_ASSOC)['maCaLamViec'];
                        $sqlInsert = "INSERT INTO chitiet_lichlamviec(lichLamViec_ID, caLamViec_ID, khungGio_ID) VALUES(:maLichLamViec, :maCa, :khungGio)";
                        $stmtInsert = $this->pdo->prepare($sqlInsert);
                        $stmtInsert->bindParam(':maLichLamViec', $maLichLamViec, PDO::PARAM_INT);
                        $stmtInsert->bindParam(':maCa', $maCaLamViec, PDO::PARAM_INT);
                        $stmtInsert->bindParam(':khungGio', $khungGio, PDO::PARAM_INT);
                        $stmtInsert->execute();
                    }
                }

                return ["success" => "Cập nhật lịch làm việc thành công"];
            } else {
                // Nếu chưa có lịch làm việc cho ngày đó, tạo mới lịch làm việc và thêm khung giờ
                $this->pdo->beginTransaction();
    
                // Thêm mới dòng vào bảng lichlamviec
                $sqlInsertLich = "INSERT INTO lichlamviec(maBacSi, ngayLamViec) VALUES(:maBacSi, :ngayLamViec)";
                $stmtInsert = $this->pdo->prepare($sqlInsertLich);
                $stmtInsert->bindParam(':maBacSi', $maBacSi, PDO::PARAM_INT);
                $stmtInsert->bindParam(':ngayLamViec', $ngayLam, PDO::PARAM_STR);
                $stmtInsert->execute();
                $maLichLamViec = $this->pdo->lastInsertId();
    
                // Thêm các khung giờ vào chitiet_lichlamviec
                foreach ($khungGioList as $khungGio) {
                    $sqlGetCa = "SELECT maCaLamViec FROM khungGio WHERE maKhungGio = :khungGio";
                    $stmtGetCa = $this->pdo->prepare($sqlGetCa);
                    $stmtGetCa->bindParam(':khungGio', $khungGio, PDO::PARAM_INT);
                    $stmtGetCa->execute();
    
                    if ($stmtGetCa->rowCount() > 0) {
                        $maCaLamViec = $stmtGetCa->fetch(PDO::FETCH_ASSOC)['maCaLamViec'];
    
                        $sqlInsert = "INSERT INTO chitiet_lichlamviec(lichLamViec_ID, caLamViec_ID, khungGio_ID) VALUES(:maLichLamViec, :maCa, :khungGio)";
                        $stmtInsert = $this->pdo->prepare($sqlInsert);
                        $stmtInsert->bindParam(':maLichLamViec', $maLichLamViec, PDO::PARAM_INT);
                        $stmtInsert->bindParam(':maCa', $maCaLamViec, PDO::PARAM_INT);
                        $stmtInsert->bindParam(':khungGio', $khungGio, PDO::PARAM_INT);
                        $stmtInsert->execute();
                    }
                }
    
                $this->pdo->commit();
                return ["success" => "Thêm lịch làm việc thành công"];
            }
        } catch (PDOException $e) {
            if ($this->pdo->inTransaction()) $this->pdo->rollBack();
            return ["error" => "Lỗi: " . $e->getMessage()];
        }
    }
      
}
?>
