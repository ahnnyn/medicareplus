import { Avatar, Button, Col, Row } from "antd";
import Footer from "../../../components/TrangChu/Footer/Footer";
import HeaderViewDoctor from "../../../components/TrangChu/Header/HeaderViewDoctor";
import "../LichHen/lichhen.scss";
import { IoHomeSharp } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { findChuyenKhoaByTen } from "../../../services/apiChuyenKhoaBacSi";
import { fetchAllChuyenKhoa } from "../../../services/apiChuyenKhoaBacSi"; // Đảm bảo hàm này được nhập khẩu đúng
import { useNavigate } from "react-router-dom";
import SearchComponent from "../../../components/TrangChu/SearchComponent/SearchComponent";



const ChuyenKhoa = () => {

    const [dataAllDoctor, setDataAllDoctor] = useState([])
    const navigate = useNavigate()
    const [dataSearch, setDataSearch] = useState('')
    
    useEffect(() => {
        fetchListDoctor(dataSearch)
    }, [dataSearch])

    const fetchListDoctor = async (searchQuery = "") => {
        try {
            let res;
            if (searchQuery) {
                // Nếu có tìm kiếm, tìm chuyên khoa theo tên
                res = await findChuyenKhoaByTen(`tenkhoa=${encodeURIComponent(searchQuery)}`);
            } else {
                // Nếu không có tìm kiếm, lấy tất cả chuyên khoa
                res = await fetchAllChuyenKhoa(""); // Truyền chuỗi rỗng để lấy tất cả chuyên khoa
            }

            console.log("res all doctor: ", res);
            if (res && res.data) {
                setDataAllDoctor(res.data); // Cập nhật dữ liệu chuyên khoa
            } else {
                setDataAllDoctor([]); // Nếu không có dữ liệu, gán mảng rỗng
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            setDataAllDoctor([]); // Nếu có lỗi, gán mảng rỗng
        }
    };

    const handleRedirectChuyenKhoa = (item) => {
        navigate(`/user/view-chuyen-khoa-kham?maKhoa=${item}`)
    }

    const onSearch = (value) => {
        console.log("Giá trị tìm kiếm:", value); // Thêm log này
    
        setDataSearch(value || '');
    };

    return (
        <>
        <HeaderViewDoctor />
        <Row>
            <Col span={18} className="col-body">
                <Row>
                    <Col span={24}>
                        <p className="txt-title"><IoHomeSharp /> / Chuyên khoa khám</p>
                        {/* <Divider/> */}
                        {/* <hr style={{border: "1px solid rgb(243, 243, 243)"}} /> */}
                    </Col>
                    <Col span={24}>
                        <p className="title-lichhen"> Chuyên khoa khám</p>
                    </Col>   
                    <Col span={24} style={{marginBottom: "20px"}}>
                        <SearchComponent placeholder="Tìm kiếm chuyên khoa" onSearch={onSearch}/>
                    </Col>  

                    {dataAllDoctor?.length > 0 ? (
                        dataAllDoctor.map((item, index) => (
                            <Col key={index} span={24} style={{ padding: "10px 15px 0", cursor: "pointer" }} onClick={() => handleRedirectChuyenKhoa(item.maKhoa)}>
                                <Row>
                                    <Col span={3}>
                                        <Avatar  
                                        style={{border: "1px solid green"}}
                                        src={`${import.meta.env.VITE_BACKEND_URL}/public/chuyenkhoa/${item?.hinhAnh}`} 
                                        shape="square" 
                                        size={120} 
                                        icon={<UserOutlined />} />
                                    </Col>
                                    <Col span={21} className="box-title-doctor">
                                        <span className="txt-Title-doctor-noi-bat">
                                            {item.tenKhoa}
                                        </span> <br />                                       
                                    </Col>
                                </Row>
                                <hr style={{ border: "1px solid rgb(243, 243, 243)" }} />
                            </Col>
                        ))
                    ) : (
                        <Col span={24} style={{ textAlign: "center", padding: "20px" }}>
                            <p style={{ color: "gray", fontSize: "18px" }}>Chưa có chuyên khoa khám nào.</p>
                        </Col>
                    )}                    
                    
                </Row>
            </Col>
        </Row>
        <Footer/>
        </>
    )
}
export default ChuyenKhoa