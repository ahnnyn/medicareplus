import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Descriptions, Drawer, message, Modal } from "antd";
import moment from "moment-timezone";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FaFileExport } from "react-icons/fa";
import { useSelector } from "react-redux";


const ViewLichHen = ({ openViewDH, dataViewDH, setOpenViewDH, setDataViewDH }) => {
    const cancel = () => {
        setOpenViewDH(false);
        setDataViewDH(null);
    };

    const user = useSelector(state => state.accountDoctor.user);

    const items = [
        {
            key: "hinhAnh",
            label: "Hình ảnh",
            children: (
                <Avatar
                    src={`${import.meta.env.VITE_BACKEND_URL}/public/benhnhan/${dataViewDH?.hinhAnh || "default-avatar.png"}`}
                    shape="square"
                    size={100}
                    icon={<UserOutlined />}
                />
            ),
        },
        {
            key: "hoTen",
            label: "Họ và tên bệnh nhân",
            children: (
                <span>
                    {dataViewDH?.hoTen || "N/A"} <br /> (
                    {dataViewDH?.dataOrder
                        ? moment(dataViewDH.dataOrder).tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY")
                        : "N/A"}
                    )
                </span>
            ),
            span: 3,
        },
        {
            key: "soDienThoai",
            label: "Số điện thoại",
            children: dataViewDH?.soDienThoai || "N/A",
            span: 1,
        },
        {
            key: "diaChi",
            label: "Địa chỉ",
            children: dataViewDH?.diaChi || "N/A",
            span: 2,
        },
        {
            key: "ngayKham",
            label: "Ngày khám",
            children: dataViewDH?.ngayKham || "N/A",
            span: 1,
        },
        {
            key: "giaKham",
            label: "Chi phí khám bệnh",
            children: (
                <span style={{ color: "red" }}>
                    {dataViewDH?.giaKham ? Math.ceil(dataViewDH.giaKham).toLocaleString() : 0} VNĐ
                </span>
            ),
            span: 2,
        },
        {
            key: "lyDoKham",
            label: "Lý do khám",
            children: <Badge status="processing" text={dataViewDH?.lyDoKham || "N/A"} />,
            span: 3,
        },
        {
            key: "hoTenBacSi",
            label: "Bác sĩ khám",
            children: user.hoTen || "Chưa xác định",
            span: 1.5,
        },
        {
            key: "khungGio",
            label: "Thời gian khám",
            children: dataViewDH?.khungGio || "N/A",
            span: 1.5,
        },
    ];

    const exportToPDF = () => {
        const drawerContent = document.getElementById("drawer-content");

        if (!drawerContent) {
            message.error("Không tìm thấy nội dung để xuất PDF!");
            return;
        }

        html2canvas(drawerContent, {
            scale: 2, // Tăng độ phân giải ảnh
            useCORS: true,
            allowTaint: true,
        })
            .then((canvas) => {
                const pdf = new jsPDF("p", "mm", "a4");

                const imgData = canvas.toDataURL("image/png");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const imgHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, imgHeight);
                pdf.save(`LichHen-${dataViewDH?.hoTen || "BenhNhan"}.pdf`);
            })
            .catch((error) => {
                console.error("Lỗi khi xuất PDF:", error);
                message.error("Xuất PDF thất bại!");
            });
    };

    return (
        <Modal
            title={
                <p style={{textAlign: "center", color: "navy", fontWeight: "bold", fontSize: "18px"}}>
                    CHI TIẾT LỊCH HẸN CỦA BỆNH NHÂN:{" "}
                    <span style={{ color: "navy", fontWeight: "bold" }}>
                        {dataViewDH?.hoTen || "N/A"}
                    </span>
                </p>
            }
            open={openViewDH}
            onCancel={cancel}           // ✅ sửa từ onClose => onCancel
            footer={null}               // ✅ không hiển thị nút footer mặc định
            width={850}
            destroyOnClose
        >
            <div style={{ textAlign: "center", marginBottom: 10 }}>
                <Button icon={<FaFileExport />} onClick={exportToPDF} size="large" style={{width:"200px"}}>
                    Xuất PDF
                </Button>
            </div>
            <div id="drawer-content">
                <Descriptions bordered items={items} />
            </div>
        </Modal>

    );
};

export default ViewLichHen;
