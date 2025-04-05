import { Carousel, Col, Row } from "antd";
import './bodyHomePage.scss';
import HinhChuNhat from "../../../components/TrangChu/HinhChuNhat/HinhChuNhat";
import HinhVuongSlider from "../../../components/TrangChu/HinhVuong/HinhVuongSlicer";
import { useEffect, useState } from "react";
import { FiUser, FiVideo } from "react-icons/fi";
import { GiHospital } from "react-icons/gi"; // Bệnh viện
import { FaClinicMedical } from "react-icons/fa"; // Phòng khám
import { RiVideoChatLine } from "react-icons/ri"; // Video call
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
        { icon: <FiVideo size={40} color="blue" />, txtP: "Khám từ xa" }
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
            <div className="danh-cho-ban">
                <Row className="ben-trong">
                    <span style={{ fontWeight: 500, fontSize: "4vh", width: "100%", padding: "4vh 0" }}>
                        Dịch vụ
                    </span>
                    {items_toandien.map((item, index) => (
                        <Col key={index} md={12} sm={24} xs={24} style={{ marginBottom: "5vh" }}>
                            <HinhChuNhat icon={item.icon} txtP={item.txtP} />
                        </Col>
                    ))}
                </Row>
            </div>

            <div className="danh-cho-ban">
                <Row className="ben-trong">
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: 500, fontSize: "4vh", padding: "4vh 0" }}>Chuyên khoa</span>
                        <span
                            style={{
                                fontWeight: 500,
                                fontSize: "3vh",
                                height: "50px",
                                lineHeight: "45px",
                                borderRadius: "15px",
                                textAlign: "center",
                                backgroundColor: "#d0edf7",
                                color: "rgb(45 145 179)",
                                marginTop: "10px",
                                cursor: "pointer",
                                padding: "3px 10px"
                            }}
                            onClick={() => navigate("/user/chuyen-khoa-kham")}
                        >
                            Xem thêm
                        </span>
                    </div>
                    <HinhVuongSlider
                        items={items_ChuyenKhoa}
                        style={{ width: '100%', height: '300px' }}
                        loadingCard={loadingCard}
                        urlDoctor={handleRedirectChuyenKhoa}
                        type="specialty"
                    />
                </Row>
            </div>

            <div className="danh-cho-ban">
                <Row className="ben-trong">
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: 500, fontSize: "4vh", padding: "4vh 0" }}>Bác sĩ nổi bật</span>
                        <span
                            style={{
                                fontWeight: 500,
                                fontSize: "3vh",
                                height: "50px",
                                lineHeight: "45px",
                                borderRadius: "15px",
                                textAlign: "center",
                                backgroundColor: "#d0edf7",
                                color: "rgb(45 145 179)",
                                marginTop: "10px",
                                cursor: "pointer",
                                padding: "3px 10px"
                            }}
                            onClick={() => navigate("/user/bac-si-noi-bat")}
                        >
                            Xem thêm
                        </span>
                    </div>
                    <HinhVuongSlider
                        items={items_BacSi}
                        style={{ width: '100%', height: '300px' }}
                        loadingCard={loadingCard}
                        urlDoctor={handleRedirectBacSi}
                        type="doctor"
                    />
                </Row>
            </div>
        </>
    );
};

export default BodyHomePage;