import { useState, useEffect } from "react";
import { message } from "antd";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { handleLogouDoctort } from "../../services/loginAPI";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { doLogoutAction } from "../../redux/account/accountSlice";
import QuanLyLichHen from "../../components/LichHen/QuanLyLichHen";
import UpdateDoctor from "../../components/ThongTin/UpdateDoctor";
import { fetchAllDoctorByID } from "../../services/apiDoctor";
import ModalDoiMK from "../../components/ModalDoiMK/ModalDoiMK";
import HoSoBenhNhan from "../../components/HoSoBenhNhan/HoSoBenhNhan";
import QuanLyLichLamViec from "../../components/QuanLyLichLamViec/QuanLyLichLamViec";

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.accountDoctor.user);
    const navigate = useNavigate();

    const [dataUpdateDoctor, setDataUpdateDoctor] = useState(null);
    const [isHoSoOpen, setIsHoSoOpen] = useState(false); // 👈 State để mở/đóng menu con

    const isAuthenticated = useSelector(state => state.accountDoctor.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login-doctor" replace />;
    }

    const timDoctorById = async () => {
        let query = `_id=${user?._id}`;
        const res = await fetchAllDoctorByID(query);
        if (res && res.data) {
            setDataUpdateDoctor(res.data);
        }
    };

    useEffect(() => {
        timDoctorById();
    }, [user?._id]);

    const logoutClick = async () => {
        const res = await handleLogouDoctort();
        console.log("🚪 Đăng xuất:", res);
        if (res) {
            dispatch(doLogoutAction());
            message.success(res.message);
            navigate('/login-doctor');
        }
    };

    return (
        <>
            <Header />
            <div className="rts-navigation-area-breadcrumb">
                <div className="container-2">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="navigator-breadcrumb-wrapper">
                                <a>Home</a>
                                <i className="fa-regular fa-chevron-right" />
                                <a className="current">Tài khoản của tôi</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="account-tab-area-start rts-section-gap">
                <div className="container-2">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="nav accout-dashborard-nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <button className="nav-link active" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab">
                                    <i className="fa-regular fa-calendar-check"></i> Lịch hẹn của tôi
                                </button>
    
                                 {/* Hồ sơ bệnh nhân */}
                                <button 
                                    className="nav-link" 
                                    id="v-pills-BenhNhan-tab" 
                                    data-bs-toggle="pill" 
                                    data-bs-target="#v-pills-BenhNhan" 
                                    type="button" 
                                    role="tab"
                                >
                                    <i className="fa-solid fa-user-doctor"></i> Hồ sơ bệnh nhân
                                </button>

                                {/* Tạo phiếu khám */}
                                <button 
                                    className="nav-link" 
                                    id="v-pills-PhieuKham-tab" 
                                    data-bs-toggle="pill" 
                                    data-bs-target="#v-pills-PhieuKham" 
                                    type="button" 
                                    role="tab"
                                >
                                    <i className="fa-solid fa-procedures"></i> Tạo phiếu khám
                                </button>
    
                                {/* Thêm margin-top cho "Thông tin của tôi" để căn chỉnh */}
                                <button className="nav-link" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab">
                                    <i className="fa-regular fa-address-card"></i> Thông tin của tôi
                                </button>
                                <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab">
                                    <i className="fa-regular fa-calendar"></i> Quản lý lịch làm việc
                                </button>
                                <button className="nav-link" id="v-pills-settingsa-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settingsa" type="button" role="tab">
                                    <i className="fa-light fa-key"></i> Đổi mật khẩu
                                </button>
                                <button className="nav-link" id="v-pills-settingsb-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settingsb" type="button" role="tab">
                                    <a onClick={() => logoutClick()}>
                                        <i className="fa-light fa-right-from-bracket"></i> Đăng xuất
                                    </a>
                                </button>
                            </div>
                        </div>
    
                        <div className="col-lg-9 pl--50 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel">
                                    <div className="order-table-account">
                                        <div className="h2 title">Lịch làm việc của bác sĩ <span style={{ color: "blue" }}>{user?.lastName} {user?.firstName}</span></div>
                                        <div className="table-responsive">
                                            <QuanLyLichHen />
                                        </div>
                                    </div>
                                </div>
    
                                 {/* Hồ sơ bệnh nhân */}
                                <div className="tab-pane fade" id="v-pills-BenhNhan" role="tabpanel">
                                    <div className="order-table-account">
                                        <div className="h2 title">Hồ sơ bệnh nhân</div>
                                        <div className="table-responsive">
                                            <HoSoBenhNhan />
                                        </div>
                                    </div>
                                </div>

                                {/* Tạo phiếu khám */}
                                <div className="tab-pane fade" id="v-pills-PhieuKham" role="tabpanel">
                                    <div className="order-table-account">
                                        <div className="h2 title">Tạo phiếu khám</div>
                                        <div className="table-responsive">
                                            {/* Gọi component Tạo Phiếu Khám ở đây nếu có */}
                                        </div>
                                    </div>
                                </div>
    
                                <div className="tab-pane fade" id="v-pills-home" role="tabpanel">
                                    <UpdateDoctor dataUpdateDoctor={dataUpdateDoctor} setDataUpdateDoctor={setDataUpdateDoctor} />
                                </div>
    
                                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel">
                                    <QuanLyLichLamViec />
                                </div>
    
                                <div className="tab-pane fade" id="v-pills-settingsa" role="tabpanel">
                                    <ModalDoiMK />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
};

export default Home;
