import { IoHomeSharp } from "react-icons/io5";
import Footer from "../../../components/TrangChu/Footer/Footer";
import HeaderViewDoctor from "../../../components/TrangChu/Header/HeaderViewDoctor";
import { useState } from "react";
import HoSoBenhNhan from "../../../components/TrangChu/HoSoBenhNhan/HoSoBenhNhan";
import "./hoSoCuaToi.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const HoSoCuaToi = () => {
    const acc = useSelector((state) => state.account.user);
    console.log("acc:", acc); // kiểm tra xem acc có tồn tại không

    const [activeTab, setActiveTab] = useState("hoSoCuaToi");
    const navigate = useNavigate();
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <HeaderViewDoctor />
            <div className="container-2">
                <p className="txt-title"><IoHomeSharp /> / Hồ sơ của tôi</p>

                <div className="tab-wrapper">
                    {/* Sidebar */}
                    <div className="sidebar-left">
    <div className="sidebar-menu">
        <button
            className={`sidebar-item`}
            onClick={()  => navigate("/user/tao-ho-so")}
        >
            <i className="fa-solid fa-plus"></i> Thêm hồ sơ
        </button>
        <button
            className={`sidebar-item ${activeTab === "hoSoCuaToi" ? "active" : ""}`}
            onClick={() => setActiveTab("hoSoCuaToi")}
        >
            <i className="fa-solid fa-file-medical"></i> Hồ sơ bệnh nhân
        </button>
        <button
            className={`sidebar-item ${activeTab === "phieuKham" ? "active" : ""}`}
            onClick={() => setActiveTab("phieuKham")}
        >
            <i className="fa-solid fa-file-medical-alt"></i> Phiếu khám bệnh
        </button>
        <button
            className={`sidebar-item ${activeTab === "thongBao" ? "active" : ""}`}
            onClick={() => setActiveTab("thongBao")}
        >
            <i className="fa-solid fa-bell"></i> Thông báo <span className="badge">99+</span>
        </button>
    </div>
</div>

                    {/* Content */}
                    <div className="content-area">
                        
                        {activeTab === "hoSoCuaToi" && (
                            <div>
                                {/* Component hiển thị hồ sơ cá nhân */}
                                <HoSoBenhNhan />
                            </div>
                        )}
                        {activeTab === "phieuKham" && (
                            <div>
                                <h3 className="title">Phiếu khám bệnh</h3>
                                {/* Component phiếu khám */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HoSoCuaToi;
