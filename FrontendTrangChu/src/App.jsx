import { Routes, Route } from "react-router-dom";
import Home from "./pages/TrangChu/Home";
import PageViewDoctor from "./pages/TrangChu/ViewDoctor/pageViewDoctor";
import PageDatLichKham from "./pages/TrangChu/DatLich/datLichKhamDoctor";
import LoginPage from "./pages/TrangChu/Login/Login";
import RegisterPage from "./pages/TrangChu/Login/Register";
import LichHen from "./pages/TrangChu/LichHen/lichHen";
import BacSiNoiBat from "./pages/TrangChu/BacSiNoiBat/bacSiNoiBat";
import ChuyenKhoa from "./pages/TrangChu/ChuyenKhoa/chuyenKhoa";
import LienHe from "./pages/TrangChu/LienHe/LienHe";
import ViewChuyenKhoaVaKhamBenh from "./pages/TrangChu/ChuyenKhoa/viewChuyenKhoaVaKhamBenh";
import { LineHeightOutlined } from "@ant-design/icons";

const App = () => {

  const routeConfig = [
    { path: "/", element: <Home /> }, // trang chu
    { path: "/view-doctor", element: <PageViewDoctor /> }, // xem chi tiet bac si
    { path: "/page-dat-lich-kham", element: <PageDatLichKham /> },  // page dat lich kham
    { path: "/user/login-benh-nhan", element: <LoginPage /> },  // login benh-nhan
    { path: "/user/register-benh-nhan", element: <RegisterPage /> },  // Register benh-nhan
    { path: "/user/lich-hen", element: <LichHen /> },   // lich hen kham benh
    { path: "/user/bac-si-noi-bat", element: <BacSiNoiBat /> },   // bac si noi bat
    { path: "/user/chuyen-khoa-kham", element: <ChuyenKhoa /> },   
    { path: "/user/view-chuyen-khoa-kham", element: <ViewChuyenKhoaVaKhamBenh /> },
    { path: "/user/lien-he", element: <LienHe /> }
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