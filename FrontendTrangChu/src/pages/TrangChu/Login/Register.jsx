import { Button, Col, Divider, Form, Input, message, Modal, notification, Radio, Row, DatePicker, Upload  } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callRegisterBenhNhan } from "../../../services/api";
import { UploadOutlined } from "@ant-design/icons";

const RegisterPage = ({setOpenRegisterKH, openRegisterKH}) => {

    const [formRegister] = Form.useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        setIsLoading(true)
        try{
            const res = await callRegisterBenhNhan( values.email, values.hoTen, values.soDienThoai, values.username, values.matKhau)
            console.log("API Response: ", res);
            if(res.success){
                message.success(res.message)
                formRegister.resetFields()
            
                setOpenRegisterKH(false)
                notification.success({
                    message: "Đăng ký thành công!",
                    duration: 3,
                });
                    // Chuyển hướng sau 2 giây
                setTimeout(() => {
                    navigate("/");
                    }, 2000);
            } else {
                notification.error({ 
                    message: "Đăng ký không thành công!",
                    description: res.message || "Thông tin đăng ký không đúng.",
                    duration: 5,
                });
            }
        }catch(error){
            notification.error({ message: "Lỗi hệ thống", description: error.message });
        }finally {
            setIsLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // Hàm để tạo mật khẩu ngẫu nhiên
    const generateRandomPassword = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let matKhau = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            matKhau += characters[randomIndex];
        }
        return matKhau;
    };

    const handleCancel = () => {
        setOpenRegisterKH(false)
    }

    return (
        <Modal
            // title="Đăng Ký Tài Khoản Cho Bệnh Nhân"
            style={{
                top: 100,
            }}
            open={openRegisterKH}
            // onOk={() => formLogin.submit()} 
            onCancel={() => handleCancel()}
            width={1000}
            maskClosable={false}
            footer={null}  // Ẩn footer
            // confirmLoading={isSubmit}
            // okText={"Xác nhận tạo mới"}
            // cancelText="Huỷ"
        > 
            <Form      
                form={formRegister}                           
                initialValues={{
                    remember: true,
                }}
                // layout='vertical'    
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ maxWidth: '1000px', margin: '0 auto' }} // Đặt maxWidth và căn giữa
            >
                <h3 style={{ textAlign: "center", color: "navy", textTransform: 'uppercase', fontSize: "20px" }}>Đăng ký tài khoản người dùng</h3>
                <Divider />

                <Row gutter={[20,20]}>
                    <Col md={12} sm={12} xs={24}>
                        <Form.Item
                            labelCol={{span: 24}}
                            label="Họ tên"
                            name="hoTen"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đầy đủ thông tin!',
                                },
                                {
                                    required: false,
                                    pattern: new RegExp(/^[A-Za-zÀ-ỹ\s]+$/),
                                    message: 'Không được nhập số!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={12} sm={12} xs={24}>
                        <Form.Item
                            labelCol={{span: 24}}
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đầy đủ thông tin!',
                                },
                                {
                                    type: "email",
                                    message: 'Vui lòng nhập đúng định dạng địa chỉ email',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>              
                    </Col>
                </Row>                    

                <Row gutter={[20,20]}>
                    <Col md={12} sm={12} xs={24}>
                        <Form.Item
                            labelCol={{span: 24}}
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đầy đủ thông tin!',
                                },
                                {
                                    required: false,
                                    pattern: new RegExp(/^[A-Za-zÀ-ỹ\s]+$/),
                                    message: 'Không được nhập số!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={12} sm={12} xs={24}>
                        <Form.Item
                            labelCol={{span: 24}}
                            label="Password"
                            name="matKhau"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đầy đủ thông tin!',
                                },
                                {
                                    required: false,
                                    pattern: new RegExp(/^(?!.*\s).{6,}$/),
                                    message: 'Không được nhập có dấu cách, tối thiểu có 6 kí tự!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>                             

                <Row gutter={[20,20]}>
                    <Col md={12} sm={12} xs={24}>
                        <Form.Item
                            labelCol={{span: 24}}
                            label="Số Điện Thoại"
                            name="soDienThoai"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đầy đủ thông tin!',
                                },
                                {
                                    pattern: /^0\d{9}$/,
                                    message: 'Số điện thoại phải có 10 chữ số và bẳt đầu bằng số 0, không chứa kí tự!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input />
                        </Form.Item>                          
                    </Col>
                </Row>
                 
                <Form.Item>
                    <div style={{textAlign: "center"}}>
                        <Button type="primary" onClick={() => formRegister.submit()} loading={isLoading}> Đăng ký tài khoản</Button>

                        <Button style={{marginLeft: "30px"}} type="primary" danger onClick={() => {
                            console.log("check form: ", formRegister.getFieldsValue());
                            // form.getFieldsValue()
                            const randomPassword = generateRandomPassword(10); // Sinh mật khẩu với độ dài 10 ký tự
                            formRegister.setFieldsValue({
                                matKhau: randomPassword,
                            })
                        }}>Tự tạo mật khẩu</Button>
                    </div>
                </Form.Item>

            </Form> 
        </Modal>
    )
}
export default RegisterPage