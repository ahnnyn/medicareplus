import { Avatar, Col, Dropdown, message, Row } from 'antd';
import { IoIosTimer } from 'react-icons/io';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LoginPage from '../../../pages/TrangChu/Login/Login';
import { LuLogIn } from 'react-icons/lu';
import { callLogoutBenhNhan, fetchOneAccKH } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAction } from '../../../redux/account/accountSlice';
import { UserOutlined } from '@ant-design/icons';
import ModalDoiMK from '../ModalDoiMK/ModalDoiMK';
import UpdateBenhNhan from '../ThongTin/UpdateBenhNhan';
import { RiAccountCircleFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaBars } from 'react-icons/fa'; // hamburger icon
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import './header.scss';


const HeaderViewDoctor = () => {
    const navigate = useNavigate();
    const [openUpdateBenhNhan, setOpenModalThongTinCaNhan] = useState(false);
    const [openModalDoiMK, setOpenModalDoiMK] = useState(false);
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const dispatch = useDispatch();
    const [dataAcc, setDataAcc] = useState(null);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const acc = useSelector(state => state.account.user);

    console.log("acc: ", acc);
    useEffect(() => {
        const fetchBenhNhan = async () => {
            if (acc?.user?.maBenhNhan) {
                const res = await fetchOneAccKH(acc.user.maBenhNhan);
                if (res?.data) {
                    setDataAcc(res.data);
                }
            }
        };
        fetchBenhNhan();
    }, [acc?.user?.maBenhNhan]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) {
                setMenuOpen(false); // reset hamburger nếu chuyển lên desktop
            }
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const items = [
        {
            key: '1',
            label: <label onClick={() => setOpenModalThongTinCaNhan(true)}><RiAccountCircleFill size={20}/> Tài khoản của tôi</label>,
        },
        {
            key: '2',
            label: <label onClick={() => handleRedirectLichHen(acc.maBenhNhan)}><IoIosTimer size={20}/> Lịch hẹn</label>,
        },
        {
            key: '3',
            label: <label onClick={() => handleRedirectHoSo(acc.maBenhNhan)}><IoIosTimer size={20}/> Hồ sơ của tôi</label>,
        },
        {
            key: '4',
            label: <label onClick={() => setOpenModalDoiMK(true)}><FaLock  size={20}/> Đổi mật khẩu</label>,
        },
        {
            key: '5',
            danger: true,
            label: (
                <div
                    onClick={() => handleLogout()}
                    style={{
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px', // khoảng cách giữa icon và chữ
                        fontWeight: '500',
                        cursor: 'pointer',
                        textAlign: 'center',
                    }}
                >
                    <FiLogOut size={20} />
                    <span>Đăng xuất</span>
                </div>
            )
        }
    ];

    const itemss = [
        {
            key: 'login',
            label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LuLogIn size={20} />
                  <span>Đăng nhập</span>
                </div>
              ),
              onClick: () => setOpenModalLogin(true),
        }
    ];

    const handleLogout = async () => {
        try {
            const res = await callLogoutBenhNhan();
            localStorage.removeItem('access_tokenBenhNhan');
            if (res) {
                message.success("Đăng xuất thành công!");
                dispatch(doLogoutAction());
                navigate("/");
            }
        } catch (error) {
            console.error('Lỗi đăng xuất', error);
            message.error("Đăng xuất không thành công!");
        }
    };

    const handleRedirectLichHen = (maBenhNhan) => {
        navigate(`/user/lich-hen`);
    };

    const handleRedirectHoSo = (maBenhNhan) => {
        navigate(`/user/ho-so-cua-toi`);
    };
    
    return (
        <>
          <div className="header">
            {/* Top: Logo + Avatar */}
            
            <div className="header-top">
              <div className="logo-avatar-container">
                <div className="logo" onClick={() => navigate("/")}>
                  <img src="../../../../public/medicare-Photoroom-removebg-preview.png" alt="Logo" />
                </div>

                <div className="avatar-section" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {isAuthenticated && dataAcc?.hoTen && (
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "clamp(14px, 2vw, 16px)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100px", // hoặc 150px tùy bạn
                        color: "#333",
                      }}
                    >
                      {dataAcc.hoTen}
                    </span>
                  )}

                  {isAuthenticated ? (
                    <Dropdown menu={{ items }} trigger={['click']}>
                      <Avatar
                        src={
                          dataAcc?.hinhAnh
                            ? `${import.meta.env.VITE_BACKEND_URL}/public/benhnhan/${acc.user.hinhAnh}`
                            : null
                        }
                        style={{ cursor: "pointer" }}
                        size={55}
                        icon={<UserOutlined />}
                      />
                    </Dropdown>
                  ) : (
                    <Dropdown menu={{ items: itemss }} trigger={['click']}>
                      <MdOutlineAccountCircle size={"5vh"} color="#278DCA" />
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>

      
            {/* Menu Section */}
            <div className="menu-wrapper" >
              {isMobile && (
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                  <FaBars />
                </div>
              )}
              <div className={`menu ${menuOpen || !isMobile ? "open" : ""}`}>
                <Navbar className="navbar-custom">
                  <Nav className="me-auto nav-links">
                    <Nav.Link onClick={() => navigate("/")}>TRANG CHỦ</Nav.Link>
                    <Nav.Link onClick={() => navigate("/user/chuyen-khoa-kham")}>CHUYÊN KHOA</Nav.Link>
                    <Nav.Link onClick={() => navigate("/user/bac-si-noi-bat")}>BÁC SĨ</Nav.Link>
                    <Nav.Link onClick={() => navigate("/user/dich-vu-kham")}>ĐẶT LỊCH KHÁM</Nav.Link>
                    <Nav.Link onClick={() => navigate("/user/lien-he")}>LIÊN HỆ</Nav.Link>
                  </Nav>
                </Navbar>
              </div>
            </div>

               {/* Modals */}
               <LoginPage openModalLogin={openModalLogin} setOpenModalLogin={setOpenModalLogin} />
                <UpdateBenhNhan openUpdateBenhNhan={openUpdateBenhNhan} setOpenModalThongTinCaNhan={setOpenModalThongTinCaNhan} />
                <ModalDoiMK openModalDoiMK={openModalDoiMK} setOpenModalDoiMK={setOpenModalDoiMK} />
          </div>
          <ScrollToTop />
        </>
      );
    }

export default HeaderViewDoctor;
