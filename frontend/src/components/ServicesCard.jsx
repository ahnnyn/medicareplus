import "../components/ServicesCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";

const ServiceCards = () => {
  return (
    <div className="service-container">
      <h2 className="service-title">Dịch vụ toàn diện</h2>
      <div className="service-wrapper">
        <Link to="/kham-chuyen-khoa" className="service-card">
          <FontAwesomeIcon icon={faHospital} size="3x" color="#278DCA" />
          <p>Đặt lịch khám tại bệnh viện</p>
        </Link>
        <Link to="/tu-van-truc-tuyen" className="service-card">
          <FontAwesomeIcon icon={faMobileScreenButton} size="3x" color="#278DCA" />
          <p>Đặt lịch tư vấn trực tuyến</p>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCards;
