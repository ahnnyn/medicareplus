import { Avatar, Button, Col, Divider, Drawer, Row } from 'antd';
import Footer from '../../../components/TrangChu/Footer/Footer';
import HeaderViewDoctor from '../../../components/TrangChu/Header/HeaderViewDoctor';
import './pageViewDoctor.scss';
import { CaretRightOutlined, DownOutlined, HomeOutlined, LikeFilled, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { FaLocationDot, FaRegHandPointUp } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa';
import { FaEnvelope } from "react-icons/fa";
import { IoIosShareAlt } from 'react-icons/io';
import { IoHomeSharp } from "react-icons/io5";

import { useLocation, useNavigate } from 'react-router-dom';
import { fetchBacSiByMaBS, getTimeSlotsByDoctorAndDate, getTimeSlotsByDoctor } from '../../../services/apiChuyenKhoaBacSi';
import moment from 'moment';

const PageViewDoctor = () => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('right');
    const [hienThiTime, setHienThiTime] = useState('Bấm vào đây để xem lịch khám!');
    const [selectedTimeId, setSelectedTimeId] = useState(null);
    const [dataLichLamViec, setDataLichLamViec] = useState([]);
    const [dataBacSi, setDataBacSi] = useState(null);  
    const [error, setError] = useState(null); // Lưu thông báo lỗi
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeGioList, setTimeGioList] = useState([]);
    const [giaKham, setGiaKham] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const maBacSi = params.get("maBacSi");
    const hinhThucKham = params.get("hinhThucKham");

    console.log("check id bác sĩ: ", maBacSi);

    useEffect(() => {
        if (!maBacSi) {
            setError("Không tìm thấy ID bác sĩ.");
            return;
        }
        fetchBacSiByID(maBacSi);
    }, [maBacSi]);

    useEffect(() => {
        if (dataBacSi) {
            setGiaKham(dataBacSi.giaKham);
        }
    }, [dataBacSi]);

    console.log("giaKham: ", giaKham);
    

    const fetchBacSiByID = async (maBacSi) => {
        const res = await fetchBacSiByMaBS(maBacSi)
        console.log("res: ", res.data);
        if(res && res.data) {
            setDataBacSi(res.data)
        }
    };
    console.log("dataBacSi: ", dataBacSi);

    useEffect(() => {
        const fetchBacSiTimes = async () => {
            if (!selectedDate) {
                console.warn("selectedDate is null or undefined");
                return;
            }
            if (!maBacSi) {
                console.warn("maBacSi is null or undefined");
                return;
            }
    
            console.log("selectedDate: ", selectedDate);
            const doctorId = maBacSi;
            // const appointmentDate = selectedDate; // Ngày đã chọn từ Drawer
            // console.log("appointmentDate: ", appointmentDate);    
            // const res = await getTimeSlotsByDoctorAndDate(doctorId, appointmentDate);
            const res = await getTimeSlotsByDoctor(doctorId);
            console.log("res fetch: ", res);
    
            if (res && Array.isArray(res)) {
                setDataLichLamViec(res);
            } else {
                console.error('Error fetching time slots:', await res.json());
            }
        };
    
        fetchBacSiTimes();
    }, [maBacSi]);
    
    
    console.log("dataLichKham: ", dataLichLamViec);
    
    const formatCurrency = (value) => {
        if (value === null || value === undefined) return '';
        
        const number = parseInt(value, 10); // loại bỏ phần thập phân nếu có
        return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ`;
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
// Lấy ngày hiện tại (không tính thời gian)
const today = moment().startOf('day');

// hiển thị trong drawer (chỉ hiển thị từ hôm nay trở đi)
const listTime = (dataBacSi?.danhSachNgayLamViec || '')
    .split(',')
    .map(date => date.trim())
    .filter(date => moment(date, 'YYYY-MM-DD', true).isValid())
    .filter(date => moment(date).isSameOrAfter(today));




    const styleTime = (index) => ({
        cursor: "pointer",
        fontSize: "18px",
        color: hoveredIndex === index ? 'red' : 'black', // Đổi màu chữ khi hover
    });
    
    
    const handleRedirectBacSi = (item, idKhungGio, thoiGianKhamBenh, selectedDate, giaKham) => {
        const formattedDate = moment(selectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
        navigate(`/page-dat-lich-kham?id=${item.maBacSi}&idGioKhamBenh=${idKhungGio}&khungGioKham=${thoiGianKhamBenh}&ngayKham=${formattedDate}&giaKham=${giaKham}`);
    };   
    return (
        <>
            <div className='layout-app'>
                <HeaderViewDoctor />
                
                <Row style={{marginBottom: "150px"}}></Row>

            
                <Row>
                    <Col span={18} className='body-view-doctocc'>
                        <Row style={{marginBottom: "30px"}}>
                            <Col span={24} style={{backgroundColor: "white", height: "7vh"}}>
                                <p style={{ color: "rgb(69, 195, 210)", fontSize: "18px", marginLeft: "5px", fontWeight:"bold", position: "relative"}}>
                                    <IoHomeSharp /> / Các chuyên khoa / 
                                    <span style={{marginLeft: "5px"}}> {dataBacSi?.tenKhoa || 'Chưa có thông tin'} </span>
                                    <span style={{marginLeft: "5px"}}> / Bác sĩ {dataBacSi?.hoTen || 'Chưa có thông tin'}</span>
                                </p>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={21} sm={21} xs={21} span={21} push={3} style={{backgroundColor: "white",}}>
                                <p style={{fontSize: "25px", marginTop: "10px", fontWeight: "500"}}>
                                    {dataBacSi?.hoTen}
                                </p>
                                <p style={{fontSize: "15px", marginTop: "-20px", color: "#999999", lineHeight: "22px"}}>
                                    
                                    {dataBacSi?.moTa}
                                </p>
                                <p style={{fontSize: "15px", marginTop: "-5px",}}><FaEnvelope />
                                    <span style={{marginLeft: "5px"}}>{dataBacSi?.email}</span> &nbsp;&nbsp; - &nbsp;&nbsp;
                                    <span style={{marginLeft: "5px"}}><PhoneOutlined /> {dataBacSi?.soDienThoai}</span>
                                </p>                                
                                
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
                                        title={`Thông tin lịch khám bệnh của bác sĩ
                                            
                                            ${dataBacSi?.hoTen}`}                                        
                                        placement={placement}
                                        closable={false}
                                        onClose={onClose}
                                        open={open}
                                        key={placement}
                                        // height={450}
                                        // width={300}
                                        // style={{ backgroundColor: 'blue', color: 'white' }} // Thay đổi màu nền
                                    >
                                        {listTime.length > 0 ? (
                                            listTime
                                                .sort((a, b) => moment(a).unix() - moment(b).unix()) // Sắp xếp từ nhỏ đến lớn
                                                .map((time, index) => {
                                                    const formattedTime = moment(time).format("dddd - DD/MM"); // Định dạng lại thời gian
                                                    const vietnameseDay = englishToVietnameseDays[moment(time).format("dddd")]; // Chuyển đổi tên ngày sang tiếng Việt
                                                    const displayTime = `${vietnameseDay} - ${moment(time).format("DD/MM")}`; // Tạo chuỗi hiển thị
                                                    return (
                                                        <p 
                                                            onClick={() => {                                                    
                                                                console.log("time: ", time);
                                                                setHienThiTime(displayTime);
                                                                setSelectedTimeId(time);
                                                                setSelectedDate(time); // Cập nhật ngày đã chọn
                                                                onClose(); // Đóng drawer
                                                            }}
                                                            onMouseEnter={() => setHoveredIndex(index)} // Khi hover vào thẻ
                                                            onMouseLeave={() => setHoveredIndex(null)} // Khi rời khỏi thẻ
                                                            className='times' 
                                                            style={styleTime(index)} 
                                                            key={index}
                                                        >
                                                            {displayTime} {/* Hiển thị thời gian đã định dạng */}
                                                        </p>
                                                    );
                                                })
                                        ) : (
                                            <p>Không có thời gian khám nào.</p>
                                        )}

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
                                    <Row justify="start" style={{ marginTop: "-10px" }}>
    {hienThiTime !== 'Bấm vào đây để xem lịch khám!' ? (
        dataLichLamViec
            .filter(item =>
                item.trangThaiDatLich !== 'booked' &&
                item.hinhThucKham === hinhThucKham &&
                item.ngayKham === selectedDate // lọc theo ngày đang chọn
            )
            .length > 0 ? (
            dataLichLamViec
                .filter(item =>
                    item.trangThaiDatLich !== 'booked' &&
                    item.hinhThucKham === hinhThucKham &&
                    item.ngayKham === selectedDate
                )
                .map((item, index) => (
                    <Col
                        span={4}
                        className='cach-deu'
                        key={index}
                        onClick={() => {
                            setTimeGioList(item.khungGio);
                            setSelectedTimeId(item.maKhungGio);
                            handleRedirectBacSi(dataBacSi, item.maKhungGio, item.khungGio, selectedDate, giaKham);
                        }}
                    >
                        <div className='lich-kham'>
                            {item.khungGio}
                        </div>
                    </Col>
                ))
        ) : (
            <span style={{ color: "red", margin: "0 0 10px" }}>
                Không có thời gian khám nào.<br />Chọn lịch
            </span>
        )
    ) : (
        <span style={{ color: "red", margin: "0 0 10px" }}>
            Không có thời gian khám nào.<br />Chọn lịch
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

                            
                            <Col span={12} style={{backgroundColor: "white", padding: "45px 20px"}}>
                        
                                {showDetails ? (
                                    <div>
                                        <p style={{ fontWeight: "500" }}>GIÁ KHÁM:</p>
                                        <div style={{
                                            backgroundColor: "#f7f7f7", border: "1px solid #d9d2d2",
                                            display: "flex", justifyContent: "space-between"
                                        }}>
                                            <span className='span-gia-kham'>
                                                <p style={{ fontWeight: "500" }}>Giá khám</p>
                                                {/* <p>Giá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm</p> */}
                                            </span>
                                            <span style={{ lineHeight: "70px", marginRight: "5px", color: "red", fontWeight: "500" }} className='span-gia-kham'>
                                            {formatCurrency(dataBacSi?.giaKham)}
                                            </span>
                                        </div>

                                        
                                        <a onClick={toggleDetails} style={{ float: "right", marginTop: "5px" }}>Ẩn bảng giá</a>
                                    </div>
                                ) : (
                                    <p>
                                        <span style={{ fontWeight: "500", color: "gray" }}>GIÁ KHÁM:</span> &nbsp;
                                        <span style={{color: "red", fontWeight: "500"}}>{formatCurrency(dataBacSi?.giaKham)}</span>
                                        {/* <a onClick={toggleDetails} style={{ marginLeft: "10px" }}>Xem chi tiết</a> */}
                                    </p>
                                )}                                
                            </Col>

                           
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
                <Row style={{marginBottom: "100px"}}></Row>
                <Footer />
            </div>        
        </>
    );
};

export default PageViewDoctor;
