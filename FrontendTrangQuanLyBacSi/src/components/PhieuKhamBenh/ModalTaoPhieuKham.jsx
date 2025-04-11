import {
  Button,
  Col,
  Form,
  Input,
  message,
  notification,
  Row,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBacSiByMaBS, fetchLayTTPhieuKhamBenh, updateTTPhieuKhamBenh } from "../../services/apiDoctor";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { taoPhieuKhamBenh } from "../../services/apiDoctor";

const ModalTaoPhieuKham = ({ isModalOpen, setIsModalOpen, editingRecord}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formPhieuKham] = Form.useForm();
  const [dataAccBS, setDataAccBS] = useState(null);
  const [dataPhieuKham, setDataPhieuKham] = useState(null);
  const user = useSelector((state) => state.accountDoctor.user);

 // Lấy thông tin bác sĩ
 const fetchDoctorInfo = async (maBacSi) => {
  let res = await fetchBacSiByMaBS(maBacSi);
  if (res && res.data) {
    setDataAccBS(res.data);
  }
};

useEffect(() => {
  if (user?.maBacSi) {
    fetchDoctorInfo(user.maBacSi);
  }
}, [user]);

// Khi modal mở, set các giá trị của form theo thông tin lịch khám
useEffect(() => {
  if (editingRecord) {
    const maLichKham = editingRecord?.maLich;
    const ngayKham = editingRecord?.ngayKham;
    const khungGio = editingRecord?.khungGio;
    // Gọi API lấy thông tin phiếu khám từ lịch khám, ngày khám, khung giờ
    fetchPhieuKhamBenh(maLichKham, ngayKham, khungGio);
  }
}, [editingRecord]);

console.log("editingRecord: ", editingRecord);

