import { Carousel, Col, Row } from "antd";
import './bodyHomePage.scss';
import HinhChuNhat from "../../../components/TrangChu/HinhChuNhat/HinhChuNhat";
import HinhVuongSlider from "../../../components/TrangChu/HinhVuong/HinhVuongSlicer";
import { useEffect, useState } from "react";
import { FiUser, FiVideo } from "react-icons/fi";
import { GiHospital } from "react-icons/gi"; // Bệnh viện
import { RiVideoChatLine } from "react-icons/ri"; // Video call
import { FaClinicMedical, FaBrain, FaAppleAlt } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { AiOutlinePhone } from "react-icons/ai"; // Gọi điện thoại
import { fetchAllChuyenKhoa, fetchAllBacSi } from "../../../services/apiChuyenKhoaBacSi";
import { useNavigate } from "react-router-dom";

const BodyHomePage = () => {
    const [dataChuyenKhoa, setDataChuyenKhoa] = useState([]);
    const [dataBacSi, setDataBacSi] = useState([]);
    const [loadingCard, setLoadingCard] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await listChuyenKhoa();
            await listBacSi();
        };

        fetchData();
    }, []);

    const items_toandien = [
        { icon: <FaClinicMedical size={40} color="blue" />, txtP: "Khám chuyên khoa" },
        { icon: <FiVideo size={40} color="blue" />, txtP: "Khám từ xa" },
        { icon: <FaBrain size={40} color="blue" />, txtP: "Tư vấn tâm lý" },
        { icon: <GiFruitBowl size={40} color="blue" />, txtP: "Tư vấn dinh dưỡng" }
    ];

    const listChuyenKhoa = async () => {
        setLoadingCard(true);
        try {
            const response = await fetchAllChuyenKhoa();
            console.log("Dữ liệu chuyên khoa:", response);
            if (response?.data) {
                setDataChuyenKhoa(response.data);
                console.log("Dữ liệu chuyên khoa:", response.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách chuyên khoa:", error);
        } finally {
            setLoadingCard(false);
        }
    };

    const listBacSi = async () => {
        try {
            const response = await fetchAllBacSi();
            console.log("Dữ liệu bác sĩ:", response);
            if (response?.data) {
                setDataBacSi(response.data); // CHỈ .data là đủ
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bác sĩ:", error);
        }
    };

    const items_ChuyenKhoa = dataChuyenKhoa.map((chuyenKhoa) => ({
        id: chuyenKhoa.maKhoa,
        hinhAnh: chuyenKhoa.hinhAnh, // Nếu có `hinhAnh`, hoặc fallback về ảnh mặc đ��nh
        src: `${import.meta.env.VITE_BACKEND_URL}/public/chuyenkhoa/${chuyenKhoa.hinhAnh}`,
        txtP: chuyenKhoa.tenKhoa
        // Có thể thêm `src` nếu bạn muốn hiển thị ảnh chuyên khoa
    }));

    const items_BacSi = dataBacSi.map((bacSi) => ({
        id: bacSi.maBacSi,
        hinhAnh: bacSi.hinhAnh,
        src: `${import.meta.env.VITE_BACKEND_URL}/public/bacsi/${bacSi.hinhAnh}`,
        txtP: bacSi.hoTen,
        txtB: bacSi.tenKhoa || "Chuyên khoa chưa rõ" // nếu có `tenKhoa`, hoặc fallback
    }));

    const handleRedirectChuyenKhoa = (idChuyenKhoa) => {
        navigate(`/user/view-chuyen-khoa-kham?maKhoa=${idChuyenKhoa}`);
    };

    const handleRedirectBacSi = (idBacSi) => {
        navigate(`/view-doctor?maBacSi=${idBacSi}`);
    };

    return (
        <>
            <div style={{ marginTop: "clamp(20px, 0.8vw, 50px)" }}></div>    {/* chèn khoảng cách đẩy nội dung xuống dưới header */}

            <div
                className="slicer-banner"
                style={{
                    position: "relative",
                    width: "100%",
                    height: "auto",
                    overflow: "hidden",
                }}
                >
                <img
                    src="/Blue_White_Minimalist_Hospital_Service_Health_Banner.png"
                    alt="Slicer Banner"
                    style={{
                    width: "100%",
                    height: "auto", // để giữ đúng tỷ lệ ảnh
                    objectFit: "cover",
                    borderRadius: "0 0 20px 20px",
                    display: "block",
                    }}
                />

                {/* Nếu bạn muốn giữ welcome message thì bật lại đoạn dưới */}
                {/* 
                <div
                    style={{
                    position: "absolute",
                    top: "50%",
                    right: "50px",
                    background: "rgba(0, 123, 255, 0.75)",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    transform: "translateY(-50%)",
                    fontSize: "2.5vh",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                >
                    Chào mừng bạn đến với hệ thống y tế thông minh!
                </div>
                */}
                </div>

            <div className="danh-cho-ban">
                <Row className="ben-trong">
                    <span style={{ fontWeight: 500, fontSize: "clamp(25px, 5vw, 32px)", width: "100%", padding: "4vh 0", zIndex: "50" }}>
                        Dịch vụ
                    </span>
                    <Row gutter={[16, 24]} justify="space-around">
                    {items_toandien.map((item, index) => (
                        <Col
                            key={index}
                            xl={12} // 4 item trên desktop
                            lg={6}
                            md={12} // 2 item trên tablet
                            sm={24} // 1 item trên mobile
                            xs={24}
                            flex="0 0 400px"
                            // style={{ marginBottom: "2vh" }}
                        >
                            <HinhChuNhat icon={item.icon} txtP={item.txtP} />
                        </Col>
                    ))}
                    </Row>

                </Row>
            </div>

            {/* <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "5vh",
                    background: "linear-gradient(135deg, #F9FCFF, #EEF7FA)", // Gradient xanh mint -> xanh nhạt
                    padding: "40px 20px",
                    borderRadius: "16px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
                }}
                >                 */}
                <div className="danh-cho-ban">
                    <Row className="ben-trong">
                        <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: 500, fontSize: "clamp(25px, 5vw, 32px)", padding: "4vh 0" }}>Chuyên khoa</span>
                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 500,
                                    fontSize: "clamp(18px, 2.5vw, 20px)",
                                    height: "50px",
                                    lineHeight: "clamp(36px, 5vh, 48px)",
                                    borderRadius: "15px",
                                    textAlign: "center",
                                    backgroundColor: "#d0edf7",
                                    color: "rgb(45 145 179)",
                                    marginTop: "10px",
                                    cursor: "pointer",
                                    padding: "clamp(4px, 0.8vw, 8px) clamp(12px, 2vw, 20px)",
                                }}
                                onClick={() => navigate("/user/chuyen-khoa-kham")}
                            >
                                Xem thêm
                            </span>
                        </div>
                        <HinhVuongSlider
                            items={items_ChuyenKhoa}
                            style={{
                                width: '100%',
                                height: '300px',
                                background: "linear-gradient(135deg, #E3F2FD, #F5F8FF)",
                                padding: "20px"
                            }}
                            loadingCard={loadingCard}
                            urlDoctor={handleRedirectChuyenKhoa}
                            type="specialty"
                        />
                    </Row>
                </div>
            {/* </div> */}

            {/* <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "5vh",
                    background: "linear-gradient(135deg, #F9FCFF, #EEF7FA)", // Gradient xanh mint -> xanh nhạt
                    padding: "40px 20px",
                    borderRadius: "16px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
                }}
                >  */}

                <div className="danh-cho-ban">
                    <Row className="ben-trong">
                        <div style={{ display: "flex", width: "100%", justifyContent: "space-between"}}>
                            <span style={{ fontWeight: 500, fontSize: "clamp(25px, 5vw, 32px)", padding: "4vh 0" }}>Bác sĩ nổi bật</span>
                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 500,
                                    fontSize: "clamp(18px, 2.5vw, 20px)",
                                    height: "50px",
                                    lineHeight: "clamp(36px, 5vh, 48px)",
                                    borderRadius: "15px",
                                    textAlign: "center",
                                    backgroundColor: "#d0edf7",
                                    color: "rgb(45 145 179)",
                                    marginTop: "10px",
                                    cursor: "pointer",
                                    padding: "clamp(4px, 0.8vw, 8px) clamp(12px, 2vw, 20px)",
                                }}
                                onClick={() => navigate("/user/bac-si-noi-bat")}
                            >
                                Xem thêm
                            </span>
                        </div>
                        <HinhVuongSlider
                            items={items_BacSi}
                            style={{
                                width: '100%',
                                height: '300px',
                                background: "linear-gradient(135deg, #E3F2FD, #F5F8FF)",
                                padding: "20px"
                            }}
                            loadingCard={loadingCard}
                            urlDoctor={handleRedirectBacSi}
                            type="doctor"
                            />

                    </Row>
                </div>
                <div style={{ marginBottom: "clamp(20px, 5vw, 100px)" }}></div>      
            {/* </div> */}
        </>
    );
};

export default BodyHomePage;