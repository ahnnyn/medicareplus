import {
  Badge,
  Button,
  Calendar,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  message,
  notification,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import "./css.scss";
import {
  dangKyKhungGioKham,
  fetchBacSiByMaBS,
  fetchKhungGio,
  getTimeSlotsByDoctor,
} from "services/doctor/doctors.services";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.locale("vi");

const QuanLyLichLamViec = () => {
  const [form] = Form.useForm();
  const [dataDoctor, setDataDoctor] = useState([]);
  const [dataTime, setDataTime] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [dataLichLamViec, setDataLichLamViec] = useState([]);
  const [currentDoctorId, setCurrentDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [hinhThucKham, setHinhThucKham] = useState();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [selectedTimesByType, setSelectedTimesByType] = useState({
    "Trực tuyến": [],
    "Chuyên khoa": [],
  });

  const selectedDoctor = Form.useWatch("maBacSi", form);
  const user = useSelector((state) => state.accountDoctor.user);

  useEffect(() => {
    fetchDoctors();
    fetchAllTimes();
  }, [user]);

  useEffect(() => {
    if (selectedDoctor) fetchDoctorTimes();
  }, [selectedDoctor]);

  useEffect(() => {
    if (dataDoctor?.maBacSi) {
      form.setFieldsValue({ maBacSi: dataDoctor.maBacSi });
    }
  }, [dataDoctor, form]);

  useEffect(() => {
    fetchDoctorTimes();
  }, [hinhThucKham, form.getFieldValue("date")]);

  useEffect(() => {
    form.setFieldsValue({ time: undefined });
    setSelectedTimes([]);
  }, [form.getFieldValue("maBacSi"), form.getFieldValue("date")]);

  const fetchDoctors = async () => {
    try {
      const res = await fetchBacSiByMaBS(user?.maBacSi);
      if (res?.data) {
        setDataDoctor(res.data);
        form.setFieldsValue({ maBacSi: res?.data?.maBacSi });
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  const fetchAllTimes = async () => {
    try {
      const res = await fetchKhungGio();
      if (res && res.data) {
        setDataTime(res.data);
      }
    } catch (error) {
      console.error("Error fetching all time slots:", error);
    }
  };

  const fetchDoctorTimes = async (externalDoctorId = null) => {
    const doctorId =
      externalDoctorId ||
      form.getFieldValue("maBacSi") ||
      dataDoctor.maBacSi ||
      user?.maBacSi ||
      "";
    const appointmentDate = form.getFieldValue("date");
    const formattedDate = appointmentDate?.format("YYYY-MM-DD") || null;

    if (!doctorId) {
      setDataLichLamViec([]);
      setDataTime([]);
      return;
    }

    try {
      const res = await getTimeSlotsByDoctor(doctorId);
      if (res?.data) {
        let filteredRes = res.data;

        if (formattedDate) {
          filteredRes = filteredRes.filter((item) => item.ngayLamViec === formattedDate);
        }

        if (hinhThucKham) {
          filteredRes = filteredRes.filter((item) => item.hinhThucKham === hinhThucKham);
        }

        setDataLichLamViec(filteredRes);

        if (formattedDate && hinhThucKham) {
          const oppositeType = hinhThucKham === "Trực tuyến" ? "Chuyên khoa" : "Trực tuyến";

          const matchedCurrent = res.data.filter(
            (item) => item.hinhThucKham === hinhThucKham && item.ngayLamViec === formattedDate
          );
          const matchedOpposite = res.data.filter(
            (item) => item.hinhThucKham === oppositeType && item.ngayLamViec === formattedDate
          );

          const selected = matchedCurrent.map((item) => item.maKhungGio);
          const disabled = matchedOpposite.map((item) => item.maKhungGio);

          const allTimeRes = await fetchKhungGio();

          const finalTimeList = allTimeRes.data.map((time) => ({
            ...time,
            disabled: disabled.includes(time.maKhungGio),
          }));

          setDataTime(finalTimeList);
          setSelectedTimesByType((prev) => ({ ...prev, [hinhThucKham]: selected }));
          setSelectedTimes(selected);
          form.setFieldsValue({ time: selected });
        } else {
          const allTimeRes = await fetchKhungGio();
          setDataTime(allTimeRes.data);
          setSelectedTimes([]);
          form.setFieldsValue({ time: [] });
        }
      }
    } catch (error) {
      console.error("Error fetching doctor times:", error);
      setDataLichLamViec([]);
      setDataTime([]);
    }
  };

  const handleTimeSelect = (timeId) => {
    const currentSelected = selectedTimesByType[hinhThucKham] || [];
    const updatedTimes = currentSelected.includes(timeId)
      ? currentSelected.filter((id) => id !== timeId)
      : [...currentSelected, timeId];

    setSelectedTimesByType({ ...selectedTimesByType, [hinhThucKham]: updatedTimes });
    setSelectedTimes(updatedTimes);
    form.setFieldsValue({ time: updatedTimes });
  };

  const changeValueSelect = (value) => {
    setHinhThucKham(value);
    const newSelected = selectedTimesByType[value] || [];
    form.setFieldsValue({ time: newSelected });
    setSelectedTimes(newSelected);
  };

  const handleDateChange = (date, dateString) => {
    setAppointmentDate(dateString);
    setSelectedTimesByType({});
    setSelectedTimes([]);
    fetchDoctorTimes();
  };

  const handleSubmit = async (values) => {
    const appointmentDate = values.date.format("YYYY-MM-DD");
    const maBacSi = dataDoctor.maBacSi;

    try {
      const res = await dangKyKhungGioKham(maBacSi, appointmentDate, selectedTimes, hinhThucKham);
      console.log("Kết quả đăng ký khung giờ:", res);
      if (res && res.data.status) {
        message.success(res.data.message);
        fetchDoctorTimes();
      } else {
        notification.error({
          message: "Đã có lỗi xảy ra",
          description: res?.d.error || "Lỗi không xác định",
        });
      }
    } catch (error) {
      console.error("Lỗi trong khi đăng ký khung giờ:", error);
      notification.error({
        message: "Lỗi hệ thống",
        description: "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.",
      });
    }
  };

  useEffect(() => {
    const sortedDates = Array.from(
      new Set(dataLichLamViec.map((item) => item.ngayLamViec))
    ).sort((a, b) => moment(a).diff(moment(b)));

    const dynamicColumns = [
      {
        title: "Giờ khám",
        dataIndex: "time",
        key: "time",
      },
      ...sortedDates.map((ngay) => ({
        title: moment(ngay, "YYYY-MM-DD").format("DD/MM/YYYY"),
        dataIndex: ngay,
        key: ngay,
        render: (value) =>
          value ? (
            <Space direction="vertical">
              {value.map((item, index) => (
                <Tag
                  key={index}
                  color={item.hinhThucKham === "Chuyên khoa" ? "green" : "red"}
                >
                  {item.khungGio}
                </Tag>
              ))}
            </Space>
          ) : null,
      })),
    ];

    const allTimeSlots = Array.from(new Set(dataLichLamViec.map((item) => item.khungGio))).sort();

    const tableData = allTimeSlots.map((khungGio, index) => {
      const row = { key: index, time: khungGio };
      sortedDates.forEach((date) => {
        const matchingItems = dataLichLamViec.filter(
          (item) => item.ngayLamViec === date && item.khungGio === khungGio
        );

        if (matchingItems.length > 0) {
          const uniqueByHinhThuc = Array.from(
            new Map(matchingItems.map((item) => [item.hinhThucKham, item])).values()
          );
          row[date] = uniqueByHinhThuc.map((item) => ({
            khungGio: item.khungGio,
            hinhThucKham: item.hinhThucKham,
          }));
        }
      });
      return row;
    });

    setColumns(dynamicColumns);
    setData(tableData);
  }, [dataLichLamViec]);

  const renderColorLegend = () => (
    <div style={{ textAlign: "center", marginTop: 10 }}>
      <Tag color="green">🟢 Khám Chuyên khoa</Tag>
      <Tag color="red">🔴 Khám Trực tuyến</Tag>
    </div>
  );

  return (
    <>
      <Row>
        <Col span={24} style={{ padding: "0 0 20px", fontSize: "20px", textAlign: "center" }}>
          <span style={{ fontWeight: "550", color: "navy" }}>QUẢN LÝ LỊCH LÀM VIỆC</span>
        </Col>
      </Row>
      <Divider />
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[20, 5]}>
          <Col span={6}>
            <Form.Item
              label="Chọn ngày"
              name="date"
              rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                onChange={handleDateChange}
                disabledDate={(current) => current && current < moment().startOf("day")}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Hình thức khám"
              name="hinhThucKham"
              rules={[{ required: true, message: "Vui lòng chọn hình thức khám!" }]}
            >
              <Select value={hinhThucKham} onChange={changeValueSelect} placeholder="Chọn hình thức">
                <Select.Option value="Chuyên khoa">Khám tại bệnh viện</Select.Option>
                <Select.Option value="Trực tuyến">Tư vấn trực tuyến</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="time" label="Chọn khung giờ">
          <Row gutter={[16, 16]}>
            {Array.isArray(dataTime) && dataTime.length > 0 ? (
              dataTime.map((time) => (
                <Col span={4} key={time.maKhungGio}>
                  <div
                    className={`styles ${selectedTimes.includes(time.maKhungGio) ? "actives" : ""} ${
                      time.disabled ? "disabled" : ""
                    }`}
                    onClick={() => handleTimeSelect(time.maKhungGio)}
                    style={{
                      cursor: time.disabled ? "not-allowed" : "pointer",
                      opacity: time.disabled ? 0.5 : 1,
                    }}
                  >
                    {time.khungGio}
                  </div>
                </Col>
              ))
            ) : (
              <Col span={4}>
                <div className="styles">Không có khung giờ nào</div>
              </Col>
            )}
          </Row>
        </Form.Item>

        <Row justify="center">
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 200, height: 50, fontSize: 18, background: "#2A95BF" }}
            >
              LƯU LẠI
            </Button>
          </Col>
        </Row>
      </Form>

      <Divider />
      <Row>
        <Col span={24}>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "navy" }}>LỊCH KHÁM BỆNH CỦA TÔI</h3>
            {renderColorLegend()}
            <Table
              columns={columns}
              dataSource={data}
              bordered
              pagination={false}
              scroll={{ x: "max-content" }}
              style={{ marginTop: 20 }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default QuanLyLichLamViec;
