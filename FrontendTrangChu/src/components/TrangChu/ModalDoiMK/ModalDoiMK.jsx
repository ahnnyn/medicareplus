import { LoadingOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    message,
    Modal,
    notification,
    Row,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneAccKH, doiThongTinKH } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { doLogoutAction } from "../../../redux/account/accountSlice";
import bcrypt from "bcryptjs-react";
import { FaSave } from "react-icons/fa";

const ModalDoiMK = ({ openModalDoiMK, setOpenModalDoiMK }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formDoiMK] = Form.useForm();
    const [dataAccKH, setDataAccKH] = useState(null);
    const acc = useSelector((state) => state.account.user);
    const [loading, setLoading] = useState(false);

    console.log("dataAccKH: ", dataAccKH);
    console.log("Thông tin tài khoản:", acc);

    const cancel = () => {
        formDoiMK.resetFields();
        setOpenModalDoiMK(false);
    };
    console.log("Account ID:", acc?.user?.maBenhNhan);
    // if (!acc?.user?.maBenhNhan) {
    //     return notification.error({
    //         message: "Lỗi dữ liệu",
    //         description: "Không tìm thấy thông tin tài khoản!",
    //     });
    // }
    // Gọi API lấy thông tin tài khoản
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
    
    
    
    

    // Khi modal mở thì gọi lại thông tin tài khoản
    useEffect(() => {
        if (openModalDoiMK) {
            console.log("Modal opened. Fetching account data...");
            fetchOneAcc(); // Gọi API khi mở modal
        }
    }, [openModalDoiMK]); 


    useEffect(() => {
        console.log("Data Account has been updated:", dataAccKH); 
    }, [dataAccKH]); // This will log data when dataAccKH updates
    // Cập nhật thông tin lên form

    useEffect(() => {
        if (dataAccKH) {
            formDoiMK.setFieldsValue({
                _idAcc: dataAccKH.maBenhNhan,
                hoTen: dataAccKH.hoTen,
                soDienThoai: dataAccKH.soDienThoai,
                email: dataAccKH.email,
            });
        }
    }, [dataAccKH]);

    // Xử lý submit
    const onFinishDoiMK = async (values) => {
        const {
            _idAcc,
            hoTen,
            soDienThoai,
            email,
            password,
            passwordMoi,
            passwordMoiConfirm,
        } = values;

        if (!dataAccKH) {
            return notification.error({
                message: "Lỗi dữ liệu",
                description: "Không tìm thấy thông tin tài khoản!",
            });
        }

        if (passwordMoi !== passwordMoiConfirm) {
            return notification.error({
                message: "Mật khẩu mới không khớp",
                description: "Vui lòng kiểm tra lại mật khẩu mới và xác nhận.",
            });
        }

        const isMatch = await bcrypt.compare(password, dataAccKH.matKhau);
        if (!isMatch) {
            return notification.error({
                message: "Mật khẩu cũ không chính xác",
                description: "Vui lòng nhập lại mật khẩu cũ.",
            });
        }

        try {
            setLoading(true);
            const res = await doiThongTinKH(_idAcc, hoTen, email, soDienThoai, passwordMoi);
            if (res && res.data) {
                message.success("Đổi thông tin thành công. Vui lòng đăng nhập lại.");
                dispatch(doLogoutAction());
                navigate("/");
                setOpenModalDoiMK(false);
            } else {
                notification.error({
                    message: "Đổi thông tin thất bại!",
                    description: res.message || "Đã xảy ra lỗi.",
                });
            }
        } catch (error) {
            console.error("Lỗi cập nhật tài khoản:", error);
            notification.error({
                message: "Lỗi hệ thống",
                description: "Có lỗi xảy ra trong quá trình cập nhật.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Thông tin của bạn"
            open={openModalDoiMK}
            onCancel={cancel}
            footer={null}
            width={700}
            maskClosable={false}
        >
            <Divider />
            <Form form={formDoiMK} layout="vertical" onFinish={onFinishDoiMK}>
                <Row gutter={[20, 10]}>
                    <Form.Item name="_idAcc" hidden noStyle>
                        <Input type="hidden" />
                    </Form.Item>

                    <Col span={12}>
                        <Form.Item
                            label="Họ tên"
                            name="hoTen"
                            rules={[
                                { required: true, message: "Vui lòng nhập họ tên!" },
                                {
                                    pattern: /^[A-Za-zÀ-ỹ\s]+$/,
                                    message: "Không được nhập số!",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập họ tên của bạn" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Số điện thoại"
                            name="soDienThoai"
                            rules={[
                                { required: true, message: "Vui lòng nhập số điện thoại!" },
                                {
                                    pattern: /^0\d{9}$/,
                                    message: "SĐT phải có 10 chữ số, bắt đầu bằng 0",
                                },
                            ]}
                        >
                            <Input placeholder="Ví dụ: 0972138493" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Vui lòng nhập email!" },
                                { type: "email", message: "Email không hợp lệ!" },
                            ]}
                        >
                            <Input readOnly placeholder="Nhập email của bạn" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Mật khẩu cũ"
                            name="password"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu cũ" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Mật khẩu mới"
                            name="passwordMoi"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu mới" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Xác nhận mật khẩu mới"
                            name="passwordMoiConfirm"
                            rules={[
                                { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                            ]}
                        >
                            <Input.Password placeholder="Xác nhận mật khẩu mới" />
                        </Form.Item>
                    </Col>

                    <Col
                        span={24}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => !loading && formDoiMK.submit()}
                            icon={loading ? <LoadingOutlined /> : <FaSave size={25} />}
                            loading={loading}
                        >
                            Đổi thông tin
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalDoiMK;
