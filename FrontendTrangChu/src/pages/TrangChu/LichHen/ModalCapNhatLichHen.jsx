import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message, Button } from "antd";
import moment from "moment";
import {
  fetchAllBacSi,
  fetchNgayLamViecByBacSi,
  getKhungGioByNgay,
  updateLichHen,
} from "../../../services/apiChuyenKhoaBacSi";

const ModalCapNhatLichHen = ({ open, onCancel, data, onReload }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [danhSachBacSi, setDanhSachBacSi] = useState([]);
  const [danhSachNgayKham, setDanhSachNgayKham] = useState([]);
  const [danhSachKhungGio, setDanhSachKhungGio] = useState([]);

  useEffect(() => {
    if (open) {
      fetchDanhSachBacSi();
    }
  }, [open]);

  useEffect(() => {
    if (data) {
      const { maBacSi, lyDoKham, ngayKham, maKhungGio, hinhThucKham } = data;

      form.setFieldsValue({
        maBacSi,
        lyDoKham,
        hinhThucKham,
        ngayKham: moment(ngayKham).format("YYYY-MM-DD"),
        maKhungGio,
      });

      if (maBacSi && hinhThucKham) {
        fetchNgayKham(maBacSi, hinhThucKham, ngayKham);
      }

      if (maBacSi && ngayKham && hinhThucKham) {
        fetchKhungGio(maBacSi, hinhThucKham, ngayKham, true);
      }
    } else {
      form.resetFields();
      setDanhSachNgayKham([]);
      setDanhSachKhungGio([]);
    }
  }, [data, form]);

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

  const fetchNgayKham = async (maBacSi, hinhThucKham, ngayKhamDaChon = null) => {
    try {
      const res = await fetchNgayLamViecByBacSi(maBacSi, hinhThucKham);
      if (Array.isArray(res)) {
        const ngayHienTai = moment().startOf("day");
        let ngayHopLe = res.filter((ngay) =>
          moment(ngay, "YYYY-MM-DD").isSameOrAfter(ngayHienTai)
        );

        if (ngayKhamDaChon && !ngayHopLe.includes(ngayKhamDaChon)) {
          ngayHopLe = [ngayKhamDaChon, ...ngayHopLe];
        }

        setDanhSachNgayKham(ngayHopLe);

        if (!ngayHopLe.includes(ngayKhamDaChon)) {
          form.setFieldsValue({ ngayKham: undefined, maKhungGio: undefined });
          setDanhSachKhungGio([]);
        }
      } else {
        setDanhSachNgayKham([]);
        setDanhSachKhungGio([]);
      }
    } catch (err) {
      message.error("Không thể tải ngày khám");
    }
  };

  const fetchKhungGio = async (maBacSi, hinhThucKham, ngay, isInitialLoad = false) => {
    try {
      const res = await getKhungGioByNgay(maBacSi, hinhThucKham, ngay, data?.maLich);
      if (Array.isArray(res)) setDanhSachKhungGio(res);
      else setDanhSachKhungGio([]);

      if (!isInitialLoad) {
        form.setFieldsValue({ maKhungGio: undefined });
      }
    } catch (err) {
      message.error("Không thể tải khung giờ");
    }
  };

  const handleBacSiChange = (maBacSi) => {
    const hinhThucKham = form.getFieldValue("hinhThucKham");
    if (maBacSi && hinhThucKham) {
      fetchNgayKham(maBacSi, hinhThucKham);
      form.setFieldsValue({ ngayKham: undefined, maKhungGio: undefined });
      setDanhSachKhungGio([]);
    } else {
      form.setFieldsValue({ ngayKham: undefined, maKhungGio: undefined });
      setDanhSachNgayKham([]);
      setDanhSachKhungGio([]);
    }
  };

  const handleHinhThucKhamChange = (hinhThucKham) => {
    const maBacSi = form.getFieldValue("maBacSi");
    if (maBacSi && hinhThucKham) {
      fetchNgayKham(maBacSi, hinhThucKham);
      form.setFieldsValue({ ngayKham: undefined, maKhungGio: undefined });
      setDanhSachKhungGio([]);
    } else {
      form.setFieldsValue({ ngayKham: undefined, maKhungGio: undefined });
      setDanhSachNgayKham([]);
      setDanhSachKhungGio([]);
    }
  };

  const handleNgayChange = (ngayStr) => {
    const maBacSi = form.getFieldValue("maBacSi");
    const hinhThucKham = form.getFieldValue("hinhThucKham");
    if (maBacSi && ngayStr && hinhThucKham) {
      fetchKhungGio(maBacSi, hinhThucKham, ngayStr);
    } else {
      form.setFieldsValue({ maKhungGio: undefined });
      setDanhSachKhungGio([]);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        maLich: data.maLich,
        maBacSi: values.maBacSi,
        maKhungGio: values.maKhungGio,
        ngayKham: values.ngayKham,
        lyDoKham: values.lyDoKham,
        hinhThucKham: values.hinhThucKham,
      };

      setLoading(true);
      await updateLichHen(
        payload.maLich,
        payload.maBacSi,
        payload.maKhungGio,
        payload.ngayKham,
        payload.lyDoKham,
        payload.hinhThucKham
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
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
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
          label="Hình thức khám"
          name="hinhThucKham"
          rules={[{ required: true, message: "Vui lòng chọn hình thức khám" }]}
        >
          <Select onChange={handleHinhThucKhamChange} placeholder="Chọn hình thức khám">
            <Select.Option value="Trực tuyến">Trực tuyến</Select.Option>
            <Select.Option value="Chuyên khoa">Chuyên khoa</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Ngày khám"
          name="ngayKham"
          rules={[{ required: true, message: "Vui lòng chọn ngày khám" }]}
        >
          <Select
            placeholder="Chọn ngày khám"
            onChange={handleNgayChange}
            disabled={danhSachNgayKham.length === 0}
          >
            {danhSachNgayKham.map((ngay) => (
              <Select.Option key={ngay} value={ngay}>
                {moment(ngay, "YYYY-MM-DD").format("DD/MM/YYYY")}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Khung giờ"
          name="maKhungGio"
          rules={[{ required: true, message: "Vui lòng chọn khung giờ" }]}
        >
          <Select placeholder="Chọn khung giờ" disabled={danhSachKhungGio.length === 0}>
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
