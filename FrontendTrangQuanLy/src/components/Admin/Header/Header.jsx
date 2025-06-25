import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Drawer, Button, message } from 'antd';
import { MenuOutlined, SearchOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { doLogoutAction } from "myredux/account/accountSlice";
import { handleLogouDoctort } from "services/auth/auth.services";
import { Navigate, useNavigate } from "react-router-dom";
import './css.css';

const Header = () => {
  const user = useSelector(state => state.accountDoctor.user);
  const isAuthenticated = useSelector(state => state.accountDoctor.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => setOpenDrawer(true);
  const onCloseDrawer = () => setOpenDrawer(false);

  const logoutClick = async () => {
    const res = await handleLogouDoctort();
    if (res) {
      dispatch(doLogoutAction());
      message.success(res.message);
      navigate('../../login-doctor');
    }
  };

  return (
    <div className="header-container">
      <Row justify="space-between" align="middle" className="w-100">
        {/* Logo */}
        <Col xs={6} md={4}>
          <a href="/doctor" className="logo-area">
            <img
              src="../../../assets/images/banner/medicare-Photoroom-removebg-preview.png"
              alt="Logo"
              className="logo-img"
              style={{ width: '100px', height: '100px' }}
            />
          </a>
        </Col>

        {/* Spacer */}
        <Col xs={0} md={16} />

        {/* Welcome + Logout (Only show if authenticated) */}
        {isAuthenticated && (
          <Col xs={0} md={4} style={{ textAlign: 'right' }}>
            <div className="welcome-text" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                className="nav-link"
                onClick={logoutClick}
                type="button"
                style={{ background: 'none', border: 'none', color: '#ffff', fontSize: '16px', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-right-from-bracket" style={{ marginRight: '5px' }}></i> Đăng xuất
              </button>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Header;
