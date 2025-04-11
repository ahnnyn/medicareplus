<?php
require_once("../config/database.php");
class mGiaoDich {
    public function luuGiaoDichThanhToan($maLichKham, $vnp_Amount, $vnp_BankCode, $vnp_BankTranNo, $vnp_CardType, $vnp_OrderInfo, $vnp_PayDate, $vnp_ResponseCode, $vnp_TmnCode, $vnp_TransactionNo, $vnp_TransactionStatus, $vnp_SecureHash) {
        $p = new connectdatabase();
        $conn = $p->connect();

        if ($conn) {
            try {
                $stmt = $conn->prepare(
                    "INSERT INTO giaodichvnpay (maLich,
                        vnp_Amount, vnp_BankCode, vnp_BankTranNo, vnp_CardType, vnp_OrderInfo, vnp_PayDate, 
                        vnp_ResponseCode, vnp_TmnCode, vnp_TransactionNo, vnp_TransactionStatus, vnp_SecureHash
                    ) VALUES (
                        :maLich, :vnp_Amount, :vnp_BankCode, :vnp_BankTranNo, :vnp_CardType, :vnp_OrderInfo, :vnp_PayDate, 
                        :vnp_ResponseCode, :vnp_TmnCode, :vnp_TransactionNo, :vnp_TransactionStatus, :vnp_SecureHash
                    )"
                );

                $result = $stmt->execute([
                    ':maLich' => $maLichKham,
                    ':vnp_Amount' => $vnp_Amount,
                    ':vnp_BankCode' => $vnp_BankCode,
                    ':vnp_BankTranNo' => $vnp_BankTranNo,
                    ':vnp_CardType' => $vnp_CardType,
                    ':vnp_OrderInfo' => $vnp_OrderInfo,
                    ':vnp_PayDate' => $vnp_PayDate,
                    ':vnp_ResponseCode' => $vnp_ResponseCode,
                    ':vnp_TmnCode' => $vnp_TmnCode,
                    ':vnp_TransactionNo' => $vnp_TransactionNo,
                    ':vnp_TransactionStatus' => $vnp_TransactionStatus,
                    ':vnp_SecureHash' => $vnp_SecureHash
                ]);

                return $result;

            } catch (PDOException $e) {
                echo "Lỗi PDO: " . $e->getMessage();
                return false;
            }
        } else {
            echo "Không thể kết nối đến cơ sở dữ liệu.";
            return false;
        }
    }
}

?>