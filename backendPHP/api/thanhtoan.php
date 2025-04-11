<?php
$allowed_origins = [
    'http://localhost:3000',
    'http://localhost:3003',
    'http://localhost:3001',
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Dừng xử lý nếu là preflight request
}
include("../controller/thanhtoan.php");
include("../controller/cGiaoDichVNPay.php");

$purl = new cThanhToanOnline();
$ptt = new cGiaoDich();
if (isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "thanh-toan":
            $result = $purl->taoVnPayUrl($_GET["maLichKham"], $_GET["amount"], $_GET["tenBenhNhan"]);
            echo json_encode($result); 
            break;
        case "thong-tin-thanh-toan":
            $data = json_decode(file_get_contents("php://input"), true);

            $vnp_Amount            = $data['vnp_Amount'] ?? null;
            $vnp_BankCode          = $data['vnp_BankCode'] ?? null;
            $vnp_BankTranNo        = $data['vnp_BankTranNo'] ?? null;
            $vnp_CardType          = $data['vnp_CardType'] ?? null;
            $vnp_OrderInfo         = $data['vnp_OrderInfo'] ?? null;
            $vnp_PayDate           = $data['vnp_PayDate'] ?? null;
            $vnp_ResponseCode      = $data['vnp_ResponseCode'] ?? null;
            $vnp_TmnCode            = $data['vnp_TmnCode'] ?? null;
            $vnp_TransactionNo     = $data['vnp_TransactionNo'] ?? null;
            $vnp_TransactionStatus = $data['vnp_TransactionStatus'] ?? null;
            $vnp_TxnRef            = $data['vnp_TxnRef'] ?? null;
            $vnp_SecureHash        = $data['vnp_SecureHash'] ?? null;
            $result = $ptt->luuGiaoDichThanhToan($vnp_TxnRef, $vnp_Amount, $vnp_BankCode, $vnp_BankTranNo, $vnp_CardType, $vnp_OrderInfo, $vnp_PayDate, $vnp_ResponseCode, $vnp_TmnCode, $vnp_TransactionNo, $vnp_TransactionStatus, $vnp_SecureHash);
            if ($result) {
                echo json_encode(["status" => true]);
            } else {
                echo json_encode(["status" => false, "error" => "Lưu giao dịch thất bại"]);
            } 
            break;       
        default:
            echo json_encode(["error" => "Thao tác không hợp lệ"]);
    }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}
?>
