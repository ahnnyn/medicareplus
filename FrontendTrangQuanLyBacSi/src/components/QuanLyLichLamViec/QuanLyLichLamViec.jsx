import { Badge, Button, Calendar, Checkbox, Col, DatePicker, Divider, Form, message, notification, Row, Select, Space, Table } from "antd"
import { useEffect, useState } from "react"
import moment from "moment"
import './css.scss'
import { dangKyKhungGioKham, fetchBacSiByMaBS, fetchCaLamViec, fetchKhungGioByCaLamViec, fetchKhungGio, getTimeSlotsByDoctorAndDate } from "../../services/apiDoctor"
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
    }, [form.getFieldValue('maBacSi'), form.getFieldValue('date')]);

    useEffect(() => {
        // Reset selected times khi thay đổi bác sĩ hoặc ngày khám
        form.setFieldsValue({ time: undefined }); // Clear the time field in the form
        setSelectedTimes([]); // Reset selected times
    }, [form]);

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
        // Check if the doctor ID and date are present before making the request
        const doctorId = form.getFieldValue('maBacSi');
        const appointmentDate = form.getFieldValue('date');
        
        if (doctorId && appointmentDate) {
            try {
                // Ensure the date is properly formatted
                const formattedDate = appointmentDate.format('YYYY-MM-DD');
                
                // Fetch available time slots for the doctor on the selected date
                const res = await getTimeSlotsByDoctorAndDate(doctorId, formattedDate);
                console.log("Lịch làm việc bác sĩ: ", res);
    
                // Check if the response is valid and contains the expected data
                if (res && Array.isArray(res)) {
                    // Update the available time slots data in state
                    setDataLichLamViec(res);
                    
                    // Update the "maLichLamViec" form field with the IDs of available time slots
                    form.setFieldsValue({
                        maLichLamViec: res.map(item => item.maLichLamViec)
                    });
    
                    // Extract and update the selected time slots (khungGio_ID)
                    const workingTimeIds = res.map(slot => slot.khungGio_ID);
                    setSelectedTimes(workingTimeIds);
                } else {
                    // Handle error if the response is not in the expected format
                    console.error('Error fetching time slots:', res?.error || "Lỗi không xác định");
                    setSelectedTimes([]); // Reset selected times if no valid response
                }
            } catch (error) {
                // Handle any unexpected errors during the fetch request
                console.error("Error fetching doctor times:", error);
                setSelectedTimes([]); // Reset selected times on error
            }
        } else {
            console.warn("Doctor ID or appointment date is missing.");
        }
    };
    

    const handleTimeSelect = (timeId) => {
        // Cập nhật danh sách khung giờ đã chọn
        const newSelectedTimes = selectedTimes.includes(timeId)
            ? selectedTimes.filter(id => id !== timeId) // Nếu đã chọn thì bỏ chọn
            : [...selectedTimes, timeId]; // Nếu chưa chọn thì thêm vào danh sách đã chọn

        setSelectedTimes(newSelectedTimes);

        // Cập nhật giá trị trong form
        form.setFieldsValue({ time: newSelectedTimes });
    };

    const handleDoctorChange = (doctorId) => {
        setCurrentDoctorId(doctorId); // Cập nhật bác sĩ hiện tại
    };
    const handleDateChange = (date, dateString) => {
        setAppointmentDate(dateString);
    };

    const handleSubmit = async (values) => {
        const { date } = values;
        const appointmentDate = date.format('YYYY-MM-DD');
        const maBacSi = dataDoctor.maBacSi; // Lấy mã bác sĩ từ dữ liệu bác sĩ
        console.log("Mã bác sĩ: ", maBacSi);
        console.log("Ngày khám appointmentDate: ", appointmentDate);
        console.log("Thời gian đã chọn:", selectedTimes);
        
        try {
            const res = await dangKyKhungGioKham(maBacSi, appointmentDate, selectedTimes);
            console.log("Res từ thêm thời gian: ", res);
    
            // Check if response contains 'success' message and display accordingly
            if (res && res.success) {
                message.success(res.success);  // Display success message
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

    console.log("dataDoctor: ", dataDoctor);

    const data1 = (Array.isArray(dataDoctor.thoiGianKham) && dataDoctor.thoiGianKham.length > 0) ? dataDoctor.thoiGianKham.map((item, index) => (
        {
            key: index,
            date: item.date,
            times: item.thoiGianId?.map((itemm) => itemm.tenGio)
        }
    )) : [];
    // console.log("data ne: ", data);

    const columns = [
        {
          title: 'Giờ khám',
          dataIndex: 'time',
          key: 'time',          
        },
        ...(Array.isArray(dataDoctor.thoiGianKham) && dataDoctor.thoiGianKham.length > 0
          ? dataDoctor.thoiGianKham.map((item) => ({
              title: moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
              dataIndex: item.date,
              key: item.date,
              render: (times) =>
                times && times.length > 0 ? (
                  <div>
                    {times.map((time, index) => (
                      <div key={index}>
                        <Badge color={'hsl(102, 53%, 61%)'} text={time.tenGio} />
                      </div>
                    ))}
                  </div>
                ) : null, // Nếu không có times, không render gì
            }))
          : []),
      ];
      
      // Chuẩn bị dữ liệu cho các hàng
      const data = (() => {
        if (!Array.isArray(dataDoctor?.thoiGianKham)) return [];
        
        // Chuyển đổi tên giờ từ định dạng 'HH:MM-HH:MM' thành dạng thời gian có thể so sánh
        const parseTime = (timeStr) => {
          const [start, end] = timeStr.split('-');
          const [startHour, startMinute] = start.split(':');
          const [endHour, endMinute] = end.split(':');
          const startTime = new Date();
          startTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
          const endTime = new Date();
          endTime.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);
          return { startTime, endTime };
        };
      })();
      
      
      return (
        <>
            <Row>
                <Col span={24} style={{ padding: "0 0 20px", fontSize: "18px", textAlign: "center" }}>
                    <span style={{ fontWeight: "500", color: "navy" }}>KẾ HOẠCH KHÁM BỆNH CỦA TÔI</span>
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
                        <Form.Item name="maLichLamViec" label="Mã lịch làm việc" style={{ display: 'none' }}>
                            <Select
                                placeholder="Chọn mã lịch làm việc"
                                options={dataLichLamViec.map(item => ({ value: item.maLichLamViec, label: item.tenLichLamViec }))}
                                onChange={value => form.setFieldsValue({ maLichLamViec: value })}
                            />
                        </Form.Item>
    
                        <Row gutter={[20, 5]}>
                            <Col span={5} md={5} sm={5} xs={24}>
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
                                        format="DD/MM/YYYY" // Định dạng ngày/tháng/năm
                                        onChange={handleDateChange} // Khi thay đổi ngày
                                        disabledDate={current => current && current < moment().startOf('day')} // Không cho chọn ngày quá khứ
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
    
                        <Form.Item name="time" label="Chọn khung giờ">
                            <Row gutter={[16, 16]}>
                                {dataTime.length > 0 ? (
                                    dataTime.map(time => (
                                        <Col className="gutter-row" span={4} key={time.maKhungGio}>
                                            <div
                                                className={`styles ${selectedTimes.includes(time.maKhungGio) ? 'actives' : ''}`}
                                                onClick={() => {
                                                    handleTimeSelect(time.maKhungGio);
                                                    // Cập nhật giá trị của trường trong form
                                                    form.setFieldsValue({ time: selectedTimes });
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
                            <Col span={24}>
                                <Form.Item>
                                    <div style={{ textAlign: "center" }}>
                                        <Button type="primary" htmlType="submit">Lưu lại</Button>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={24}>
                    <div style={{ textAlign: "center" }}>
                        <h3>Lịch khám bệnh của tôi</h3>
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered
                            pagination={false}
                            style={{ width: '100%', margin: '20px ', textAlign: 'center' }}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
}
export default QuanLyLichLamViec