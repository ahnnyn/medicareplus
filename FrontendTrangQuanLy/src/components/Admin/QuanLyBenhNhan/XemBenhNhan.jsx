import {
  Col, Form, Input, InputNumber, Modal, Radio, Row, Divider
} from "antd";
import { useEffect, useState } from "react";
import { fetchOneAccKH } from "../../../services/apiDoctor";
import "./style.css"
const PatientViewModal = ({ open, patientId, onCancel }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (patientId) {
      fetchPatientInfo(patientId);
    }
  }, [patientId]);

  const fetchPatientInfo = async (id) => {
    const res = await fetchOneAccKH(id);
    if (res?.data) {
      const bn = res.data;
      form.setFieldsValue({
        fullName: bn.hoTen,
        phoneNumber: bn.soDienThoai,
        gender: bn.gioiTinh,
        email: bn.email,
        address: bn.diaChi,
        ngaySinh: bn.ngaySinh,
      });
      setImageUrl(
        bn.hinhAnh
          ? `${import.meta.env.VITE_BACKEND_URL}/public/benhnhan/${bn.hinhAnh}`
          : ""
      );
    }
  };

  if (!patientId) return null;

  return (
    <Modal
      title="Xem thông tin bệnh nhân"
      open={open}
      onCancel={onCancel}
      footer={
        <Row justify="end">
          <button onClick={onCancel} style={{ padding: "6px 12px" }}>
            Đóng
          </button>
        </Row>
      }
      width={800}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Row gutter={[20, 10]}>
          <Col span={6}>
            <div style={{ textAlign: "center" }}>
              <img
                src={imageUrl || "/default-avatar.png"}
                alt="avatar"
                style={{ width: "100%", borderRadius: 8 }}
              />
            </div>
          </Col>
          <Col span={18}>
            <Row gutter={[20, 10]}>
              <Col span={12}>
                <Form.Item label="Họ tên" name="fullName">
                <div className="view-box">{form.getFieldValue("fullName")}</div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại" name="phoneNumber">
                     <div className="view-box">{form.getFieldValue("phoneNumber")}</div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                    <div className="view-box">{form.getFieldValue("email")}</div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ngày sinh" name="ngaySinh">
                    <div className="view-box">{form.getFieldValue("ngaySinh")}</div>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Địa chỉ" name="address">
                    <div className="view-box">{form.getFieldValue("address")}</div>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Giới tính" name="gender">
                  <Radio.Group disabled style={{ color: "#000" }}>
                    <Radio value={"0"}>Nam</Radio>
                    <Radio value={"1"}>Nữ</Radio>
                    <Radio value={"2"}>Khác</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
      </Form>
    </Modal>
  );
};

export default PatientViewModal;
