import { Col, Divider, Form, Input, message, Modal, notification, Row, Select, Space, Switch, Table, Tag, Tooltip } from "antd"
import { useEffect, useRef, useState } from "react"
import moment from 'moment-timezone';
import { ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { findAllLichKhamByBacSi } from "../../services/doctorAPI";
import ViewLichHen from "./ViewLichHen";
import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { updateThongTinlichKham, createConsultationRoom } from "../../services/apiDoctor";
import './custom.css'
import SearchComponent from "../Search/SearchComponent";
import ModalEdit from "./ModalEdit";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";
import ModalTaoPhieuKham from "../PhieuKhamBenh/ModalTaoPhieuKham";

const QuanLyLichHen = () => {
    const [originalData, setOriginalData] = useState([]); // Dữ liệu gốc
    const [dataOrder, setDataOrder] = useState([]); // Dữ liệu hiển thị
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(0);
    const [openViewDH, setOpenViewDH] = useState(false);
    const [dataViewDH, setDataViewDH] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("tatca");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const editorRef = useRef(null);
    const form = Form.useForm()[0];


    const user = useSelector(state => state.accountDoctor.user);
    console.log("User", user); // Kiểm tra thông tin người dùng

    const fetchOrders = async () => {
        if (!user?.maBacSi) return;
        setLoadingOrder(true);
        try {
            const res = await findAllLichKhamByBacSi(user.maBacSi); // API call
            if (res && Array.isArray(res)) {
                setOriginalData(res); // Gốc không đổi
                // Lọc lần đầu dựa vào trạng thái và tìm kiếm
                filterAndSetData(res, searchValue, selectedStatus);
                console.log(originalData); // Kiểm tra dữ liệu ban đầu

            }
        } catch (error) {
            notification.error({
                message: 'Lỗi tải dữ liệu',
                description: 'Không thể tải lịch khám từ hệ thống.'
            });
        }
        setLoadingOrder(false);
    };

    useEffect(() => {
        console.log("origin", originalData); // Kiểm tra dữ liệu sau khi cập nhật
    }, [originalData]); // Khi originalData thay đổi


    useEffect(() => {
        console.log(searchValue); // Kiểm tra giá trị searchValue
    }, [searchValue]); // Khi searchValue thay đổi

    useEffect(() => {
        console.log(selectedStatus); // Kiểm tra giá trị selectedStatus
    }, [selectedStatus]); // Khi selectedStatus thay đổi

    const filterAndSetData = (data, keyword, status) => {
        const lowerKeyword = keyword.toLowerCase();

        const filtered = data.filter(item => {
            const matchSearch =
                item.hoTen.toLowerCase().includes(lowerKeyword) ||
                item.email.toLowerCase().includes(lowerKeyword) ||
                item.soDienThoai.includes(lowerKeyword);

            const matchStatus = status === "tatca" || item.trangThai === status;

            return matchSearch && matchStatus;
        });

        setDataOrder(filtered);
        setTotal(filtered.length);
        setCurrent(1); // Reset về trang đầu
    };


    const handleSearch = (value) => {
        setSearchValue(value);
        setCurrent(1); // Reset về trang đầu tiên
    };

    const handleStatusFilter = (value) => {
        console.log("Trạng thái đã chọn:", value);  // Kiểm tra giá trị của selectedStatus
        setSelectedStatus(value); // Cập nhật trạng thái đã chọn
        setCurrent(1); // Reset về trang đầu tiên
    };
    


    const paginateData = () => {
        console.log(originalData); // Kiểm tra dữ liệu ban đầu
    
        let filtered = [...originalData];
    
        // Lọc theo từ khóa tìm kiếm
        if (searchValue) {
            const lowerCaseValue = searchValue.toLowerCase();
            filtered = filtered.filter(item =>
                item.hoTen.toLowerCase().includes(lowerCaseValue) ||
                item.email.toLowerCase().includes(lowerCaseValue) ||
                item.soDienThoai.includes(lowerCaseValue)
            );
        }
    
        // Chuẩn hóa giá trị trạng thái (đảm bảo "Chờ khám" và "chokham" đều giống nhau)
        const statusMapping = {
            "chokham": "Chờ khám",
            "dakham": "Đã khám",
            "dahuy": "Đã hủy",
            "tatca": "Tất cả",
        };
    
        const statusToCompare = statusMapping[selectedStatus] || selectedStatus;
    
        // Lọc theo trạng thái nếu không phải "tất cả"
        if (selectedStatus !== "tatca") {
            filtered = filtered.filter(item => item.trangThai === statusToCompare);
        }
    
        setTotal(filtered.length); // Cập nhật tổng số lượng sau khi lọc
    
        // Phân trang dữ liệu
        const start = (current - 1) * pageSize;
        const end = start + pageSize;
        setDataOrder(filtered.slice(start, end)); // Cập nhật dữ liệu đã phân trang
    };
    

    console.log("Lịch khám", dataOrder);
    
    useEffect(() => {
        fetchOrders();
    }, [user]);
    
    useEffect(() => {
        paginateData();
    }, [originalData, current, pageSize, searchValue, selectedStatus]);
    


    
    // Cập nhật trạng thái lịch khám
    const handleStatusChange = async (value, record) => {
        const statusMapping = {
            chokham: "Chờ khám",
            dakham: "Đã khám",
            dahuy: "Đã hủy",
        };
    
        const mappedStatus = statusMapping[value];
    
        try {
            const res = await updateThongTinlichKham(user.maBacSi, record.maLich, mappedStatus);
            if (res.status) {
                message.success("Cập nhật trạng thái lịch khám thành công!");
                fetchOrders();  // Cập nhật lại danh sách lịch khám
            } else {
                notification.error({ message: "Lỗi", description: res.error });
            }
        } catch (error) {
            notification.error({
                message: "Lỗi cập nhật",
                description: "Không thể cập nhật trạng thái lịch khám.",
            });
        }
    };
    

    const handleEditClick = (record) => {
        
        setEditingRecord(record);
        setIsModalOpen(true);  // Mở modal khi bấm vào biểu tượng bút

    
        // Cập nhật giá trị form với thông tin của bệnh nhân
        form.setFieldsValue({
            hoTen: record.hoTen,
            ngayKham: moment(record.ngayKham),  // Chuyển đổi ngày từ string thành moment
            tienSu: record.tienSu,
            chuanDoan: record.chuanDoan,
            lyDoKham: record.lyDoKham
        });
    };

    const getStatusTagThanhToan = (trangThaiThanhToan) => {
        if (trangThaiThanhToan === "Đã thanh toán") {
            return { color: "green", label: "Đã thanh toán", icon: <CheckCircleOutlined /> };
        }
        return { color: "red", label: "Chưa thanh toán", icon: <ExclamationCircleOutlined /> };
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (text, record, index) => (current - 1) * pageSize + index + 1,
          },
        {
            title: "Bệnh nhân", dataIndex: "hoTen", render: (_, record) => (
                <span><b>{record.hoTen}</b> <br /> SĐT: {record.soDienThoai}</span>
            )
        },
        {
            title: "Lịch hẹn", dataIndex: "ngayKham", render: (_, record) => (
                <span>{record.ngayKham} <br /> {record.khungGio}</span>
            )
        },
        {
            title: "Trạng thái",
            dataIndex: "trangThai",
            render: (_, record) => (
                <Select
                    value={record.trangThai}
                    onChange={(value) => handleStatusChange(value, record)}
                    options={[ 
                        { value: "chokham", label: <span><ExclamationCircleOutlined style={{ color: "#1890ff", marginRight: 5 }} />Chờ khám</span> },
                        { value: "dakham", label: <span><CheckCircleOutlined style={{ color: "#52c41a", marginRight: 5 }} />Đã khám</span> },
                        { value: "dahuy", label: <span><CloseCircleOutlined style={{ color: "#ff4d4f", marginRight: 5 }} />Đã hủy</span> },
                    ]}
                    style={{ width: 160 }}
                />
            )
        },
        {
            title: "Trạng thái thanh toán", dataIndex: "trangThaiThanhToan", render: (_, record) => {
                const { color, label } = getStatusTagThanhToan(record.trangThaiThanhToan);
                return <Tag color={color}>{label}</Tag>;
            }
        },
        {
            title: "Chức năng", render: (_, record) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Tooltip title="Xem chi tiết" style={{ marginRight: 10 }}>
                        <FaEye
                            style={{ color: "green", cursor: "pointer", fontSize: "18px" }}
                            onClick={() => {
                                if (!record) {
                                    console.error("⚠️ Không tìm thấy dữ liệu bệnh nhân!");
                                    return;
                                }
                                setDataViewDH(record);
                                setOpenViewDH(true);
                            }}
                        />
                    </Tooltip>
        
                    <Tooltip title="Chỉnh sửa phiếu khám">
                        <RiEdit2Fill
                            style={{ color: "orange", cursor: "pointer", fontSize: "18px" }}
                            onClick={() => handleEditClick(record)} // Mở modal khi bấm vào bút
                        />
                    </Tooltip>

                    {/* Nút gọi video */}
                    <Tooltip title="Gọi video">
                        <BsCameraVideoFill
                        style={{
                            color: "#1890ff",
                            cursor: "pointer",
                            fontSize: 18,
                        }}
                        onClick={() => {
                            const videoCallUrl = `http://localhost:3003/video-call?appointmentId=${record.maLich}&patientId=${record.maBenhNhan}&doctorId=${record.maBacSi}&currentUserID=${user?.maBacSi}&currentRole=${user?.tenVaiTro}`;
                            window.open(videoCallUrl, "_blank"); // Mở ở tab mới
                        }}
                        />
                    </Tooltip>

                    {/* Nút nhắn tin */}
                    <Tooltip title="Nhắn tin">
                        <IoChatbubbleEllipsesSharp
                        style={{
                            color: "#52c41a",
                            cursor: "pointer",
                            fontSize: 18,
                        }}
                        onClick={() => {
                            const chatUrl = `http://localhost:3003/chat?appointmentId=${record.maLich}&patientId=${record.maBenhNhan}&doctorId=${record.maBacSi}&currentUserID=${user?.maBacSi}&currentRole=${user?.tenVaiTro}`;
                            window.open(chatUrl, "_blank"); // Mở ở tab mới
                        }}
                        />
                    </Tooltip>
                </div>
            )
        }
    ];

    return (
        <>
            <Row gutter={[20, 25]}>
                <Col xs={6}>
                    <Select
                        value={selectedStatus}
                        onChange={handleStatusFilter}
                        style={{ width: "100%" }}
                        options={[
                            { value: "tatca", label: "Tất cả" },
                            { value: "chokham", label: "Chờ khám" },
                            { value: "dakham", label: "Đã khám" },
                            { value: "dahuy", label: "Đã hủy" },
                        ]}
                    />
                </Col>

                <Col xs={18}>
                    <SearchComponent
                        onSearch={handleSearch}
                        placeholder="Tìm bệnh nhân theo tên, email hoặc số điện thoại"
                    />
                </Col>

                <Col xs={24}>
                <Table
                    columns={columns}
                    dataSource={dataOrder}
                    rowKey="_id"
                    pagination={{
                        current,
                        pageSize,
                        total,
                        showSizeChanger: true,
                        pageSizeOptions: ['3', '5', '10'],
                        // showTotal: (total, range) => `${range[0]}-${range[1]} trong tổng ${total} lịch khám`,
                        onChange: (page, size) => {
                        setCurrent(page);
                        setPageSize(size);
                        },
                        onShowSizeChange: (currentPage, newSize) => {
                        setCurrent(1); // reset về trang đầu khi đổi pageSize
                        setPageSize(newSize);
                        },
                    }}
                    loading={loadingOrder}
                    locale={{
                        emptyText: dataOrder.length === 0 ? 'Không có lịch khám' : 'Không có dữ liệu'
                    }}
                    />


                </Col>
            </Row>

            <ViewLichHen openViewDH={openViewDH} dataViewDH={dataViewDH} setOpenViewDH={setOpenViewDH} />
            <ModalTaoPhieuKham editingRecord={editingRecord} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    );
};

export default QuanLyLichHen;
