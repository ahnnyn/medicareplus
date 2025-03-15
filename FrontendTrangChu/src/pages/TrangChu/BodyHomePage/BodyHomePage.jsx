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
    }, [])

    const items_toandien = [
        {
            icon: <FaClinicMedical size={40} color="blue" />,
            txtP: "Khám chuyên khoa"
        },
        {
            icon: <FiVideo size={40} color="blue" />,
            txtP: "Khám từ xa"
        }
    ];

    // Lấy danh sách chuyên khoa từ PHP API
    const listChuyenKhoa = async () => {
        setLoadingCard(true);
        try {
            const response = await fetchAllChuyenKhoa(); // Gọi API từ PHP
            if (response && response.data) {
                setDataChuyenKhoa(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách chuyên khoa:", error);
        }
        setLoadingCard(false);
    };

    // Format danh sách chuyên khoa
    const items_ChuyenKhoa = dataChuyenKhoa.map(chuyenKhoa => ({
        id: chuyenKhoa.maKhoa, // ID của chuyên khoa
        //src: `${import.meta.env.VITE_BACKEND_URL}/uploads/${chuyenKhoa.image}`, // Đường dẫn hình ảnh
        txtP: chuyenKhoa.tenKhoa // Tên chuyên khoa
    }));

    // Điều hướng đến trang chi tiết chuyên khoa
    const handleRedirectChuyenKhoa = (idChuyenKhoa) => {
        navigate(`/user/view-chuyen-khoa-kham?maKhoa=${idChuyenKhoa}`);
    };


    //lấy danh sách bác sĩ từ PHP
    const listBacSi = async () => {
        try {
            const response = await fetchAllBacSi(); // Gọi API từ PHP
            if (response && response.data) {
                setDataBacSi(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bác sĩ:", error);
        }
    };

    //Format danh sách bác sĩ
    const items_BacSi = dataBacSi.map(bacSi => ({
        id: bacSi.maBacSi, // ID của bác sĩ
       // src: `${import.meta.env.VITE_BACKEND_URL}/uploads/${bacSi.hinhAnh}`, // Đường dẫn hình ảnh
        txtP: bacSi.hoTen// Tên bác sĩ
       // txtH3: bacSi.chuyenKhoa, // Chuyên khoa
    }));

    //Điều hướng đến trang chi tiết bác sĩ
    const handleRedirectBacSi = (idBacSi) => {
        navigate(`/view-doctor?maBacSi=${idBacSi}`);
    };

    return (
        <>
            <div className="danh-cho-ban">                
                <Row className="ben-trong" >
                    <span style={{fontWeight: "500", fontSize: "4vh", width: "100%", padding: "4vh 0"}}>Dịch vụ</span>                    
                    {items_toandien.map((item, index) => (
                        <Col key={index} md={12} sm={24} xs={24} style={{marginBottom: "5vh"}}>
                            <HinhChuNhat icon={item.icon} txtP={item.txtP}/>
                        </Col>
                    ))}               
                </Row>                        
            </div>

            <div className="danh-cho-ban">                
                <Row className="ben-trong" >
                    <div style={{display: "flex", width: "100%", justifyContent: "space-between" }}>
                        <span style={{fontWeight: "500", fontSize: "4vh", padding: "4vh 0"}}>Chuyên khoa</span>                    
                        <span style={{
                            fontWeight: "500", 
                            fontSize: "3vh", 
                            backgroundColor: "blue", 
                            height: "50px", 
                            lineHeight: "45px",
                            borderRadius: "15px",
                            textAlign: "center",
                            backgroundColor: "#d0edf7",
                            color: "rgb(45 145 179)",
                            marginTop: "10px",
                            cursor: "pointer",
                            padding: "3px 10px"}}
                            onClick={() => navigate('/user/chuyen-khoa-kham')}
                        >Xem thêm</span>    
                    </div>                     
                    <HinhVuongSlider items={items_ChuyenKhoa} width={300} height={250} loadingCard={loadingCard} urlDoctor={handleRedirectChuyenKhoa} />                     
                </Row>                        
            </div>

            <div className="danh-cho-ban">
                <Row className="ben-trong">
                    <div style={{display: "flex", width: "100%", justifyContent: "space-between" }}>
                        <span style={{fontWeight: "500", fontSize: "4vh", padding: "4vh 0"}}>Bác sĩ nổi bật</span>                    
                        <span style={{
                            fontWeight: "500", 
                            fontSize: "3vh", 
                            backgroundColor: "blue", 
                            height: "50px", 
                            lineHeight: "45px",
                            borderRadius: "15px",
                            textAlign: "center",
                            backgroundColor: "#d0edf7",
                            color: "rgb(45 145 179)",
                            marginTop: "10px",
                            cursor: "pointer",
                            padding: "3px 10px"}}
                            onClick={() => navigate('/user/bac-si-noi-bat')}
                        >Xem thêm</span>    
                    </div> 
                    <HinhVuongSlider items={items_BacSi} width={300} height={250} loadingCard={loadingCard} urlDoctor={handleRedirectBacSi} />              
                </Row>
            </div> 
        </>
    );
};

export default BodyHomePage;
