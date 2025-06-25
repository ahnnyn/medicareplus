import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Modal,
  Table,
  Tag,
  Select,
  Row,
  Col,
  Input,
  Tooltip,
  Space,
  message,
  Button,
  notification,
} from "antd";
import {
  fetchAllVaiTro,
  createVaiTro,
  updateVaiTro,
  deleteVaiTro,
} from "services/admin/admin.services";
import { RiEdit2Fill, RiDeleteBin5Line } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { PlusOutlined } from "@ant-design/icons";

const QuanLyVaiTro = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const [form] = Form.useForm();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

const loadRoles = async () => {
  setLoading(true);
  try {
    const res = await fetchAllVaiTro({ page: current, pageSize });
    if (res?.data) {
      // Sắp xếp roles sao cho 'Ẩn' xuống dưới cùng
      const sortedRoles = res.data.sort((a, b) => {
        if (a.trangThai === "Ẩn" && b.trangThai !== "Ẩn") return 1;
        if (a.trangThai !== "Ẩn" && b.trangThai === "Ẩn") return -1;
        return 0; // giữ nguyên thứ tự nếu cùng trạng thái
      });

      setRoles(sortedRoles);
      setTotal(res.total || 0);
    } else {
      setRoles([]);
      setTotal(0);
    }
  } catch (error) {
    message.error("Lấy danh sách vai trò thất bại");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadRoles();
  }, [current, pageSize]);

  const openModal = (role = null) => {
    setEditingRole(role);
    if (role) {
      form.setFieldsValue({
        tenVaiTro: role.tenVaiTro,
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    form.resetFields();
    setIsModalVisible(false);
    setEditingRole(null);
  };

  const onFinish = async (values) => {
  try {
    const tenMoi = values.tenVaiTro.trim().toLowerCase();
    const existed = roles.some(
      (r) =>
        r.tenVaiTro.trim().toLowerCase() === tenMoi &&
        (!editingRole || r.maVaiTro !== editingRole.maVaiTro)
    );

    if (existed) {
      message.error("Tên vai trò đã tồn tại!");
      return;
    }

    if (editingRole) {
      await updateVaiTro(editingRole.maVaiTro, values.tenVaiTro);
      message.success("Cập nhật vai trò thành công");
    } else {
      await createVaiTro(values.tenVaiTro);
      message.success("Thêm vai trò thành công");
    }

    closeModal();
    loadRoles();
  } catch (error) {
    message.error("Lỗi khi lưu vai trò");
  }
};


  const confirmDeleteRole = (role) => {
    setSelectedRole(role);
    setDeleteModalVisible(true);
  };

const handleDelete = async () => {
  try {
    const res = await deleteVaiTro(selectedRole.maVaiTro);
console.log("selectedRole:", selectedRole);
    if (res?.success) {
      notification.success({
        message: res.message || "Xóa vai trò thành công",
      });
      loadRoles();
    } else {
      notification.error({
        message: res.message || "Xóa vai trò thất bại",
      });
    }
  } catch (error) {
    notification.error({
      message: "Lỗi xóa vai trò",
    });
  } finally {
    setDeleteModalVisible(false);
  }
};


  const columns = [
    {
      title: "STT",
      render: (_, __, index) => (current - 1) * pageSize + index + 1,
      width: 70,
    },
    {
      title: "Tên vai trò",
      dataIndex: "tenVaiTro",
      key: "tenVaiTro",
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
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <span style={{ cursor: "pointer" }} onClick={() => openModal(record)}>
              <RiEdit2Fill />
            </span>
          </Tooltip>

          <Tooltip title="Xóa vai trò">
            <span
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => confirmDeleteRole(record)}
            >
              <AiFillDelete />
            </span>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Danh sách vai trò"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Thêm vai trò
        </Button>
      }
    >

      <Table
        dataSource={roles}
        columns={columns}
        loading={loading}
        rowKey="maVaiTro"
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
      />

      {/* Modal tạo/cập nhật vai trò */}
      <Modal
        title={editingRole ? "Cập nhật vai trò" : "Thêm vai trò"}
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item
            name="tenVaiTro"
            label="Tên vai trò"
           rules={[
            { required: true, message: "Vui lòng nhập tên vai trò!" },
            { pattern: /^[A-Za-zÀ-ỹ\s]+$/, message: "Không được nhập số!" },
          ]}
          >
            <Input 
              placeholder="Nhập tên vai trò"
              style={{
              border: "1px solid #d9d9d9",       // Viền mặc định
              borderRadius: 4,
              color: "#7d7a7a",                      // Màu chữ gõ vào
            }}
            />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 24 }}>
            <Button onClick={closeModal}>Hủy</Button>
            <Button type="primary" onClick={() => form.submit()}>
              Lưu
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        open={deleteModalVisible}
        title="Xóa vai trò"
        onCancel={() => setDeleteModalVisible(false)}
        footer={null}
        centered
      >
        <p>Bạn có chắc chắn muốn xóa vai trò này không?</p>
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

export default QuanLyVaiTro;
