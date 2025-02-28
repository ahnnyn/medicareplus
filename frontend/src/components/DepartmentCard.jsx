import React, { useState } from "react";
import "../Components/DepartmentCard.css";
import { useNavigate } from "react-router-dom";

import department1 from "../assets/images/khoa/khoatimmach.jpg";
import department2 from "../assets/images/khoa/dalieu.jpg";
import department3 from "../assets/images/khoa/khoaxuongkhop.jpg";
import department4 from "../assets/images/khoa/hohap.jpg";
import department5 from "../assets/images/khoa/khoanoitiet.jpg";

const departments = [
  {
    id: 1,
    image: department1,
    name: "Tim Mạch",
    description: "Chuyên khoa tim mạch điều trị các bệnh liên quan đến tim và mạch máu.",
  },
  {
    id: 2,
    image: department2,
    name: "Tai - Mũi - Họng",
    description: "Chuyên khoa Tai - Mũi - Họng chẩn đoán và điều trị các bệnh liên quan.",
  },
  {
    id: 3,
    image: department3,
    name: "Da Liễu",
    description: "Chuyên khoa da liễu điều trị các bệnh về da như dị ứng, viêm da, mụn trứng cá.",
  },
  {
    id: 4,
    image: department4,
    name: "Hô Hấp",
    description: "Chuyên khoa da liễu điều trị các bệnh về da như dị ứng, viêm da, mụn trứng cá.",
  },
  {
    id: 5,
    image: department5,
    name: "Nội Tiết",
    description: "Chuyên khoa da liễu điều trị các bệnh về da như dị ứng, viêm da, mụn trứng cá.",
  }
];

function DepartmentCard() {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + 3 < departments.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="departments-container">
      <div className="department-header">
        <h4 className="department-heading">Danh Sách Chuyên Khoa</h4>
        <button className="btn btn-view-all" onClick={() => navigate("/departments")}>Xem Thêm</button>
      </div>

      <div className="department-slider">
        <button className="slider-btn left" onClick={handlePrev} disabled={startIndex === 0}>
          ❮
        </button>

        <div className="department-list">
          {departments.slice(startIndex, startIndex + 3).map((department) => (
            <div key={department.id} className="department-card" data-aos="fade-up">
              <img src={department.image} alt={department.name} className="department-img" />
              <h4 className="department-name">{department.name}</h4>
              <p className="department-description">{department.description}</p>
              <div className="department-buttons">
                <button className="btn btn-collapse">Xem Thêm</button>
                <button className="btn btn-appointment">Xem Bác Sĩ</button>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-btn right" onClick={handleNext} disabled={startIndex + 3 >= departments.length}>
          ❯
        </button>
      </div>
    </div>
  );
}
export default DepartmentCard;