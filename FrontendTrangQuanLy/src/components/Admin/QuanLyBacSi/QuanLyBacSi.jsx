import React, { useEffect, useState } from "react";
import { Card, Table, Tag, Select, Modal, Row, Col, Input, Tooltip, Space, Popconfirm, message, Button, notification } from "antd";
import { FaEye } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { PlusOutlined, FileExcelOutlined } from "@ant-design/icons";
import { fetchAllDoctor, deleteBacSi } from "../../../services/apiDoctor";
import UpdateDoctorModal from "./editBacSi";
import CreateDoctor from "./ThemBacSi";

const { Option } = Select;
const { Search } = Input;

const QuanLyBacSi = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, [current, pageSize, searchValue]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchAllDoctor({ page: current, pageSize, keyword: searchValue });
      let doctors = response?.data || [];

      // Sắp xếp để bác sĩ có trạng thái "Ẩn" xuống dưới cùng
      doctors.sort((a, b) => {
        if (a.trangThai === "Ẩn" && b.trangThai !== "Ẩn") return 1;
        if (a.trangThai !== "Ẩn" && b.trangThai === "Ẩn") return -1;
        return 0;
      });

      setData(doctors);
      setTotal(response?.total || 0);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bác sĩ:", error);
    } finally {
      setLoading(false);
    }
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
      title: "Chuyên khoa",
      dataIndex: "tenKhoa",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (text) => (
        <Tag color={text === "Đang hoạt động" ? "green" : "red"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Chức năng",
       align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <RiEdit2Fill style={{ cursor: "pointer" }} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Xóa bác sĩ">
            <span
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => confirmDeleteDoctor(record)}
            >
              <AiFillDelete />
            </span>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedDoctorId(record.maBacSi); // Key chính là maBacSi
    setIsModalViewOpen(true);
  };

  const confirmDeleteDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedDoctor) return;
    try {
      const res = await deleteBacSi(selectedDoctor.maBacSi);
      if (res?.success) {
        notification.success({
          message: res.message || "Xóa bác sĩ thành công",
        });
        fetchData(); // Load lại danh sách sau khi xóa
      } else {
        notification.error({
          message: res.message || "Xóa bác sĩ thất bại",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi xóa bác sĩ",
      });
    } finally {
      setDeleteModalVisible(false);
      setSelectedDoctor(null);
    }
  };

  return (
<Card
  title={<div style={{ textAlign: "left", width: "100%" }}>Danh sách bác sĩ</div>}
  extra={
    <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
      Thêm bác sĩ
    </Button>
  }
>

    <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.maBacSi} // Dùng maBacSi làm key chính
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

      <UpdateDoctorModal
        open={isModalViewOpen}
        onCancel={() => setIsModalViewOpen(false)}
        doctorId={selectedDoctorId}
        onUpdateSuccess={() => {
          setIsModalViewOpen(false);
          fetchData();
        }}
      />

      <CreateDoctor
        openCreateDoctor={isAddModalOpen}          
        setOpenCreateDoctor={setIsAddModalOpen}    
        fetchListDoctor={fetchData}
      />

      {/* Modal xác nhận xóa */}
      <Modal
        open={deleteModalVisible}
        title="Xóa bác sĩ"
        onCancel={() => setDeleteModalVisible(false)}
        footer={null}
        centered
      >
        <p>Bạn có chắc chắn muốn xóa bác sĩ này không?</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button onClick={() => setDeleteModalVisible(false)}>Không</Button>
          <Button type="primary" onClick={handleDelete}>
            Có
          </Button>
        </div>
      </Modal>

    </Card>
  );
};

export default QuanLyBacSi;
