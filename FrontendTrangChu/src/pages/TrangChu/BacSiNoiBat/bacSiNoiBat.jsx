import { Avatar, Col, Row, Select } from "antd";
import Footer from "../../../components/TrangChu/Footer/Footer";
import HeaderViewDoctor from "../../../components/TrangChu/Header/HeaderViewDoctor";
import "../LichHen/lichhen.scss";

import { IoHomeSharp } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { fetchAllBacSi } from "../../../services/apiChuyenKhoaBacSi";
import { findBacSiByTen } from "../../../services/apiChuyenKhoaBacSi";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../../../components/TrangChu/SearchComponent/SearchComponent";
const BacSiNoiBat = () => {
  const [dataAllDoctor, setDataAllDoctor] = useState([]);
  const [dataSearch, setDataSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("chuyenkhoa");

  const navigate = useNavigate();

  useEffect(() => {
    fetchListDoctor(dataSearch, selectedStatus);
  }, [dataSearch, selectedStatus]);

  const fetchListDoctor = async (search = "", status = "chuyenkhoa") => {
    try {
      let res = await fetchAllBacSi(""); // Luôn lấy tất cả để lọc frontend
  
      if (res && res.data) {
        let filteredData = res.data;
  
        // 1. Lọc theo hình thức khám
        filteredData = filteredData.filter((item) => {
          const hinhThucArr = item?.hinhThucKham?.toLowerCase().split(",") || [];
  
          if (status === "chuyenkhoa") {
            return hinhThucArr.includes("chuyên khoa");
          } else if (status === "tructuyen") {
            return hinhThucArr.includes("trực tuyến");
          }
  
          return true;
        });
  
        // 2. Lọc theo từ khóa tìm kiếm (nếu có)
        if (search) {
          const keyword = search.toLowerCase();
          filteredData = filteredData.filter((item) =>
            item?.hoTen?.toLowerCase().includes(keyword)
          );
        }
  
        setDataAllDoctor(filteredData);
      } else {
        setDataAllDoctor([]);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setDataAllDoctor([]);
    }
  };
  

  console.log("dataAllDoctor", dataAllDoctor);

  const handleRedirectDoctor = (maBacSi, hinhThucKham) => {
    navigate(`/view-doctor?maBacSi=${maBacSi}&hinhThucKham=${hinhThucKham}`);
  };

  const onSearch = (value) => {
    setDataSearch(value || "");
  };

  const handleStatusFilter = (value) => {
    setSelectedStatus(value);
  };

  return (
    <>
      <HeaderViewDoctor />
      <Row style={{ marginTop: "120px" }}></Row>
      <div
      className=""
      style={{ backgroundImage: `url('../../public/Banner_2.jpg')`, height: "450px" }}
    >
      <Row justify="space-between" align="middle" gutter={16}>
        <Col xs={24} md={12} className="">
          <div className="" style={{ marginLeft: "70px", padding: "10px 20px", borderRadius: "40px", backgroundColor: "white", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginTop: "50px" }}>
            <h2 className="" style={{ fontSize: "clamp(20px, 5vw, 30px)", fontWeight: "bold", color: "#00B0F0" }}>
              ĐẶT KHÁM THEO BÁC SĨ
            </h2>
            <ul className="" style={{ listStyleType: "none", paddingLeft: "0", lineHeight: "1.8", color: "#333" }}>
              <li>✅ Chủ động chọn bác sĩ tin tưởng, đặt càng sớm, càng có cơ hội có số thứ tự thấp nhất, tránh hết số</li>
              <li>✅ Đặt khám theo giờ, không cần chờ lấy số thứ tự, chờ thanh toán (đối với cơ sở mở thanh toán online)</li>
              <li>✅ Được hoàn phí khám nếu hủy phiếu</li>
              <li>✅ Được hưởng chính sách hoàn tiền khi đặt lịch trên Medpro (đối với các cơ sở tư có áp dụng)</li>
            </ul>
          </div>
        </Col>

        <Col xs={4} md={12} className="z-0 flex justify-end">
          <img
            src="../../public/banner_3-removebg-preview.png"
            alt="Doctors illustration"
            className=""
            style={{ maxHeight: "350px", float: "right", marginTop: "100px", marginRight: "50px" }}
          />
        </Col>
      </Row>
    </div>

    <Row style={{ marginTop: "20px" }}></Row>

      <Row>
        <Col span={18} className="col-body">
          <Row gutter={[20, 25]}>
            <Col span={24}>
              <p className="txt-title">
                <IoHomeSharp /> / Bác sĩ nổi bật
              </p>
            </Col>
            <Col span={6}>
              <p className="title-lichhen">Bác sĩ nổi bật</p>
            </Col>
            <Col span={18}></Col>
            <Col xs={6}>
              <Select
                value={selectedStatus}
                onChange={handleStatusFilter}
                style={{ width: "100%" }}
                options={[
                  { value: "chuyenkhoa", label: "Chuyên khoa" },
                  { value: "tructuyen", label: "Trực tuyến" },
                ]}
              />
            </Col>
            <Col span={18}>
              <SearchComponent
                placeholder="Tìm kiếm tên bác sĩ"
                onSearch={onSearch}
              />
            </Col>

            {dataAllDoctor?.length > 0 ? (
              dataAllDoctor.map((item, index) => (
                <Col
                  key={index}
                  span={24}
                  style={{ padding: "10px 15px 0", cursor: "pointer" }}
                  onClick={() => handleRedirectDoctor(item.maBacSi, selectedStatus)}
                >
                  <Row>
                    <Col span={3}>
                      <Avatar
                        style={{ border: "1px solid green" }}
                        src={`${import.meta.env.VITE_BACKEND_URL}/public/bacsi/${item?.hinhAnh}`}
                        shape="square"
                        size={120}
                        icon={<UserOutlined />}
                      />
                    </Col>
                    <Col span={21} className="box-title-doctor">
                      <span className="txt-Title-doctor-noi-bat">
                        <span style={{ color: "navy" }}>{item?.hoTen}</span>
                      </span>
                      <br />
                      <span className="title-nho">
                        {(Array.isArray(item?.tenKhoa)
                          ? item.tenKhoa
                          : [item?.tenKhoa]
                        ).join(", ")}
                      </span>
                    </Col>
                  </Row>
                  <hr style={{ border: "1px solid rgb(243, 243, 243)" }} />
                </Col>
              ))
            ) : (
              <Col span={24} style={{ textAlign: "center", padding: "20px" }}>
                <p style={{ color: "gray", fontSize: "18px" }}>
                  Không tìm thấy bác sĩ nào.
                </p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Row style={{ marginBottom: "150px" }}></Row>
      <Footer />
    </>
  );
};

export default BacSiNoiBat;
