import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Form, Input, message, Modal, notification, Radio, Row, Upload } from "antd"
import { useEffect, useState } from "react"
import { FaSave } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { doiThongTinKH, fetchOneAccKH } from "../../../services/api"
import { useNavigate } from "react-router-dom"
import { doLogoutAction } from "../../../redux/account/accountSlice"
import { v4 as uuidv4 } from "uuid";

const UpdateBenhNhan = (props) => {
    const { openUpdateBenhNhan, setOpenModalThongTinCaNhan } = props;

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [genderDoctor, setGenderDoctor] = useState(true);
    const [dataAccKH, setDataAccKH] = useState(null);
    const acc = useSelector((state) => state.account.user);

    // console.log("dataAccKH: ", dataAccKH);
    // const fetchOneAcc = async () => {
    //     try {
    //         let id = `id=${acc._id}`;
    //         console.log("Gửi request API với id:", id);
    
    //         const res = await fetchOneAccKH(id);
    //         console.log("Dữ liệu trả về từ API:", res);
    
    //         if (res?.data && res.data.length > 0) {
    //             setDataAccKH(res.data[0]);
    //         } else {
    //             console.warn("Không có dữ liệu người dùng từ API");
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi lấy dữ liệu tài khoản:", error);
    //     }
    // };
    const fetchOneAcc = async () => {
        if (!acc?.user?.maBenhNhan) {
            return notification.error({
                message: "Lỗi dữ liệu",
                description: "Không tìm thấy thông tin tài khoản!",
            });
        }
    
        const query = { maBenhNhan: acc.user.maBenhNhan };
        console.log("Fetching account data with query:", query); // Log query to check the request data
    
        try {
            const res = await fetchOneAccKH(query.maBenhNhan);
            console.log("API Response:", res); // Log the API response to check its structure
            console.log(res.data);
            // Kiểm tra sự tồn tại của res và res.data
            if (res) {
                setDataAccKH(res.data); // Lưu trữ đúng dữ liệu vào state
            } else {
                notification.error({
                    message: "Lỗi lấy dữ liệu tài khoản",
                    description: "Không thể tải thông tin tài khoản từ hệ thống.",
                });
            }
        } catch (error) {
            console.error("Lỗi khi gọi API lấy thông tin tài khoản:", error);
            notification.error({
                message: "Lỗi hệ thống",
                description: "Có lỗi xảy ra khi lấy thông tin tài khoản.",
            });
        }
    };
    const cancel = () => {
        setOpenModalThongTinCaNhan(false);
        form.resetFields();
    };


    

    useEffect(() => {
        if (acc.maBenhNhan) {
            fetchOneAcc();
        }
    }, [acc.maBenhNhan]);

    useEffect(() => {
        if (dataAccKH) {
            if (dataAccKH.image) {
                setFileList([
                    {
                        uid: uuidv4(),
                        name: dataAccKH.image,
                        status: "done",
                        url: `${import.meta.env.VITE_BACKEND_URL}/uploads/${dataAccKH.image}`,
                    },
                ]);
            }

            const init = {
                _idAcc: dataAccKH?.maBenhNhan,
                hoTen: dataAccKH?.hoTen,
                gioiTinh: dataAccKH?.gioiTinh,
                soDienThoai: dataAccKH?.soDienThoai,
                email: dataAccKH?.email,
                diaChi: dataAccKH?.diaChi,
                hinhAnh: dataAccKH?.hinhAnh,
            };
            form.setFieldsValue(init);
        }
    }, [dataAccKH]);

    const handleUpdateBenhNhan = async (values) => {
        console.log("Giá trị form:", values);

        if (!imageUrl) {
            notification.error({
                message: "Lỗi validate",
                description: "Vui lòng upload hình ảnh",
            });
            return;
        }

        const hinhAnh = imageUrl.split("/").pop();
        console.log("hinhanh: ", hinhAnh);

        const res = await doiThongTinKH({
            _id: values._idAcc,
            hoTen: values.hoTen,
            gioiTinh: values.gioiTinh,
            soDienThoai: values.soDienThoai,
            email: values.email,
            diaChi: values.diaChi,
            hinhAnh,
        });

        if (res?.success) {
            message.success(res.message);
            cancel();
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res?.message || "Không thể cập nhật thông tin",
            });
        }
    };

    return (
        <Modal
            title="Thông tin của bạn"
            open={openUpdateBenhNhan}
            style={{ top: 30 }}
            onCancel={cancel}
            footer={null}
            width={700}
            maskClosable={false}
        >
            <Divider />
            <Form form={form} layout="vertical" onFinish={handleUpdateBenhNhan}>
                <Row gutter={[20, 10]}>
                    <Col span={24}>
                        <Form.Item name="_idAcc" hidden>
                            <Input hidden />
                        </Form.Item>
                        <Form.Item label="Họ tên" name="hoTen" rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Giới tính" name="gioiTinh" rules={[{ required: true }]}>
                            <Radio.Group
                                onChange={(e) => setGenderDoctor(e.target.value)}
                                value={genderDoctor}
                            >
                                <Radio value={true}>Nam</Radio>
                                <Radio value={false}>Nữ</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Số Điện Thoại" name="soDienThoai" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Địa chỉ" name="diaChi" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Button type="primary" htmlType="submit" icon={<FaSave />}>
                            Cập nhật thông tin
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default UpdateBenhNhan;
