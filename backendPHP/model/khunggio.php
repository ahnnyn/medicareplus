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
    }
?>