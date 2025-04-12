import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Form, Input, message, Modal, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callLogin, callLoginBenhNhan } from "../../../services/api";
import RegisterPage from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "../../../redux/account/accountSlice";
import { handleLoginSuccess } from "../../../utils/axios-customize";
import { handleQuenPassword } from "../../../services/apiChuyenKhoaBacSi";
import './login.scss';

const LoginPage = (props) => {

    const {
        openModalLogin, setOpenModalLogin
    } = props

    const [formLogin] = Form.useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [remember, setRemember] = useState(false); // Trạng thái của checkbox "Ghi nhớ tài khoản"
    const [openRegisterKH, setOpenRegisterKH] = useState(false)
    const acc = useSelector(state => state.account.user)
    console.log("acc: ", acc);
    const [openQuenMK, setOpenQuenMK] = useState(false);
    const [formLayMK] = Form.useForm()

    const handleLayMK = async (values) => {
        const email_doimk = values.email;
        console.log("email_doimk: ", email_doimk);

        if (!email_doimk) {
            notification.error({
                message: "Lỗi",
                description: "Vui lòng nhập email!"
            });
            return;
        }

        try {
            const res = await handleQuenPassword(email_doimk);
            console.log("res: ", res);

            if (res.data) {
                notification.success({
                    message: "Lấy lại mật khẩu thành công!",
                    description: res.message
                });
            } else {
                notification.error({
                    message: "Lấy lại mật khẩu thất bại!",
                    description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    duration: 5,
                });
            }
        } catch (error) {
            notification.error({
                message: "Lấy lại mật khẩu thất bại!",
                description: error.message,
            });
        }
    };

    useEffect(() => {
        const rememberedAccountBenhNhan = localStorage.getItem("rememberedAccountBenhNhan");
        if (rememberedAccountBenhNhan) {
            const account = JSON.parse(rememberedAccountBenhNhan);
        
            formLogin.setFieldsValue({
                username: account.username,
                matKhau: account.matKhau,
                remember: true,
            });
            setRemember(true);
        }
    }, [formLogin]);



    const onFinish = async (values) => {
        setIsLoading(true);
        try{
            const res = await callLoginBenhNhan(values.username, values.matKhau)
            console.log("API Response:", res);
    
            if (res.success && res.token) {
                dispatch(doLoginAction({user: res.user, token: res.token}));
                
    
                if (remember) {
                    // Nếu người dùng chọn "Ghi nhớ tài khoản", lưu thông tin vào localStorage
                    localStorage.setItem("rememberedAccountBenhNhan", JSON.stringify({ username: values.username, matKhau: values.matKhau }));
                } else {
                    // Nếu không chọn, xóa dữ liệu đã lưu (nếu có)
                    localStorage.removeItem("rememberedAccountBenhNhan");
                }
                formLogin.resetFields()

                setOpenModalLogin(false)
                notification.success({
                    message: "Đăng nhập thành công!",
                    duration: 3,
                  });
            
                  // Chuyển hướng sau 2 giây
                  setTimeout(() => {
                    navigate("/");
                  }, 2000);
            } else {
                if (res.errorField === "username") {
                    formLogin.setFields([
                        {
                            name: "username",
                            errors: [res.message || "Username không đúng!"]
                        }
                    ]);
                } else if (res.errorField === "matKhau") {
                    formLogin.setFields([
                        {
                            name: "matKhau",
                            errors: [res.message || "Mật khẩu không đúng!"]
                        }
                    ]);
                } else {
                    notification.error({
                        message: "Đăng nhập thất bại!",
                        description: res.message || "Thông tin đăng nhập không đúng.",
                        duration: 5,
                    });
                }
            }
        }catch(error){
            notification.error({ message: "Lỗi hệ thống", description: error.message });
        }finally {
            setIsLoading(false);
          }
    };
    const handleCancel = () => {
        setOpenModalLogin(false)
    }

    return (
        <Modal
            className="login-modal"
            title="Đăng Nhập"
            style={{
                top: 100,
            }}
            open={openModalLogin}
            onCancel={() => handleCancel()}
            width={600}
            maskClosable={false}
            footer={null} 
        >
            <Form
                form={formLogin}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên đăng nhập!',
                        },
                        {
                            pattern: /^[a-zA-Z0-9@_]+$/,
                            message: 'Username chỉ được chứa chữ cái, số, @ hoặc _',
                        },

                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="matKhau"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                        {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                            message: 'Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!',
                        },

                    ]}
                    hasFeedback
                >
                    <Input.Password onKeyDown={(e) => {
                        console.log("check key: ", e.key);
                        if (e.key === 'Enter') formLogin.submit()
                    }} />
                </Form.Item>

                <Form.Item>
                    <div className="login-option">
                        <Checkbox
                            className="remember-me"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        >Ghi nhớ tài khoản</Checkbox>

                        {/* <Link onClick={() => setOpenQuenMK(true)}>Quên mật khẩu</Link> */}
                        <a className="forgot-password" onClick={() => setOpenQuenMK(true)}>Quên mật khẩu</a>
                    </div>
                    
                </Form.Item>

                <Form.Item >
                    <div className="login-button-container">
                        <Button loading={isLoading}
                            className="login-button"
                            type="primary"
                            onClick={() => formLogin.submit()}>
                            Đăng nhập
                        </Button>
                        

                    </div>
                </Form.Item>
                
            </Form>
            <Divider />
            <div style={{ textAlign: "center" }}>
                Chưa có tài khoản? <Link onClick={() => setOpenRegisterKH(true)}>Đăng ký tại đây</Link>
                {/* Chưa có tài khoản? <Link to={"/user/register-benh-nhan"}>Đăng ký tại đây</Link> */}
            </div>

            <RegisterPage
                setOpenRegisterKH={setOpenRegisterKH}
                openRegisterKH={openRegisterKH}
            />

            <Modal
                title="Lấy mật khẩu"
                centered
                // loading={isLoadingDoiMK}
                open={openQuenMK}
                onOk={() => formLayMK.submit()}
                okText={"Lấy mật khẩu"}
                cancelText="Huỷ"
                width={500}
                maskClosable={false}
                onCancel={() => {
                    setOpenQuenMK(false)
                    formLayMK.resetFields()
                }}>
                <Divider />
                
                <Form
                    form={formLayMK}
                    className="registration-form"
                    layout="vertical"
                    onFinish={handleLayMK}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="Nhập Email cần lấy mật khẩu"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập email chính xác để lấy lại mật khẩu!',
                                    },
                                    {
                                        type: "email",
                                        message: 'Vui lòng nhập đúng định dạng địa chỉ email',
                                    },

                                ]}
                                hasFeedback
                            ><Input placeholder="Email của bạn..." />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Modal>


    )
}
export default LoginPage