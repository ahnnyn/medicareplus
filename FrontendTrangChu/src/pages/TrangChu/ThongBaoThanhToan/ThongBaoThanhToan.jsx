import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import HeaderViewDoctor from "../../../components/TrangChu/Header/HeaderViewDoctor";
import Footer from "../../../components/TrangChu/Footer/Footer";
import {
  getThongBaoThanhToan,
  capNhatTrangThaiThanhToanLichKham,
} from "../../../services/apiChuyenKhoaBacSi";

const ThongBaoThanhToan = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState(null); // true: success, false: fail
  const [message, setMessage] = useState("Đang xử lý kết quả thanh toán...");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const vnp_TxnRef = queryParams.get("vnp_TxnRef");
    const vnp_Amount = queryParams.get("vnp_Amount");
    const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
    const vnp_PayDate = queryParams.get("vnp_PayDate");
    const vnp_BankCode = queryParams.get("vnp_BankCode");
    const vnp_BankTranNo = queryParams.get("vnp_BankTranNo");
    const vnp_CardType = queryParams.get("vnp_CardType");
    const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
    const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
    const vnp_TransactionStatus = queryParams.get("vnp_TransactionStatus");
    const vnp_TmnCode = queryParams.get("vnp_TmnCode");
    const vnp_SecureHash = queryParams.get("vnp_SecureHash");

    const handleSuccess = async () => {
      try {
        setMessage("🔄 Đang lưu thông tin thanh toán...");

        await getThongBaoThanhToan({
          vnp_Amount,
          vnp_BankCode,
          vnp_BankTranNo,
          vnp_CardType,
          vnp_OrderInfo,
          vnp_PayDate,
          vnp_ResponseCode,
          vnp_TmnCode,
          vnp_TransactionNo,
          vnp_TransactionStatus,
          vnp_TxnRef,
          vnp_SecureHash,
        });

        setMessage("🔄 Đang cập nhật trạng thái lịch hẹn...");

        await capNhatTrangThaiThanhToanLichKham({
          maLichKham: vnp_TxnRef,
          trangThaiThanhToan: "Đã thanh toán",
        });

        setStatus(true);
        setMessage("🎉 Đặt lịch thành công! Hệ thống sẽ chuyển trang sau vài giây...");

        // ⏳ Chờ 3 giây rồi mới chuyển
        setTimeout(() => {
          navigate("/user/lich-hen");
        }, 3000);
      } catch (error) {
        console.error("❌ Lỗi khi xử lý thanh toán:", error?.response?.data || error.message || error);
        setStatus(false);
        setMessage("Thanh toán thất bại! Vui lòng thử lại hoặc liên hệ hỗ trợ.");
      }
    };

    if (vnp_ResponseCode === "00") {
      handleSuccess();
    } else {
      setStatus(false);
      setMessage("Thanh toán không thành công. Mã phản hồi: " + vnp_ResponseCode);
    }
  }, [location, navigate]);

  return (
    <>
      <HeaderViewDoctor />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          {status === null ? (
            <p className="text-gray-600">{message}</p>
          ) : status ? (
            <>
              <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-600">Đặt lịch thành công!</h2>
              <p className="text-gray-700 mt-2">{message}</p>
            </>
          ) : (
            <>
              <XCircle size={60} className="text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-600">Thanh toán thất bại!</h2>
              <p className="text-gray-700 mt-2">{message}</p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThongBaoThanhToan;
