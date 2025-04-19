import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, DatePicker, message, Button } from "antd";
import moment from "moment";
import {
  fetchAllBacSi,
  fetchKhungGioBacSiByNgay,
  updateLichHen,
} from "../../../services/apiChuyenKhoaBacSi";

const ModalCapNhatLichHen = ({ open, onCancel, data, onReload }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [danhSachBacSi, setDanhSachBacSi] = useState([]);
  const [danhSachKhungGio, setDanhSachKhungGio] = useState([]);

  useEffect(() => {
    if (open) {
      fetchDanhSachBacSi();
    }
  }, [open]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        maBacSi: data.maBacSi,
        lyDoKham: data.lyDoKham,
        ngayKham: moment(data.ngayKham),
        maKhungGio: data.maKhungGio,
      });

      if (data.maBacSi && data.ngayKham) {
        fetchKhungGio(data.maBacSi, moment(data.ngayKham).format("YYYY-MM-DD"));
      }
    }
  }, [data]);

  const fetchDanhSachBacSi = async () => {
    try {
      const res = await fetchAllBacSi();
      if (Array.isArray(res.data)) setDanhSachBacSi(res.data);
      else setDanhSachBacSi([]);
    } catch (err) {
      console.error(err);
      message.error("Không thể tải danh sách bác sĩ");
    }
  };

  const fetchKhungGio = async (maBacSi, ngay) => {
    try {
      const res = await fetchKhungGioBacSiByNgay(maBacSi, ngay);
      if (Array.isArray(res)) setDanhSachKhungGio(res);
      else setDanhSachKhungGio([]);
    } catch (err) {
      message.error("Không thể tải khung giờ");
    }
  };

  const handleBacSiChange = (maBacSi) => {
    const ngayKham = form.getFieldValue("ngayKham");
    form.setFieldsValue({ maKhungGio: undefined });
    if (ngayKham) {
      fetchKhungGio(maBacSi, ngayKham.format("YYYY-MM-DD"));
    }
  };

  const handleNgayChange = (ngayMoment) => {
    const maBacSi = form.getFieldValue("maBacSi");
    form.setFieldsValue({ maKhungGio: undefined });
    if (maBacSi && ngayMoment) {
      fetchKhungGio(maBacSi, ngayMoment.format("YYYY-MM-DD"));
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        maLich: data.maLich,
        maBacSi: values.maBacSi,
        maKhungGio: values.maKhungGio,
        ngayKham: values.ngayKham.format("YYYY-MM-DD"),
        lyDoKham: values.lyDoKham,
      };

      setLoading(true);
      await updateLichHen(
        payload.maLich,
        payload.maBacSi,
        payload.maKhungGio,
        payload.ngayKham,
        payload.lyDoKham
      );
      message.success("Cập nhật thành công!");
      onCancel();
      onReload();
    } catch (error) {
      message.error("Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật lịch hẹn"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Cập nhật
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Bác sĩ"
          name="maBacSi"
          rules={[{ required: true, message: "Vui lòng chọn bác sĩ" }]}
        >
          <Select onChange={handleBacSiChange} placeholder="Chọn bác sĩ">
            {danhSachBacSi.map((bs) => (
              <Select.Option key={bs.maBacSi} value={bs.maBacSi}>
                {bs.hoTen}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ngày khám"
          name="ngayKham"
          rules={[{ required: true, message: "Vui lòng chọn ngày khám" }]}
        >
          <DatePicker
            onChange={handleNgayChange}
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
          />
        </Form.Item>

        <Form.Item
          label="Khung giờ"
          name="maKhungGio"
          rules={[{ required: true, message: "Vui lòng chọn khung giờ" }]}
        >
          <Select placeholder="Chọn khung giờ">
            {danhSachKhungGio.map((kg) => (
              <Select.Option key={kg.maKhungGio} value={kg.maKhungGio}>
                {kg.khungGio}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Lý do khám"
          name="lyDoKham"
          rules={[{ required: true, message: "Vui lòng nhập lý do khám" }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập lý do khám" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCapNhatLichHen;
