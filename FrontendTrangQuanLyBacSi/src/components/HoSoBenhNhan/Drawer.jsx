import React from 'react';
import { Divider, Drawer } from 'antd';

const DrawerBN = ({ openView, setOpenView, dataView, setDataView }) => {
    const onClose = () => {
        setOpenView(false);
        setDataView([]);
    };

    // dataView đã là mảng danh sách lịch khám
    const dataArray = Array.isArray(dataView) ? dataView : [];

    return (
        <Drawer
            title={dataArray.length > 0 ? `Chi tiết lịch khám của ${dataArray[0]?.hoTen}` : "Không có dữ liệu"}
            placement={'left'}
            closable={true}
            onClose={onClose}
            open={openView}
            width={500}
        >
            {dataArray.length > 0 ? (
                <ul>
                    {dataArray.map((item, index) => (
                        <li key={index} style={{ lineHeight: "30px", marginBottom: "15px" }}>
                            <strong>Ngày khám:</strong> {item.ngayKham} <br/>
                            <strong>Giờ khám:</strong> {item.khungGio} <br/>
                            <strong>Giá khám:</strong> {item.giaKham} <br/>
                            <strong>Lý do khám:</strong> {item.lyDoKham || 'Không có'} <br/>
                            <strong>Trạng thái:</strong> {item.trangThai} <br/>
                            <strong>Trạng thái thanh toán:</strong> {item.trangThaiThanhToan} <br/>
                            <strong>Bệnh án:</strong> &nbsp;
                            <span style={{ whiteSpace: "pre-wrap", maxWidth: "500px" }}>
                                <div className="truncate" dangerouslySetInnerHTML={{ __html: item.benhAn || 'Chưa có bệnh án' }} />
                            </span>
                            {index !== dataArray.length - 1 && <Divider />}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có lịch khám nào.</p>
            )}
        </Drawer>
    );
};

export default DrawerBN;
