// HoSoBenhNhan.js
import { Col, Row, Space, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { findAllLichKhamByBacSi } from "../../../services/doctorAPI";
import ModalHoSoBenhNhan from "./ModalHoSoBenhNhan";
import SearchComponent from "../Search/SearchComponent";

const HoSoBenhNhan = () => {
    const [openView, setOpenView] = useState(false);
    const [dataView, setDataView] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const user = useSelector(state => state.accountDoctor.user);

    const findAllOrder = async () => {
        if (!user?.maBacSi) return;
        setLoadingOrder(true);
        try {
            const res = await findAllLichKhamByBacSi(user.maBacSi);
            if (Array.isArray(res) && res.length > 0) {
                const filteredData = res.filter(item => item.trangThai === "Đã khám");
                const groupedData = filteredData.reduce((acc, item) => {
                    const { maBenhNhan } = item;
                    if (!acc[maBenhNhan]) {
                        acc[maBenhNhan] = {
                            ...item,
                            soLanDaKham: 1,
                            lichKham: [item],
                        };
                    } else {
                        acc[maBenhNhan].soLanDaKham++;
                        acc[maBenhNhan].lichKham.push(item);
                    }
                    return acc;
                }, {});
                setDataOrder(Object.values(groupedData));
                setTotal(Object.values(groupedData).length);
                setOriginalData(Object.values(groupedData));
            } else {
                setDataOrder([]);
                setTotal(0);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setDataOrder([]);
            setTotal(0);
        }
        setLoadingOrder(false);
    };

    useEffect(() => {
        findAllOrder();
    }, [user]);

    const handleViewDetails = (record) => {
        setDataView(record.lichKham);
        setOpenView(true);
    };

    const handleSearch = (value) => {
        const filtered = originalData.filter(item =>
            item.hoTen.toLowerCase().includes(value.toLowerCase()) ||
            item.email.toLowerCase().includes(value.toLowerCase()) ||
            item.soDienThoai.includes(value)
        );
        setDataOrder(filtered);
        setTotal(filtered.length);
        setCurrent(1); // reset về trang đầu nếu cần
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            render: (_, __, index) => (
                <span>{index + 1 + (current - 1) * pageSize}</span>
            ),
            width: 100,
        },
        {
            title: "Bệnh nhân",
            dataIndex: "hoTen",
            render: (_, record) => (
                <div>
                    <span style={{ fontWeight: "bold" }}>{record.hoTen}</span> <br />
                    <span>Email: {record.email}</span> <br />
                    <span>Số điện thoại: {record.soDienThoai}</span> <br />
                    <span>Địa chỉ: {record.diaChi}</span>
                </div>
            ),
        },
        {
            title: "Số lần đã khám",
            dataIndex: "soLanDaKham",
            render: (_, record) => (
                <span style={{ fontWeight: "bold" }}>{record.soLanDaKham} lần</span>
            ),
            width: 200,
        },
        {
            title: "Chức năng",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Xem chi tiết lịch khám" color="green">
                        <FaEye
                            size={23}
                            style={{ color: "green", cursor: "pointer", fontSize: "18px" }}
                            onClick={() => handleViewDetails(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Row gutter={[20, 10]}>
          <Col xs={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '800px', maxWidth: '100%' }}>
                <SearchComponent
                onSearch={handleSearch}
                style={{
                    width: '100%',
                    height: '38px',
                    marginBottom: '20px'
                }}
                placeholder="Tìm bệnh nhân theo tên, email hoặc số điện thoại"
                />
            </div>
            </Col>
            <Col xs={24} sm={12} md={24}>
                <Table
                    pagination={{ current, pageSize, total }}
                    loading={loadingOrder}
                    columns={columns}
                    dataSource={dataOrder}
                    rowKey={(record) => record.maBenhNhan}
                />
            </Col>
            <ModalHoSoBenhNhan
                openView={openView}
                setOpenView={setOpenView}
                dataView={dataView}
                setDataView={setDataView}
            />
        </Row>
    );
};

export default HoSoBenhNhan;
