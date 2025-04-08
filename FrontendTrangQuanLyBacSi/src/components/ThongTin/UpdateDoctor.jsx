import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Checkbox, Col, Divider, Form, Input, InputNumber, message, Modal, notification, Radio, Row, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchBacSiByMaBS, fetchAllChuyenKhoa, updateDoctor, callUploadDoctorImg } from "../../services/apiDoctor";
import { FaSave } from "react-icons/fa";
import './scss.scss'

const UpdateDoctor = () => {
    const [form] = Form.useForm();
    const editorRef = useRef(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataChuyenKhoa, setDataChuyenKhoa] = useState([]);
    const [dataUpdateDoctor, setDataUpdateDoctor] = useState({});
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [genderDoctor, setGenderDoctor] = useState(null);
    const user = useSelector((state) => state.accountDoctor.user);

    useEffect(() => {
        if (user?.maBacSi) {
            fetchDoctorInfo(user.maBacSi);
            fetchAllChuyenKhoaDoctor();
        }
    }, [user]);

    const fetchDoctorInfo = async (maBacSi) => {
        let res = await fetchBacSiByMaBS(maBacSi);
        console.log("API bacsi:", res); // Kiểm tra dữ liệu trả về từ API
        if (res && res.data) {
            setDataUpdateDoctor(res.data);
        }
        console.log("Data Update Doctor:", dataUpdateDoctor); // Kiểm tra dữ liệu cập nhật bác sĩ
        console.log("Data Update Doctor ID:", dataUpdateDoctor.maBacSi); // Kiểm tra ID bác sĩ
    };

    useEffect(() => {
        if (dataUpdateDoctor.maBacSi) {
            const chuyenKhoaId = dataUpdateDoctor.maKhoa;
    
            if (dataUpdateDoctor.hinhAnh) {
                setFileList([{
                    uid: "-1",
                    name: dataUpdateDoctor.hinhAnh,
                    status: "done",
                    url: `${import.meta.env.VITE_BACKEND_URL}/public/bacsi/${dataUpdateDoctor.hinhAnh}`,
                }]);
                setImageUrl(dataUpdateDoctor.hinhAnh);
            }
    
            // Ensure form.setFieldsValue is only called once the dataUpdateDoctor is populated
            form.setFieldsValue({
                idbacsi: dataUpdateDoctor.maBacSi,   // Ensure doctor ID is set correctly
                fullName: dataUpdateDoctor.hoTen,
                gender: dataUpdateDoctor.gioiTinh,
                phoneNumber: dataUpdateDoctor.soDienThoai,
                email: dataUpdateDoctor.email,
                address: dataUpdateDoctor.diaChi,
                giaKham: dataUpdateDoctor.giaKham,
                mota: dataUpdateDoctor.moTa || "",
                chuyenKhoaId,
            });
    
            setGenderDoctor(dataUpdateDoctor.gender);
    
            if (editorRef.current) {
                editorRef.current.setData(dataUpdateDoctor.moTa || "");
            }
        }
    }, [dataUpdateDoctor, form]);  // Add `form` to the dependency array to ensure `form.setFieldsValue` works correctly
    

    const fetchAllChuyenKhoaDoctor = async () => {
        let res = await fetchAllChuyenKhoa();
        console.log("API Response:", res); // Kiểm tra dữ liệu trả về từ API
        if (res && res.data) {
            setDataChuyenKhoa(res.data);
        }
    };

    const handleUploadFileImage = async ({ file }) => {
        setLoading(true);
        try {
            const res = await callUploadDoctorImg(file);
            console.log("Upload Response:", res); // Kiểm tra dữ liệu trả về từ API
            console.log("File Name:", res.filename); // Log the file name to the console
            console.log("File url:", res.url); // Log the file type to the console
            console.log("File success:", res.success); // Log the file size to the console
            console.log("File Status:", res.status); // Log the file status to the console
    
            if (res.success) {    
                const imageUrl = `${import.meta.env.VITE_BACKEND_URL}${res.url}`;
    
                setImageUrl(imageUrl);  // Store the filename for future reference
                setFileList([{ 
                    uid: "-1", 
                    name: file.name, 
                    status: "done", 
                    url: imageUrl  // Use the absolute URL for image preview
                }]);
                console.log("imgURL:", imageUrl); // Log the image URL to the console
                message.success("Tải ảnh lên thành công!");
            } else {
                throw new Error(res.message || "Tải ảnh lên thất bại!");
            }
        } catch (error) {
            message.error(error.message || "Lỗi khi tải ảnh lên!");
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

    const handleRemoveFile = (file) => {
        setFileList([]);
        setImageUrl("");
        message.success(`${file.name} đã được xóa`);
    };

    const handleUpdateDoctor = async (values) => {
        console.log("Form Values:", values);
        console.log("Doctor ID:", values.id);  // Ensure doctor ID is correct
    
        if (!imageUrl) {
            notification.error({ message: "Lỗi", description: "Vui lòng upload hình ảnh" });
            return;
        }
    
        const hinhAnh = imageUrl.split("/").pop(); // Extract filename from the image URL
        setIsSubmit(true);
    
        // Logging the data being passed to updateDoctor
        console.log("Updating Doctor with data:", {
            id: values.idbacsi, 
            fullName: values.fullName, 
            gender: values.gender, 
            phoneNumber: values.phoneNumber,
            email: values.email, 
            address: values.address, 
            giaKham: values.giaKham, 
            hinhAnh: hinhAnh, 
            mota: values.mota, 
            chuyenKhoaId: values.chuyenKhoaId
        });
    
        try {
        const res = await updateDoctor(
            values.idbacsi, values.fullName, values.gender, values.phoneNumber, 
            values.email, values.address, values.giaKham, hinhAnh, values.mota || '', values.chuyenKhoaId
        );
        
        if (res.status) {
            message.success(res.message);
            fetchDoctorInfo(user.maBacSi); // Refresh the doctor info
        } else {
            notification.error({ message: "Lỗi", description: res.error });
        }
    } catch (error) {
        console.error("Error updating doctor:", error);
        notification.error({ message: "Lỗi", description: "Có lỗi xảy ra, vui lòng thử lại!" });
    }
        
        if (res.status) {
            message.success(res.message);
            fetchDoctorInfo(user.maBacSi);
        } else {
            notification.error({ message: "Lỗi", description: res.error });
        }
    
        setIsSubmit(false);
    };
 
    return (
        
        <Row>
            <Col span={24} style={{ padding: "0 0 20px", fontSize: "18px", textAlign: "center" }}>
                <span style={{ fontWeight: "500", color: "navy" }}>THÔNG TIN CÁ NHÂN</span>
            </Col>
            <Col span={24}>
                <Form form={form} name="bacsi" layout="vertical" onFinish={handleUpdateDoctor}>
                    <Row gutter={[20, 5]}>
                        <Col span={2}><Form.Item label="MBS" name="idbacsi" style={{display: 'none'}}></Form.Item></Col>
                    </Row>
                    <Row gutter={[20, 5]}>
                        <Col span={5}><Form.Item label="Họ tên" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}><Input /></Form.Item></Col>
                        <Col span={5}><Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}><Input /></Form.Item></Col>
                        <Col span={6}><Form.Item label="Giới tính" name="gender"><Radio.Group value={genderDoctor} onChange={(e) => setGenderDoctor(e.target.value)}><Radio value={"0"}>Nam</Radio><Radio value={"1"}>Nữ</Radio><Radio value={"2"}>Khác</Radio></Radio.Group></Form.Item></Col>
                    </Row>
                    <Row gutter={[20, 5]}>
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
                    </Row>
                    <Row gutter={[20, 5]}>
                        <Col span={12}><Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}><Input /></Form.Item></Col>
                        <Col span={12}><Form.Item label="Địa chỉ liên hệ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}><Input /></Form.Item></Col>
                    </Row>
                    <Row gutter={[20, 5]}>
                        <Col span={12}><Form.Item label="Giá khám" name="giaKham" rules={[{ required: true, message: 'Vui lòng nhập Giá khám!' }]}><InputNumber style={{ width: "100%" }} min={1} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} addonAfter={"VNĐ"} /></Form.Item></Col>
                        <Col span={12}><Form.Item label="Chuyên khoa" name="chuyenKhoaId"><Radio.Group>{dataChuyenKhoa.map((ck) => (<Radio key={ck.maKhoa} value={ck.maKhoa}>{ck.tenKhoa}</Radio>))}</Radio.Group></Form.Item></Col>
                    </Row>
                    <Row><Col span={24}><Form.Item label="Mô tả" name="mota">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={form.getFieldValue('mota') || ''}
                                                onChange={(event, editor) => form.setFieldsValue({ mota: editor.getData() })}
                                            />
                                        </Form.Item></Col></Row>
                    <Col span={24} style={{ display: "flex", justifyContent: "center" }}><Button onClick={() => form.submit()} type="primary" size="large" icon={<FaSave size={25} />}  style={{ width: "200px", height: "50px", background:"#2A95BF"}}>Đổi thông tin</Button></Col>
                    <Divider />
                </Form>
            </Col>
        </Row>
    );
};
export default UpdateDoctor;
