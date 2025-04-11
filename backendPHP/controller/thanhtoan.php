<?php
class cThanhToanOnline {
    public function taoVnPayUrl($maLichKham, $amount, $tenNguoiDung) {
            // Cấu hình cổng thanh toán VNPAY
            $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            //$vnp_Returnurl = "http://localhost/PTUDN2/view/benhNhan/xemlichkham.php";
            $vnp_Returnurl = "http://localhost:3000/user/thong-bao-thanh-toan"; // Đường dẫn trả về sau khi thanh toán thành công
            $vnp_TmnCode = "6DZXKDIM"; // Mã website tại VNPAY
            $vnp_HashSecret = "8DGNK4OJ7IJRF1V0ZWJFJH6MRD9EJPNJ"; // Chuỗi bí mật
            
            // Mã đơn hàng ngẫu nhiên (đảm bảo tính duy nhất)
            $vnp_TxnRef = $maLichKham;
            $vnp_OrderInfo = "Thanh toán lịch khám " . $maLichKham . " của " . $tenNguoiDung; // Thông tin đơn hàng
            $vnp_OrderType = "billpayment";

            // Số tiền (đơn vị VND, nhân 100 theo yêu cầu của VNPAY)
            $vnp_Amount = (int)$amount * 100; 

            $vnp_Locale = "vn"; // Ngôn ngữ
            $vnp_BankCode = "NCB"; // Mã ngân hàng (có thể để trống nếu không chọn ngân hàng)
            $vnp_IpAddr = $_SERVER['REMOTE_ADDR']; // Lấy địa chỉ IP của người dùng

            date_default_timezone_set('Asia/Ho_Chi_Minh'); // Đảm bảo múi giờ VN

            $vnp_CreateDate = date('YmdHis');
            $vnp_ExpireDate = date('YmdHis', strtotime('+15 minutes')); // Hết hạn sau 15 phút

            // Thay vì dùng trực tiếp date() trong mảng, hãy dùng biến đã set
            $inputData = array(
                "vnp_Version" => "2.1.0",
                "vnp_TmnCode" => $vnp_TmnCode,
                "vnp_Amount" => $vnp_Amount,
                "vnp_Command" => "pay",
                "vnp_CreateDate" => $vnp_CreateDate,
                "vnp_ExpireDate" => $vnp_ExpireDate, // ✅ Thêm dòng này
                "vnp_CurrCode" => "VND",
                "vnp_IpAddr" => $vnp_IpAddr,
                "vnp_Locale" => $vnp_Locale,
                "vnp_OrderInfo" => $vnp_OrderInfo,
                "vnp_OrderType" => $vnp_OrderType,
                "vnp_ReturnUrl" => $vnp_Returnurl,
                "vnp_TxnRef" => $vnp_TxnRef,
            );


            if (isset($vnp_BankCode) && $vnp_BankCode != "") {
                $inputData['vnp_BankCode'] = $vnp_BankCode;
            }

            // Sắp xếp các tham số theo thứ tự từ a-z để chuẩn bị tạo chuỗi hash
            ksort($inputData);
            $query = "";
            $i = 0;
            $hashdata = "";
            foreach ($inputData as $key => $value) {
                if ($i == 1) {
                    $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                } else {
                    $hashdata .= urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                }
                $query .= urlencode($key) . "=" . urlencode($value) . '&';
            }
            
            // Tạo URL cổng thanh toán VNPAY
            $vnp_Url = $vnp_Url . "?" . $query;
            if (isset($vnp_HashSecret)) {
                $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret); // Tạo mã bảo mật SHA512
                $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
            }

            // Trả về dữ liệu
            return array(
                'status' => true,
                'message' => 'success',
                'payment_url' => $vnp_Url
              );
           
        }

}

?>