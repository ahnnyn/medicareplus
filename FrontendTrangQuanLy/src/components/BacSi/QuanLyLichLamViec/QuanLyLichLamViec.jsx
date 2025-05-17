import { Badge, Button, Calendar, Checkbox, Col, DatePicker, Divider, Form, message, notification, Row, Select, Space, Table, Tag } from "antd"
import { useEffect, useState } from "react"
import moment from "moment"
import './css.scss'
import { dangKyKhungGioKham, fetchBacSiByMaBS, fetchCaLamViec, fetchKhungGioByCaLamViec, fetchKhungGio, getTimeSlotsByDoctorAndDate } from "../../../services/apiDoctor"
import { useSelector } from "react-redux"
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi'); // Kích hoạt ngôn ngữ tiếng Việt
const QuanLyLichLamViec = () => {

    const [form] = Form.useForm()
    const [dataDoctor, setDataDoctor] = useState([])
    const [dataTime, setDataTime] = useState('')
    const [dataKGTheoCa, setDataKGTheoCa] = useState([])
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [dataLichLamViec, setDataLichLamViec] = useState([]);
    const [currentDoctorId, setCurrentDoctorId] = useState('');
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [hinhThucKham, setHinhThucKham] = useState();
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [selectedTimesByType, setSelectedTimesByType] = useState({
        'Trực tuyến': [],
        'Chuyên khoa': []
      });
      

    const user = useSelector(state => state.accountDoctor.user)

    useEffect(() => {
        fetchAllDoctors()
    }, [user])

    useEffect(() => {
        fetchAllTimes()
    }, [])

    useEffect(() => {
        fetchKhungGioOfCa()
    }, [])

    useEffect(() => {
        if (dataDoctor && dataDoctor.maBacSi) {
            // Nếu dataDoctor đã có maBacSi, cập nhật trường maBacSi trong form
            form.setFieldsValue({
                maBacSi: dataDoctor.maBacSi,
            });
        }
    }, [dataDoctor, form]);
    
    useEffect(() => {
        fetchDoctorTimes();
    }, [hinhThucKham, form.getFieldValue('date')]);
    

    
    useEffect(() => {
        const doctorId = form.getFieldValue('maBacSi');
        const date = form.getFieldValue('date');
        if (doctorId && date) {
          fetchDoctorTimes();
        }
      }, [form, form.getFieldValue('maBacSi'), form.getFieldValue('date')]);

    useEffect(() => {
        // Reset selected times khi thay đổi bác sĩ hoặc ngày khám
        form.setFieldsValue({ time: undefined }); // Clear the time field in the form
        setSelectedTimes([]); // Reset selected times
    }, [form]);

    useEffect(() => {
        console.log("dataLichLamViec updated: ", dataLichLamViec);
      }, [dataLichLamViec]);

    const fetchKhungGioOfCa = async () => {
        try {
            const res = await fetchKhungGioByCaLamViec(); // Lấy dữ liệu khung giờ từ API
            console.log("Khung giờ trong ca làm: ", res);
            if (res && res.length > 0) {
                setDataKGTheoCa(res);  // Cập nhật state với dữ liệu có thêm ca làm
                console.log("Khung giờ theo ca làm: ", dataKGTheoCa);
            }
        } catch (error) {
            console.error("Error fetching ca lam viec data:", error);
        }
    };
    
    const fetchAllDoctors = async () => {
        try {
            const res = await fetchBacSiByMaBS(user.maBacSi);
            console.log("res doctor by id: ", res);
    
            if (res && res.data) {
                setDataDoctor(res.data);
                form.setFieldsValue({
                    maBacSi: res.data.maBacSi, // Cập nhật giá trị cho maBacSi
                });
    
                setTimeout(() => {
                    console.log("dataDoctor: ", res.data);
                    console.log("mabs: ", res.data.maBacSi);
                }, 100);
            }
        } catch (error) {
            console.error("Error fetching doctor data:", error);
        }
    };
     
    const fetchAllTimes = async () => {
        const res = await fetchKhungGio()
        console.log("res khung gio: ", res);
        if (res && res) {
            setDataTime(res)
        }
    }
    console.log("dataDoctor: ", dataDoctor);
    console.log("dataTime: ", dataTime);

    const fetchDoctorTimes = async () => {
        const doctorId = form.getFieldValue('maBacSi');
        const appointmentDate = form.getFieldValue('date');
      
        if (doctorId && appointmentDate) {
          try {
            const formattedDate = appointmentDate.format('YYYY-MM-DD');
            const res = await getTimeSlotsByDoctorAndDate(doctorId, formattedDate);
      
            if (res && Array.isArray(res)) {
              setDataLichLamViec(res); // render bảng
      
              const oppositeType = hinhThucKham === 'Trực tuyến' ? 'Chuyên khoa' : 'Trực tuyến';
      
              const matchedCurrent = res.filter(
                item => item.hinhThucKham === hinhThucKham && item.ngayLamViec === formattedDate
              );
      
              const matchedOpposite = res.filter(
                item => item.hinhThucKham === oppositeType && item.ngayLamViec === formattedDate
              );
      
              const selected = matchedCurrent.map(item => item.maKhungGio);
              const disabled = matchedOpposite.map(item => item.maKhungGio);
      
              const allTimeRes = await fetchKhungGio();
      
              const finalTimeList = allTimeRes.map(time => ({
                ...time,
                disabled: disabled.includes(time.maKhungGio),
              }));
      
              setDataTime(finalTimeList);
      
              // Luôn cập nhật selectedTimesByType cho hình thức hiện tại
              setSelectedTimesByType(prev => ({
                ...prev,
                [hinhThucKham]: selected,
              }));
      
              // Đặt selectedTimes & giá trị form từ dữ liệu mới cập nhật
              setSelectedTimes(selected);
              form.setFieldsValue({
                time: selected,
              });
            }
          } catch (error) {
            console.error("Error fetching doctor times:", error);
            setSelectedTimes([]);
          }
        }
      };
      
    const handleTimeSelect = (timeId) => {
        const currentSelected = selectedTimesByType[hinhThucKham] || [];
      
        let updatedTimes;
        if (currentSelected.includes(timeId)) {
          updatedTimes = currentSelected.filter(id => id !== timeId);
        } else {
          updatedTimes = [...currentSelected, timeId];
        }
      
        // Cập nhật state
        const updatedState = {
          ...selectedTimesByType,
          [hinhThucKham]: updatedTimes,
        };
      
        setSelectedTimesByType(updatedState);
        setSelectedTimes(updatedTimes);
        form.setFieldsValue({ time: updatedTimes });
      };
      

      const changeValueSelect = (value) => {
        setHinhThucKham(value);
      
        // Lấy khung giờ đã chọn của hình thức mới
        const newSelected = selectedTimesByType[value] || [];
      
        form.setFieldsValue({ time: newSelected });
        setSelectedTimes(newSelected);
      };  

    const handleDoctorChange = (doctorId) => {
        setCurrentDoctorId(doctorId); // Cập nhật bác sĩ hiện tại
    };
    const handleDateChange = (date, dateString) => {
        setAppointmentDate(dateString);
    
        // Reset trạng thái khung giờ đã chọn theo từng hình thức
        setSelectedTimesByType({});
    
        // Cũng nên reset selectedTimes (khung giờ đang chọn hiển thị)
        setSelectedTimes([]);
    
        fetchDoctorTimes();
    };

    const handleSubmit = async (values) => {
        const { date } = values;
        const appointmentDate = date.format('YYYY-MM-DD');
        const maBacSi = dataDoctor.maBacSi;
    
        try {
            // Gửi danh sách KHUNG GIỜ ĐÃ CẬP NHẬT CHO HÌNH THỨC ĐANG CHỌN
            const res = await dangKyKhungGioKham(maBacSi, appointmentDate, selectedTimes, hinhThucKham);
    
            if (res && res.success) {
                message.success(res.success);
                // Sau khi cập nhật thành công, có thể gọi lại fetchDoctorTimes() để refresh lại
                fetchDoctorTimes();
            } else {
                notification.error({
                    message: 'Đã có lỗi xảy ra',
                    description: res?.error || 'Lỗi không xác định',
                });
            }
        } catch (error) {
            console.error("Lỗi trong khi đăng ký khung giờ:", error);
            notification.error({
                message: 'Lỗi hệ thống',
                description: 'Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.',
            });
        }
    };
    

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    // console.log("data ne: ", data);

    useEffect(() => {
        if (!Array.isArray(dataLichLamViec)) return;
      
        const sortedDates = Array.from(new Set(dataLichLamViec.map(item => item.ngayLamViec)))
          .sort((a, b) => moment(a).diff(moment(b)));
      
        const dynamicColumns = [
          {
            title: 'Giờ khám',
            dataIndex: 'time',
            key: 'time',
          },
          ...sortedDates.map(ngay => ({
            title: moment(ngay, 'YYYY-MM-DD').format('DD/MM/YYYY'),
            dataIndex: ngay,
            key: ngay,
            render: value =>
              value ? (
                <Space direction="vertical">
                  {value.map((item, index) => (
                    <Tag
                      key={index}
                      color={item.hinhThucKham === 'Chuyên khoa' ? 'green' : 'red'}
                    >
                      {item.khungGio}
                    </Tag>
                  ))}
                </Space>
              ) : null,
          })),
        ];
      
        const allTimeSlots = Array.from(new Set(dataLichLamViec.map(item => item.khungGio))).sort();
      
        const tableData = allTimeSlots.map((khungGio, index) => {
          const row = { key: index, time: khungGio };
      
          sortedDates.forEach(date => {
            const matchingItems = dataLichLamViec.filter(
              item => item.ngayLamViec === date && item.khungGio === khungGio
            );
      
            if (matchingItems.length > 0) {
              const uniqueByHinhThuc = Array.from(
                new Map(matchingItems.map(item => [`${item.hinhThucKham}`, item])).values()
              );
      
              row[date] = uniqueByHinhThuc.map(item => ({
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
      
    
    // Thêm chú thích màu sắc dưới bảng
    const renderColorLegend = () => (
        <div style={{ textAlign: 'center', marginTop: 10 }}>
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
            <Row>
                <Col span={24}>
                    <Form
                        form={form}
                        name="maBacSi"
                        layout="vertical"
                        style={{
                            maxWidth: "100%",
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleSubmit}
                        autoComplete="off"
                    >
                        <Form.Item name="maLichLamViec" style={{ display: 'none' }}>
                            <Select
                                placeholder="Chọn mã lịch làm việc"
                                options={dataLichLamViec.map(item => ({ value: item.maLichLamViec, label: item.tenLichLamViec }))}
                                onChange={value => form.setFieldsValue({ maLichLamViec: value })}
                            />
                        </Form.Item>
    
                        <Row gutter={[20, 5]}>
                            {/* Cột chọn ngày */}
                            <Col span={6} md={6} sm={12} xs={24}>
                                <Form.Item
                                    layout="vertical"
                                    label="Chọn ngày"
                                    name="date"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn ngày!',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        placeholder="Chọn ngày khám"
                                        style={{ width: "100%" }}
                                        format="DD/MM/YYYY"
                                        onChange={handleDateChange}
                                        disabledDate={current => current && current < moment().startOf('day')}
                                    />
                                </Form.Item>
                            </Col>

                            {/* Cột hình thức khám */}
                            <Col span={6} md={6} sm={12} xs={24}>
                                <Form.Item
                                    layout="vertical"
                                    label="Hình thức khám"
                                    name="hinhThucKham"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn hình thức khám!',
                                        },
                                    ]}
                                >
                                    <Select
                                        value={hinhThucKham}
                                        onChange={changeValueSelect}
                                        placeholder="Chọn hình thức"
                                        >
                                        <Select.Option value="Chuyên khoa">Khám tại bệnh viện</Select.Option>
                                        <Select.Option value="Trực tuyến">Tư vấn trực tuyến</Select.Option>
                                    </Select>                                   
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item name="time" label="Chọn khung giờ">
                            <Row gutter={[16, 16]}>
                                {dataTime.length > 0 ? (
                                    dataTime.map(time => (
                                        <Col className="gutter-row" span={4} key={time.maKhungGio}>
                                            <div
                                                className={`styles ${selectedTimes.includes(time.maKhungGio) ? 'actives' : ''} ${time.disabled ? 'disabled' : ''}`}
                                                onClick={() => handleTimeSelect(time.maKhungGio)}
                                                style={{
                                                    cursor: time.disabled ? 'not-allowed' : 'pointer',
                                                    opacity: time.disabled ? 0.5 : 1,
                                                }}
                                            >
                                                {time.khungGio}
                                            </div>
                                        </Col>
                                    ))
                                ) : (
                                    <Col className="gutter-row" span={4}>
                                        <div className="styles">Không có khung giờ nào</div>
                                    </Col>
                                )}
                            </Row>
                        </Form.Item>
  
                        <Row gutter={[20, 20]}>
                            <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                                <Form.Item>
                                    <div style={{ textAlign: "center", width: "200px", height: "50px" }}>
                                        <Button type="primary" htmlType="submit" style={{ width: "200px", height: "50px", background:"#2A95BF", fontSize:"18px"}}>LƯU LẠI</Button>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={24} style={{marginTop: "20px"}}>
                    <div style={{ textAlign: "center" }}>
                        <Col span={24} style={{ padding: "0 0 20px", fontSize: "20px", textAlign: "center" }}>
                            <span style={{ fontWeight: "500", color: "navy" }}>LỊCH KHÁM BỆNH CỦA TÔI</span>
                        </Col>
                        {renderColorLegend()}
                        <Divider />
                        {/* Bảng lịch làm việc */}
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered
                            pagination={false}
                            style={{ width: '100%', margin: '20px 0', textAlign: 'center', fontSize: '20px' }}
                            scroll={{ x: 'max-content' }}  // Cho phép cuộn ngang khi bảng rộng
                        />
                    </div>

                    
                </Col>
            </Row>
        </>
    );
}
export default QuanLyLichLamViec