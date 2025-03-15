import { Avatar, Col, Divider, Drawer, Dropdown, Input, message, Row } from 'antd'
import { IoIosTimer, IoMdMenu } from 'react-icons/io'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginPage from '../../../pages/TrangChu/Login/Login';
import { LuLogIn } from 'react-icons/lu';
import { callLogoutBenhNhan } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAction } from '../../../redux/account/accountSlice';
import { UserOutlined } from '@ant-design/icons';
import ModalDoiMK from '../ModalDoiMK/ModalDoiMK';
import { RiAccountCircleFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { MdLogin } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { BiLogIn } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import './header.scss';

const HeaderViewDoctor = () => {
    const navigate = useNavigate()

    const [openModalDoiMK, setOpenModalDoiMK] = useState(false);
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const acc = useSelector(state => state.account.user)
    console.log("isAuthenticated: ", isAuthenticated);

    const items = [
        {
          key: '1',
          label: <label style={{display: "flex", cursor: "pointer"}} onClick={() => setOpenModalDoiMK(true)}><RiAccountCircleFill size={20}/> &nbsp; Tài khoản của tôi</label>,
        },        
        {
            key: '2',
            label: <label style={{display: "flex", cursor: "pointer"}} onClick={() => handleRedirectLichHen(acc._id)}><IoIosTimer size={20}/> &nbsp; Lịch hẹn</label>,
        },
        {
            key: 'cauhoi',
        }, 
        {
          key: '4',
          danger: true,
          label: <label style={{display: "flex", cursor: "pointer"}} onClick={() => handleLogout()}><FiLogOut size={20}/> &nbsp; Đăng xuất</label>,
        }
      ];

      const itemss = [
        {
          key: 'loginn',
          label: <label style={{display: "flex", cursor: "pointer"}} onClick={() => setOpenModalLogin(true)}><LuLogIn size={20}/> &nbsp; Đăng nhập</label>,
        } 
      
      ];
    const handleLogout = async () => {
        try {
            const res = await callLogoutBenhNhan();
            localStorage.removeItem('access_tokenBenhNhan');

            if (res) {
                message.success("Đăng xuất thành công!");
                dispatch(doLogoutAction())
                navigate("/");
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi đăng xuất', error);
            message.error("Đăng xuất không thành công!");
        }
    }
    const handleRedirectLichHen = (item) => {
        navigate(`/user/lich-hen?idKhachHang=${item}`)
    }

    return (
        <>
            <div className='header-top'>
            <Row style={{
                justifyContent: "center", 
                alignItems: "center", 
                height: '100%',
                textAlign: "center",
                display: "inline-flex",
                width: "80%",
                backgroundColor: "#e6f7fb"
            }}>
                <Col md={6} sm={20} className='col-top'>                
                    <img style={{cursor: "pointer", height: "10vh"}} onClick={() => navigate("/")} src="../../../../public/medicare-Photoroom.png" alt="" />
                </Col>

                <Col md={13} sm={24} xs={24} className='col-top'>                                    
                    <Navbar className="navbar-custom" style={{textAlign: "start"}}>
                        <Container>
                            <Nav className="me-auto nav-links">
                                <Nav.Link onClick={() => navigate("/user/chuyen-khoa-kham")} style={{textAlign: "start", lineHeight: "10px"}}>
                                    <p style={{fontSize: "20px", fontWeight: "bold"}}>Chuyên khoa</p>
                                </Nav.Link>

                                <Nav.Link onClick={() => navigate("/user/bac-si-noi-bat")} style={{textAlign: "start", lineHeight: "10px"}}>
                                    <p style={{fontSize: "20px", fontWeight: "bold"}}>Bác sĩ</p>
                                </Nav.Link>           

                                <Nav.Link onClick={() => navigate("/user/lien-he")} style={{textAlign: "start", lineHeight: "10px"}}>
                                    <p style={{fontSize: "20px", fontWeight: "bold"}}>Liên hệ</p>
                                </Nav.Link>              
                            </Nav>
                        </Container>
                    </Navbar>
                </Col>                

                <Col md={5} sm={3} xs={3} className='col-top icon-container' style={{ position: "relative", right: "-10vh" }}>
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
                            <Dropdown menu={{ items: itemss || [] }}>
                                <MdOutlineAccountCircle size={"5vh"} color="#278DCA" />
                            </Dropdown>
                        )}
                    </div>                
                </Col>
            </Row>

            <LoginPage
                openModalLogin={openModalLogin}
                setOpenModalLogin={setOpenModalLogin}
            />

            <ModalDoiMK
            openModalDoiMK={openModalDoiMK}
            setOpenModalDoiMK={setOpenModalDoiMK}
            />
            </div>
            <ScrollToTop />
        </>
    )
}

export default HeaderViewDoctor