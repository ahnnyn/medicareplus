import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/TrangChu/Home";
import ChiTietBacSi from "./pages/TrangChu/ViewDoctor/ChiTietBacSi";
import PageDatLichKham from "./pages/TrangChu/DatLich/datLichKhamDoctor";
import LoginPage from "./pages/TrangChu/Login/Login";
import RegisterPage from "./pages/TrangChu/Login/Register";
import LichHen from "./pages/TrangChu/LichHen/lichHen";
import HoSoCuaToi from "./pages/TrangChu/HoSoCuaToi/HoSoCuaToi";
import TaoHoSo from "./pages/TrangChu/HoSoCuaToi/TaoHoSo";
import BacSiNoiBat from "./pages/TrangChu/BacSiNoiBat/bacSiNoiBat";
import ChuyenKhoa from "./pages/TrangChu/ChuyenKhoa/chuyenKhoa";
import LienHe from "./pages/TrangChu/LienHe/LienHe";
import ChuyenKhoaVaBacSi from "./pages/TrangChu/ChuyenKhoa/ChuyenKhoaVaBacSi";
import ThongBaoThanhToan from "./pages/TrangChu/ThongBaoThanhToan/ThongBaoThanhToan";
import DichVuKham from "./pages/TrangChu/DatLich/DichVuKham";
const App = () => {
  const routeConfig = [
    { path: "/", element: <Home /> },
    { path: "/chi-tiet-bac-si", element: <ChiTietBacSi /> },
    { path: "/page-dat-lich-kham", element: <PageDatLichKham /> },
    { path: "/user/login-benh-nhan", element: <LoginPage /> },
    { path: "/user/register-benh-nhan", element: <RegisterPage /> },
    { path: "/user/lich-hen", element: <LichHen /> },
    { path: "/user/ho-so-cua-toi", element: <HoSoCuaToi /> },
    { path: "/user/tao-ho-so", element: <TaoHoSo /> },
    { path: "/bac-si-noi-bat", element: <BacSiNoiBat /> },
    { path: "/chuyen-khoa-kham", element: <ChuyenKhoa /> },
    { path: "/chi-tiet-chuyen-khoa", element: <ChuyenKhoaVaBacSi /> },
    { path: "/dich-vu-kham", element: <DichVuKham /> },
    { path: "/lien-he", element: <LienHe /> },
    { path: "/user/thong-bao-thanh-toan", element: <ThongBaoThanhToan /> },
  ];

  return (
    <>
      <Routes>
        {routeConfig.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
};

export default App;
