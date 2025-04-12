import {
    UserOutlined,
    CalendarOutlined,
    PhoneOutlined,
    ManOutlined,
    EnvironmentOutlined,
    TeamOutlined,
    EditOutlined,
    DeleteOutlined,
    InfoCircleOutlined
  } from "@ant-design/icons";
  import { Row, Col, Button, Card, Modal, Spin ,Empty} from "antd";
  import { useEffect, useState } from "react";
  import { useSelector } from "react-redux";
  import { fetchHoSoBenhNhan } from "../../../services/apiChuyenKhoaBacSi";
  import "./HoSoBenhNhan.css";
  const getGioiTinhText = (val) => {
    switch (parseInt(val)) {
      case 0: return "Nam";
      case 1: return "Nữ";
      case 2: return "Khác";
      default: return "Chưa cập nhật";
    }
  };
  
  const HoSoBenhNhan = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [profile, setProfile] = useState(null);
    const acc = useSelector((state) => state.account.user);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchProfile = async () => {
        if (!acc?.user?.maBenhNhan) return;
  
        setLoading(true);
        try {
          const res = await fetchHoSoBenhNhan(acc?.user?.maBenhNhan);
          console.log("Dữ liệu nhận được từ backend:", res?.data); // Xem cấu trúc dữ liệu
          if (res?.data) {
            setProfile(res.data);
          } else {
            setProfile(null);
          }
        } catch (error) {
          console.error("Lỗi khi lấy hồ sơ:", error);
          setProfile(null);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, [acc?.user?.maBenhNhan]);
  
    const showChiTiet = () => setIsModalVisible(true);
    const closeChiTiet = () => setIsModalVisible(false);
  
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin tip="Đang tải hồ sơ bệnh nhân..." />
        </div>
      );
    }
  
    if (!profile) {
      return <p><Empty description="Chưa có hồ sơ nào" /></p>;
    }
  
    return (
      <div>
        <h2 style={{ marginBottom: 24, fontWeight: 600 }}>Hồ sơ bệnh nhân</h2>
  
        <Card style={{ borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <Row gutter={[0, 12]}>
            <Col span={24}>
              <p>
                <UserOutlined /> <b>Họ và tên:</b>{" "}
                <span className="text-primary">{profile?.hoTen}</span>
              </p>
            </Col>
            <Col span={24}>
              <p>
                <CalendarOutlined /> <b>Ngày sinh:</b> {profile?.ngaySinh || "Chưa cập nhật"}
              </p>
            </Col>
            <Col span={24}>
              <p>
                <PhoneOutlined /> <b>Số điện thoại:</b> {profile?.soDienThoai || "Chưa cập nhật"}
              </p>
            </Col>
            <Col span={24}>
              <p>
              <ManOutlined /> <b>Giới tính:</b> {getGioiTinhText(profile?.gioiTinh)}
  
              </p>
            </Col>
  
            <Col span={24}>
              <p>
                <EnvironmentOutlined /> <b>Địa chỉ:</b> {profile?.diaChi || "Chưa cập nhật"}
              </p>
            </Col>
  
            <Col span={24} style={{ textAlign: "right" }}>
              <Button danger icon={<DeleteOutlined />} style={{ marginRight: 8 }}>
                Xóa hồ sơ
              </Button>
              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ marginRight: 8 }}
                onClick={() => console.log("Sửa hồ sơ")}
              >
                Sửa hồ sơ
              </Button>
              <Button icon={<InfoCircleOutlined />} onClick={showChiTiet}>
                Chi tiết
              </Button>
            </Col>
          </Row>
        </Card>
  
        <Modal
          title="Chi tiết hồ sơ"
          open={isModalVisible}
          onCancel={closeChiTiet}
          footer={null}
        >
          <Row gutter={[16, 12]}>
            <Col span={24}>
              <p>
                <UserOutlined /> <b>Họ và tên:</b> {profile.hoTen}
              </p>
            </Col>
            <Col span={24}>
              <p>
                <CalendarOutlined /> <b>Ngày sinh:</b> {profile.ngaySinh || "Chưa cập nhật"}
              </p>
            </Col>
            <Col span={24}>
              <p>
                <PhoneOutlined /> <b>Số điện thoại:</b> {profile.soDienThoai || "Chưa cập nhật"}
              </p>
            </Col>
            <Col span={24}>
              <p>
              <ManOutlined /> <b>Giới tính:</b> {getGioiTinhText(profile.gioiTinh)}
  
              </p>
            </Col>
            <Col span={24}>
              <p>
                <TeamOutlined /> <b>CCCD:</b> {profile.CCCD || "Chưa cập nhật"}
              </p>
            </Col>
            <Col span={24}>
              <p>
                <TeamOutlined /> <b>Email:</b> {profile.email || "Chưa cập nhật"}
              </p>
            </Col>
            <Col span={24}>
              <p>
                <TeamOutlined /> <b>Nghề nghiệp:</b> {profile.ngheNghiep || "Chưa cập nhật"}
              </p>
            </Col>
            
            <Col span={24}>
              <p>
                <EnvironmentOutlined /> <b>Địa chỉ:</b> {profile.diaChi || "Chưa cập nhật"}
              </p>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  };
  
  export default HoSoBenhNhan;
  