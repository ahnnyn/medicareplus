import { Avatar, Col, Row } from "antd";
import Footer from "../../../components/TrangChu/Footer/Footer";
import HeaderViewDoctor from "../../../components/TrangChu/Header/HeaderViewDoctor";
import '../LichHen/lichhen.scss';
import { IoHomeSharp } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { fetchAllBacSi } from "../../../services/apiChuyenKhoaBacSi";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../../../components/TrangChu/SearchComponent/SearchComponent";

const BacSiNoiBat = () => {
  const [dataAllDoctor, setDataAllDoctor] = useState([]);
  const [dataSearch, setDataSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctors when search value changes
    fetchListDoctor();
  }, [dataSearch]);

  const fetchListDoctor = async (searchQuery = "") => {
    try {
        let res;
        if (searchQuery) {
            // Tìm bác sĩ theo tên nếu có tìm kiếm
            res = await findBacSiByTen(`hoTen=${encodeURIComponent(searchQuery)}`);
        } else {
            // Nếu không có tìm kiếm, lấy tất cả bác sĩ
            res = await fetchAllBacSi(""); // Truyền chuỗi rỗng để lấy tất cả bác sĩ
        }

        console.log("res all doctor: ", res);
        if (res && res.data) {
            setDataAllDoctor(res.data); // Cập nhật dữ liệu bác sĩ
        } else {
            setDataAllDoctor([]); // Nếu không có dữ liệu, gán mảng rỗng
        }
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setDataAllDoctor([]); // Nếu có lỗi, gán mảng rỗng
    }
};

  

  const handleRedirectDoctor = (item) => {
    navigate(`/view-doctor?maBacSi=${item}`);
  };

  const onSearch = (value) => {
    setDataSearch(value || ''); // Set search query
  };

  return (
    <>
      <HeaderViewDoctor />
      <Row>
        <Col span={18} className="col-body">
          <Row>
            <Col span={24}>
              <p className="txt-title"><IoHomeSharp /> / Bác sĩ nổi bật</p>
            </Col>
            <Col span={24}>
              <p className="title-lichhen">Bác sĩ nổi bật</p>
            </Col>
            <Col span={24} style={{ marginBottom: "20px" }}>
              <SearchComponent placeholder="Tìm kiếm tên bác sĩ" onSearch={onSearch} />
            </Col>

            {dataAllDoctor?.length > 0 ? (
              dataAllDoctor.map((item, index) => (
                <Col key={index} span={24} style={{ padding: "10px 15px 0", cursor: "pointer" }} onClick={() => handleRedirectDoctor(item.maBacSi)}>
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
                        {(Array.isArray(item?.tenKhoa) ? item.tenKhoa : [item?.tenKhoa]).join(', ')}
                      </span>
                    </Col>
                  </Row>
                  <hr style={{ border: "1px solid rgb(243, 243, 243)" }} />
                </Col>
              ))
            ) : (
              <Col span={24} style={{ textAlign: "center", padding: "20px" }}>
                <p style={{ color: "gray", fontSize: "18px" }}>Chưa có bác sĩ nào.</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default BacSiNoiBat;
