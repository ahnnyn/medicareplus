import React, { useRef } from "react";
import "./LienHe.scss";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import HeaderViewDoctor from "../../../components/TrangChu/Header/HeaderViewDoctor";
import Footer from "../../../components/TrangChu/Footer/Footer";

function LienHe() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_a6i9rdn",
        "template_r4fcuct",
        form.current,
        "9gp63uOgs5b5UhWcD"
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Gửi thành công!",
            text: "Chúng tôi sẽ liên hệ lại với bạn sớm nhất.",
            showConfirmButton: false,
            timer: 3000,
          });
          form.current.reset();
        },
        (error) => {
          console.error("Lỗi gửi email:", error);
          Swal.fire({
            icon: "error",
            title: "Gửi thất bại!",
            text: "Vui lòng thử lại sau.",
          });
        }
      );
  };

  return (
    <>
      <HeaderViewDoctor />
      <div className="contact-container">
        <div className="contact-header">
          <h2>Liên hệ</h2>
        </div>
        <div className="contact-content">
          <div className="contact-left">
            <div className="contact-info">
              <p><strong>Địa chỉ:</strong> </p>
              <p><strong>Điện thoại:</strong> 19006750</p>
              <p><strong>Email:</strong> support@abc.vn</p>
            </div>
            <div className="contact-form">
              <h3>Liên hệ với chúng tôi</h3>
              <form ref={form} onSubmit={sendEmail}>
                <input type="text" name="user_name" placeholder="Họ và tên" required />
                <input type="email" name="user_email" placeholder="Email" required />
                <textarea name="message" placeholder="Nội dung" required></textarea>
                <button type="submit">Gửi liên hệ</button>
              </form>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8560214887423!2d105.81612381424596!3d21.036618792865874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abcf5b7f80e3%3A0x3f50b7c3d3b62efb!2zMjY2IMSQLiDEkOG7iWMgQ-G6p24sIEzGsMahIFdpLCBCw6AgxJDDoG5oLCBIw6AgTuG7mWk!5e0!3m2!1sen!2s!4v1623035000000"
              allowFullScreen
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LienHe;