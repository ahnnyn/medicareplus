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
import "./home.css";

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.accountDoctor.user);
    const isAuthenticated = useSelector(state => state.accountDoctor.isAuthenticated);
    const navigate = useNavigate();

    const [dataUpdateDoctor, setDataUpdateDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            const res = await fetchAllDoctorByID(user.maBacSi);
            if (res && res.data) {
                setDataUpdateDoctor(res.data);
            }
        };
        if (user?.maBacSi) fetchDoctor();
    }, [user?.maBacSi]);

    const logoutClick = async () => {
        const res = await handleLogouDoctort();
        if (res) {
            dispatch(doLogoutAction());
            message.success(res.message);
            navigate('/login-doctor');
        }
    };

    if (!isAuthenticated) return <Navigate to="/login-doctor" replace />;

    return (
        <>
            {/*<div className="account-tab-area-start rts-section-gap">*/}
            <div className="container-fluid">
                <div className="container-2">
                    <div className="row full-height-layout" style={{ borderRadius: '10px', margin: 0 }}>
                        {/* Sidebar */}
                        <div className="col-lg-2 sidebar-left">
                            <div className="user-info">
                                <img
                                    src={
                                        dataUpdateDoctor?.hinhAnh
                                            ? `${import.meta.env.VITE_BACKEND_URL}/public/bacsi/${dataUpdateDoctor.hinhAnh}`
                                            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    }
                                    alt="avatar bác sĩ"
                                    className="avatar"
                                />
                                <div className="user-name">{user.hoTen}</div>
                                <div className="user-role">Chào mừng bạn trở lại!</div>
                            </div>

                            <div className="sidebar-menu nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#lichHen" type="button"><i className="fa-regular fa-calendar-check"></i> Lịch hẹn</button>
                                <button className="nav-link" data-bs-toggle="pill" data-bs-target="#benhNhan" type="button"><i className="fa-solid fa-user-doctor"></i> Hồ sơ bệnh nhân</button>
                                <button className="nav-link" data-bs-toggle="pill" data-bs-target="#phieuKham" type="button"><i className="fa-solid fa-procedures"></i> Tạo phiếu khám</button>
                                <button className="nav-link" data-bs-toggle="pill" data-bs-target="#thongTin" type="button"><i className="fa-regular fa-address-card"></i> Thông tin của tôi</button>
                                <button className="nav-link" data-bs-toggle="pill" data-bs-target="#lichLamViec" type="button"><i className="fa-regular fa-calendar"></i> Quản lý lịch làm việc</button>
                                <button className="nav-link" data-bs-toggle="pill" data-bs-target="#doiMK" type="button"><i className="fa-light fa-key"></i> Đổi mật khẩu</button>
                                <button className="nav-link" onClick={logoutClick} type="button"><i className="fa-light fa-right-from-bracket"></i> Đăng xuất</button>
                            </div>
                        </div>

                        {/* Nội dung */}
                        <div className="col-lg-10 content-area">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="lichHen" style={{ padding: "0 0 20px", fontSize: "20px", textAlign: "center" }}>
                                    <span className="title text-center mb-4" style={{ marginBottom: "30px", fontWeight: "550", color: "navy" }}>
                                        LỊCH HẸN CỦA BÁC SĨ <span style={{ color: "blue" }}>{user.hoTen.toUpperCase()}</span>
                                    </span>
                                    <div style={{ marginTop: "30px" }}>
                                        <QuanLyLichHen />
                                    </div>
                                </div>


                                <div className="tab-pane fade" id="benhNhan" style={{ padding: "0 0 20px", fontSize: "20px", textAlign: "center" }}>
                                    <span className="title text-center mb-4" style={{ marginBottom: "30px", fontWeight: "550", color: "navy" }}>HỒ SƠ BỆNH NHÂN</span>
                                    <div style={{ marginTop: "30px" }}>
                                        <HoSoBenhNhan />
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="phieuKham" style={{ padding: "0 0 20px", fontSize: "20px", textAlign: "center" }}>
                                   <span style={{ fontWeight: "550", color: "navy" }}>PHIẾU KHÁM BỆNH</span>
                                    {/* Tạo phiếu khám component sẽ được thêm vào đây */}
                                </div>

                                <div className="tab-pane fade" id="thongTin">
                                    <UpdateDoctor dataUpdateDoctor={dataUpdateDoctor} setDataUpdateDoctor={setDataUpdateDoctor} />
                                </div>

                                <div className="tab-pane fade" id="lichLamViec">
                                    <QuanLyLichLamViec />
                                </div>

                                <div className="tab-pane fade" id="doiMK">
                                    <ModalDoiMK />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
