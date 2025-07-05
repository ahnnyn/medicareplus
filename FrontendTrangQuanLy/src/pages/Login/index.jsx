import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  notification,
} from "antd";

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "myredux/account/accountSlice";
import { handleLoginDoctor, handleQuenPassword } from "services/auth/auth.services";
import "./Login.css";

const Login = () => {
  const [form] = Form.useForm();
  const [formLayMK] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [openQuenMK, setOpenQuenMK] = useState(false);
  const [isLoadingDoiMK, setIsLoadingDoiMK] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.accountDoctor.isAuthenticated);
  const maVaiTro = useSelector((state) => state.accountDoctor.user.maVaiTro);

useEffect(() => {
  const rememberedDoctor = localStorage.getItem("rememberedDoctor");
  if (rememberedDoctor) {
    const account = JSON.parse(rememberedDoctor);
    form.setFieldsValue({
      username: account.username,
      password: account.password,
      remember: true,
    });
    setRemember(true);

    // Thêm Enter key listener để đăng nhập bằng tài khoản đã lưu
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        form.submit(); // Gửi form tự động
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }
}, [form]);


  // Điều hướng sau khi đăng nhập thành công
  useEffect(() => {
    if (isAuthenticated) {
      if (maVaiTro === "2") {
        navigate("/doctor");
      } else if (maVaiTro === "1") {
        navigate("/admin");
      } else {
        notification.warning({
          message: "Không xác định vai trò!",
          description: "Vui lòng liên hệ quản trị viên.",
        });
      }
    }
  }, [isAuthenticated, maVaiTro, navigate]);

 const onFinish = async (values) => {
  setIsLoading(true);
  try {
    const res = await handleLoginDoctor(values.username, values.password);
    console.log("Login Response:", res);
    const result = res.data;
    if (result.success && result.token) {
      const { user, token } = result;
      const role = Number(user.maVaiTro);

      if (remember) {
        localStorage.setItem(
          "rememberedDoctor",
          JSON.stringify({ username: values.username, password: values.password })
        );
      } else {
        localStorage.removeItem("rememberedDoctor");
      }

      form.resetFields();

      // Chỉ dispatch nếu role hợp lệ
      if (role === 2 || role === 1) {
        dispatch(doLoginAction({ user, token }));

        notification.success({
          message: "Đăng nhập thành công!",
          description: `Chào mừng ${user.hoTen || "người dùng"} quay lại.`,
          duration: 3,
        });

        if (role === 2) navigate("/doctor");
        if (role === 1) navigate("/admin");
      } else {
        notification.warning({
          message: "Không xác định vai trò!",
          description: "Vui lòng liên hệ quản trị viên.",
        });
      }
    } else {
      notification.error({
        message: "Đăng nhập không thành công!",
        description: res.message || "Thông tin đăng nhập không đúng.",
        duration: 5,
      });
    }
  } catch (error) {
    notification.error({
      message: "Lỗi hệ thống",
      description: error.message,
    });
  } finally {
    setIsLoading(false);
  }
};


  const handleLayMK = async (values) => {
    const email = values.email;
    if (!email) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng nhập email!",
      });
      return;
    }

    try {
      const res = await handleQuenPassword(email);
      if (res.data) {
        notification.success({
          message: "Lấy lại mật khẩu thành công!",
          description: res.message,
        });
      } else {
        notification.error({
          message: "Lấy lại mật khẩu thất bại!",
          description: Array.isArray(res.message) ? res.message[0] : res.message,
        });
      }
    } catch (error) {
      notification.error({
        message: "Lấy lại mật khẩu thất bại!",
        description: error.message,
      });
    }
  };

  return (
    <>
      <div className="rts-register-area rts-section-gap bg_light-1">
        <div className="container">
          <div
            className="registration-wrapper-1"
            style={{
              maxWidth: 450,
              margin: "0 auto",
              background: "#fff",
              padding: "40px",
              borderRadius: "12px",
              boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: 30, color: "#2A95BF" }}>
              ĐĂNG NHẬP HỆ THỐNG
            </h2>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  form.submit(); // gọi submit toàn form
                }
              }}
            >
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
                hasFeedback
              >
                <Input size="large" placeholder="Nhập username" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                  {
                    pattern: /^(?!.*\s).{6,}$/,
                    message: "Không có khoảng trắng, tối thiểu 6 ký tự!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  size="large"
                  placeholder="Nhập mật khẩu"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") form.submit();
                  }}
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  >
                    Ghi nhớ đăng nhập
                  </Checkbox>

                  <span
                    style={{
                      color: "#2A95BF",
                      cursor: "pointer",
                      fontSize: "14px",
                      textDecoration: "underline",
                    }}
                    onClick={() => setOpenQuenMK(true)}
                  >
                    Quên mật khẩu?
                  </span>
                </div>
              </Form.Item>

              <Form.Item style={{ textAlign: "center", marginTop: 30 }}>
                <Button
                  loading={isLoading}
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    height: "45px",
                    background: "#2A95BF",
                    border: "none",
                  }}
                >
                  ĐĂNG NHẬP
                </Button>

              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <Modal
        title={null}
        centered
        open={openQuenMK}
        onOk={() => formLayMK.submit()}
        okText={null}
        cancelText={null}
        width={500}
        footer={null}
        maskClosable={false}
        onCancel={() => {
          setOpenQuenMK(false);
          formLayMK.resetFields();
        }}
        className="custom-forgot-modal"
      >
        <div className="forgot-password-wrapper">
          <h2 className="forgot-title">🔐 Lấy lại mật khẩu</h2>
          <p className="forgot-subtitle">Vui lòng nhập email đã đăng ký để lấy lại mật khẩu.</p>

          <Form
            form={formLayMK}
            layout="vertical"
            onFinish={handleLayMK}
            className="forgot-password-form"
          >
            <Form.Item
              label="Địa chỉ Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
              hasFeedback
            >
              <Input placeholder="nhapemail@example.com" />
            </Form.Item>

            <div className="forgot-form-actions">
              <Button
                onClick={() => {
                  setOpenQuenMK(false);
                  formLayMK.resetFields();
                }}
                className="cancel-btn"
              >
                Hủy
              </Button>

              <Button
                type="primary"
                loading={isLoadingDoiMK}
                onClick={() => formLayMK.submit()}
                className="submit-btn"
              >
                Gửi yêu cầu
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Login;
