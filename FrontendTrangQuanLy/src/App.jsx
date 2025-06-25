import { Routes, Route } from "react-router-dom";
import Home from "pages/BacSi";
import AdminHome from "pages/Admin";
import Login from "pages/Login";
import Header from "components/Doctor/Header/Header";

const App = () => {
  return (
    <>
      <Header /> {/* Header luôn hiển thị */}
      <Routes>
        <Route path="/doctor" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </>
  );
};

export default App;
