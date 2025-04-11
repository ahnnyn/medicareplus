<?php
include("../model/mGiaoDichVNPay.php");
class cGiaoDich {
    public function luuGiaoDichThanhToan($maLichKham, $vnp_Amount, $vnp_BankCode, $vnp_BankTranNo, $vnp_CardType, $vnp_OrderInfo, $vnp_PayDate, $vnp_ResponseCode, $vnp_TmnCode, $vnp_TransactionNo, $vnp_TransactionStatus, $vnp_SecureHash)
    {
        $model = new mGiaoDich();
        return $model->luuGiaoDichThanhToan(
            $maLichKham,
            $vnp_Amount,
            $vnp_BankCode,
            $vnp_BankTranNo,
            $vnp_CardType,
            $vnp_OrderInfo,
            $vnp_PayDate,
            $vnp_ResponseCode,
            $vnp_TmnCode,
            $vnp_TransactionNo,
            $vnp_TransactionStatus,
            $vnp_SecureHash
        );
    }
    
}
?>