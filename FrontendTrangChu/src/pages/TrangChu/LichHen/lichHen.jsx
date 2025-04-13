import React, { useEffect, useState } from "react";
import { Card, Row, Col, Tag, Button, Space, Spin, notification } from "antd";
import { IoHomeSharp } from "react-icons/io5";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import Footer from "../../../components/TrangChu/Footer/Footer";
import HeaderViewDoctor from "../../../components/TrangChu/Header/HeaderViewDoctor";
import { useSelector } from "react-redux";
import { fetchLichKham } from "../../../services/apiChuyenKhoaBacSi";

const LichHenCard = () => {
  const [dataLichHen, setDataLichHen] = useState([]);
  const [loading, setLoading] = useState(true);
  const acc = useSelector((state) => state.account.user);

  useEffect(() => {
    if (acc?.user?.maBenhNhan) {
      fetchLichHenByIdKH();
    }
  }, [acc?.user?.maBenhNhan]);

  const fetchLichHenByIdKH = async () => {
    setLoading(true);
    try {
      const res = await fetchLichKham(acc.user.maBenhNhan);
      console.log("Dữ liệu nhận được từ backend:", res);
      if (res?.data) {
        setDataLichHen(res.data); // Gán data API trả về
      }
    } catch (error) {
      notification.error({
        message: "Lỗi tải dữ liệu",
        description: "Không thể tải lịch hẹn.",
      });
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px 0" }}>
        <Spin tip="Đang tải hồ sơ bệnh nhân..." />
      </div>
    );
  }
  if (!dataLichHen) {
    return <p><Empty description="Chưa có lịch khám nào" /></p>;
  }
  return (
    <>
      <HeaderViewDoctor />
      <Row style={{marginBottom: "150px"}}></Row>

      <div className="container" >
        <p className="txt-title">
          <IoHomeSharp /> / Lịch hẹn
        </p>
        <h2 style={{ marginBottom: 24 }}>Lịch hẹn đã đặt</h2>
        <Card style={{ borderRadius: 12, marginBottom: 24 }}>
                <Row gutter={[16, 16]} align="middle">
                  {/* Cột thời gian */}
                  <Col xs={24} sm={6} style={{ textAlign: "center" }}>
                    <div style={{ color: "#1890ff", fontWeight: 500 }}>
                      Thời Gian Khám
                    </div>
                    <div>
                      <ClockCircleOutlined /> {dataLichHen.khungGio}
                    </div>
                    <div>
                      <CalendarOutlined />{dataLichHen.ngayKham}
                    </div>
                  </Col>

                  {/* Cột thông tin */}
                  <Col xs={24} sm={18}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <b>Bệnh nhân: {dataLichHen.hoTen}</b> 
                      </Col>
                      <Col span={24}>
                        <b>Bác sĩ:</b> {dataLichHen.tenBacSi}
                      </Col>
                      {/* <Col span={24}>
                        <b>Chuyên khoa</b> {dataLichHen.hoTen}
                      </Col> */}
                      <Col span={24}>
                        <b>Địa chỉ:</b> {dataLichHen.diaChi}
                      </Col>
                      <Col span={24}>
                        <b>Lý do khám:</b> {dataLichHen.lyDoKham}
                      </Col>
                      <Col span={24}>
                        <Space wrap>
                          {/* <Tag color={daXacNhan ? "green" : "default"}>
                            {daXacNhan ? "Đã xác nhận" : "Chưa xác nhận"}
                          </Tag>
                          <Tag color={daThanhToan ? "green" : "red"}>
                            {daThanhToan ? "Đã thanh toán" : "Chưa thanh toán"}
                          </Tag> */}
                          <Button type="primary" ghost>
                            Xem bệnh án
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
      </div>
      <Row style={{marginBottom: "50px"}}></Row>

      <Footer />
    </>
  );
};

export default LichHenCard;
