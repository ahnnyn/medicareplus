import { Avatar, Button, Col, DatePicker, Divider, Form, Input, message, notification, Radio, Row } from "antd"
import Footer from "../../../components/TrangChu/Footer/Footer"
import HeaderViewDoctor from "../../../components/TrangChu/Header/HeaderViewDoctor"
import { PhoneOutlined, UserOutlined } from "@ant-design/icons"
import './styleDatLich.scss'
import { BsFillCalendar2DateFill } from "react-icons/bs"
import { FaRegHospital } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchBacSiByMaBS, datLichKhamBenh, datLichKhamBenhVnPay, taoVnPayUrl } from "../../../services/apiChuyenKhoaBacSi"
import { fetchOneAccKH } from "../../../services/api"
import moment from "moment"
import { HiOutlineMailOpen } from "react-icons/hi"
import { IoAddCircleSharp, IoLocationSharp } from "react-icons/io5"
import { DollarOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux"
import LoginPage from "../Login/Login"

const { TextArea } = Input;
const PageDatLichKham = () => {

    const location = useLocation(); // Lấy location
    const queryParams = new URLSearchParams(location.search);
    const doctorId = queryParams.get('id');
    const idGioKhamBenh = queryParams.get('idGioKhamBenh');
    const khungGioKham = queryParams.get('khungGioKham');
    const ngayKham = queryParams.get('ngayKham');
    const giaKham = queryParams.get('giaKham');
    const [paymentMethod, setPaymentMethod] = useState('VnPay'); // Trạng thái mặc định là thanh toán online
    const [dataBacSi, setDataBacSi] = useState(null);  
    const [ngayKhamBenh, setNgayKhamBenh] = useState(null)
    const [dataBenhNhan, setDataBenhNhan] = useState(null)
    const [genderBenhNhan, setGenderBenhNhan] = useState(null)
    const [phuongThucThanhToan, setPhuongThucThanhToan] = useState("VnPay")
    const [value, setValue] = useState(0);
    const [tongtien, setTongTien] = useState(0)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const acc = useSelector(s => s.account.user)

    console.log("doctorId: ", doctorId);
    console.log("idGioKhamBenh: ", idGioKhamBenh);
    console.log("khungGioKham: ", khungGioKham);
    console.log("giaKham: ", giaKham);
    console.log("ngayKham: ", ngayKham);
    console.log("tongtien: ", tongtien);

    const maBenhNhan = acc.user.maBenhNhan;
    console.log("maBenhNhan: ", maBenhNhan);

    useEffect(() => {
        fetchBacSiByID(doctorId);
    }, [doctorId]);


    useEffect(() => {
        if (ngayKham) {
            setNgayKhamBenh(ngayKham);
        }
    }, [ngayKham]);
    

    useEffect(() => {
        fetchBenhNhanByID(maBenhNhan);
    }, [maBenhNhan]);


    const fetchBenhNhanByID = async (maBenhNhan) => {
        console.log("Đang fetch bác sĩ với ID: ", maBenhNhan);
        try {
            const res = await fetchOneAccKH(maBenhNhan);
            console.log("Kết quả API bệnh nhân: ", res);
            if (res && res.data) {
                    setDataBenhNhan(res.data);
            } else {
                console.warn("Không có dữ liệu bác sĩ");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API bác sĩ: ", error);
        }
    };
    console.log("dataBenhNhan: ", dataBenhNhan);



    const fetchBacSiByID = async (doctorId) => {
        console.log("Đang fetch bác sĩ với ID: ", doctorId);
        try {
            const res = await fetchBacSiByMaBS(doctorId);
            console.log("Kết quả API bác sĩ: ", res);
            if (res && res.data) {
                if (res && res.data) {
                    const data = res.data;
                    data.giaKham = Number(data.giaKham); // ép kiểu
                    setDataBacSi(data);
                }
            } else {
                console.warn("Không có dữ liệu bác sĩ");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API bác sĩ: ", error);
        }
    };


    console.log("dataBacSi: ", dataBacSi);

    const handlePaymentChange = (event) => {
        console.log("e: ", event);
        setPaymentMethod(event.target.value);

    };


    const englishToVietnameseDays = {
        'Sunday': 'Chủ nhật',
        'Monday': 'Thứ 2',
        'Tuesday': 'Thứ 3',
        'Wednesday': 'Thứ 4',
        'Thursday': 'Thứ 5',
        'Friday': 'Thứ 6',
        'Saturday': 'Thứ 7'
    };

    const formatDate = (dateString) => {
        const date = moment(dateString);
        const englishDay = date.format('dddd'); // Lấy tên ngày bằng tiếng Anh
        const vietnameseDay = englishToVietnameseDays[englishDay]; // Chuyển sang tiếng Việt
        return `${vietnameseDay} - ${date.format('DD/MM/YYYY')}`;
    }
    const formatDateDatLich = (dateString) => {
        const date = moment(dateString);
        const englishDay = date.format('dddd'); // Lấy tên ngày bằng tiếng Anh
        const vietnameseDay = englishToVietnameseDays[englishDay]; // Chuyển sang tiếng Việt
        return `${date.format('DD/MM/YYYY')}`;
    }


    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const formatCurrency = (value) => {
        if (value === null || value === undefined) return '';
        
        const number = parseInt(value, 10); // loại bỏ phần thập phân nếu có
        return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ`;
    };

    const handleDatLich = async (values) => {
        console.log("📋 Toàn bộ values:", values);
        console.log("👤 Tên bệnh nhân:", values.patientName);
        console.log("Updating benh nhan with data:", {
            fullName: values.patientName, 
            gender: values.gender, 
            phoneNumber: values.phone,
            email: values.email, 
            address: values.address, 
            giaKham: values.giaKham, 
            lyDoKham: values.lyDoKham,
            dateBenhNhan: values.dateBenhNhan,
            hinhThucTT: values.hinhThucTT
        });

        console.log("tenBN ", values.patientName);


        setLoadingSubmit(true);
    
        try {
    
            const apiCall = values.hinhThucTT === 'VnPay'
                ? datLichKhamBenhVnPay
                : datLichKhamBenh;
    
            const res = await apiCall(
                values.maBenhNhan,
                values.maBacSi,
                values.khungGioKham,
                values.patientName,
                values.giaKham,
                values.ngayKhamBenh,
                values.lyDoKham,
                values.hinhThucTT
            );
    
            
            console.log("res dat lich:", res);
    
            if (res?.status) {
                if (values.hinhThucTT === 'VnPay') {
                    try {
                      const vnpayRes = await taoVnPayUrl(res.maLichKham, values.giaKham, values.patientName);
                      console.log("vnpayRes:", vnpayRes);
                  
                      const vnpayData = vnpayRes;
                      if (vnpayData?.status) {
                        window.location.href = vnpayData.payment_url;
                      } else {
                        notification.error({
                          message: 'Lỗi VNPAY',
                          description: vnpayData?.message || 'Không tạo được link thanh toán.'
                        });
                      }
                    } catch (error) {
                      console.error("Lỗi khi gọi API tạo URL VNPAY:", error);
                      notification.error({
                        message: 'Lỗi kết nối VNPAY',
                        description: 'Không thể gửi yêu cầu đến máy chủ. Vui lòng thử lại.'
                      });
                    }
                  } else {
                    message.success(res.message || 'Đặt lịch thành công 🎉');
                    form.resetFields();
                  }
                  
            } else {
                notification.error({
                    message: 'Đã có lỗi xảy ra',
                    description: res?.error || 'Không thể đặt lịch khám.'
                });
            }
        } catch (error) {
            console.error("Đặt lịch lỗi:", error);
            notification.error({
                message: 'Lỗi kết nối',
                description: 'Không thể gửi yêu cầu đến máy chủ.'
            });
        } finally {
            setLoadingSubmit(false);
        }
    };
    
    
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const idKH = acc?.user.maBenhNhan;


    useEffect(() => {
        if (
            form &&
            dataBacSi?.maBacSi &&
            idKH &&
            ngayKhamBenh &&
            khungGioKham &&
            dataBenhNhan
        ) {
            form.setFieldsValue({
                khungGioKham: idGioKhamBenh,
                ngayKhamBenh: ngayKham,
                maBenhNhan: idKH,
                maBacSi: dataBacSi.maBacSi,
                patientName: dataBenhNhan.hoTen,
                gender: dataBenhNhan.gioiTinh,
                phone: dataBenhNhan.soDienThoai,
                email: dataBenhNhan.email,
                address: dataBenhNhan.diaChi,
                dateBenhNhan: dataBenhNhan.ngaySinh
                    ? moment(dataBenhNhan.ngaySinh, "YYYY-MM-DD")
                    : null,
            });
    
            setGenderBenhNhan(dataBenhNhan.gioiTinh);
        }
    }, [form, dataBacSi, idKH, ngayKhamBenh, khungGioKham, dataBenhNhan]);
    
    
    
    const [openModalLogin, setOpenModalLogin] = useState(false);

    const notificationContent = () => (
        <div>
            <span>
                Vui lòng đăng nhập trước khi đặt lịch! <br /> Bấm vào đây để
            </span>
            <Button
                type="link"
                style={{ marginLeft: '8px' }}
                onClick={() => {
                    // navigator('/admin/ke-hoach-doctor')
                    setOpenModalLogin(true)
                }}
            >
                Tiến hành đăng nhập
            </Button>
        </div>
    );
    

    return (
        <>
            <HeaderViewDoctor />
            <Form
                form={form}
                name="basic"
                layout="vertical"
                style={{
                    maxWidth: "100%",
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleDatLich}
                autoComplete="off"
            // loading={isSubmit}
            >
                <Row>
                    <Col className="sticky-col" span={24}>
                        <Row>
                            <Col span={10} style={{ margin: "auto", }}>
                                <Row>
                                    <Col md={4} span={4} style={{ textAlign: "center", top: "20px" }}>
                                        <Avatar src={`${import.meta.env.VITE_BACKEND_URL}/public/bacsi/${dataBacSi?.hinhAnh}`} size={90} icon={<UserOutlined />} />
                                    </Col>
                                    <Col span={20} md={20}>
                                        <p className="txtTile">ĐẶT LỊCH KHÁM</p>
                                        <p className="txtTile" style={{ color: "#337ab7", lineHeight: "25px", fontSize: "18px" }}>
                                            Bác sĩ {dataBacSi?.hoTen} - Chuyên khoa {dataBacSi?.tenKhoa} <br />
                                        </p>
                                        <p className="txtTile">
                                            <BsFillCalendar2DateFill style={{ color: "gray", marginRight: "10px" }} />
                                            <span className="txt2" style={{ color: "#FEC206" }}>
                                                {khungGioKham} - {formatDate(ngayKhamBenh)}
                                            </span>
                                        </p>
                                        {/* <p className="txtTile">
                                            <FaRegHospital style={{ color: "gray", marginRight: "10px" }} />
                                            <span>Phòng khám {dataBacSi?.phongKhamId.name}</span>
                                            <p style={{ marginLeft: "25px", fontWeight: "350" }}>{DataBacSi?.phongKhamId.address}</p>
                                        </p> */}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {/* the input an luu cac gia tri de truyen len server */}
                        <Row>
                            <Form.Item name="maBenhNhan" hidden> <Input /> </Form.Item>
                            <Form.Item name="khungGioKham" hidden> <Input /> </Form.Item>
                            <Form.Item name="ngayKhamBenh" hidden> <Input /> </Form.Item>
                            <Form.Item name="maBacSi" hidden> <Input /> </Form.Item>
                        </Row>
                    </Col>

                    <Col span={24} style={{ marginTop: "10px" }}>
                        <Row>
                            <Col span={10} style={{ margin: "auto", }}>
                                <Row gutter={[20, 20]}>
                                    <Col span={22} md={22} xs={24} sm={24} style={{ margin: "auto" }}>
                                    {/* <Form.Item
                                        name="giaKham"
                                        initialValue={giaKham || null}
                                        rules={[{ required: true, message: 'Vui lòng chọn giá khám!' }]}
                                        >
                                        {dataBacSi?.giaKham ? (
                                            <Radio.Group
                                            onChange={onChange}
                                            value={value || giaKham} // chọn mặc định nếu chưa chọn
                                            >
                                            <Row gutter={[20, 0]}>
                                                <Col
                                                span={30}
                                                md={30}
                                                xs={24}
                                                sm={24}
                                                className={`giaKhamdiv ${value === giaKham ? 'active1' : ''}`}
                                                >
                                                <Radio value={giaKham} onClick={() => setTongTien(giaKham)}>
                                                    Giá khám <br />
                                                    <span style={{ color: "red" }}>{formatCurrency(giaKham)}</span>
                                                </Radio>
                                                </Col>
                                            </Row>
                                            </Radio.Group>
                                        ) : (
                                            <div style={{ color: '#888' }}>Đang tải giá khám...</div>
                                        )}
                                        </Form.Item> */}

                                        <Form.Item name="giaKham" initialValue={giaKham} hidden>
                                            <Input />
                                            </Form.Item>

                                            <Form.Item label="Giá khám">
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <DollarOutlined style={{ color: "#fa541c", fontSize: 18 }} />
                                                <span style={{ color: "red", fontWeight: "bold" }}>
                                                {formatCurrency(giaKham)}
                                                </span>
                                            </div>
                                        </Form.Item>

                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={23} md={23} className="cac-the-input" >
                                        <Form.Item
                                            name="patientName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập thông tin.',
                                                },
                                                {
                                                    pattern: new RegExp(/^(?=.{6,})(^[\p{L} ]+$)/u),
                                                    message: 'Vui lòng nhập HỌ VÀ TÊN CÓ DẤU, tối thiểu 6 ký tự và không chứa ký tự đặc biệt. Lịch khám sẽ bị TỪ CHỐI nếu để sai thông tin.',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input
                                                size="large"
                                                placeholder="Họ tên bệnh nhân (bắt buộc)"
                                                prefix={<UserOutlined />}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={23} md={23} className="cac-the-input" >
                                    <Form.Item label="Giới tính" name="gender">
                                        <Radio.Group value={genderBenhNhan} onChange={(e) => setGenderBenhNhan(e.target.value)}>
                                            <Radio value={"0"}>Nam</Radio>
                                            <Radio value={"1"}>Nữ</Radio>
                                            <Radio value={"2"}>Khác</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={23} md={23} className="cac-the-input" >
                                        <Form.Item
                                            name="phone"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập thông tin.',
                                                },
                                                {
                                                    pattern: /^0\d{9}$/,
                                                    message: 'Số điện thoại phải có 10 chữ số và bẳt đầu bằng số 0, không chứa kí tự!',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input
                                                size="large"
                                                placeholder="Số điện thoại liên hệ (bắt buộc)"
                                                prefix={<PhoneOutlined />}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={23} md={23} className="cac-the-input" >
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập thông tin.',
                                                },
                                                {
                                                    type: "email",
                                                    message: 'Vui lòng nhập đúng định dạng địa chỉ email',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input
                                                size="large"
                                                placeholder="Địa chỉ email (yêu cầu điền đúng, lịch sẽ được gửi về email)"
                                                prefix={<HiOutlineMailOpen />}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={23} md={23} className="cac-the-input" >
                                        <Form.Item
                                            name="dateBenhNhan"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng chọn ngày/tháng/năm sinh',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            {/* <Input
                                                size="large"
                                                placeholder="Ngày/Tháng/Năm Sinh (bắt buộc)"
                                                type="date"
                                                format="DD/MM/YYYY"
                                            /> */}
                                            <DatePicker
                                                placeholder="Ngày/Tháng/Năm Sinh (bắt buộc)"
                                                style={{ width: "100%" }}
                                                format="DD/MM/YYYY" // Định dạng ngày/tháng/năm
                                                disabledDate={(current) => current && current > moment().endOf('day')}
                                    />

                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={23} md={23} className="cac-the-input" >
                                        <Form.Item
                                            name="address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập địa chỉ chi tiết của bạn',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input
                                                size="large"
                                                placeholder="Địa chỉ của bạn"
                                                prefix={<IoLocationSharp />}
                                            />

                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={23} md={23} className="cac-the-input" >
                                        <Form.Item
                                            name="lyDoKham"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập lí do khám',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <TextArea
                                                size="large"
                                                placeholder="Lý do khám"
                                                prefix={<IoAddCircleSharp />}
                                                rows={4} //  số dòng hiển thị
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={23} md={23} className="cac-the-input" style={{ marginTop: "-30px", }} >
                                        <p style={{
                                            color: "navy",
                                            fontWeight: "500",
                                            fontSize: "16px",
                                            marginBottom: "5px"
                                        }}>Hình thức thanh toán</p>
                                        <Form.Item
                                            name="hinhThucTT"
                                            initialValue="VnPay"
                                            rules={[{ required: true, message: 'Vui lòng chọn hình thức thanh toán!' }]}
                                        >
                                            <Radio.Group onChange={handlePaymentChange} value={phuongThucThanhToan}>
                                                {/* <Radio style={{ fontSize: "16px" }} value="offline">Thanh toán sau tại cơ sở y tế</Radio> */}
                                                <Radio style={{ fontSize: "16px" }} value="VnPay">Thanh toán Online </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={23} md={23} sm={24} className="cac-the-input divTT">
                                        <div style={{ justifyContent: "space-between", display: "flex" }}>
                                            <p className="txtTT">Giá khám</p>
                                            <p className="txtTT">{formatCurrency(giaKham)}</p>
                                        </div>
                                        <div style={{ justifyContent: "space-between", display: "flex", }}>
                                            <p className="txtTT">Phí đặt lịch</p>
                                            <p className="txtTT">Miễn phí</p>
                                        </div>
                                        <hr style={{ marginTop: "5px", width: "95%", border: "1px solid #f4eeee" }} />
                                        <div style={{ justifyContent: "space-between", display: "flex" }}>
                                            <p className="txtTT">Tổng cộng</p>
                                            <p className="txtTT" style={{ color: "red" }}>{formatCurrency(giaKham)}</p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24} style={{ textAlign: "center" }}>
                                        <p>Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám</p>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={23} md={23} sm={24} className="cac-the-input divTT" style={{ backgroundColor: "#D4EFFC" }}>
                                        <div>
                                            <p className="txtTTT" style={{ fontWeight: "500" }}>LƯU Ý</p>
                                            <p className="txtTTT">Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin anh/chị vui lòng:</p>
                                            <ul>
                                                <li style={{ fontSize: "15px" }}>Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: <span style={{ fontWeight: "500" }}>Nguyễn Văn A</span> </li>
                                                <li style={{ fontSize: "15px" }}>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận"</li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>

                                <br />
                                <Row>
                                    <Col span={23} className="cac-the-input">
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            style={{
                                            backgroundColor: 'orange',
                                            fontSize: "18px",
                                            borderColor: 'orange',
                                            color: 'white',
                                            fontWeight: "500"
                                            }}
                                            size="large"
                                            onClick={() => {
                                            if (!isAuthenticated) {
                                                notification.warning({
                                                message: 'Cảnh báo',
                                                description: notificationContent(),
                                                placement: 'topRight',
                                                });
                                            } else {
                                                form.submit(); // sẽ gọi hàm handleDatLich
                                            }
                                            }}
                                            block
                                            loading={loadingSubmit}
                                        >
                                            Xác nhận đặt khám
                                        </Button>
                                        </Form.Item>

                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="cac-the-input" span={23} style={{ textAlign: "center", marginTop: "-25px" }}>
                                        <p>Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với <a href="#">Điều khoản sử dụng dịch vụ</a> của chúng tôi.</p>
                                    </Col>
                                </Row>

                                <LoginPage
                                    openModalLogin={openModalLogin}
                                    setOpenModalLogin={setOpenModalLogin}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
            <Footer />
        </>
    )
}

export default PageDatLichKham