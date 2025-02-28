import "./Header.css";
import logo from "../assets/logo/logomedi.jpg";
import "bootstrap/dist/css/bootstrap.css";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const elementref = useRef();
  const elementref2 = useRef();
  const elementref3 = useRef();
  const elementref4 = useRef();
  const elementref5 = useRef();

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleclick(ref) {
    [elementref, elementref2, elementref3, elementref4, elementref5].forEach((el) => {
      el.current.classList.remove("active");
    });

    ref.current.classList.add("active");
  }

  return (
    <>
      <header className="navbar navbar-expand-xl bg-custom fixed-top"> 
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <a href="/" className="navbar-brand logo d-flex align-items-center">
            <img src={logo} height="60px" alt="Logo" />
          </a>

          {/* Navigation Menu */}
          <nav>
            <ul className="navbar-nav d-flex gap-4 align-items-center">
              <li className="nav-item">
                <Link to="/" className="nav-link" ref={elementref} onClick={() => handleclick(elementref)}>Trang Chủ</Link>
              </li>
              <li className="nav-item">
                <Link to="/Services" className="nav-link" ref={elementref2} onClick={() => handleclick(elementref2)}>Chuyên Khoa</Link>
              </li>
              <li className="nav-item">
                <Link to="/visionandmission" className="nav-link" ref={elementref3} onClick={() => handleclick(elementref3)}>Tầm Nhìn & Sứ Mệnh</Link>
              </li>
              <li className="nav-item">
                <Link to="/DoctorProfile" className="nav-link" ref={elementref4} onClick={() => handleclick(elementref4)}>Bác Sĩ</Link>
              </li>
              <li className="nav-item">
                <Link to="/Contact" className="nav-link" ref={elementref5} onClick={() => handleclick(elementref5)}>Liên Hệ</Link>
              </li>
            </ul>
          </nav>

          {/* Login Button */}
          <button className="login-btn">Đăng Nhập</button>
        </div>
      </header>

      {/* Nút Cuộn Lên */}
      {showScroll && (
        <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑
        </button>
      )}
    </>
  );
}

export default Header;
