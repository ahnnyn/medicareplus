<?php
    include("../config/database.php");
    class mKhungGio{
        public function layKhungGioTheoCa()
        {
            $p = new connectdatabase();
            $pdo = $p->connect(); // Kết nối database

            if (!$pdo) {
                return ["error" => "Không thể kết nối database"];
            }

            try {
                $sql = "
                    SELECT 
                        cl.maCa AS maCaLamViec, 
                        cl.tenCa, 
                        kg.maKhungGio,
                        kg.khungGio
                    FROM khunggio kg
                    JOIN calamviec cl ON kg.maCaLamViec = cl.maCa
                ";

                $stmt = $pdo->prepare($sql);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                // Tiến hành xử lý JSON trong PHP sau khi truy vấn
                $output = [];
                foreach ($result as $row) {
                    $maCaLamViec = $row['maCaLamViec'];
                    if (!isset($output[$maCaLamViec])) {
                        $output[$maCaLamViec] = [
                            'maCaLamViec' => $row['maCaLamViec'],
                            'tenCa' => $row['tenCa'],
                            'khungGio' => []
                        ];
                    }

                    $output[$maCaLamViec]['khungGio'][] = [
                        'maKhungGio' => $row['maKhungGio'],
                        'khungGio' => $row['khungGio']
                    ];
                }

                return array_values($output); // Chuyển mảng kết quả thành mảng liên tục

            } catch (PDOException $e) {
                return ['error' => 'Lỗi truy vấn: ' . $e->getMessage() . ' - Dòng: ' . $e->getLine()];
            }
        }
       

        public function layKhungGio()
        {
            $p = new connectdatabase();
            $pdo = $p->connect(); // Kết nối database

            if (!$pdo) {
                return ["error" => "Không thể kết nối database"];
            }

            try {
                $sql = "SELECT * FROM khungGio";
                $stmt = $pdo->prepare($sql);
                $stmt->execute();

                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                return ['error' => 'Lỗi truy vấn: ' . $e->getMessage()];
            }
        }
        public function layKhungGioTheoNgay($maBacSi, $hinhThucKham, $ngayLamViec, $maLichDangSua = null) {
            $p = new connectdatabase();
            $pdo = $p->connect();
            if (!$pdo) {
                return ["success" => false, "message" => "Không thể kết nối database"];
            }

            try {
                $query = "
                    SELECT kg.maKhungGio, kg.khungGio 
                    FROM khunggio kg 
                    JOIN chitiet_lichlamviec ctlv ON ctlv.khungGio_ID = kg.maKhungGio 
                    JOIN lichlamviec llv ON llv.maLichLamViec = ctlv.lichLamViec_ID 
                    WHERE llv.maBacSi = :maBacSi
                    AND llv.ngayLamViec = :ngayLamViec 
                    AND llv.hinhThucKham = :hinhThucKham
                    AND (
                        ctlv.trangThaiDatLich = 'available'
                ";

                // Nếu đang sửa lịch => giữ lại khung giờ đã đặt cho lịch đó
                if ($maLichDangSua !== null) {
                    $query .= "
                        OR ctlv.khungGio_ID IN (
                            SELECT lh2.maKhungGio
                            FROM lichkham lh2
                            WHERE lh2.maLich = :maLich
                        )
                    ";
                }

                $query .= ") ORDER BY kg.maKhungGio";

                $stmt = $pdo->prepare($query);

                // Truyền tham số phù hợp
                $params = [
                    ':maBacSi' => $maBacSi,
                    ':hinhThucKham' => $hinhThucKham,
                    ':ngayLamViec' => $ngayLamViec
                ];

                if ($maLichDangSua !== null) {
                    $params[':maLich'] = $maLichDangSua;
                }

                $stmt->execute($params);

                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if (empty($data)) {
                    return ["message" => "Không có khung giờ phù hợp"];
                }

                return $data;
            } catch (PDOException $e) {
                return ["error" => $e->getMessage()];
            }
        }
    }
?>