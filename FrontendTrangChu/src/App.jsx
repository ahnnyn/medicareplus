import { Routes, Route } from "react-router-dom";
import Home from "./pages/TrangChu/Home";
import PageViewDoctor from "./pages/TrangChu/ViewDoctor/pageViewDoctor";
import PageDatLichKham from "./pages/TrangChu/DatLich/datLichKhamDoctor";
import LoginPage from "./pages/TrangChu/Login/Login";
import RegisterPage from "./pages/TrangChu/Login/Register";
import LichHen from "./pages/TrangChu/LichHen/lichHen";
import HoSoCuaToi from "./pages/TrangChu/HoSoCuaToi/HoSoCuaToi";
import TaoHoSo from "./pages/TrangChu/HoSoCuaToi/TaoHoSo";
import BacSiNoiBat from "./pages/TrangChu/BacSiNoiBat/bacSiNoiBat";
import ChuyenKhoa from "./pages/TrangChu/ChuyenKhoa/chuyenKhoa";
import LienHe from "./pages/TrangChu/LienHe/LienHe";
import ViewChuyenKhoaVaKhamBenh from "./pages/TrangChu/ChuyenKhoa/viewChuyenKhoaVaKhamBenh";
import ThongBaoThanhToan from "./pages/TrangChu/ThongBaoThanhToan/ThongBaoThanhToan";
import { LineHeightOutlined } from "@ant-design/icons";
import DichVuKham from "./pages/TrangChu/DatLich/DichVuKham";

const App = () => {

  const routeConfig = [
    { path: "/", element: <Home /> }, // trang chu
    { path: "/view-doctor", element: <PageViewDoctor /> }, // xem chi tiet bac si
    { path: "/page-dat-lich-kham", element: <PageDatLichKham /> },  // page dat lich kham
    { path: "/user/login-benh-nhan", element: <LoginPage /> },  // login benh-nhan
    { path: "/user/register-benh-nhan", element: <RegisterPage /> },  // Register benh-nhan
    { path: "/user/lich-hen", element: <LichHen /> },   // lich hen kham benh
    { path: "/user/ho-so-cua-toi", element: <HoSoCuaToi /> },   // ho so cua toi
    { path: "/user/tao-ho-so", element: <TaoHoSo /> },   // tao ho so
    { path: "/user/bac-si-noi-bat", element: <BacSiNoiBat /> },   // bac si noi bat
    { path: "/user/chuyen-khoa-kham", element: <ChuyenKhoa /> },   
    { path: "/user/view-chuyen-khoa-kham", element: <ViewChuyenKhoaVaKhamBenh /> },
    { path: "user/dich-vu-kham", element: <DichVuKham /> }, // dich vu kham
    { path: "/user/lien-he", element: <LienHe /> },
    {path: "/user/thong-bao-thanh-toan", element: <ThongBaoThanhToan />}, // thong bao thanh toan
  ];
  return (
    <>
      <Routes>
        {routeConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  )
}

export default App;