import React, { useEffect, useState } from "react";
import {
  Card, Table, Tag, Modal, Row, Col, Input, Tooltip,
  Space, Button, notification
} from "antd";
import { FaEye } from "react-icons/fa";
import { fetchAllBenhNhan } from "../../../services/apiDoctor";
import PatientViewModal from "./XemBenhNhan";
const { Search } = Input;

const QuanLyBenhNhan = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [current, pageSize, searchValue]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchAllBenhNhan({
        page: current,
        pageSize,
        keyword: searchValue
      });
      setData(response?.data || []);
      setTotal(response?.total || 0);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bệnh nhân:", error);
      notification.error({
        message: "Không thể tải danh sách bệnh nhân"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    setCurrent(1); // reset về trang 1 khi tìm kiếm
  };

  const handleView = (record) => {
    setSelectedPatientId(record.maBenhNhan);
    setIsModalViewOpen(true);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (_, __, index) => (current - 1) * pageSize + index + 1,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      render: (text) =>
        text ? new Date(text).toLocaleDateString("vi-VN") : "",
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      render: (value) => {
        if (value === "0") return "Nam";
        if (value === "1") return "Nữ";
        return "Khác";
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
    },
    {
      title: "Chức năng",
       align: "center",
      render: (_, record) => (
        <Tooltip title="Xem chi tiết">
          <FaEye
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => handleView(record)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Card
      title="Danh sách bệnh nhân"
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.maBenhNhan}
        pagination={{
          current,
          pageSize,
          total,
          showSizeChanger: true,
          onChange: (page, size) => {
            setCurrent(page);
            setPageSize(size);
          },
        }}
        loading={loading}
      />

      {/* Modal hiển thị chi tiết bệnh nhân */}
      <PatientViewModal
        open={isModalViewOpen}
        onCancel={() => setIsModalViewOpen(false)}
        patientId={selectedPatientId}
      />

    </Card>
  );
};

export default QuanLyBenhNhan;
