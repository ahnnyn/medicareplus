import { useState, useEffect } from "react";
import { message } from "antd";
import Footer from "../../components/BacSi/Footer/Footer";
import Header from "../../components/BacSi/Header/Header";
import { handleLogouDoctort } from "../../services/loginAPI";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { fetchAllDoctorByID } from "../../services/apiDoctor";

import QuanLyBacSi from "../../components/Admin/QuanLyBacSi/QuanLyBacSi";
import QuanLyVaiTro from "../../components/Admin/QuanLyVaiTro/QuanLyVaiTro";
import QuanLyBenhNhan from "../../components/Admin/QuanLyBenhNhan/QuanLyBenhNhan";

import "./home.css";

const AdminHome = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.accountDoctor.user);
    const isAuthenticated = useSelector((state) => state.accountDoctor.isAuthenticated);
    const navigate = useNavigate();

    const [dataUpdateAdmin, setDataUpdateAdmin] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            const res = await fetchAllDoctorByID(user.maQuanTriVien);
            if (res && res.data) {
                setDataUpdateAdmin(res.data);
            }
        };
        if (user?.maQuanTriVien) fetchAdminData();
    }, [user?.maQuanTriVien]);

    const logoutClick = async () => {
        const res = await handleLogouDoctort();
        if (res) {
            dispatch(doLogoutAction());
            message.success(res.message);
            navigate("/login");
        }
    };

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return (
        <>
            <div className="container-fluid">
                <div className="container-2">
                    <div className="row full-height-layout" style={{ borderRadius: "10px", margin: 0 }}>
                        {/* Sidebar */}
                        <div className="col-lg-2 sidebar-left">
                            <div className="user-info">
                                <img
                                    src={
                                        user?.profilePicture ||
                                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    }
                                    alt="avatar admin"
                                    className="avatar"
                                />
                                <div className="user-name">Admin</div>
                                <div className="user-role">Chào mừng bạn trở lại!</div>
                            </div>

                            <div
                                className="sidebar-menu nav flex-column nav-pills"
                                id="v-pills-tab"
                                role="tablist"
                                aria-orientation="vertical"
                            >
                                <button
                                    className="nav-link active"
                                    data-bs-toggle="pill"
                                    data-bs-target="#doctorManagement"
                                    type="button"
                                >
                                    <i className="fa-solid fa-user-tag"></i> Quản lý bác sĩ
                                </button>
                                <button
                                    className="nav-link"
                                    data-bs-toggle="pill"
                                    data-bs-target="#roleManagement"
                                    type="button"
                                >
                                    <i className="fa-solid fa-user-tag"></i> Quản lý vai trò
                                </button>
                                <button
                                    className="nav-link"
                                    data-bs-toggle="pill"
                                    data-bs-target="#patientManagement"
                                    type="button"
                                >
                                    <i className="fa-solid fa-user-tag"></i> Quản lý bệnh nhân
                                </button>
                                <button className="nav-link" onClick={logoutClick} type="button">
                                    <i className="fa-light fa-right-from-bracket"></i> Đăng xuất
                                </button>
                            </div>
                        </div>

                        {/* Nội dung */}
                        <div className="col-lg-10 content-area">
                            <div className="tab-content" id="v-pills-tabContent">
                                {/* Quản lý bác sĩ */}
                                <div
                                    className="tab-pane fade show active"
                                    id="doctorManagement"
                                    style={{ padding: "0 0 20px", fontSize: "20px", textAlign: "center" }}
                                >
                                    <span
                                        className="title text-center mb-4"
                                        style={{ marginBottom: "30px", fontWeight: "550", color: "navy" }}
                                    >
                                        Quản lý bác sĩ
                                    </span>
                                    <QuanLyBacSi />
                                </div>

                                {/* Quản lý vai trò */}
                                <div className="tab-pane fade" id="roleManagement" style={{ padding: "0 20px" }}>
                                    <span
                                        className="title text-center d-block"
                                        style={{ fontWeight: "550", color: "navy", fontSize: "20px", marginBottom: 20 }}
                                    >
                                        Quản lý vai trò
                                    </span>
                                    <QuanLyVaiTro />
                                </div>

                                {/* Quản lý vai trò */}
                                <div className="tab-pane fade" id="patientManagement" style={{ padding: "0 20px" }}>
                                    <span
                                        className="title text-center d-block"
                                        style={{ fontWeight: "550", color: "navy", fontSize: "20px", marginBottom: 20 }}
                                    >
                                        Quản lý bệnh nhân
                                    </span>
                                    <QuanLyBenhNhan />
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

export default AdminHome;
