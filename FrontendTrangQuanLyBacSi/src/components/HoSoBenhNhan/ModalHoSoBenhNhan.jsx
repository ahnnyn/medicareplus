import React from 'react';
import { Divider, Modal, Tag } from 'antd';

const ModalHoSoBenhNhan = ({ openView, setOpenView, dataView, setDataView }) => {
    const onClose = () => {
        setOpenView(false);
        setDataView([]);
    };

    const dataArray = Array.isArray(dataView) ? dataView : [];

    const renderTrangThai = (trangThai) => {
        switch (trangThai) {
            case "Đã khám":
                return <Tag color="green">Đã khám</Tag>;
            case "Đang chờ":
                return <Tag color="orange">Đang chờ</Tag>;
            default:
                return <Tag>{trangThai}</Tag>;
        }
    };

    const renderTrangThaiTT = (tt) => {
        return tt === "Đã thanh toán"
            ? <Tag color="blue">Đã thanh toán</Tag>
            : <Tag color="red">Chưa thanh toán</Tag>;
    };

    return (
        <Modal
            title={
                dataArray.length > 0 ? (
                    <div style={{ textAlign: "center" }}>
                        📝 Hồ sơ bệnh nhân: <strong>{dataArray[0]?.hoTen}</strong>
                    </div>
                ) : "Không có dữ liệu"
            }
            open={openView}
            onCancel={onClose}
            footer={null}
            width={650}
            centered
        >
            {dataArray.length > 0 ? (
                <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                    {dataArray.map((item, index) => (
                        <li key={index} style={{ marginBottom: 20 }}>
                            <div style={{
                                border: "1px solid #e0e0e0",
                                borderRadius: 8,
                                padding: 16,
                                backgroundColor: "#fff",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                            }}>
                                <p style={{ marginBottom: 6 }}><strong>Ngày khám:</strong> {item.ngayKham}</p>
                                <p style={{ marginBottom: 6 }}><strong>Giờ khám:</strong> {item.khungGio}</p>
                                <p style={{ marginBottom: 6 }}><strong>Giá khám:</strong> {item.giaKham?.toLocaleString()} VNĐ</p>
                                <p style={{ marginBottom: 6 }}><strong>Lý do khám:</strong> {item.lyDoKham || 'Không có'}</p>
                                <p style={{ marginBottom: 6 }}><strong>Trạng thái:</strong> {renderTrangThai(item.trangThai)}</p>
                                <p style={{ marginBottom: 6 }}><strong>Trạng thái thanh toán:</strong> {renderTrangThaiTT(item.trangThaiThanhToan)}</p>
                                <p style={{ marginBottom: 6 }}>
                                    <strong>Bệnh án:</strong><br />
                                    <div style={{ background: "#f9f9f9", padding: 10, borderRadius: 5 }}>
                                        <div dangerouslySetInnerHTML={{ __html: item.benhAn || 'Chưa có bệnh án' }} />
                                    </div>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có lịch khám nào.</p>
            )}
        </Modal>
    );
};

export default ModalHoSoBenhNhan;