// Fetch phieuKham information based on Lịch khám, Ngày khám, Khung giờ
const fetchPhieuKhamBenh = async (maLichKham, ngayKham, khungGio) => {
  if (!maLichKham || !ngayKham || !khungGio) return null;

  try {
    console.log("Fetching phiếu khám với: ", {
      maLichKham,
      ngayKham,
      khungGio
    });

    const res = await fetchLayTTPhieuKhamBenh(maLichKham, ngayKham, khungGio);
    console.log("Kết quả trả về từ API: ", res);

    if (res) {
      setDataPhieuKham(res);
    } // Set the fetched data to state
    } catch (error) {
    console.error("Error fetching phieuKham:", error);
  }
};


 // Khi modal mở, set form values dựa trên thông tin lịch khám nếu có
 useEffect(() => {
  if (editingRecord) {
    const init = {
      idHoSo: editingRecord?.maHoSo,
      idBS: editingRecord?.maBacSi || dataAccBS?.maBacSi,
      idLK: editingRecord?.maLich,
      hoTen: editingRecord?.hoTen || '',
      khungGio: editingRecord?.khungGio || '',
      ngayKham: editingRecord?.ngayKham || '',
      tienSu: editingRecord?.tienSu || '',
      chuanDoan: editingRecord?.chuanDoan || '',
      lyDoKham: editingRecord?.lyDoKham || ''
    };
    
    // Set form values từ editingRecord nếu có
    formPhieuKham.setFieldsValue(init);
  }

  // Nếu đã có dataPhieuKham, thì update lại các giá trị trong form
  if (dataPhieuKham && typeof dataPhieuKham === 'object' && dataPhieuKham.maPhieu) {
    formPhieuKham.setFieldsValue({
      idPK: dataPhieuKham?.maPhieu,
      idHoSo: dataPhieuKham?.maHoSo,
      idBS: dataPhieuKham?.maBacSi,
      idLK: dataPhieuKham?.maLichKham,
      hoTen: dataPhieuKham?.hoTenBenhNhan,
      khungGio: dataPhieuKham?.khungGioKham || '',
      ngayKham: dataPhieuKham?.ngayKham,
      tienSu: dataPhieuKham?.tienSu,
      chuanDoan: dataPhieuKham?.chanDoan,
      lyDoKham: dataPhieuKham?.lyDoKham
    });
  }
}, [editingRecord, dataAccBS, dataPhieuKham]);


  console.log("dataPhieuKham: ", dataPhieuKham);

  const onFinishTaoPhieuKham = async (values) => {
    try {
      const maHoSo = parseInt(values.idHoSo, 10);
      const maBacSi = parseInt(values.idBS, 10);
      const maLichKham = parseInt(values.idLK, 10);
  
      if (isNaN(maHoSo) || isNaN(maBacSi)) {
        notification.error({
          message: "❌ Tạo phiếu khám thất bại!",
          description: "Mã hồ sơ hoặc mã bác sĩ không hợp lệ.",
        });
        return;
      }
  
      console.log("Dữ liệu gửi từ frontend: ", {
        maHoSo: values.idHoSo,
        maBacSi: values.idBS,
        maLichKham: values.idLK,
        hoTen: values.hoTen,
        khungGio: values.khungGio,
        ngayKham: values.ngayKham,
        tienSu: values.tienSu,
        chuanDoan: values.chuanDoan,
        lyDoKham: values.lyDoKham
      });
  
      // Gửi request để tạo mới hoặc cập nhật phiếu khám
      let result;
      if (dataPhieuKham?.maPhieu) {
        // Nếu phiếu khám đã tồn tại, cập nhật lại
        result = await updateTTPhieuKhamBenh(
          dataPhieuKham.maPhieu, // id phiếu khám
          values.tienSu,
          values.chuanDoan,
          values.lyDoKham
        );
      } else {
        // Nếu phiếu khám chưa tồn tại, tạo mới
        result = await taoPhieuKhamBenh(
          maHoSo, 
          maBacSi,
          maLichKham,
          values.hoTen,
          values.ngayKham,
          values.khungGio,
          values.tienSu,
          values.chuanDoan,
          values.lyDoKham
        );
      }
  
      let res = result;
      if (typeof res === "string") {
        res = JSON.parse(res); // 🔥 ép JSON string thành object
      }
      if (res && res.status) {
        message.success(res.message || (dataPhieuKham.maPhieu ? "Cập nhật phiếu khám thành công!" : "Tạo phiếu khám thành công!"));
  
        // Fetch updated phiếu khám info và cập nhật lại form
        // const phieuKhamInfo = await fetchPhieuKhamBenh(maHoSo, maLichKham, values.ngayKham, values.khungGio);
        // setDataPhieuKham(phieuKhamInfo);
        // formPhieuKham.setFieldsValue({
        //   idPK: phieuKhamInfo?.maPhieu,
        //   idHoSo: phieuKhamInfo?.maHoSo,
        //   idBS: phieuKhamInfo?.maBacSi,
        //   idLK: phieuKhamInfo?.maLichKham,
        //   hoTen: phieuKhamInfo?.hoTenBenhNhan,
        //   khungGio: phieuKhamInfo?.khungGioKham,
        //   ngayKham: phieuKhamInfo?.ngayKham,
        //   tienSu: phieuKhamInfo?.tienSu,
        //   chuanDoan: phieuKhamInfo?.chanDoan,
        //   lyDoKham: phieuKhamInfo?.lyDoKham
        // });
        
        // Chuyển sang trang doctor sau khi tạo hoặc cập nhật thành công
        navigate("/doctor");
        setIsModalOpen(false);
      } else {
        notification.error({
          message: "❌ Tạo/ Cập nhật phiếu khám thất bại!",
          description: res?.message || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi hệ thống",
        description: error.message || "Không thể kết nối đến máy chủ.",
      });
    }
  };
  


// Hàm đóng modal
const handleCancel = () => {
  setIsModalOpen(false);
};
// Hàm xử lý để kiểm tra nếu có maPhieu trong dataPhieuKham
const isExistingPhieuKham = dataPhieuKham && dataPhieuKham.maPhieu;
return (
  <Modal
    visible={isModalOpen}
    onCancel={handleCancel}
    footer={null}
    width={800}
  >
    <Form form={formPhieuKham} layout="vertical" onFinish={onFinishTaoPhieuKham}>
      <Row>
        <Col span={24} style={{ padding: "0 0 20px", fontSize: "18px", textAlign: "center" }}>
          <span style={{ fontWeight: "500", color: "navy" }}>PHIẾU KHÁM BỆNH</span>
        </Col>
      </Row>
      <Row gutter={[20, 10]}>
        <Col span={24} md={24} sm={24} xs={24}>
        <Form.Item name="idHoSo" hidden>
            <Input hidden />
          </Form.Item>
          <Form.Item name="idBS" hidden>
            <Input hidden />
          </Form.Item>
          <Form.Item name="idAcc" hidden>
            <Input hidden />
          </Form.Item>
          <Form.Item name="idLK" hidden>
            <Input hidden />
          </Form.Item>
          <Form.Item name="idPK" hidden>
            <Input hidden />
          </Form.Item>
        </Col>
        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item label="Họ và tên" name="hoTen" rules={[{ required: true, message: "Vui lòng nhập tên bệnh nhân!" }]}>
            <Input placeholder="Nhập họ và tên bệnh nhân" />
          </Form.Item>
        </Col>

        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item label="Khung giờ khám" name="khungGio">
            <Input placeholder="Khung giờ khám" />
          </Form.Item>
        </Col>

        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item label="Ngày khám" name="ngayKham" rules={[{ required: true, message: "Vui lòng nhập ngày khám!" }]}>
            <Input type="date" placeholder="Chọn ngày khám" />
          </Form.Item>
        </Col>

        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item label="Lý do khám" name="lyDoKham" rules={[{ required: true, message: "Vui lòng nhập lý do khám!" }]}>
            <Input.TextArea rows={4} placeholder="Nhập lý do khám" />
          </Form.Item>
        </Col>

        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item label="Tiền sử bệnh" name="tienSu" rules={[{ required: true, message: "Vui lòng nhập tiền sử bệnh!" }]}>
            <Input.TextArea rows={4} placeholder="Nhập tiền sử bệnh" />
          </Form.Item>
        </Col>

        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item label="Chuẩn đoán" name="chuanDoan" rules={[{ required: true, message: "Vui lòng nhập chuẩn đoán bệnh!" }]}>
            <Input.TextArea rows={4} placeholder="Nhập chuẩn đoán bệnh" />
          </Form.Item>
        </Col>


        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => formPhieuKham.submit()}
            type="primary"
            size="large"
            icon={<FaSave size={25} />}
            style={{ width: "300px", height: "50px", background:"#2A95BF"}}
          >
             {isExistingPhieuKham ? "CẬP NHẬT PHIẾU KHÁM" : "TẠO PHIẾU KHÁM"}
          </Button>
        </Col>
      </Row>
    </Form>
  </Modal>
);
};

export default ModalTaoPhieuKham;
