import {
  Checkbox, Col, Divider, Form, Input, InputNumber, message,
  Modal, notification, Radio, Row, Select, Upload, DatePicker, Button
} from "antd";
import { useEffect, useState } from "react";
import {
  callUploadDoctorImg, fetchAllChuyenKhoa, themBacSi
} from "../../../services/apiDoctor";
import { fetchAllVaiTro } from "../../../services/roleAPI";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./style.css";
import dayjs from "dayjs";

const CreateDoctor = ({ openCreateDoctor, setOpenCreateDoctor, fetchListDoctor }) => {
  const [form] = Form.useForm();
  const [dataChuyenKhoa, setDataChuyenKhoa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);
  const [listVaiTro, setListVaiTro] = useState([]);

  useEffect(() => {
    loadRoles();
    fetchAllChuyenKhoaDoctor();
    form.setFieldsValue({ gender: 0 }); // default male
  }, []);

  const fetchAllChuyenKhoaDoctor = async () => {
    try {
      const res = await fetchAllChuyenKhoa('page=1&limit=1000');
      if (res && res.data) setDataChuyenKhoa(res.data);
    } catch (error) {
      console.error('Lỗi fetch chuyên khoa:', error);
    }
  };

  const loadRoles = async () => {
    try {
      const res = await fetchAllVaiTro();
      if (res?.data) {
        setListVaiTro(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi load vai trò:", error);
    }
  };

  const handleCreateDoctor = async (values) => {
    if (!imageUrl) {
      notification.error({
        message: 'Lỗi validate',
        description: 'Vui lòng upload hình ảnh',
      });
      return;
    }

    const hinhAnh = imageUrl.split('/').pop();
const payload = {
        hoTen: values.hoTen,
        gioiTinh: values.gender,
        ngaySinh: values.ngaySinh ? values.ngaySinh.format("YYYY-MM-DD") : null,
        soDienThoai: values.phoneNumber,
        email: values.email,
        diaChi: values.address,
        giaKham: values.giaKhamVN,
        hinhAnh: hinhAnh,
        moTa: values.mota,
        maKhoa: values.chuyenKhoaId,
        username: values.username,
        matKhau: values.password,
        maVaiTro: values.vaiTro   
};
console.log(payload);


    try {
      const res = await themBacSi(
  payload.hoTen,
  payload.gioiTinh,
  payload.ngaySinh,
  payload.soDienThoai,
  payload.email,
  payload.diaChi,
  payload.giaKham,
  payload.hinhAnh,
  payload.moTa,
  payload.maKhoa,
  payload.username,
  payload.matKhau,
  payload.maVaiTro
);
console.log("API Response: ", res);
      if (res.success) {
        message.success('Tạo mới thông tin bác sĩ thành công');
        form.resetFields();
        setImageUrl('');
        setOpenCreateDoctor(false);
        await fetchListDoctor();
      } else {
        notification.error({
          message: 'Lỗi tạo bác sĩ',
          description: res.message || 'Có lỗi xảy ra khi tạo bác sĩ',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi tạo bác sĩ',
        description: error.message || 'Có lỗi xảy ra khi tạo bác sĩ',
      });
    }
  };

  const handleCancel = () => {
    setOpenCreateDoctor(false);
    form.resetFields();
    setImageUrl('');
  };

  const handleUploadFileImage = async ({ file, onSuccess, onError }) => {
    setLoading(true);
    try {
      const res = await callUploadDoctorImg(file);
      if (res?.url) {
        setImageUrl(res.url);
        onSuccess("ok");
        message.success('Upload thành công');
      } else {
        onError('Upload thất bại');
        message.error('Upload thất bại');
      }
    } catch (error) {
      onError(error);
      message.error('Upload thất bại');
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Chỉ chấp nhận JPG/PNG');
    }
    return isJpgOrPng;
  };

  const handleRemoveFile = () => {
    setImageUrl('');
    message.success('Đã xoá ảnh');
  };

  return (
<Modal
  title="Tạo mới thông tin bác sĩ"
  style={{ top: 20 }}
  open={openCreateDoctor}
  onCancel={handleCancel}
  width={900}
  maskClosable={false}
  footer={
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      <Button onClick={handleCancel}>Huỷ</Button>
      <Button type="primary" onClick={() => form.submit()}>Tạo mới</Button>
    </div>
  }
>

      <Divider />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateDoctor}
        autoComplete="off"
      >
        <Row gutter={[20, 10]}>
          <Col span={6}>
            <Form.Item label="Hình ảnh" name="image">
              <Upload
                name="file"
                listType="picture-card"
                maxCount={1}
                customRequest={handleUploadFileImage}
                beforeUpload={beforeUpload}
                onRemove={handleRemoveFile}
                showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
              >
                {imageUrl ? null : (loading ? <LoadingOutlined /> : <PlusOutlined />)}
                <div style={{ marginTop: 8 }}>Upload</div>
              </Upload>
              <Modal
                open={isImagePreviewVisible}
                footer={null}
                onCancel={() => setIsImagePreviewVisible(false)}
              >
                <img alt="avatar" style={{ width: '100%' }} src={imageUrl} />
              </Modal>
            </Form.Item>
          </Col>

          <Col span={18}>
            <Row gutter={[20, 10]}>
              <Col span={12}>
                <Form.Item label="Họ tên" name="hoTen" rules={[
                                { required: true, message: "Vui lòng nhập họ tên!" },
                                { pattern: /^[A-Za-zÀ-ỹ\s]+$/, message: "Không được nhập số, ký tự đặc biệt!" },
                            ]}>
                  <Input placeholder="Nhập họ tên" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Số điện thoại" name="phoneNumber" rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  { pattern: /^0\d{9}$/, message: 'SĐT phải bắt đầu bằng 0 và đủ 10 số' },
                ]}>
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Username" name="username" rules={[
                            { required: true, message: 'Vui lòng nhập username!' },
                            {
                            pattern: /^[a-zA-Z0-9@_]+$/,
                            message: 'Username chỉ được chứa chữ cái, số, @ và _',
                            },
                        ]}>
                  <Input placeholder="Nhập username" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Mật khẩu" name="password" rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  { pattern: /^\S{6,}$/, message: 'Tối thiểu 6 ký tự, không có dấu cách' },
                ]}>
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Giới tính" name="gender">
                  <Radio.Group>
                    <Radio value={0}>Nam</Radio>
                    <Radio value={1}>Nữ</Radio>
                    <Radio value={2}>Khác</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col span={12}>
                        <Form.Item
                        label="Ngày sinh"
                        name="ngaySinh"
                        rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
                        >
                        <DatePicker
                            format="DD/MM/YYYY"
                            style={{ width: "100%" }}
                            placeholder="Chọn ngày sinh"
                            disabledDate={(current) => current && current > dayjs().endOf('day')}
                        />
                        </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Email" name="email" rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                    message: 'Email phải có đuôi @gmail.com',
                                },
                            ]}>
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                  <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Giá khám (VN)" name="giaKhamVN" rules={[{ required: true, message: 'Vui lòng nhập giá khám!' }]}>
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    placeholder="Nhập giá khám"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Vai trò" name="vaiTro" rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
                  <Select placeholder="Chọn vai trò">
                    {listVaiTro.map((role) => (
                      <Select.Option key={role.maVaiTro} value={role.maVaiTro}>
                        {role.tenVaiTro}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Chuyên khoa" name="chuyenKhoaId" rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa!' }]}>
                  <Select placeholder="Chọn chuyên khoa">
                    {dataChuyenKhoa?.map((ck, index) => (
                      <Select.Option key={ck?.maKhoa || `ck-${index}`} value={ck?.maKhoa}>
                        {ck?.tenKhoa}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Mô tả chi tiết" name="mota">
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      form.setFieldsValue({ mota: data });
                    }}
                    config={{
                      toolbar: [
                        'heading', '|',
                        'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
                        '|', 'undo', 'redo'
                      ]
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateDoctor;
