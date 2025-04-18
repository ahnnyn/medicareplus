import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <Header /> {/* Header luôn hiển thị */}
      <Routes>
        <Route path="/doctor" element={<Home />} />
        <Route path="/login-doctor" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
