import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Drawer, Button } from 'antd'
import {
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import './css.css'

const Header = () => {
  const user = useSelector(state => state.accountDoctor.user)
  const [openDrawer, setOpenDrawer] = useState(false)

  const showDrawer = () => setOpenDrawer(true)
  const onCloseDrawer = () => setOpenDrawer(false)

  return (
    <div className="header-container">
      <Row justify="space-between" align="middle" className="w-100">
        {/* Logo */}
        <Col xs={6} md={4}>
            <a href="/doctor" className="logo-area">
            <img src="../../../assets/images/banner/medicare-Photoroom-removebg-preview.png" alt="Logo" className="logo-img" style={{width:"100px", height:"100px"}}/>
            </a>
        </Col>

        {/* Spacer */}
        <Col xs={0} md={12} />

        {/* Welcome */}
        <Col xs={0} md={8} style={{ textAlign: 'right' }}>
            <div className="welcome-text">
            Xin chào bác sĩ <span>{user?.hoTen}</span>
            </div>
        </Col>
        </Row>
    </div>
  )
}

export default Header
