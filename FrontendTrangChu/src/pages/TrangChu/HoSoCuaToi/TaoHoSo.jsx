import {
    Avatar, Button, Col, Divider, message, Modal, notification, Form, DatePicker, Popconfirm,
    Input, Row, Select, Tooltip
  } from "antd";
  import Footer from "../../../components/TrangChu/Footer/Footer";
  import HeaderViewDoctor from "../../../components/TrangChu/Header/HeaderViewDoctor";
  import { IoHomeSharp } from "react-icons/io5";
  import { useNavigate } from "react-router-dom";
  import { CheckCircleTwoTone, CloseOutlined, ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
  import { MdAccessTimeFilled, MdNotifications } from "react-icons/md";
  import { BsCalendar2Date } from "react-icons/bs";
  import { useLocation } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { FaSave } from "react-icons/fa";
  import { taoHoSoBenhNhan } from "../../../services/apiChuyenKhoaBacSi";
  import React from 'react';
  import { useSelector } from "react-redux";
  import './taoHoSo.css';
  
  
  
  const TaoHoSo = () => {
    const acc = useSelector((state) => state.account.user);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { Option } = Select;
    const onFinish = async (values) => {
      if (!acc?.user?.maBenhNhan) {
        message.error("Không tìm thấy mã bệnh nhân!");
        return;
      }
  
      const data = {
        ...values,
        maBenhNhan: acc.user.maBenhNhan, // Sử dụng mã bệnh nhân từ redux
        gioiTinh: parseInt(values.gioiTinh), // 0: Nam, 1: Nữ
        ngaySinh: values.ngaySinh.format("YYYY-MM-DD"),
      };
      console.log("Dữ liệu gửi:", data);
      setLoading(true);
      try {
        const res = await taoHoSoBenhNhan(
          data.maBenhNhan,
          data.hoTenBenhNhan,
          data.ngaySinh,
          data.gioiTinh,
          data.ngheNghiep,
          data.CCCD,
          data.diaChi
        );
        console.log("Dữ liệu api trả về", res);
        if (res.success) {
          message.success(res.message);
          form.resetFields();
          setTimeout(() => {
            navigate("/user/ho-so-cua-toi");  // Điều hướng đến trang hồ sơ bệnh nhân
          }, 2000);
        } else {
          message.error(res.message || "Tạo hồ sơ thất bại!");
        }
      } catch (error) {
        console.error("Lỗi khi tạo hồ sơ:", error);
        message.error("Có lỗi xảy ra. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
        <HeaderViewDoctor />
        <Row style={{marginBottom: "150px"}}></Row>

        <div className="container">
          <p className="txt-title"><IoHomeSharp /> / Tạo hồ sơ bệnh nhân</p>
          <h2 className="form-title">TẠO MỚI HỒ SƠ</h2>
  
          <div className="form-wrapper">
            <div className="alert-info">
              Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất.
            </div>
            <p className="form-note">(*) Thông tin bắt buộc nhập</p>
  
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
            >
              <Row gutter={16}>
              <Form.Item name="maBenhNhan" hidden><Input hidden /></Form.Item>
                <Col span={12}>
                  <Form.Item
                    label="Họ tên"
                    name="hoTenBenhNhan"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    hasFeedback
                  >
                    <Input placeholder="VD: Nguyễn Thị A" />
                  </Form.Item>
                </Col>
  
                <Col span={12}>
                  <Form.Item
                    label="Ngày sinh (năm/tháng/ngày)"
                    name="ngaySinh"
                    rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
                  >
                    <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
  
                <Col span={12}>
                  <Form.Item
                    label="Giới tính"
                    name="gioiTinh"
                    rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
                  >
                    <Select placeholder="Chọn giới tính">
                      <Option value="0">Nam</Option>
                      <Option value="1">Nữ</Option>
                      <Option value="2">Khác</Option>
                    </Select>
                  </Form.Item>
                </Col>
  
                <Col span={12}>
                  <Form.Item
                    label="Nghề nghiệp"
                    name="ngheNghiep"
                    rules={[{ required: true, message: 'Vui lòng nhập nghề nghiệp!' }]}
                    hasFeedback
                  >
                    <Input placeholder="Nhập nghề nghiệp..." />
                  </Form.Item>
                </Col>
  
                <Col span={12}>
                  <Form.Item
                    label="Mã CCCD"
                    name="CCCD"
                    rules={[{ required: true, message: 'Vui lòng nhập mã CCCD!' }, { pattern: /^[0-9]{9,12}$/, message: 'CCCD không hợp lệ!' }]}
                    hasFeedback
                  >
                    <Input placeholder="Nhập mã định danh..." />
                  </Form.Item>
                </Col>
  
                <Col span={12}>
                  <Form.Item
                    label="Địa chỉ"
                    name="diaChi"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                  >
                    <Input placeholder="Nhập địa chỉ" />
                  </Form.Item>
                </Col>
  
                <Col span={24} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    icon={<FaSave size={20} />}
                    loading={loading}
                    style={{ width: "200px", background: "#2A95BF" }}
                  >
                    Tạo mới
                  </Button>
                  <Button onClick={() => form.resetFields()} className="btn-reset">Nhập lại</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <Row style={{marginBottom: "150px"}}></Row>

        <Footer />
      </>
    );
  };
  
  export default TaoHoSo;
  