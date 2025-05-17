import {
  Button, Checkbox, Col, Divider, Form, Input, InputNumber, message, Modal,
  notification, Radio, Row, Upload
} from "antd";
import { useEffect, useRef, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from "react-redux";
import {
  fetchBacSiByMaBS, fetchAllChuyenKhoa, updateDoctor, callUploadDoctorImg
} from "../../../services/apiDoctor";

const DoctorEditModal = ({ open, doctorId, onCancel, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [genderDoctor, setGenderDoctor] = useState(null);
  const [dataChuyenKhoa, setDataChuyenKhoa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const editorRef = useRef(null);
  const [currentDoctorId, setCurrentDoctorId] = useState(null);
  const user = useSelector(state => state.accountDoctor.user);

  useEffect(() => {
    if (doctorId) {
      fetchDoctorInfo(doctorId);
    }
  }, [doctorId]);

  useEffect(() => {
    fetchAllChuyenKhoaDoctor();
  }, []);

  const fetchDoctorInfo = async (doctorId) => {
    const res = await fetchBacSiByMaBS(doctorId);
    if (res?.data) {
      const doctor = res.data;
      setCurrentDoctorId(doctorId);
      form.setFieldsValue({
        fullName: doctor.hoTen,
        phoneNumber: doctor.soDienThoai,
        gender: doctor.gioiTinh,
        email: doctor.email,
        address: doctor.diaChi,
        giaKham: doctor.giaKham,
        mota: doctor.moTa || "",
        chuyenKhoaId: doctor.maKhoa,
        username: doctor.username || "",
        password: doctor.password || "********", // nếu ko có pass thật thì hiển thị ****
      });
      setGenderDoctor(doctor.gioiTinh);
      setImageUrl(doctor.hinhAnh ? `${import.meta.env.VITE_BACKEND_URL}/public/bacsi/${doctor.hinhAnh}` : "");
      if (doctor.hinhAnh) {
        setFileList([{
          uid: "-1",
          name: doctor.hinhAnh,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/public/bacsi/${doctor.hinhAnh}`,
        }]);
      }
    }
  };

  const fetchAllChuyenKhoaDoctor = async () => {
    const res = await fetchAllChuyenKhoa();
    if (res && res.data) {
      setDataChuyenKhoa(res.data);
    }
  };

  const handleUploadFileImage = async ({ file }) => {
    setLoading(true);
    try {
      const res = await callUploadDoctorImg(file);
      if (res.success) {
        const url = `${import.meta.env.VITE_BACKEND_URL}${res.url}`;
        setImageUrl(url);
        setFileList([{ uid: "-1", name: file.name, status: "done", url }]);
        message.success("Tải ảnh lên thành công!");
      } else {
        throw new Error(res.message || "Tải ảnh lên thất bại!");
      }
    } catch (err) {
      message.error(err.message || "Lỗi khi tải ảnh lên!");
    }
    setLoading(false);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải lên hình ảnh JPG/PNG!");
    }
    return isJpgOrPng;
  };

  const handleRemoveFile = () => {
    setFileList([]);
    setImageUrl("");
    message.success("Ảnh đã được xóa");
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (!imageUrl) {
        notification.error({ message: "Lỗi", description: "Vui lòng upload hình ảnh" });
        return;
      }
      const hinhAnh = imageUrl.split("/").pop();
      setIsSubmit(true);

      // Gửi request cập nhật, giữ nguyên username và password (nếu cần)
      const res = await updateDoctor(
        currentDoctorId,
        values.fullName,
        values.gender,
        values.phoneNumber,
        values.email,
        values.address,
        values.giaKham,
        hinhAnh,
        values.mota || '',
        values.chuyenKhoaId,
        values.username,  // Nếu backend cần username gửi lên
        values.password   // Nếu backend cần password gửi lên (thường password không update ở đây)
      );

      if (res.status) {
        message.success(res.message);
        onUpdateSuccess?.();
      } else {
        notification.error({ message: "Lỗi", description: res.error });
      }
    } catch (error) {
      notification.error({ message: "Lỗi", description: "Có lỗi xảy ra, vui lòng thử lại!" });
    }
    setIsSubmit(false);
  };

  if (!doctorId) return null;

  return (
    <Modal
      title="Chỉnh sửa thông tin bác sĩ"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Form form={form} name="doctorId" layout="vertical">
        <Row gutter={[20, 10]}>
          <Col span={6}>
            <Form.Item label="Hình ảnh" name="image">
              <Upload
                listType="picture-card"
                maxCount={1}
                customRequest={handleUploadFileImage}
                beforeUpload={beforeUpload}
                onRemove={handleRemoveFile}
                fileList={fileList}
              >
                <div>{loading ? <LoadingOutlined /> : <PlusOutlined />} Upload</div>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={18}>
            <Row gutter={[20, 10]}>
              <Col span={12}>
                <Form.Item label="Họ tên" name="fullName" rules={[
                                                { required: true, message: "Vui lòng nhập tên vai trò!" },
                                                { pattern: /^[A-Za-zÀ-ỹ\s]+$/, message: "Không được nhập số!" },
                                            ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại" name="phoneNumber" rules={[
                                { required: true, message: "Vui lòng nhập số điện thoại!" },
                                {
                                    pattern: /^0\d{9}$/,
                                    message: "Số điện thoại phải có 10 chữ số, bắt đầu bằng 0",
                                },
                            ]}>
                  <Input />
                </Form.Item>
              </Col>

              {/* Trường username không được chỉnh sửa */}
              <Col span={12}>
                <Form.Item label="Tên đăng nhập" name="username">
                  <Input disabled />
                </Form.Item>
              </Col>

              {/* Trường password không được chỉnh sửa */}
              <Col span={12}>
                <Form.Item label="Mật khẩu" name="password">
                  <Input.Password disabled />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Giới tính" name="gender">
                  <Radio.Group>
                    <Radio value={0}>Nam</Radio>
                    <Radio value={1}>Nữ</Radio>
                    <Radio value={2}>Khác</Radio>
                  </Radio.Group>
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
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Giá khám" name="giaKham" rules={[{ required: true, message: "Vui lòng nhập giá khám" }]}>
                  <InputNumber
                    style={{ width: "100%" }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    addonAfter="VNĐ"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Chuyên khoa" name="chuyenKhoaId">
                  <Radio.Group>
                    {dataChuyenKhoa?.map((ck, index) => (
                      <Radio key={ck?.maKhoa || `ck-${index}`} value={ck?.maKhoa}>
                        {ck?.tenKhoa}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả" name="mota">
                  <CKEditor
                    editor={ClassicEditor}
                    data={form.getFieldValue('mota') || ''}
                    onReady={(editor) => {
                      editorRef.current = editor;
                    }}
                    onChange={(event, editor) => {
                      form.setFieldsValue({ mota: editor.getData() });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Row justify="end">
          <Button type="default" onClick={onCancel} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type="primary" onClick={handleSave} loading={isSubmit}>
            Cập nhật
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default DoctorEditModal;
