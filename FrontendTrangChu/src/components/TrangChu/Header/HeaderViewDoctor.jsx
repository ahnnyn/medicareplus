import { Avatar, Col, Dropdown, message, Row } from 'antd';
import { IoIosTimer } from 'react-icons/io';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../../../pages/TrangChu/Login/Login';
import { LuLogIn } from 'react-icons/lu';
import { callLogoutBenhNhan } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAction } from '../../../redux/account/accountSlice';
import { UserOutlined } from '@ant-design/icons';
import ModalDoiMK from '../ModalDoiMK/ModalDoiMK';
import UpdateBenhNhan from '../ThongTin/UpdateBenhNhan';
import { RiAccountCircleFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import './header.scss';


const HeaderViewDoctor = () => {
    const navigate = useNavigate();
    const [openUpdateBenhNhan, setOpenModalThongTinCaNhan] = useState(false);
    const [openModalDoiMK, setOpenModalDoiMK] = useState(false);
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const acc = useSelector(state => state.account.user);

    const items = [
        {
            key: '1',
            label: <label onClick={() => setOpenModalThongTinCaNhan(true)}><RiAccountCircleFill size={20}/> Tài khoản của tôi</label>,
        },
        {
            key: '2',
            label: <label onClick={() => handleRedirectLichHen(acc._id)}><IoIosTimer size={20}/> Lịch hẹn</label>,
        },
        {
            key: '3',
            label: <label onClick={() => setOpenModalDoiMK(true)}><RiAccountCircleFill size={20}/> Đổi mật khẩu</label>,
        },
        {
            key: '5',
            danger: true,
            label: <label onClick={() => handleLogout()}><FiLogOut size={20}/> Đăng xuất</label>,
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

    const handleRedirectLichHen = (id) => {
        navigate(`/user/lich-hen?idKhachHang=${id}`);
    };

    return (
        <>
            <div
                className="header"
                
            >
                <div className="header-top">
                    <Row
                        align="middle"
                        style={{
                            height: "100px",
                            width: "100%",
                            padding: "0 3vw",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        {/* Logo */}
                        <Col xs={8} sm={6} md={4} className="col-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <img
                                style={{
                                    cursor: "pointer",
                                    maxHeight: "80px",
                                    width: "auto",
                                    objectFit: "contain"
                                }}
                                onClick={() => navigate("/")}
                                src="../../../../public/medicare-Photoroom-removebg-preview.png"
                                alt="Logo"
                            />
                        </Col>
    
                        {/* Menu */}
                        <Col xs={8} sm={12} md={12} className="col-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Navbar className="navbar-custom" expand="lg">
                                <Nav className="me-auto nav-links">
                                    <Nav.Link onClick={() => navigate("/user/chuyen-khoa-kham")}>CHUYÊN KHOA</Nav.Link>
                                    <Nav.Link onClick={() => navigate("/user/bac-si-noi-bat")}>BÁC SĨ</Nav.Link>
                                    <Nav.Link onClick={() => navigate("/user/bac-si-noi-bat")}>ĐẶT LỊCH KHÁM</Nav.Link>
                                    <Nav.Link onClick={() => navigate("/user/lien-he")}>LIÊN HỆ</Nav.Link>
                                </Nav>
                            </Navbar>
                        </Col>
    
                        {/* Avatar or login icon */}
                        <Col xs={8} sm={6} md={4} className="col-top avatar-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <div style={{ cursor: "pointer", color: "rgb(69, 195, 210)" }}>
                                {isAuthenticated ? (
                                    <Dropdown menu={{ items }}>
                                        <Avatar
                                            src={`${import.meta.env.VITE_BACKEND_URL}/public/user/${acc.image}`}
                                            style={{ cursor: "pointer" }}
                                            size={50}
                                            icon={<UserOutlined />}
                                        />
                                    </Dropdown>
                                ) : (
                                    <Dropdown menu={{ items: itemss }}>
                                        <MdOutlineAccountCircle size={"5vh"} color="#278DCA" />
                                    </Dropdown>
                                )}
                            </div>
                        </Col>
                    </Row>
    
                    {/* Modals */}
                    <LoginPage openModalLogin={openModalLogin} setOpenModalLogin={setOpenModalLogin} />
                    <UpdateBenhNhan openUpdateBenhNhan={openUpdateBenhNhan} setOpenModalThongTinCaNhan={setOpenModalThongTinCaNhan} />
                    <ModalDoiMK openModalDoiMK={openModalDoiMK} setOpenModalDoiMK={setOpenModalDoiMK} />
                </div>
    
                
            </div>
            <div style={{ marginBottom: "13vh" }}></div>

        </>
    );
};

export default HeaderViewDoctor;
