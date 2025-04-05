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
import { fetchBacSiByMaBS } from "../../services/apiDoctor";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { taoPhieuKhamBenh } from "../../services/apiDoctor";

const ModalTaoPhieuKham = ({ isModalOpen, setIsModalOpen, editingRecord}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formPhieuKham] = Form.useForm();
  const [dataAccBS, setDataAccBS] = useState(null);
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
    const init = {
      idHoSo: editingRecord?.maHoSo || dataAccBS?.maHoSo,
      idBS: editingRecord?.maBacSi || dataAccBS?.maBacSi,
      hoTen: editingRecord?.hoTen || '',
      ngayKham: editingRecord?.ngayKham || '',
      tienSu: editingRecord?.tienSu || '',
      chuanDoan: editingRecord?.chuanDoan || '',
      lyDoKham: editingRecord?.lyDoKham || '',
    };
    formPhieuKham.setFieldsValue(init);
  }
}, [editingRecord, dataAccBS]);

const onFinishTaoPhieuKham = async (values) => {
  try {
    const maHoSo = parseInt(values.idHoSo, 10);
    const maBacSi = parseInt(values.idBS, 10);

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
      hoTen: values.hoTen,
      ngayKham: values.ngayKham,
      tienSu: values.tienSu,
      chuanDoan: values.chuanDoan,
      lyDoKham: values.lyDoKham
    });

    const res = await taoPhieuKhamBenh(maHoSo, maBacSi, values.hoTen, values.ngayKham, values.tienSu, values.chuanDoan, values.lyDoKham);
    console.log("Kết quả từ API tạo phiếu khám: ", res);

    // Parse chuỗi JSON trả về từ server thành đối tượng
    const result = JSON.parse(res);

    // Kiểm tra và xử lý phản hồi
    if (result && result.status === true) {
        message.success("✅ Tạo phiếu khám thành công!");
        navigate("/doctor");
        setIsModalOpen(false);
    } else {
        notification.error({
          message: "❌ Tạo phiếu khám thất bại!",
          description: result.message || "Có lỗi xảy ra, vui lòng thử lại!",
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
          <span style={{ fontWeight: "500", color: "navy" }}>TẠO PHIẾU KHÁM</span>
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
        </Col>
        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item label="Họ và tên" name="hoTen" rules={[{ required: true, message: "Vui lòng nhập tên bệnh nhân!" }]}>
            <Input placeholder="Nhập họ và tên bệnh nhân" />
          </Form.Item>
        </Col>

        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item label="Ngày khám" name="ngayKham" rules={[{ required: true, message: "Vui lòng nhập ngày khám!" }]}>
            <Input type="date" placeholder="Chọn ngày khám" />
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

        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item label="Lý do khám" name="lyDoKham" rules={[{ required: true, message: "Vui lòng nhập lý do khám!" }]}>
            <Input.TextArea rows={4} placeholder="Nhập lý do khám" />
          </Form.Item>
        </Col>

        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => formPhieuKham.submit()}
            type="primary"
            size="large"
            icon={<FaSave size={25} />}
            style={{ width: "200px", height: "50px" }}
          >
            Tạo phiếu khám
          </Button>
        </Col>
      </Row>
    </Form>
  </Modal>
);
};

export default ModalTaoPhieuKham;
