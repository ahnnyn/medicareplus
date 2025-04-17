import Footer from "../../../components/TrangChu/Footer/Footer"
import HeaderViewDoctor from "../../../components/TrangChu/Header/HeaderViewDoctor"
import HinhChuNhat from "../../../components/TrangChu/HinhChuNhat/HinhChuNhat";
import { Carousel, Col, Row } from "antd";
import { FiUser, FiVideo } from "react-icons/fi";
import { GiHospital } from "react-icons/gi"; // Bệnh viện
import { RiVideoChatLine } from "react-icons/ri"; // Video call
import { FaClinicMedical, FaBrain, FaAppleAlt } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { IoHomeSharp } from "react-icons/io5"

import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const DichVuKham = () => {
    const [loadingCard, setLoadingCard] = useState(true);
    const navigate = useNavigate();
    const items_dichvu = [
        { icon: <FaClinicMedical size={40} color="blue" />, txtP: "Đặt khám tại bệnh viện", redirect: "/user/chuyen-khoa-kham" },
        { icon: <FiVideo size={40} color="blue" />, txtP: "Tư vấn sức khỏe trực tuyến", redirect: "/user/chuyen-khoa-kham" },
        { icon: <FaBrain size={40} color="blue" />, txtP: "Tư vấn tâm lý trực tuyến", redirect: "/user/tu-van-tam-ly" },
        { icon: <GiFruitBowl size={40} color="blue" />, txtP: "Tư vấn dinh dưỡng trực tuyến", redirect: "/user/tu-van-dinh-duong" }
    ];
    
    return (
        <>
        <HeaderViewDoctor />
        <div style={{ height: "150px" }}></div>  
        <Col span={18} className="col-body">
                <Row>
                    <Col span={24}>
                        <p className="txt-title">
                            <IoHomeSharp /> / Đặt lịch khám
                        </p>
                    </Col>
                </Row>
            </Col>


            {/* <div
                className="slicer-banner"
                style={{
                    position: "relative",
                    width: "100%",
                    overflow: "hidden",
                    paddingTop: "50px"
                }}
                >
                <img
                    src="../../public/Blue_White_Minimalist_Hospital_Service_Health_Banner.png"
                    alt="Slicer Banner"
                    style={{
                    width: "100%",
                    height: "auto", // để giữ đúng tỷ lệ ảnh
                    objectFit: "cover",
                    borderRadius: "0 0 20px 20px",
                    display: "block",
                    }}
                />
                </div> */}

                <div className="danh-cho-ban">
                    <Row className="ben-trong" justify="center">
                        <span
                            style={{
                                fontWeight: 500,
                                fontSize: "clamp(25px, 5vw, 32px)",
                                width: "100%",
                                padding: "4vh 0",
                                zIndex: "50",
                                textAlign: "center"
                            }}
                        >
                            Chọn dịch vụ khám phù hợp với bạn
                        </span>

                        <Row
                            gutter={[0, 24]} // Tạo khoảng cách giữa các item
                            justify="space-around"
                            style={{ width: "100%", margin: 0 }}
                        >
                            {items_dichvu.map((item, index) => (
                                <Col
                                    key={index}
                                    xl={12}   // 2 dịch vụ trên màn hình lớn (desktop)
                                    lg={12}   // 2 dịch vụ trên tablet
                                    md={24}   // 1 dịch vụ trên màn hình vừa (như tablet nhỏ)
                                    sm={24}   // 1 dịch vụ trên mobile
                                    xs={24}   // 1 dịch vụ trên màn hình nhỏ nhất
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        cursor: "pointer"
                                    }}
                                    flex="0 0 400px"

                                >
                                    <HinhChuNhat
                                        icon={item.icon}
                                        txtP={item.txtP}
                                        onClick={() => navigate(item.redirect)}
                                        loadingCard={loadingCard}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Row>
                </div>

        <div style={{ marginBottom: "clamp(20px, 5vw, 100px)" }}></div>
        <Footer />      
        </>
    );
}

export default DichVuKham