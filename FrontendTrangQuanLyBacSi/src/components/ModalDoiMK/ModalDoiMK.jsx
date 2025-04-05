import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";
import { fetchBacSiByMaBS } from "../../services/apiDoctor";
import { doiThongTinDoctor } from "../../services/loginAPI";
import { doLogoutAction } from "../../redux/account/accountSlice";

const ModalDoiMK = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formDoiMK] = Form.useForm();
  const [dataAccBS, setDataAccBS] = useState(null);
  const user = useSelector((state) => state.accountDoctor.user);
  console.log("dataAccBS: ", dataAccBS);

  const fetchDoctorInfo = async (maBacSi) => {
    let res = await fetchBacSiByMaBS(maBacSi);
    console.log("API Response:", res); // Kiểm tra dữ liệu trả về từ API
    if (res && res.data) {
      setDataAccBS(res.data);
    }
  };

  useEffect(() => {
    if (user?.maBacSi) {
      fetchDoctorInfo(user.maBacSi);
    }
  }, [user]);

  const onFinishDoiMK = async (values) => {
    console.log("🔄 Gửi request đổi mật khẩu đến API...", values);

    try {
        const res = await doiThongTinDoctor(values.idAcc, values.idBS, values.username, values.password, values.passwordMoi);
        
        console.log("📥 API Full Response:", res); // Kiểm tra phản hồi API

        if (!res) {
            console.error("❌ API không trả về dữ liệu!");
            notification.error({
                message: "Lỗi hệ thống",
                description: "API không phản hồi hoặc bị lỗi.",
            });
            return;
        }

        if (res.success) {
            message.success("✅ Đổi mật khẩu thành công!");
            dispatch(doLogoutAction());
            navigate("/login-doctor");
        } else {
            console.error("❌ API không trả về success:", res);
            notification.error({
                message: "❌ Đổi mật khẩu thất bại!",
                description: res?.message || "Có lỗi xảy ra, vui lòng thử lại!",
            });
        }
    } catch (error) {
        console.error("❌ Lỗi khi gọi API:", error);

        notification.error({
            message: "Lỗi hệ thống",
            description: error.message || "Không thể kết nối đến máy chủ.",
        });
    }
};

  useEffect(() => {
    if (dataAccBS) {
      const init = {
        idBS: dataAccBS?.maBacSi,
        idAcc: dataAccBS?.maTaiKhoan,
        username: user.username
      };
      console.log("init: ", init);
      formDoiMK.setFieldsValue(init);
    }
    return () => {
      formDoiMK.resetFields();
    };
  }, [dataAccBS]);

  return (
    
    <Form form={formDoiMK} layout="vertical" onFinish={onFinishDoiMK}>
      <Row>
          <Col span={24} style={{ padding: "0 0 20px", fontSize: "18px", textAlign: "center" }}>
                    <span style={{ fontWeight: "500", color: "navy" }}>ĐỔI MẬT KHẨU</span>
          </Col>
      </Row>
      {/* <Divider /> */}
      <Row gutter={[20, 10]}>
        <Col span={24} md={24} sm={24} xs={24}>
          <Form.Item name="idBS" hidden>
            <Input hidden />
          </Form.Item>
          <Form.Item name="idAcc" hidden>
            <Input hidden />
          </Form.Item>
        </Col>
        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đầy đủ thông tin!",
              },
              {
                min: 6,
                message: "Tên đăng nhập phải có ít nhất 6 ký tự!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Nhập tên đăng nhập của bạn" />
          </Form.Item>
        </Col>
        <Col span={12} md={12} sm={24} xs={24}>
         
        </Col>
        
        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item
            label="Mật khẩu cũ"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đầy đủ thông tin!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu cũ" />
          </Form.Item>
        </Col>
        
        <Col span={12} md={12} sm={24} xs={24}>
          <Form.Item
            label="Mật khẩu mới"
            name="passwordMoi"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đầy đủ thông tin!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu muốn đổi mới" />
          </Form.Item>
        </Col>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => formDoiMK.submit()}
            type="primary"
            size="large"
            icon={<FaSave size={25} />}
            style={{ width: "200px", height: "50px" }} // Thay đổi kích thước tại đây
          >
            Đổi mật khẩu
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default ModalDoiMK;
