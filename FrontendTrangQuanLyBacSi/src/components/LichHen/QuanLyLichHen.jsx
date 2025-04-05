import { Col, Divider, Form, Input, message, Modal, notification, Row, Select, Space, Switch, Table, Tag, Tooltip } from "antd"
import { useEffect, useRef, useState } from "react"
import moment from 'moment-timezone';
import { ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { findAllLichKhamByBacSi } from "../../services/doctorAPI";
import ViewLichHen from "./ViewLichHen";
import React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { updateThongTinlichKham } from "../../services/apiDoctor";
import './custom.css'
import SearchComponent from "../Search/SearchComponent";
import ModalEdit from "./ModalEdit";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { IoMdCloseCircle } from "react-icons/io";
import ModalTaoPhieuKham from "../PhieuKhamBenh/ModalTaoPhieuKham";

const QuanLyLichHen = () => {
    const [originalData, setOriginalData] = useState([]); // Dữ liệu gốc
    const [dataOrder, setDataOrder] = useState([]); // Dữ liệu hiển thị
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
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

    // Lấy dữ liệu lịch khám
    const fetchOrders = async () => {
        if (!user?.maBacSi) return;
        setLoadingOrder(true);
    
        let query = `page=${current}&limit=${pageSize}&idDoctor=${encodeURIComponent(user.maBacSi)}`;
        if (searchValue) query += `&search=${encodeURIComponent(searchValue)}`;
        if (selectedStatus !== "tatca") query += `&trangThai=${encodeURIComponent(selectedStatus)}`;
    
        try {
            const res = await findAllLichKhamByBacSi(user.maBacSi); // API call
            if (res && Array.isArray(res)) {
                setDataOrder(res);
                setOriginalData(res);
                setTotal(res.length);
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi tải dữ liệu',
                description: 'Không thể tải lịch khám từ hệ thống.'
            });
        }
        console.log("Lịch khám", dataOrder);
        console.log("Dữ liệu gốc", originalData);
        setLoadingOrder(false);
    };

    console.log("Lịch khám", dataOrder);
    

    useEffect(() => {
        fetchOrders();
    }, [user, current, pageSize, searchValue, selectedStatus]);

    // Xử lý tìm kiếm và lọc theo trạng thái
    const handleSearch = (value) => {
        const lowerCaseValue = value.toLowerCase();

        // Lọc theo tên, email, số điện thoại và trạng thái
        let filtered = originalData.filter(item => {
            const matchesSearchValue = 
                item.hoTen.toLowerCase().includes(lowerCaseValue) ||
                item.email.toLowerCase().includes(lowerCaseValue) ||
                item.soDienThoai.includes(lowerCaseValue);

            const matchesStatus = selectedStatus === "tatca" || item.trangThai === selectedStatus;

            return matchesSearchValue && matchesStatus;
        });

        // Kiểm tra nếu không có dữ liệu
        if (filtered.length === 0) {
            setDataOrder([]);  // Hiển thị không có dữ liệu
            setTotal(0);  // Tổng số = 0
        } else {
            setDataOrder(filtered);  // Cập nhật dữ liệu đã lọc
            setTotal(filtered.length);  // Cập nhật tổng số kết quả
        }

        setCurrent(1); // Reset về trang đầu khi tìm kiếm lại
    };

    // Lọc theo trạng thái
    const handleStatusFilter = (value) => {
        setSelectedStatus(value);
        handleSearch(searchValue);  // Lọc lại với trạng thái mới và giá trị tìm kiếm hiện tại
    };

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
        { title: "STT", dataIndex: "stt", render: (_, __, index) => index + 1, width: 50 },
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
                <div>
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
                        pagination={{ current, pageSize, total, showSizeChanger: true }}
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
