import React, { useState } from "react";
import "../components/DoctorCard.css";
import { useNavigate } from "react-router-dom";

import doctor1 from "../assets/images/bacsi/bac-pham-nguyen-vinh.png";
import doctor2 from "../assets/images/bacsi/bs-tran-thi-thuy-hang.png";
import doctor3 from "../assets/images/bacsi/nguyen-duc-anh-avt.png";
import doctor4 from "../assets/images/bacsi/bs-vu-truong-khanh.png";
import doctor5 from "../assets/images/bacsi/bs-tran-thi-thuy-hang.png";

const doctors = [
  { id: 1, image: doctor1, name: "Bác Sĩ Nguyễn Văn A", specialty: "Tim Mạch" },
  { id: 2, image: doctor2, name: "Bác Sĩ Trần Thị B", specialty: "Nội Tiết" },
  { id: 3, image: doctor3, name: "Bác Sĩ Lê Văn C", specialty: "Tiêu Hóa" },
  { id: 4, image: doctor4, name: "Bác Sĩ Đặng Thị D", specialty: "Da Liễu" },
  { id: 5, image: doctor5, name: "Bác Sĩ Trương Văn E", specialty: "Thần Kinh" }
];

function DoctorCard() {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + 3 < doctors.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="doctors-container">
      <div className="doctor-header">
        <h4 className="doctor-heading">Danh Sách Bác Sĩ</h4>
        <button className="btn btn-view-all" onClick={() => navigate("/doctors")}>Xem Thêm</button>
      </div>

      <div className="doctor-slider">
        <button className="slider-btn left" onClick={handlePrev} disabled={startIndex === 0}>
          ❮
        </button>

        <div className="doctor-list">
          {doctors.slice(startIndex, startIndex + 3).map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img src={doctor.image} alt={doctor.name} className="doctor-img" />
              <h4 className="doctor-name">{doctor.name}</h4>
              <p className="doctor-specialty">{doctor.specialty}</p>
              <div className="doctor-buttons">
                <button className="btn btn-collapse">Xem Thêm</button>
                <button className="btn btn-appointment">Đặt Lịch Hẹn</button>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-btn right" onClick={handleNext} disabled={startIndex + 3 >= doctors.length}>
          ❯
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;
