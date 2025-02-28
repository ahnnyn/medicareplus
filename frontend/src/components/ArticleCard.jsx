import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/ArticleCard.css";

import article1 from "../assets/images/khoa/khoatimmach.jpg";
import article2 from "../assets/images/khoa/khoatimmach.jpg";
import article3 from "../assets/images/khoa/khoatimmach.jpg";
import article4 from "../assets/images/khoa/khoatimmach.jpg";
import article5 from "../assets/images/khoa/khoatimmach.jpg";

const articles = [
  {
    id: 1,
    image: article1,
    title: "Bệnh Tim Mạch Và Cách Phòng Ngừa",
    description: "Tìm hiểu về bệnh tim mạch và những cách giúp bạn bảo vệ sức khỏe tim mạch.",
  },
  {
    id: 2,
    image: article2,
    title: "Chăm Sóc Da Đúng Cách",
    description: "Hướng dẫn cách chăm sóc da đúng chuẩn để luôn có làn da khỏe mạnh.",
  },
  {
    id: 3,
    image: article3,
    title: "Tác Hại Của Ô Nhiễm Không Khí",
    description: "Ô nhiễm không khí ảnh hưởng đến sức khỏe như thế nào?",
  },
  {
    id: 4,
    image: article4,
    title: "Cách Phòng Ngừa Bệnh Hô Hấp",
    description: "Những biện pháp giúp bạn bảo vệ hệ hô hấp trước môi trường ô nhiễm.",
  },
  {
    id: 5,
    image: article5,
    title: "Dinh Dưỡng Hợp Lý Cho Người Bệnh Tiểu Đường",
    description: "Người bị tiểu đường nên ăn gì để kiểm soát đường huyết hiệu quả?",
  },
];

function ArticleCard() {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + 4 < articles.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="articles-container">
      <div className="article-header">
        <h4 className="article-heading">Bài Viết Mới Nhất</h4>
        <button className="btn btn-view-all" onClick={() => navigate("/articles")}>Xem Thêm</button>
      </div>

      <div className="article-slider">
        <button className="slider-btn left" onClick={handlePrev} disabled={startIndex === 0}>
          ❮
        </button>

        <div className="article-list">
          {articles.slice(startIndex, startIndex + 4).map((article) => (
            <div key={article.id} className="article-card" data-aos="fade-up">
              <img src={article.image} alt={article.title} className="article-img" />
              <h4 className="article-title">{article.title}</h4>
              <p className="article-description">{article.description}</p>
              <button className="btn btn-collapse">Đọc Thêm</button>
            </div>
          ))}
        </div>

        <button className="slider-btn right" onClick={handleNext} disabled={startIndex + 4 >= articles.length}>
          ❯
        </button>
      </div>
    </div>
  );
}

export default ArticleCard;
