import { Avatar, Button, Col, Divider, Drawer, Row } from 'antd';
import Footer from '../../../components/TrangChu/Footer/Footer';
import HeaderViewDoctor from '../../../components/TrangChu/Header/HeaderViewDoctor';
import './pageViewDoctor.scss';
import { CaretRightOutlined, DownOutlined, HomeOutlined, LikeFilled, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { FaLocationDot, FaRegHandPointUp } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa';
import { IoIosShareAlt } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchBacSiByMaBS, getTimeSlotsByBacSiAndDate } from '../../../services/apiChuyenKhoaBacSi';
import moment from 'moment';

const PageViewDoctor = () => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('right');
    const [hienThiTime, setHienThiTime] = useState('Bấm vào đây để xem lịch khám!');
    const [selectedTimeId, setSelectedTimeId] = useState(null);
    const [timeGioList, setTimeGioList] = useState([]);
    const [dataBacSi, setDataBacSi] = useState(null);  
    const [error, setError] = useState(null); // Lưu thông báo lỗi

    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const maBacSi = params.get("maBacSi");

    console.log("check id bác sĩ: ", maBacSi);

    useEffect(() => {
        if (!maBacSi) {
            setError("Không tìm thấy ID bác sĩ.");
            return;
        }
        fetchBacSiByID(maBacSi);
    }, [maBacSi]);

    useEffect(() => {
        if (!selectedTimeId || !maBacSi) return;
        fetchBacSiTimes(maBacSi, selectedTimeId);
    }, [selectedTimeId]);

    const fetchBacSiByID = async (maBacSi) => {
        const res = await fetchBacSiByMaBS(maBacSi)
        console.log("res: ", res);
        if(res && res.data) {
            setDataBacSi(res.data)
        }
    };
    

    const fetchBacSiTimes = async (maBacSi, appointmentDate) => {
        try {
            let query = `maBacSi=${maBacSi}&date=${appointmentDate}`;
            const res = await getTimeSlotsByBacSiAndDate(query);
            console.log("Kết quả API lịch khám: ", res);
            
            if (res && res.timeGioList) {
                setTimeGioList(res.timeGioList);
            } else {
                setTimeGioList([]);
                console.warn("Không có lịch khám.");
            }
        } catch (err) {
            console.error("Lỗi khi lấy lịch khám:", err);
            setTimeGioList([]);
        }
    };

    const formatCurrency = (value) => {
        if (value === null || value === undefined) return '';
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ`;
    };

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    
    const englishToVietnameseDays = {
        "Sunday": "Chủ nhật",
        "Monday": "Thứ 2",
        "Tuesday": "Thứ 3",
        "Wednesday": "Thứ 4",
        "Thursday": "Thứ 5",
        "Friday": "Thứ 6",
        "Saturday": "Thứ 7"
    };   

    // hiển thị trong drawer
    //const listTime = dataBacSi?.thoiGianKham.map(item => item.date) || [];        

    //console.log("listTime: ",listTime);

    const styleTime = (index) => ({
        cursor: "pointer",
        fontSize: "18px",
        color: hoveredIndex === index ? 'red' : 'black', // Đổi màu chữ khi hover
    });
    
    
    const handleRedirectBacSi = (item, thoiGianKhamBenh, listTime) => {
        navigate(`/page-dat-lich-kham?id=${item._id}&idGioKhamBenh=${thoiGianKhamBenh}&ngayKham=${listTime}`)
    }    
    return (
        <>
            <div className='layout-app'>
                <HeaderViewDoctor />
                
                <Row>
                    <Col span={18} className='body-view-doctocc'>
                        <Row>
                            <Col span={24} style={{backgroundColor: "white", height: "7vh"}}>
                                <p style={{ color: "rgb(69, 195, 210)", fontSize: "15px", marginLeft: "5px", top: "-5px", position: "relative"}}>
                                    <HomeOutlined /> /Các chuyên khoa/ 
                                    {dataBacSi?.tenKhoa || 'Chưa có thông tin'}
                                </p>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={21} sm={21} xs={21} span={21} push={3} style={{backgroundColor: "white",}}>
                                <p style={{fontSize: "25px", marginTop: "10px", fontWeight: "500"}}>
                                    {dataBacSi?.hoTen}
                                </p>
                                <p style={{fontSize: "15px", marginTop: "-20px", color: "#999999", lineHeight: "22px"}}>
                                    
                                    Nhiều năm kinh nghiệm trong khám và điều trị bệnh lý <br/>
                                    Bác sĩ nhận khám cho bệnh nhân từ 16 tuổi trở lên
                                </p>
                                <p style={{fontSize: "15px", marginTop: "-5px",}}><FaLocationDot />
                                    <span style={{marginLeft: "5px"}}>{dataBacSi?.diaChi}</span> &nbsp; &nbsp; - &nbsp;&nbsp;
                                    <span style={{marginLeft: "5px"}}><PhoneOutlined /> {dataBacSi?.soDienThoai}</span>
                                </p>                                
                                <Button type="primary" style={{marginRight: "10px", fontSize: "14px"}} icon={<LikeFilled />}>Thích 0</Button>                                
                                <Button type="primary" style={{fontSize: "14px"}} icon={<IoIosShareAlt />}>Chia sẻ</Button>
                            </Col>

                            <Col md={3} sm={24} xs={24} span={3} pull={21} style={{backgroundColor: "white", textAlign: "center"}}>
                                <Avatar src={`${import.meta.env.VITE_BACKEND_URL}/public/bacsi/${dataBacSi?.hinhAnh}`} size={120} icon={<UserOutlined />} />    
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12} style={{backgroundColor: "white", borderRight: "1px solid rgba(228, 228, 221, 0.637)"}}>
                                <Col span={24} style={{backgroundColor: "white"}}>                                
                                    <p  onClick={showDrawer} 
                                        style={{
                                            color: "rgb(69, 195, 210)", fontWeight: "500", fontSize: "16px", padding: "10px 0", cursor: "pointer", 
                                        }}>                                         
                                        {/* <CaretRightOutlined /> */}
                                        {hienThiTime} {/* Hiển thị ngày đã chọn */}
                                        <DownOutlined style={{fontSize: "14px", marginLeft: "3px", fontWeight: "600"}} /> 
                                        {hienThiTime !== 'Bấm vào đây để xem lịch khám!' ? (
                                            <hr style={{ width: "130px", margin: "5px"}}/>
                                        ) : (
                                            <hr style={{ width: "230px", margin: "5px"}}/>
                                        )} 
                                        
                                    </p>

                                    <Drawer
                                        title={`Thông tin lịch khám bệnh của 
                                            ${dataBacSi?.hoTen}`}                                        
                                        placement={placement}
                                        closable={false}
                                        onClose={onClose}
                                        open={open}
                                        key={placement}
                                    >

    
                                        <Button color="default" variant="outlined" onClick={() => setOpen(false)}>Bỏ Qua</Button>
                                    </Drawer>
                                </Col>    

                                <Col span={24}  style={{backgroundColor: "white", top: "-18px", position: "relative"}}>
                                    <p style={{
                                        color: "gray", fontSize: "16px", fontWeight: "500", padding: "10px 0"
                                    }}>
                                        <FaRegCalendarAlt />
                                        <span style={{marginLeft: "10px"}}>LỊCH KHÁM</span>    
                                    </p>
                                    <Row justify="start" style={{marginTop: "-10px"}}>
                                        {hienThiTime !== 'Bấm vào đây để xem lịch khám!' ? (
                                            timeGioList.map((item, index) => (
                                                <Col span={4} className='cach-deu' onClick={() => handleRedirectBacSi(dataBacSi, item.maBacSi, selectedDate)}>
                                                    <div className='lich-kham' key={index}>
                                                    {item.tenGio}
                                                    </div>
                                                </Col>
                                            ))
                                        ) : (
                                            <span style={{color: "red", margin: "0 0 10px"}}>Không có thời gian khám nào. 
                                            <br/> Chọn lịch
                                            </span>
                                        )}                                                                                                                          
                                    </Row>
                                </Col>                            

                                <Col span={24}  style={{backgroundColor: "white", top: "-30px", position: "relative"}}>
                                    <p style={{fontSize: "14px", color: "gray"}}>
                                        Chọn <FaRegHandPointUp size={14} /> và đặt (Phí đặt lịch 0đ)
                                    </p>
                                </Col>
                            </Col>

                            {/*
                            <Col span={12} style={{backgroundColor: "white", padding: "45px 20px"}}>
                        
                                {showDetails ? (
                                    <div>
                                        <p style={{ fontWeight: "500" }}>GIÁ KHÁM:</p>
                                        <div style={{
                                            backgroundColor: "#f7f7f7", border: "1px solid #d9d2d2",
                                            display: "flex", justifyContent: "space-between"
                                        }}>
                                            <span className='span-gia-kham'>
                                                <p style={{ fontWeight: "500" }}>Giá khám cho người Việt</p>
                                                <p>Giá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm</p>
                                            </span>
                                            <span style={{ lineHeight: "70px", marginRight: "5px", color: "red", fontWeight: "500" }} className='span-gia-kham'>
                                            {formatCurrency(dataDoctor?.giaKhamVN)}
                                            </span>
                                        </div>

                                        <div style={{
                                            backgroundColor: "#f7f7f7", border: "1px solid #d9d2d2",
                                            display: "flex", justifyContent: "space-between"
                                        }}>
                                            <span className='span-gia-kham'>
                                                <p style={{ fontWeight: "500" }}>Giá khám cho người nước ngoài</p>
                                                <p>Giá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm</p>
                                            </span>
                                            <span style={{ lineHeight: "70px", marginRight: "5px", color: "red", fontWeight: "500" }} className='span-gia-kham'>
                                            {formatCurrency(dataDoctor?.giaKhamNuocNgoai)}
                                            </span>
                                        </div>
                                        <a onClick={toggleDetails} style={{ float: "right", marginTop: "5px" }}>Ẩn bảng giá</a>
                                    </div>
                                ) : (
                                    <p>
                                        <span style={{ fontWeight: "500", color: "gray" }}>GIÁ KHÁM:</span> &nbsp;
                                        <span style={{color: "red", fontWeight: "500"}}>{formatCurrency(dataDoctor?.giaKhamVN)}</span> đến <span style={{color: "red", fontWeight: "500"}}>{formatCurrency(dataDoctor?.giaKhamNuocNgoai)}</span>
                                        <a onClick={toggleDetails} style={{ marginLeft: "10px" }}>Xem chi tiết</a>
                                    </p>
                                )}                                
                            </Col>

                            */}
                        </Row>

                    </Col>
                </Row>
                <Row> 
                    <Col span={24} style={{backgroundColor: "#f7f7f7", borderTop: "1px solid rgba(228, 228, 221, 0.637)", marginTop: "20px"}}>
                        <Row>
                            <Col span={18} style={{margin: "auto",}}>
                                <div dangerouslySetInnerHTML={{ __html: dataBacSi?.mota }} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row> 
                    <Col span={24} style={{backgroundColor: "#f7f7f7", borderTop: "1px solid rgba(228, 228, 221, 0.637)", marginTop: "20px"}}>
                        <Row>
                            <Col span={18} style={{margin: "auto",}}>
                            phản hồi ở đây
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Footer />
            </div>        
        </>
    );
};

export default PageViewDoctor;
