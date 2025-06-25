-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 26, 2025 lúc 06:38 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `medicaredb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bacsi`
--

CREATE TABLE `bacsi` (
  `maBacSi` int(11) UNSIGNED NOT NULL,
  `hoTen` varchar(100) NOT NULL,
  `gioiTinh` tinyint(1) NOT NULL,
  `ngaySinh` date NOT NULL,
  `soDienThoai` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `diaChi` varchar(200) DEFAULT NULL,
  `giaKham` decimal(10,2) NOT NULL,
  `hinhAnh` varchar(255) DEFAULT NULL,
  `moTa` text DEFAULT NULL,
  `maKhoa` int(11) UNSIGNED NOT NULL,
  `maTaiKhoan` int(11) UNSIGNED NOT NULL,
  `trangThai` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bacsi`
--

INSERT INTO `bacsi` (`maBacSi`, `hoTen`, `gioiTinh`, `ngaySinh`, `soDienThoai`, `email`, `diaChi`, `giaKham`, `hinhAnh`, `moTa`, `maKhoa`, `maTaiKhoan`, `trangThai`) VALUES
(1, 'Nguyễn Văn Thành An', 0, '1980-05-15', '0355615214', 'an.nguyenvanthanh@gmail.com', 'Gò Vấp, Thành phố Hồ Chí Minh', 100000.00, 'bac-si-an.png', '<p>Bác sĩ chuyên khoa I. Chuyên khoa Thần kinh. Với hơn 15 năm kinh nghiệm</p>', 1, 1, 'Đang hoạt động'),
(2, 'Trần Thị Bé', 1, '1985-09-22', '0987654321', 'be.tranthibe@gmail.com', 'HCM', 200000.00, 'nguyen-thi-bach-yen-avt-1.png', '<p>Bác sĩ chuyên khoa I</p>', 2, 2, 'Đang hoạt động'),
(3, 'Phạm Văn Cần', 0, '1978-12-10', '0977123456', 'can.phamvancan@gmail.com', 'HCM', 200000.00, 'bac-pham-nguyen-vinh.png', '<p>Bác sĩ chuyên khoa I</p>', 3, 3, 'Đang hoạt động'),
(4, 'Lê Thị Dung', 1, '1990-07-19', '0934567890', 'dung.lethidung@gmail.com', 'HCM', 200000.00, 'dang-hong-hoa-avt.png', '<p>Bác sĩ chuyên khoa I</p>', 4, 4, 'Đang hoạt động'),
(5, 'Hoàng Văn Sang', 0, '1982-03-25', '0965123789', 'sang.hoangvansang@gmail.com', 'HCM', 200000.00, 'avt-bac-si-giao-su-ngo-quy-chau.png', '<p>Bác sĩ chuyên khoa I</p>', 5, 5, 'Đang hoạt động'),
(6, 'Nguyễn Văn An', 0, '1980-05-15', '0901234567', 'an.nguyenvanan@gmail.com', 'HCM', 200000.00, 'bac-si-truong-tan-phat.png', '<p>Bác sĩ chuyên khoa I</p>', 1, 6, 'Đang hoạt động'),
(7, 'Trần Thị Bình', 1, '1985-08-20', '0912345678', 'binh.tranthibinh@gmail.com', 'HCM', 200000.00, 'bs-nguyen-ba-my-nhi.png', '<p>Bác sĩ chuyên khoa I</p>', 2, 7, 'Đang hoạt động'),
(8, 'Lê Hoàng Cường', 0, '1990-03-10', '0923456789', 'cuong.lehoangcuong@gmail.com', 'HCM', 200000.00, 'bs-le-minh-ky.png', '<p>Bác sĩ chuyên khoa I</p>', 3, 8, 'Đang hoạt động'),
(9, 'Phạm Thu Duyên', 1, '1982-11-25', '0934567890', 'duyen.phamthuduyen@gmail.com', 'HCM', 200000.00, 'bs-tran-phan-chung-thuy.png', '<p>Bác sĩ chuyên khoa I</p>', 4, 9, 'Đang hoạt động'),
(10, 'Võ Minh Đức', 0, '1978-07-01', '0945678901', 'duc.vominhduc@gmail.com', 'HCM', 200000.00, 'bs-vu-truong-khanh.png', '<p>Bác sĩ chuyên khoa I</p>', 5, 10, 'Đang hoạt động'),
(11, 'Hoàng Thị Em', 1, '1995-02-18', '0956789012', 'em.hoangthiem@gmail.com', 'HCM', 200000.00, 'dang-hong-hoa-avt.png', '<p>Bác sĩ chuyên khoa I</p>', 6, 11, 'Đang hoạt động'),
(12, 'Đặng Văn Giang', 0, '1988-09-05', '0967890123', 'giang.dangvangiang@gmail.com', 'HCM', 200000.00, 'nguyen-duc-anh-avt.png', '<p>Bác sĩ chuyên khoa I</p>', 7, 12, 'Đang hoạt động'),
(13, 'Bùi Thị Hà', 1, '1983-12-12', '0978901234', 'ha.buithiha@gmail.com', 'HCM', 200000.00, 'bac-si-chu-thi-hanh.png', '<p>Bác sĩ chuyên khoa I</p>', 8, 13, 'Đang hoạt động'),
(14, 'Cao Xuân Khánh', 0, '1992-06-30', '0989012345', 'khanh.caoxuankhanh@gmail.com', 'HCM', 200000.00, 'nguyen-van-lieu-avt.png', '<p>Bác sĩ chuyên khoa I</p>', 9, 14, 'Đang hoạt động'),
(15, 'Đỗ Thị Lan', 1, '1979-04-22', '0990123456', 'lan.dothilan@gmail.com', 'HCM', 200000.00, 'bs-tran-phan-chung-thuy.png', '<p>Bác sĩ chuyên khoa I</p>', 10, 15, 'Đang hoạt động'),
(16, 'Huỳnh Văn Mạnh', 0, '1987-01-08', '0123456789', 'manh.huynhvanmanh@gmail.com', 'HCM', 200000.00, 'vu-huy-tru.png', '<p>Bác sĩ chuyên khoa I</p>', 11, 16, 'Đang hoạt động'),
(17, 'Kiều Thị Nga', 1, '1993-10-17', '0234567890', 'nga.kieuthinga@gmail.com', 'HCM', 200000.00, 'dang-hong-hoa-avt.png', '<p>Bác sĩ chuyên khoa I</p>', 12, 17, 'Đang hoạt động'),
(18, 'Lâm Thanh Phong', 0, '1981-03-28', '0345678901', 'phong.lamthanhphong@gmail.com', 'HCM', 200000.00, 'nguyen-van-lieu-avt.png', '<p>Bác sĩ chuyên khoa I</p>', 13, 18, 'Đang hoạt động'),
(19, 'Mai Thị Quỳnh', 1, '1996-07-12', '0456789012', 'quynh.maithiquynh@gmail.com', 'HCM', 200000.00, 'bs-tran-thi-thuy-hang.png', '<p>Bác sĩ chuyên khoa I</p>', 14, 19, 'Đang hoạt động'),
(20, 'Ngô Văn Sơn', 0, '1984-11-03', '0567890123', 'ngovanson1205@gmail.com', 'HCM', 150000.00, 'bac-si-nguyen-duc-hinh-avt.png', '<p>Bác sĩ chuyên khoa I</p>', 15, 20, 'Đang hoạt động');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `benhnhan`
--

CREATE TABLE `benhnhan` (
  `maBenhNhan` int(11) UNSIGNED NOT NULL,
  `hoTen` varchar(100) NOT NULL,
  `gioiTinh` tinyint(1) NOT NULL,
  `ngaySinh` date NOT NULL,
  `soDienThoai` varchar(15) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `diaChi` text DEFAULT NULL,
  `hinhAnh` varchar(255) DEFAULT NULL,
  `maTaiKhoan` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `benhnhan`
--

INSERT INTO `benhnhan` (`maBenhNhan`, `hoTen`, `gioiTinh`, `ngaySinh`, `soDienThoai`, `email`, `diaChi`, `hinhAnh`, `maTaiKhoan`) VALUES
(1, 'Võ Minh T', 0, '1995-08-12', '0915123789', 'minht@example.com', '123 Đường ABC, TP HCM', '1744523241_ahnyn.jpg', 21),
(2, 'Nguyễn Thị H', 1, '1989-04-21', '0936789123', 'hoangh@example.com', '456 Đường XYZ, Hà Nội', NULL, 22),
(3, 'Lê Văn P', 0, '2000-06-15', '0978456123', 'phuongle@example.com', '789 Đường DEF, Đà Nẵng', NULL, 23),
(4, 'Phan Văn Tèo', 0, '1998-01-10', '0909876543', 'teo@example.com', '123 Đường A, Quận B, TP.HCM', 'teo.jpg', 24),
(5, 'Lý Thị Hoa', 1, '2000-05-20', '0918765432', 'hoa@example.com', '456 Đường C, Quận D, Hà Nội', 'hoa.jpg', 25),
(6, 'Trương Văn Dũng', 0, '1975-12-01', '0927654321', 'dung@example.com', '789 Đường E, Quận F, Đà Nẵng', 'dung.jpg', 26),
(7, 'Đinh Thị Mai', 1, '1983-08-15', '0936543210', 'mai@example.com', '101 Đường G, Quận H, Cần Thơ', 'mai.jpg', 27),
(8, 'Vương Văn Hùng', 0, '1992-03-25', '0945432109', 'hung@example.com', '112 Đường I, Quận K, Hải Phòng', 'hung.jpg', 28),
(9, 'Nguyễn Thị Lan Anh', 1, '1989-11-08', '0954321098', 'lananh@example.com', '123 Đường L, Quận M, Huế', 'lananh.jpg', 29),
(10, 'Phạm Văn Bảo', 0, '1977-06-18', '0963210987', 'bao@example.com', '134 Đường N, Quận O, Nha Trang', 'bao.jpg', 30),
(11, 'Lê Thị Cúc', 1, '2002-02-28', '0972109876', 'cuc@example.com', '145 Đường P, Quận Q, Vinh', 'cuc.jpg', 31),
(12, 'Trần Văn Đạt', 0, '1995-09-03', '0981098765', 'dat@example.com', '156 Đường R, Quận S, Biên Hòa', 'dat.jpg', 32),
(13, 'Hồ Thị Diệu', 1, '1986-04-12', '0990987654', 'dieu@example.com', '167 Đường T, Quận U, Mỹ Tho', 'dieu.jpg', 33),
(14, 'Cao Văn Đức', 0, '1973-10-22', '0129876543', 'duc2@example.com', '178 Đường V, Quận W, Long Xuyên', 'duc2.jpg', 34),
(15, 'Bùi Thị Ngọc', 1, '1999-07-05', '0238765432', 'ngoc@example.com', '189 Đường X, Quận Y, Đà Lạt', 'ngoc.jpg', 35),
(16, 'Đặng Văn Hải', 0, '1980-01-15', '0347654321', 'hai@example.com', '190 Đường Z, Quận AA, Buôn Ma Thuột', 'hai.jpg', 36),
(17, 'Kiều Thị Huyền', 1, '1987-05-25', '0456543210', 'huyen@example.com', '201 Đường BB, Quận CC, Rạch Giá', 'huyen.jpg', 37),
(18, 'Lâm Văn Kiên', 0, '2001-12-08', '0565432109', 'kien@example.com', '212 Đường DD, Quận EE, Hà Tĩnh', 'kien.jpg', 38),
(19, 'Nguyễn Ánh', 1, '2015-04-10', '0355615214', 'anhn56423@gmail.com', 'Kon Tum', '1744523241_ahnyn.jpg', 39);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `calamviec`
--

CREATE TABLE `calamviec` (
  `maCa` int(11) UNSIGNED NOT NULL,
  `tenCa` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `calamviec`
--

INSERT INTO `calamviec` (`maCa`, `tenCa`) VALUES
(1, 'Sáng'),
(2, 'Chiều'),
(3, 'Tối');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiet_donthuoc`
--

CREATE TABLE `chitiet_donthuoc` (
  `maThuoc` int(10) UNSIGNED NOT NULL,
  `maDonThuoc` int(10) UNSIGNED NOT NULL,
  `tenThuoc` varchar(255) NOT NULL,
  `lieuDung` varchar(255) NOT NULL,
  `soLanDungTrongNgay` int(11) NOT NULL,
  `soNgay` int(11) NOT NULL,
  `ghiChu` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitiet_donthuoc`
--

INSERT INTO `chitiet_donthuoc` (`maThuoc`, `maDonThuoc`, `tenThuoc`, `lieuDung`, `soLanDungTrongNgay`, `soNgay`, `ghiChu`) VALUES
(35, 27, 'Dopamine', '1 viên 1 lần', 2, 2, 'Sau khi ăn'),
(37, 26, 'Panadol', '1 viên 1 lần', 2, 5, 'Uống sau khi ăn 30 phút'),
(71, 46, 'Panadol', '1 viên 1 lần', 1, 1, 'Sau khi ăn'),
(73, 47, 'Panadol', '1 viên 1 lần', 1, 1, 'Sau khi ăn'),
(74, 47, 'Vitamin', '1 viên 1 lần', 2, 5, 'Sau khi ăn');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiet_lichlamviec`
--

CREATE TABLE `chitiet_lichlamviec` (
  `id` int(11) UNSIGNED NOT NULL,
  `lichLamViec_ID` int(11) UNSIGNED NOT NULL,
  `caLamViec_ID` int(11) UNSIGNED NOT NULL,
  `khungGio_ID` int(11) UNSIGNED NOT NULL,
  `trangThaiDatLich` enum('available','booked') NOT NULL DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitiet_lichlamviec`
--

INSERT INTO `chitiet_lichlamviec` (`id`, `lichLamViec_ID`, `caLamViec_ID`, `khungGio_ID`, `trangThaiDatLich`) VALUES
(249, 64, 1, 5, 'booked'),
(250, 64, 1, 23, 'available'),
(251, 64, 2, 31, 'available'),
(252, 64, 3, 37, 'available'),
(253, 64, 3, 38, 'available'),
(254, 65, 1, 17, 'available'),
(255, 65, 1, 19, 'available'),
(256, 66, 1, 5, 'booked'),
(257, 66, 1, 22, 'booked'),
(258, 66, 2, 29, 'available'),
(259, 66, 3, 36, 'available'),
(260, 66, 3, 37, 'available'),
(261, 67, 1, 17, 'booked'),
(262, 67, 3, 34, 'available'),
(263, 67, 2, 25, 'available'),
(264, 68, 1, 5, 'available'),
(265, 68, 1, 23, 'available'),
(266, 68, 2, 31, 'available'),
(267, 68, 3, 34, 'available'),
(268, 68, 1, 19, 'available'),
(269, 68, 3, 38, 'available'),
(270, 69, 1, 16, 'available'),
(271, 69, 1, 17, 'booked'),
(272, 69, 1, 18, 'available'),
(273, 69, 2, 24, 'available'),
(274, 69, 2, 25, 'available'),
(275, 69, 2, 26, 'available'),
(277, 70, 1, 17, 'available'),
(278, 70, 1, 18, 'available'),
(279, 70, 1, 19, 'booked'),
(280, 71, 1, 22, 'available'),
(281, 71, 1, 23, 'available'),
(282, 71, 2, 24, 'available'),
(283, 71, 2, 25, 'available'),
(284, 70, 1, 5, 'available'),
(286, 72, 1, 17, 'booked'),
(287, 72, 1, 18, 'available'),
(288, 72, 1, 19, 'available'),
(289, 73, 2, 28, 'available'),
(290, 73, 2, 29, 'available'),
(291, 73, 2, 30, 'available'),
(292, 73, 2, 31, 'available'),
(293, 72, 1, 21, 'available'),
(294, 72, 1, 5, 'available'),
(295, 73, 3, 35, 'available'),
(296, 73, 3, 36, 'available'),
(299, 74, 1, 16, 'available'),
(300, 75, 1, 23, 'available'),
(301, 75, 2, 24, 'available'),
(302, 74, 3, 32, 'available'),
(303, 74, 2, 31, 'available'),
(304, 74, 2, 30, 'available'),
(305, 74, 3, 34, 'available'),
(306, 74, 3, 35, 'available'),
(307, 76, 1, 5, 'available'),
(308, 76, 1, 16, 'available'),
(309, 77, 3, 35, 'available'),
(310, 77, 3, 36, 'available'),
(311, 78, 2, 29, 'available'),
(312, 78, 2, 30, 'available'),
(313, 79, 1, 17, 'available'),
(314, 79, 1, 18, 'available'),
(315, 80, 1, 17, 'available'),
(316, 80, 1, 18, 'available'),
(317, 81, 1, 23, 'available'),
(318, 81, 2, 24, 'available'),
(319, 82, 2, 28, 'available'),
(320, 82, 2, 29, 'booked'),
(321, 83, 1, 17, 'booked'),
(322, 83, 1, 16, 'available'),
(323, 83, 1, 18, 'available'),
(324, 83, 2, 25, 'available'),
(325, 83, 2, 24, 'available'),
(326, 78, 2, 28, 'available'),
(327, 78, 1, 22, 'available'),
(328, 78, 2, 26, 'available'),
(329, 78, 3, 32, 'available'),
(330, 78, 3, 36, 'available'),
(331, 84, 1, 16, 'available'),
(332, 84, 1, 23, 'available'),
(333, 84, 2, 28, 'booked'),
(334, 84, 2, 29, 'booked'),
(335, 79, 3, 36, 'available'),
(336, 79, 3, 37, 'available'),
(337, 85, 1, 5, 'available'),
(338, 85, 1, 16, 'available'),
(339, 85, 1, 23, 'available'),
(340, 85, 2, 24, 'available'),
(341, 85, 2, 25, 'available'),
(342, 85, 2, 31, 'available'),
(343, 85, 2, 30, 'available'),
(344, 85, 3, 37, 'available'),
(345, 85, 3, 38, 'available'),
(346, 86, 1, 22, 'available'),
(347, 86, 1, 17, 'available'),
(348, 86, 1, 18, 'available'),
(349, 86, 3, 35, 'available'),
(350, 86, 3, 34, 'available'),
(351, 86, 2, 27, 'available'),
(352, 87, 1, 5, 'available'),
(353, 87, 1, 16, 'available'),
(354, 87, 1, 21, 'available'),
(355, 87, 1, 23, 'available'),
(356, 87, 2, 29, 'available'),
(357, 87, 2, 30, 'available'),
(358, 88, 1, 18, 'available'),
(359, 88, 2, 24, 'available'),
(360, 88, 1, 19, 'available'),
(361, 88, 2, 25, 'available'),
(362, 88, 3, 35, 'available'),
(363, 88, 3, 34, 'available'),
(364, 88, 2, 27, 'available'),
(365, 89, 1, 16, 'available'),
(366, 89, 1, 22, 'available'),
(367, 89, 1, 23, 'available'),
(368, 89, 2, 24, 'available'),
(369, 89, 2, 30, 'available'),
(370, 89, 3, 36, 'available'),
(371, 90, 1, 18, 'available'),
(372, 90, 1, 17, 'available'),
(373, 90, 2, 29, 'available'),
(374, 90, 2, 28, 'available'),
(375, 90, 2, 31, 'available'),
(376, 90, 3, 37, 'available'),
(377, 90, 3, 34, 'available'),
(378, 90, 1, 19, 'available'),
(379, 90, 1, 21, 'available'),
(380, 91, 1, 5, 'available'),
(381, 91, 1, 16, 'available'),
(382, 91, 1, 23, 'available'),
(383, 91, 2, 30, 'available'),
(384, 91, 3, 37, 'available'),
(385, 92, 1, 21, 'available'),
(386, 92, 1, 22, 'available'),
(387, 92, 1, 17, 'available'),
(388, 92, 2, 29, 'available'),
(389, 93, 2, 30, 'available'),
(390, 93, 2, 25, 'available'),
(391, 93, 3, 37, 'available'),
(392, 93, 3, 35, 'available'),
(393, 94, 1, 17, 'available'),
(394, 94, 1, 22, 'available'),
(395, 94, 2, 29, 'available'),
(396, 94, 2, 30, 'available'),
(397, 94, 2, 31, 'available'),
(398, 94, 3, 37, 'available'),
(399, 94, 3, 36, 'available'),
(400, 95, 1, 22, 'available'),
(401, 95, 1, 23, 'available'),
(402, 95, 2, 24, 'available'),
(403, 95, 2, 25, 'available'),
(404, 95, 2, 30, 'available'),
(405, 95, 2, 29, 'available'),
(406, 95, 2, 28, 'available'),
(407, 96, 1, 16, 'available'),
(408, 96, 1, 17, 'available'),
(409, 96, 1, 18, 'available'),
(410, 96, 1, 19, 'available'),
(411, 96, 1, 20, 'available'),
(412, 97, 1, 22, 'available'),
(413, 97, 1, 23, 'available'),
(414, 97, 2, 24, 'available'),
(415, 97, 2, 25, 'available'),
(416, 97, 2, 26, 'available'),
(417, 98, 1, 5, 'available'),
(418, 98, 1, 16, 'available'),
(419, 98, 1, 23, 'available'),
(420, 98, 2, 24, 'available'),
(421, 98, 2, 30, 'available'),
(422, 99, 1, 22, 'available'),
(423, 99, 2, 28, 'available'),
(424, 99, 3, 35, 'available'),
(425, 100, 2, 28, 'available'),
(426, 100, 2, 29, 'available'),
(427, 100, 2, 30, 'available'),
(428, 100, 2, 24, 'available'),
(429, 101, 1, 16, 'available'),
(430, 101, 1, 17, 'available'),
(431, 101, 3, 37, 'available'),
(432, 101, 3, 38, 'available'),
(433, 101, 3, 32, 'available'),
(434, 102, 2, 28, 'available'),
(435, 102, 2, 29, 'available'),
(436, 102, 1, 23, 'available'),
(437, 102, 2, 24, 'available'),
(438, 102, 1, 19, 'available'),
(439, 103, 1, 16, 'available'),
(440, 103, 1, 17, 'available'),
(441, 103, 3, 35, 'available'),
(442, 103, 3, 36, 'available'),
(443, 103, 3, 37, 'available'),
(444, 104, 1, 22, 'available'),
(445, 104, 1, 5, 'available'),
(446, 104, 2, 29, 'available'),
(447, 104, 3, 37, 'available'),
(448, 104, 3, 36, 'available'),
(449, 105, 1, 17, 'available'),
(450, 105, 1, 18, 'available'),
(451, 105, 2, 24, 'available'),
(452, 105, 2, 25, 'available'),
(453, 105, 3, 38, 'available'),
(454, 105, 3, 34, 'available'),
(455, 105, 3, 33, 'available'),
(456, 105, 2, 27, 'available'),
(457, 106, 1, 22, 'available'),
(458, 106, 1, 23, 'available'),
(459, 106, 2, 24, 'available'),
(460, 106, 2, 25, 'available'),
(461, 106, 2, 26, 'available'),
(462, 106, 2, 31, 'available'),
(463, 106, 2, 30, 'available'),
(464, 106, 3, 36, 'available'),
(465, 107, 3, 34, 'available'),
(466, 107, 1, 17, 'available'),
(467, 107, 1, 18, 'available'),
(468, 107, 1, 20, 'available'),
(469, 107, 1, 19, 'available'),
(470, 108, 1, 5, 'available'),
(471, 108, 1, 16, 'available'),
(472, 108, 1, 17, 'available'),
(473, 108, 1, 18, 'available'),
(474, 108, 1, 19, 'available'),
(475, 109, 2, 28, 'available'),
(476, 109, 2, 29, 'available'),
(477, 109, 2, 30, 'available'),
(478, 109, 2, 31, 'available'),
(479, 109, 3, 32, 'available'),
(480, 110, 1, 5, 'available'),
(481, 110, 1, 16, 'available'),
(482, 110, 1, 17, 'available'),
(483, 111, 2, 29, 'available'),
(484, 111, 2, 30, 'available'),
(485, 111, 2, 31, 'available'),
(486, 112, 1, 5, 'available'),
(487, 112, 1, 16, 'available'),
(488, 112, 1, 22, 'available'),
(489, 112, 1, 23, 'available'),
(490, 113, 1, 22, 'available'),
(491, 113, 1, 23, 'available'),
(492, 113, 2, 24, 'available'),
(493, 113, 2, 25, 'available'),
(494, 114, 1, 16, 'available'),
(495, 114, 1, 17, 'available'),
(496, 114, 3, 35, 'available'),
(497, 114, 3, 36, 'available'),
(498, 115, 1, 5, 'available'),
(499, 115, 1, 16, 'available'),
(500, 115, 1, 23, 'available'),
(501, 115, 2, 24, 'available'),
(502, 115, 2, 31, 'available'),
(503, 115, 3, 32, 'available'),
(504, 116, 1, 22, 'available'),
(505, 116, 1, 23, 'available'),
(506, 116, 2, 24, 'available'),
(507, 116, 2, 25, 'available'),
(508, 117, 1, 16, 'available'),
(509, 117, 1, 17, 'available'),
(510, 117, 1, 18, 'available'),
(511, 117, 1, 19, 'available'),
(512, 117, 1, 20, 'available'),
(513, 117, 1, 5, 'available'),
(514, 118, 2, 27, 'available'),
(515, 118, 2, 28, 'available'),
(516, 118, 2, 29, 'available'),
(517, 118, 2, 30, 'available'),
(518, 118, 2, 31, 'available'),
(519, 118, 3, 32, 'available'),
(520, 119, 1, 21, 'available'),
(521, 119, 1, 23, 'available'),
(522, 119, 3, 36, 'available'),
(523, 119, 3, 37, 'available'),
(524, 120, 1, 5, 'available'),
(525, 120, 1, 16, 'available'),
(530, 120, 1, 21, 'available'),
(531, 120, 1, 22, 'available'),
(532, 120, 1, 23, 'available'),
(533, 120, 2, 24, 'available'),
(534, 120, 2, 25, 'available'),
(535, 120, 2, 26, 'available'),
(536, 121, 2, 27, 'available'),
(537, 121, 2, 28, 'available'),
(538, 121, 2, 29, 'available'),
(539, 121, 2, 30, 'available'),
(540, 121, 2, 31, 'available'),
(541, 121, 3, 32, 'available'),
(542, 121, 3, 38, 'available'),
(543, 121, 3, 37, 'available'),
(544, 121, 3, 36, 'available'),
(545, 121, 3, 35, 'available'),
(546, 122, 1, 5, 'available'),
(547, 122, 1, 16, 'available'),
(548, 122, 2, 25, 'available'),
(549, 122, 2, 26, 'available'),
(550, 123, 1, 5, 'available'),
(551, 123, 1, 16, 'available'),
(552, 123, 1, 17, 'available'),
(553, 123, 1, 18, 'available'),
(554, 123, 1, 19, 'available'),
(555, 123, 1, 20, 'available'),
(556, 123, 2, 26, 'available'),
(557, 123, 2, 25, 'available'),
(558, 123, 2, 24, 'available'),
(559, 123, 1, 23, 'available'),
(560, 123, 1, 22, 'available'),
(561, 123, 1, 21, 'available'),
(562, 124, 2, 27, 'available'),
(563, 124, 2, 28, 'available'),
(564, 124, 2, 29, 'available'),
(565, 124, 2, 30, 'available'),
(566, 124, 2, 31, 'available'),
(567, 124, 3, 32, 'available'),
(568, 125, 1, 5, 'available'),
(569, 125, 1, 16, 'available'),
(570, 125, 1, 17, 'available'),
(571, 125, 2, 24, 'available'),
(572, 125, 2, 25, 'available'),
(573, 125, 2, 26, 'available'),
(574, 126, 2, 27, 'available'),
(575, 126, 2, 28, 'available'),
(576, 126, 2, 29, 'available'),
(577, 126, 3, 36, 'available'),
(578, 126, 3, 37, 'available'),
(579, 126, 3, 38, 'available'),
(580, 127, 3, 33, 'available'),
(581, 127, 3, 34, 'available'),
(582, 127, 3, 35, 'available'),
(583, 127, 3, 36, 'available'),
(584, 127, 3, 37, 'available'),
(585, 127, 3, 38, 'available'),
(586, 128, 1, 5, 'available'),
(587, 128, 1, 16, 'available'),
(588, 128, 1, 17, 'available'),
(589, 128, 1, 18, 'available'),
(590, 128, 1, 19, 'available'),
(591, 128, 1, 20, 'available'),
(592, 128, 1, 21, 'available'),
(593, 128, 1, 22, 'available'),
(594, 128, 1, 23, 'available'),
(595, 128, 2, 24, 'available'),
(596, 128, 2, 25, 'available'),
(597, 128, 2, 26, 'available'),
(598, 129, 1, 21, 'available'),
(599, 129, 1, 22, 'available'),
(600, 129, 1, 23, 'available'),
(601, 129, 1, 18, 'available'),
(602, 129, 1, 19, 'available'),
(603, 129, 1, 20, 'available'),
(604, 130, 2, 27, 'available'),
(605, 130, 2, 28, 'available'),
(606, 130, 2, 29, 'available'),
(607, 130, 2, 30, 'available'),
(608, 130, 2, 31, 'available'),
(609, 130, 3, 32, 'available'),
(610, 131, 1, 5, 'available'),
(611, 131, 1, 16, 'available'),
(612, 131, 1, 17, 'available'),
(613, 131, 1, 18, 'available'),
(614, 131, 1, 19, 'available'),
(615, 131, 1, 20, 'available'),
(616, 131, 1, 22, 'available'),
(617, 132, 3, 33, 'available'),
(618, 132, 2, 28, 'available'),
(619, 132, 2, 27, 'available'),
(620, 132, 2, 30, 'available'),
(621, 132, 2, 31, 'available'),
(622, 132, 3, 32, 'available'),
(623, 132, 2, 29, 'available'),
(624, 133, 1, 5, 'available'),
(625, 133, 1, 16, 'available'),
(626, 133, 1, 17, 'available'),
(627, 133, 1, 18, 'available'),
(628, 133, 1, 19, 'available'),
(629, 133, 1, 20, 'available'),
(630, 134, 3, 33, 'available'),
(631, 134, 3, 34, 'available'),
(632, 134, 3, 35, 'available'),
(633, 134, 3, 36, 'available'),
(634, 134, 3, 37, 'available'),
(635, 134, 3, 38, 'available'),
(636, 135, 1, 5, 'available'),
(637, 135, 1, 16, 'available'),
(638, 135, 1, 21, 'available'),
(639, 135, 1, 22, 'available'),
(640, 135, 2, 27, 'available'),
(641, 135, 2, 28, 'available'),
(642, 135, 3, 33, 'available'),
(643, 135, 3, 34, 'available'),
(644, 136, 1, 17, 'available'),
(645, 136, 1, 18, 'available'),
(646, 136, 2, 25, 'available'),
(647, 136, 2, 26, 'available'),
(648, 136, 2, 31, 'available'),
(649, 136, 3, 32, 'available'),
(650, 137, 3, 33, 'available'),
(651, 137, 3, 34, 'available'),
(652, 137, 3, 35, 'available'),
(653, 137, 3, 36, 'available'),
(654, 137, 3, 37, 'available'),
(655, 137, 3, 38, 'available'),
(656, 138, 1, 5, 'available'),
(657, 138, 1, 16, 'available'),
(658, 138, 1, 17, 'available'),
(659, 138, 1, 18, 'available'),
(660, 138, 1, 19, 'available'),
(661, 138, 1, 20, 'available'),
(662, 138, 1, 21, 'available'),
(663, 138, 1, 22, 'available'),
(664, 138, 1, 23, 'available'),
(665, 138, 2, 24, 'available'),
(666, 138, 2, 25, 'available'),
(667, 138, 2, 26, 'available'),
(668, 139, 1, 5, 'available'),
(669, 139, 1, 16, 'available'),
(670, 139, 1, 17, 'available'),
(671, 139, 1, 18, 'available'),
(672, 139, 1, 19, 'available'),
(673, 139, 1, 20, 'available'),
(680, 141, 2, 27, 'available'),
(681, 141, 2, 28, 'available'),
(682, 141, 2, 29, 'available'),
(683, 141, 2, 30, 'available'),
(684, 141, 2, 31, 'available'),
(685, 141, 3, 32, 'available'),
(686, 142, 1, 5, 'available'),
(687, 142, 1, 16, 'available'),
(688, 142, 1, 23, 'available'),
(689, 142, 2, 24, 'available'),
(690, 142, 1, 22, 'available'),
(691, 142, 1, 21, 'available'),
(692, 142, 2, 25, 'available'),
(693, 142, 2, 26, 'available'),
(694, 143, 2, 27, 'available'),
(695, 143, 2, 29, 'available'),
(696, 143, 2, 28, 'available'),
(697, 143, 2, 30, 'available'),
(698, 143, 2, 31, 'available'),
(699, 143, 3, 32, 'available'),
(700, 144, 1, 5, 'available'),
(701, 144, 1, 16, 'available'),
(702, 144, 1, 17, 'available'),
(703, 144, 1, 18, 'available'),
(704, 144, 1, 19, 'available'),
(705, 144, 1, 20, 'available'),
(706, 145, 1, 20, 'available'),
(707, 145, 2, 26, 'available'),
(708, 145, 3, 32, 'available'),
(709, 145, 3, 38, 'available'),
(710, 146, 1, 5, 'available'),
(711, 146, 1, 16, 'available'),
(712, 146, 1, 17, 'available'),
(713, 146, 1, 18, 'available'),
(714, 146, 1, 19, 'available'),
(715, 146, 1, 21, 'available'),
(716, 146, 1, 22, 'available'),
(717, 146, 1, 23, 'available'),
(718, 147, 1, 5, 'available'),
(719, 147, 1, 16, 'available'),
(720, 148, 3, 36, 'available'),
(721, 148, 3, 37, 'available'),
(722, 148, 3, 38, 'available'),
(723, 149, 3, 33, 'available'),
(724, 149, 3, 34, 'available'),
(725, 149, 3, 35, 'available'),
(726, 149, 3, 36, 'available'),
(727, 149, 3, 37, 'available'),
(728, 149, 3, 38, 'available'),
(729, 150, 1, 5, 'available'),
(730, 150, 1, 16, 'available'),
(731, 150, 1, 17, 'available'),
(732, 150, 1, 18, 'available'),
(733, 150, 1, 19, 'available'),
(734, 150, 1, 20, 'available'),
(735, 150, 2, 27, 'available'),
(736, 150, 2, 28, 'available'),
(737, 150, 2, 29, 'available'),
(738, 150, 2, 30, 'available'),
(739, 150, 2, 31, 'available'),
(740, 150, 3, 32, 'available'),
(741, 151, 3, 33, 'available'),
(742, 151, 3, 34, 'available'),
(743, 151, 3, 35, 'available'),
(744, 151, 3, 36, 'available'),
(745, 151, 3, 37, 'available'),
(746, 151, 3, 38, 'available'),
(747, 152, 1, 5, 'available'),
(748, 152, 1, 16, 'available'),
(749, 152, 1, 17, 'available'),
(750, 152, 1, 18, 'available'),
(751, 152, 1, 19, 'available'),
(752, 152, 1, 20, 'available'),
(753, 152, 1, 21, 'available'),
(754, 152, 1, 22, 'available'),
(755, 152, 1, 23, 'available'),
(756, 152, 2, 24, 'available'),
(757, 153, 1, 5, 'available'),
(758, 153, 1, 16, 'available'),
(759, 153, 1, 17, 'available'),
(760, 153, 1, 18, 'available'),
(761, 153, 1, 19, 'available'),
(762, 153, 1, 20, 'available'),
(763, 153, 1, 21, 'available'),
(764, 153, 1, 22, 'available'),
(765, 153, 1, 23, 'available'),
(766, 153, 2, 24, 'available'),
(767, 154, 2, 27, 'available'),
(768, 154, 2, 28, 'available'),
(769, 154, 2, 29, 'available'),
(770, 154, 2, 30, 'available'),
(771, 154, 2, 31, 'available'),
(772, 154, 3, 32, 'available'),
(773, 155, 3, 33, 'available'),
(774, 155, 3, 34, 'available'),
(775, 155, 3, 35, 'available'),
(776, 155, 3, 37, 'available'),
(777, 155, 3, 38, 'available'),
(778, 156, 1, 5, 'available'),
(779, 156, 1, 16, 'available'),
(780, 156, 1, 17, 'available'),
(781, 156, 1, 18, 'available'),
(782, 156, 1, 21, 'available'),
(783, 156, 1, 22, 'available'),
(784, 156, 1, 23, 'available'),
(785, 156, 2, 24, 'available'),
(786, 157, 3, 33, 'available'),
(787, 157, 3, 34, 'available'),
(788, 157, 3, 35, 'available'),
(789, 157, 3, 36, 'available'),
(790, 157, 3, 37, 'available'),
(791, 157, 3, 38, 'available'),
(792, 158, 1, 5, 'available'),
(793, 158, 1, 16, 'available'),
(794, 158, 1, 17, 'available'),
(795, 158, 1, 18, 'available'),
(796, 158, 1, 19, 'available'),
(797, 158, 1, 20, 'available'),
(798, 158, 1, 23, 'available'),
(799, 158, 1, 22, 'available'),
(800, 158, 1, 21, 'available'),
(801, 159, 2, 27, 'available'),
(802, 159, 2, 28, 'available'),
(803, 159, 2, 29, 'available'),
(804, 159, 2, 30, 'available'),
(805, 159, 2, 31, 'available'),
(806, 159, 3, 32, 'available'),
(807, 160, 1, 5, 'available'),
(808, 160, 1, 16, 'available'),
(809, 160, 1, 17, 'available'),
(810, 160, 1, 18, 'available'),
(811, 160, 1, 19, 'available'),
(812, 160, 1, 20, 'available'),
(813, 161, 1, 21, 'available'),
(814, 161, 1, 22, 'available'),
(815, 161, 1, 23, 'available'),
(816, 161, 2, 24, 'available'),
(817, 161, 2, 25, 'available'),
(818, 161, 2, 26, 'available'),
(819, 162, 2, 27, 'available'),
(820, 162, 2, 28, 'available'),
(821, 162, 2, 29, 'available'),
(822, 162, 2, 30, 'available'),
(823, 162, 2, 31, 'available'),
(824, 162, 3, 32, 'available'),
(825, 162, 1, 5, 'available'),
(826, 162, 1, 16, 'available'),
(827, 162, 1, 17, 'available'),
(828, 162, 1, 18, 'available'),
(829, 162, 1, 19, 'available'),
(830, 162, 1, 20, 'available'),
(831, 163, 1, 5, 'available'),
(832, 163, 1, 16, 'available'),
(833, 163, 2, 24, 'available'),
(834, 163, 2, 25, 'available'),
(835, 163, 2, 26, 'available'),
(836, 163, 3, 35, 'available'),
(837, 163, 3, 34, 'available'),
(838, 163, 3, 33, 'available'),
(839, 164, 1, 21, 'available'),
(840, 164, 1, 22, 'available'),
(841, 164, 1, 23, 'available'),
(842, 164, 3, 36, 'available'),
(843, 164, 3, 37, 'available'),
(844, 164, 3, 38, 'available'),
(845, 165, 1, 21, 'available'),
(846, 165, 1, 22, 'available'),
(847, 165, 1, 23, 'available'),
(848, 165, 2, 24, 'available'),
(849, 165, 2, 25, 'available'),
(850, 165, 2, 26, 'available'),
(851, 165, 3, 32, 'available'),
(852, 165, 2, 31, 'available'),
(853, 165, 2, 30, 'available'),
(854, 165, 2, 29, 'available'),
(855, 166, 1, 5, 'available'),
(856, 166, 1, 16, 'available'),
(857, 166, 1, 17, 'available'),
(858, 166, 1, 18, 'available'),
(859, 166, 1, 19, 'available'),
(860, 166, 1, 20, 'available'),
(861, 167, 1, 5, 'available'),
(862, 167, 1, 16, 'available'),
(863, 167, 1, 17, 'available'),
(864, 167, 1, 18, 'available'),
(865, 167, 1, 19, 'available'),
(866, 167, 1, 20, 'available'),
(867, 168, 3, 33, 'available'),
(868, 168, 3, 34, 'available'),
(869, 168, 3, 35, 'available'),
(870, 168, 3, 36, 'available'),
(871, 168, 3, 37, 'available'),
(872, 168, 3, 38, 'available'),
(873, 169, 1, 16, 'available'),
(874, 169, 1, 22, 'available'),
(875, 169, 1, 21, 'available'),
(876, 169, 1, 5, 'available'),
(877, 170, 1, 17, 'available'),
(878, 170, 1, 18, 'available'),
(879, 170, 2, 24, 'available'),
(880, 170, 1, 23, 'available'),
(881, 171, 2, 28, 'available'),
(882, 171, 2, 29, 'available'),
(883, 171, 2, 30, 'available'),
(884, 172, 1, 16, 'available'),
(885, 172, 1, 17, 'available'),
(886, 172, 1, 18, 'available'),
(887, 172, 1, 19, 'available'),
(888, 172, 1, 20, 'available'),
(889, 173, 3, 33, 'available'),
(890, 173, 3, 34, 'available'),
(891, 173, 3, 35, 'available'),
(892, 173, 3, 36, 'available'),
(893, 173, 3, 38, 'available'),
(894, 173, 3, 37, 'available'),
(895, 174, 1, 22, 'available'),
(896, 174, 1, 23, 'available'),
(897, 174, 2, 24, 'available'),
(898, 174, 2, 25, 'available'),
(899, 175, 1, 5, 'available'),
(900, 175, 1, 16, 'available'),
(901, 175, 1, 17, 'available'),
(902, 175, 1, 18, 'available'),
(903, 175, 1, 19, 'available'),
(904, 175, 1, 20, 'available'),
(905, 176, 3, 33, 'available'),
(906, 176, 3, 34, 'available'),
(907, 176, 3, 35, 'available'),
(908, 176, 3, 36, 'available'),
(909, 176, 3, 37, 'available'),
(910, 176, 3, 38, 'available'),
(911, 177, 1, 5, 'available'),
(912, 177, 1, 16, 'available'),
(913, 177, 1, 17, 'available'),
(914, 177, 1, 18, 'available'),
(915, 177, 1, 19, 'available'),
(916, 177, 1, 20, 'available'),
(917, 177, 1, 21, 'available'),
(918, 177, 1, 22, 'available'),
(919, 177, 1, 23, 'available'),
(920, 177, 2, 24, 'available'),
(921, 177, 2, 26, 'available'),
(922, 178, 1, 5, 'available'),
(923, 178, 1, 16, 'available'),
(924, 178, 1, 17, 'available'),
(925, 178, 1, 18, 'available'),
(926, 178, 1, 19, 'available'),
(927, 178, 1, 20, 'available'),
(928, 178, 2, 27, 'available'),
(929, 178, 2, 28, 'available'),
(930, 178, 2, 29, 'available'),
(931, 178, 2, 30, 'available'),
(932, 178, 2, 31, 'available'),
(933, 178, 3, 32, 'available'),
(934, 179, 1, 5, 'available'),
(935, 179, 1, 16, 'available'),
(936, 179, 1, 17, 'available'),
(937, 179, 1, 18, 'available'),
(938, 179, 1, 19, 'available'),
(939, 179, 1, 20, 'available'),
(940, 179, 1, 21, 'available'),
(941, 179, 1, 22, 'available'),
(942, 179, 1, 23, 'available'),
(943, 179, 2, 24, 'available'),
(944, 179, 2, 25, 'available'),
(945, 179, 2, 26, 'available'),
(946, 180, 3, 33, 'available'),
(947, 180, 3, 34, 'available'),
(948, 180, 3, 35, 'available'),
(949, 180, 3, 36, 'available'),
(950, 180, 3, 37, 'available'),
(951, 180, 3, 38, 'available'),
(952, 181, 3, 33, 'available'),
(953, 181, 3, 34, 'available'),
(954, 181, 3, 35, 'available'),
(955, 181, 3, 36, 'available'),
(956, 181, 3, 37, 'available'),
(957, 181, 3, 38, 'available'),
(958, 182, 1, 5, 'available'),
(959, 182, 1, 16, 'available'),
(960, 182, 1, 17, 'available'),
(961, 182, 1, 18, 'available'),
(962, 182, 1, 19, 'available'),
(963, 182, 1, 20, 'available'),
(964, 183, 1, 21, 'available'),
(965, 183, 1, 22, 'available'),
(966, 183, 1, 23, 'available'),
(967, 183, 2, 24, 'available'),
(968, 183, 2, 25, 'available'),
(969, 183, 2, 26, 'available'),
(970, 184, 2, 27, 'available'),
(971, 184, 2, 28, 'available'),
(972, 184, 2, 29, 'available'),
(973, 184, 2, 30, 'available'),
(974, 184, 2, 31, 'available'),
(975, 184, 3, 32, 'available'),
(976, 185, 2, 27, 'available'),
(977, 185, 2, 28, 'available'),
(978, 185, 3, 35, 'available'),
(979, 185, 3, 36, 'available'),
(980, 185, 2, 31, 'available'),
(981, 185, 3, 32, 'available'),
(982, 186, 1, 5, 'available'),
(983, 186, 1, 16, 'available'),
(984, 186, 1, 23, 'available'),
(985, 186, 2, 24, 'available'),
(986, 186, 1, 17, 'available'),
(987, 186, 1, 18, 'available'),
(988, 186, 1, 19, 'available'),
(989, 186, 1, 20, 'available'),
(990, 187, 1, 5, 'available'),
(991, 187, 1, 16, 'available'),
(992, 187, 1, 17, 'available'),
(993, 187, 1, 18, 'available'),
(994, 187, 1, 19, 'available'),
(995, 187, 1, 20, 'available'),
(996, 187, 1, 21, 'available'),
(997, 187, 1, 22, 'available'),
(998, 187, 1, 23, 'available'),
(999, 187, 2, 24, 'available'),
(1000, 188, 3, 33, 'available'),
(1001, 188, 3, 34, 'available'),
(1002, 188, 3, 35, 'available'),
(1003, 188, 3, 36, 'available'),
(1004, 188, 3, 37, 'available'),
(1005, 188, 3, 38, 'available'),
(1006, 188, 2, 31, 'available'),
(1007, 188, 3, 32, 'available'),
(1008, 188, 2, 30, 'available'),
(1009, 189, 1, 5, 'available'),
(1010, 189, 1, 16, 'available'),
(1011, 189, 1, 17, 'available'),
(1012, 189, 1, 18, 'available'),
(1013, 189, 1, 19, 'available'),
(1014, 189, 1, 20, 'available'),
(1015, 189, 1, 22, 'available'),
(1016, 189, 1, 21, 'available'),
(1017, 189, 2, 28, 'available'),
(1018, 189, 2, 27, 'available'),
(1019, 190, 1, 17, 'available'),
(1020, 190, 1, 19, 'available'),
(1021, 190, 1, 20, 'available'),
(1022, 190, 1, 18, 'available'),
(1023, 190, 1, 16, 'available'),
(1024, 190, 1, 5, 'available'),
(1025, 191, 3, 33, 'available'),
(1026, 191, 3, 34, 'available'),
(1027, 191, 3, 35, 'available'),
(1028, 191, 3, 36, 'available'),
(1029, 191, 3, 37, 'available'),
(1030, 191, 3, 38, 'available'),
(1031, 192, 1, 5, 'available'),
(1032, 192, 1, 16, 'available'),
(1033, 192, 1, 17, 'available'),
(1034, 192, 1, 18, 'available'),
(1035, 192, 1, 19, 'available'),
(1036, 192, 1, 20, 'available'),
(1037, 192, 2, 26, 'available'),
(1038, 192, 2, 25, 'available'),
(1039, 192, 2, 27, 'available'),
(1040, 192, 2, 28, 'available'),
(1041, 192, 2, 29, 'available'),
(1042, 192, 2, 30, 'available'),
(1043, 193, 3, 33, 'available'),
(1044, 193, 3, 34, 'available'),
(1045, 193, 3, 35, 'available'),
(1046, 193, 3, 36, 'available'),
(1047, 193, 3, 37, 'available'),
(1048, 193, 3, 38, 'available'),
(1049, 194, 3, 33, 'available'),
(1050, 194, 3, 34, 'available'),
(1051, 194, 3, 35, 'available'),
(1052, 194, 3, 36, 'available'),
(1053, 194, 3, 37, 'available'),
(1054, 194, 3, 38, 'available'),
(1055, 195, 1, 5, 'available'),
(1056, 195, 1, 21, 'available'),
(1057, 195, 1, 16, 'available'),
(1058, 195, 1, 22, 'available'),
(1059, 195, 1, 17, 'available'),
(1060, 195, 1, 23, 'available'),
(1061, 195, 1, 18, 'available'),
(1062, 195, 2, 24, 'available'),
(1063, 195, 1, 19, 'available'),
(1064, 195, 2, 25, 'available'),
(1065, 195, 1, 20, 'available'),
(1066, 195, 2, 26, 'available'),
(1067, 196, 3, 33, 'available'),
(1068, 196, 3, 34, 'available'),
(1069, 196, 3, 35, 'available'),
(1070, 196, 3, 36, 'available'),
(1071, 196, 3, 37, 'available'),
(1072, 196, 3, 38, 'available'),
(1073, 197, 1, 5, 'available'),
(1074, 197, 1, 16, 'available'),
(1075, 197, 1, 17, 'available'),
(1076, 197, 1, 18, 'available'),
(1077, 197, 1, 19, 'available'),
(1078, 197, 1, 20, 'available'),
(1079, 198, 2, 27, 'available'),
(1080, 198, 2, 24, 'available'),
(1081, 198, 1, 23, 'available'),
(1082, 198, 2, 25, 'available'),
(1083, 198, 2, 26, 'available'),
(1084, 198, 2, 28, 'available'),
(1085, 198, 2, 29, 'available'),
(1086, 198, 2, 30, 'available'),
(1087, 198, 2, 31, 'available'),
(1088, 199, 1, 5, 'available'),
(1089, 199, 1, 16, 'available'),
(1090, 199, 1, 17, 'available'),
(1091, 199, 1, 18, 'available'),
(1092, 199, 1, 19, 'available'),
(1093, 199, 1, 20, 'available'),
(1094, 200, 2, 27, 'available'),
(1095, 200, 2, 28, 'available'),
(1096, 200, 2, 29, 'available'),
(1097, 200, 2, 30, 'available'),
(1098, 200, 2, 31, 'available'),
(1099, 200, 3, 32, 'available'),
(1100, 201, 1, 5, 'available'),
(1101, 201, 1, 16, 'available'),
(1102, 201, 1, 17, 'available'),
(1103, 201, 1, 18, 'available'),
(1104, 201, 1, 19, 'available'),
(1105, 201, 1, 20, 'available'),
(1106, 201, 1, 21, 'available'),
(1107, 201, 1, 22, 'available'),
(1108, 201, 2, 24, 'available'),
(1109, 201, 1, 23, 'available'),
(1110, 202, 1, 5, 'available'),
(1111, 202, 1, 16, 'available'),
(1112, 202, 1, 17, 'available'),
(1113, 202, 1, 18, 'available'),
(1114, 202, 1, 19, 'available'),
(1115, 202, 1, 20, 'available'),
(1116, 203, 1, 23, 'available'),
(1117, 203, 2, 24, 'available'),
(1118, 203, 2, 25, 'available'),
(1119, 203, 2, 26, 'available'),
(1120, 203, 2, 27, 'available'),
(1121, 203, 2, 28, 'available'),
(1122, 203, 2, 29, 'available'),
(1123, 203, 2, 30, 'available'),
(1124, 203, 2, 31, 'available'),
(1125, 204, 1, 5, 'available'),
(1126, 204, 1, 16, 'available'),
(1127, 204, 1, 17, 'available'),
(1128, 204, 1, 18, 'available'),
(1129, 204, 1, 19, 'available'),
(1130, 205, 1, 5, 'available'),
(1131, 205, 1, 16, 'available'),
(1132, 205, 1, 17, 'available'),
(1133, 205, 1, 18, 'available'),
(1134, 205, 1, 19, 'available'),
(1135, 205, 1, 20, 'available'),
(1136, 206, 1, 23, 'available'),
(1137, 206, 2, 24, 'available'),
(1138, 206, 2, 25, 'available'),
(1139, 206, 2, 26, 'available'),
(1140, 206, 2, 27, 'available'),
(1141, 206, 2, 28, 'available'),
(1142, 206, 2, 29, 'available'),
(1143, 206, 2, 30, 'available'),
(1144, 207, 1, 5, 'available'),
(1145, 207, 1, 16, 'available'),
(1146, 207, 1, 17, 'available'),
(1147, 207, 1, 18, 'available'),
(1148, 207, 1, 19, 'available'),
(1149, 207, 1, 20, 'available'),
(1150, 207, 1, 21, 'available'),
(1151, 207, 1, 22, 'available');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donthuoc`
--

CREATE TABLE `donthuoc` (
  `maDonThuoc` int(10) UNSIGNED NOT NULL,
  `maPhieuKhamBenh` int(11) UNSIGNED NOT NULL,
  `ngayTao` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `donthuoc`
--

INSERT INTO `donthuoc` (`maDonThuoc`, `maPhieuKhamBenh`, `ngayTao`) VALUES
(26, 174, '2025-05-15 00:00:00'),
(27, 175, '2025-05-16 00:00:00'),
(46, 194, '2025-05-21 22:29:53'),
(47, 196, '2025-05-22 16:39:21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giaodichvnpay`
--

CREATE TABLE `giaodichvnpay` (
  `id_vnpay` int(11) UNSIGNED NOT NULL,
  `maLich` int(11) UNSIGNED NOT NULL,
  `vnp_Amount` varchar(50) NOT NULL,
  `vnp_BankCode` varchar(50) DEFAULT NULL,
  `vnp_BankTranNo` varchar(50) DEFAULT NULL,
  `vnp_CardType` varchar(50) DEFAULT NULL,
  `vnp_OrderInfo` varchar(50) DEFAULT NULL,
  `vnp_PayDate` varchar(50) DEFAULT NULL,
  `vnp_ResponseCode` varchar(50) DEFAULT NULL,
  `vnp_TmnCode` varchar(50) DEFAULT NULL,
  `vnp_TransactionNo` varchar(50) DEFAULT NULL,
  `vnp_TransactionStatus` varchar(50) DEFAULT NULL,
  `vnp_SecureHash` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `giaodichvnpay`
--

INSERT INTO `giaodichvnpay` (`id_vnpay`, `maLich`, `vnp_Amount`, `vnp_BankCode`, `vnp_BankTranNo`, `vnp_CardType`, `vnp_OrderInfo`, `vnp_PayDate`, `vnp_ResponseCode`, `vnp_TmnCode`, `vnp_TransactionNo`, `vnp_TransactionStatus`, `vnp_SecureHash`, `created_at`, `updated_at`) VALUES
(86, 83, '10000000', 'NCB', 'VNP14958935', 'ATM', 'Thanh toán lịch khám 83 của Nguyễn Ánh', '20250515154617', '00', '6DZXKDIM', '14958935', '00', '36cff1c9a781430cfa789e42281d369a482c57a406fb9b5c1999a9b02ec7d445676f77aa1e21b55dfca41b5ff8609a8c3348287dac43db1c024ada7b7af9510a', '2025-05-15 08:45:56', '2025-05-15 08:45:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hosobenhnhan`
--

CREATE TABLE `hosobenhnhan` (
  `maHoSo` int(11) UNSIGNED NOT NULL,
  `maBenhNhan` int(11) UNSIGNED NOT NULL,
  `hoTenBenhNhan` varchar(100) NOT NULL,
  `gioiTinh` tinyint(1) NOT NULL,
  `ngaySinh` date NOT NULL,
  `ngheNghiep` varchar(100) DEFAULT NULL,
  `CCCD` varchar(15) DEFAULT NULL,
  `diaChi` varchar(255) DEFAULT NULL,
  `ngayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hosobenhnhan`
--

INSERT INTO `hosobenhnhan` (`maHoSo`, `maBenhNhan`, `hoTenBenhNhan`, `gioiTinh`, `ngaySinh`, `ngheNghiep`, `CCCD`, `diaChi`, `ngayTao`) VALUES
(1, 1, 'Võ Minh T', 0, '1995-08-12', 'Nhân viên văn phòng', '123456789012', '123 Đường ABC, TP HCM', '2025-03-13 03:07:51'),
(2, 2, 'Nguyễn Thị H', 1, '1989-04-21', 'Kinh doanh', '987654321012', '456 Đường XYZ, Hà Nội', '2025-03-13 03:07:51'),
(3, 3, 'Lê Văn P', 0, '2000-06-15', 'Sinh viên', '567890123456', '789 Đường DEF, Đà Nẵng', '2025-03-13 03:07:51'),
(4, 4, 'Phan Văn Tèo', 0, '1975-12-01', 'Kỹ sư', '045678901234567', '789 Đường E, Quận F, Đà Nẵng', '2025-03-13 03:17:34'),
(5, 5, 'Lý Thị Hoa', 0, '1983-08-15', 'Nhân viên văn phòng', '406789012345678', '101 Đường G, Quận H, Cần Thơ', '2025-03-13 03:17:34'),
(6, 6, 'Trương Văn Dũng', 1, '1992-03-25', 'Sinh viên', '560890123456789', '112 Đường I, Quận K, Hải Phòng', '2025-03-13 03:17:34'),
(7, 7, 'Đinh Thị Mai', 0, '1989-11-08', 'Nội trợ', '670901234567890', '123 Đường L, Quận M, Huế', '2025-03-13 03:17:34'),
(8, 8, 'Vương Văn Hùng', 1, '1977-06-18', 'Công nhân', '709012345678901', '134 Đường N, Quận O, Nha Trang', '2025-03-13 03:17:34'),
(9, 9, 'Nguyễn Thị Lan Anh', 0, '2002-02-28', 'Học sinh', '800123456789012', '145 Đường P, Quận Q, Vinh', '2025-03-13 03:17:34'),
(10, 10, 'Phạm Văn Bảo', 1, '1995-09-03', 'Lái xe', '900234567890123', '156 Đường R, Quận S, Biên Hòa', '2025-03-13 03:17:34'),
(11, 11, 'Lê Thị Cúc', 0, '1986-04-12', 'Bán hàng', '010345678901234', '167 Đường T, Quận U, Mỹ Tho', '2025-03-13 03:17:34'),
(12, 12, 'Trần Văn Đạt', 1, '1973-10-22', 'Giám đốc', '123056789012345', '178 Đường V, Quận W, Long Xuyên', '2025-03-13 03:17:34'),
(13, 13, 'Hồ Thị Diệu', 0, '1999-07-05', 'Thiết kế đồ họa', '234067890123456', '189 Đường X, Quận Y, Đà Lạt', '2025-03-13 03:17:34'),
(14, 14, 'Cao Văn Đức', 1, '1980-01-15', 'Giáo viên', '345608901234567', '190 Đường Z, Quận AA, Buôn Ma Thuột', '2025-03-13 03:17:34'),
(15, 15, 'Bùi Thị Ngọc', 0, '1987-05-25', 'Y tá', '456780012345678', '201 Đường BB, Quận CC, Rạch Giá', '2025-03-13 03:17:34'),
(16, 16, 'Đặng Văn Hải', 1, '2001-12-08', 'Bảo vệ', '567090123456789', '212 Đường DD, Quận EE, Hà Tĩnh', '2025-03-13 03:17:34'),
(17, 17, 'Kiều Thị Huyền', 0, '1994-09-18', 'Luật sư', '678901034567890', '223 Đường FF, Quận GG, Quy Nhơn', '2025-03-13 03:17:34'),
(18, 18, 'Lâm Văn Kiên', 1, '1979-03-02', 'Đầu bếp', '789012045678901', '234 Đường HH, Quận II, Phan Thiết', '2025-03-13 03:17:34'),
(21, 19, 'Nguyễn Thị Ánh', 1, '2002-03-16', 'Sinh viên', '123456789102', 'Gò Vấp', '2025-05-15 08:42:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khoa`
--

CREATE TABLE `khoa` (
  `maKhoa` int(11) UNSIGNED NOT NULL,
  `tenKhoa` varchar(100) NOT NULL,
  `hinhAnh` varchar(100) DEFAULT NULL,
  `moTa` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khoa`
--

INSERT INTO `khoa` (`maKhoa`, `tenKhoa`, `hinhAnh`, `moTa`) VALUES
(1, 'Khoa Thần kinh', 'thankinh.jpg', '<p>Khoa Thần kinh chuyên chẩn đoán và điều trị các bệnh lý liên quan đến hệ thần kinh trung ương và ngoại biên như đau đầu mãn tính, động kinh, tai biến mạch máu não, Parkinson, Alzheimer, rối loạn giấc ngủ, và các bệnh lý thần kinh cơ. Đội ngũ bác sĩ được đào tạo chuyên sâu, kết hợp cùng trang thiết bị hiện đại giúp nâng cao hiệu quả điều trị và cải thiện chất lượng sống cho bệnh nhân.</p>'),
(2, 'Khoa Ngoại', 'khoangoai.jpg', '<p>Khoa Ngoại phụ trách các ca phẫu thuật và điều trị các bệnh lý cần can thiệp ngoại khoa như sỏi mật, viêm ruột thừa, thoát vị, khối u, chấn thương, và các dị tật bẩm sinh. Khoa ứng dụng các phương pháp phẫu thuật tiên tiến như nội soi, phẫu thuật ít xâm lấn, và điều trị hậu phẫu chăm sóc toàn diện nhằm mang lại hiệu quả tối ưu và thời gian hồi phục nhanh chóng.</p>'),
(3, 'Khoa Nhi', 'khoanhi.jpg', '<p>Khoa Nhi cung cấp dịch vụ khám và điều trị toàn diện cho trẻ em từ sơ sinh đến 16 tuổi. Chuyên khoa tập trung vào các bệnh lý thường gặp ở trẻ như viêm phổi, sốt siêu vi, rối loạn tiêu hóa, các bệnh dị ứng, cũng như theo dõi sự phát triển và tiêm chủng định kỳ. Với đội ngũ bác sĩ nhi khoa giàu kinh nghiệm, môi trường thân thiện, khoa cam kết mang đến sự an tâm cho phụ huynh và sức khỏe cho trẻ nhỏ.</p>'),
(4, 'Khoa Sản', 'phusan.jpg', '<p>Khoa Sản cung cấp các dịch vụ chăm sóc sức khỏe sinh sản toàn diện cho phụ nữ: từ khám thai định kỳ, theo dõi thai kỳ nguy cơ cao, hỗ trợ sinh đẻ an toàn cho đến điều trị các bệnh phụ khoa như u xơ tử cung, lạc nội mạc tử cung, viêm nhiễm đường sinh dục. Bên cạnh đó, khoa còn thực hiện các biện pháp kế hoạch hóa gia đình và tư vấn tiền sản hiệu quả.</p>'),
(5, 'Khoa Tai Mũi Họng', 'taimuihong.jpg', '<p>Khoa Tai Mũi Họng chuyên khám và điều trị các bệnh lý phổ biến như viêm xoang, viêm mũi dị ứng, viêm tai giữa, ù tai, viêm họng mãn tính, polyp mũi, và các vấn đề về thanh quản. Ngoài ra, khoa còn thực hiện các phẫu thuật nội soi tai, mũi, họng bằng công nghệ tiên tiến, đảm bảo an toàn và hiệu quả điều trị lâu dài.</p>'),
(6, 'Khoa Tim mạch', 'khoatimmach.jpg', '<p>Khoa Tim mạch là nơi chuyên sâu trong chẩn đoán, theo dõi và điều trị các bệnh lý như tăng huyết áp, bệnh mạch vành, suy tim, rối loạn nhịp tim, và các dị tật tim bẩm sinh. Với hệ thống máy đo điện tim, siêu âm tim hiện đại và đội ngũ chuyên gia nhiều năm kinh nghiệm, khoa cam kết hỗ trợ người bệnh kiểm soát tốt bệnh tim và phòng ngừa biến chứng.</p>'),
(7, 'Khoa Da liễu', 'dalieu.jpg', '<p>Khoa Da liễu điều trị các bệnh về da như viêm da cơ địa, nấm da, trứng cá, vảy nến, rụng tóc, các bệnh về móng, cũng như chăm sóc da thẩm mỹ, điều trị sẹo, nám, tàn nhang, và lão hóa da. Khoa kết hợp giữa y học hiện đại và các liệu pháp thẩm mỹ để nâng cao hiệu quả điều trị và cải thiện ngoại hình cho người bệnh.</p>'),
(8, 'Khoa Răng hàm mặt', 'ranghammat.jpg', '<p>Khoa Răng Hàm Mặt cung cấp dịch vụ khám, điều trị và phòng ngừa các bệnh lý về răng miệng như sâu răng, viêm lợi, viêm nha chu, răng khôn mọc lệch, và các chấn thương vùng hàm mặt. Khoa còn thực hiện chỉnh nha, phục hình răng, cắm implant, và chăm sóc nha khoa thẩm mỹ giúp cải thiện sức khỏe và thẩm mỹ răng miệng.</p>'),
(9, 'Khoa Tiêu Hóa - Gan mật - Tụy', 'tieuhoa_gan_mat_tuy.jpg', '<p>Khoa chuyên điều trị các bệnh lý liên quan đến hệ tiêu hóa như viêm dạ dày, trào ngược dạ dày thực quản, viêm gan, gan nhiễm mỡ, xơ gan, viêm tụy, sỏi mật, và polyp đại tràng. Với sự hỗ trợ của các thiết bị nội soi tiêu hóa hiện đại và các phương pháp điều trị mới, khoa mang lại hiệu quả điều trị cao và giảm thiểu biến chứng cho người bệnh.</p>'),
(10, 'Khoa Ung bướu', 'ungbuou.jpg', '<p>Khoa Ung bướu chuyên sâu trong chẩn đoán, điều trị và theo dõi các bệnh lý u lành tính và ác tính, bao gồm ung thư phổi, gan, dạ dày, vú, cổ tử cung, tuyến tiền liệt,... Khoa ứng dụng các phương pháp hóa trị, xạ trị, phẫu thuật và điều trị nhắm trúng đích. Đội ngũ bác sĩ tận tâm, đồng hành cùng người bệnh trong suốt quá trình điều trị và hồi phục.</p>'),
(11, 'Khoa dinh dưỡng điều tiết', 'dinhduongtietche.jpg', '<p>Khoa Dinh dưỡng điều tiết tư vấn và điều trị các rối loạn về dinh dưỡng như béo phì, suy dinh dưỡng, tiểu đường, rối loạn chuyển hóa, và các chế độ ăn hỗ trợ điều trị bệnh lý nền. Khoa phối hợp chặt chẽ với các chuyên khoa khác để xây dựng chế độ dinh dưỡng khoa học, góp phần cải thiện sức khỏe toàn diện cho người bệnh.</p>'),
(12, 'Khoa Mắt', 'khoamat.jpg', '<p>Khoa Mắt chuyên khám và điều trị các bệnh lý mắt như cận thị, loạn thị, viễn thị, đục thủy tinh thể, glôcôm, viêm kết mạc, đau mắt đỏ, và các tổn thương do chấn thương. Khoa thực hiện phẫu thuật mắt bằng công nghệ laser, phaco và các phương pháp hiện đại khác giúp phục hồi thị lực và ngăn ngừa các biến chứng nguy hiểm.</p>'),
(13, 'Khoa Nội tiết', 'khoanoitiet.jpg', '<p>Khoa Nội tiết tập trung vào điều trị các bệnh lý như tiểu đường, rối loạn tuyến giáp, tuyến yên, tuyến thượng thận, loãng xương và hội chứng chuyển hóa. Bác sĩ nội tiết xây dựng phác đồ điều trị cá nhân hóa và theo dõi dài hạn để kiểm soát bệnh hiệu quả và nâng cao chất lượng sống cho người bệnh.</p>'),
(14, 'Khoa Xương khớp', 'khoaxuongkhop.jpg', '<p>Khoa Xương khớp chuyên điều trị các bệnh lý về hệ vận động như thoái hóa khớp, viêm khớp dạng thấp, thoát vị đĩa đệm, loãng xương, gãy xương và chấn thương thể thao. Khoa kết hợp điều trị nội khoa, vật lý trị liệu, và phẫu thuật chỉnh hình nhằm phục hồi chức năng vận động tối đa cho người bệnh.</p>'),
(15, 'Khoa Khám bệnh', 'khambenh.jpg', '<p>Khoa Khám bệnh là nơi tiếp nhận ban đầu, thực hiện khám tổng quát, sàng lọc bệnh lý và định hướng điều trị hoặc chuyển chuyên khoa phù hợp. Khoa cung cấp dịch vụ khám sức khỏe định kỳ, khám theo yêu cầu, và cấp giấy chứng nhận y tế. Đây là cửa ngõ đầu tiên giúp người bệnh được chăm sóc đúng chuyên môn và kịp thời.</p>');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khunggio`
--

CREATE TABLE `khunggio` (
  `maKhungGio` int(11) UNSIGNED NOT NULL,
  `khungGio` varchar(50) NOT NULL,
  `gioBatDau` time NOT NULL,
  `gioKetThuc` time NOT NULL,
  `maCaLamViec` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khunggio`
--

INSERT INTO `khunggio` (`maKhungGio`, `khungGio`, `gioBatDau`, `gioKetThuc`, `maCaLamViec`) VALUES
(5, '07:00 - 07:30', '07:00:00', '07:30:00', 1),
(16, '07:30 - 08:00', '07:30:00', '08:00:00', 1),
(17, '08:00 - 08:30', '08:00:00', '08:30:00', 1),
(18, '08:30 - 09:00', '08:30:00', '09:00:00', 1),
(19, '09:00 - 09:30', '09:00:00', '09:30:00', 1),
(20, '09:30 - 10:00', '09:30:00', '10:00:00', 1),
(21, '10:00 - 10:30', '10:00:00', '10:30:00', 1),
(22, '10:30 - 11:00', '10:30:00', '11:00:00', 1),
(23, '11:30 - 12:00', '11:30:00', '12:00:00', 1),
(24, '13:30 - 14:00', '13:30:00', '14:00:00', 2),
(25, '14:00 - 14:30', '14:00:00', '14:30:00', 2),
(26, '14:30 - 15:00', '14:30:00', '15:00:00', 2),
(27, '15:00 - 15:30', '15:00:00', '15:30:00', 2),
(28, '15:30 - 16:00', '15:30:00', '16:00:00', 2),
(29, '16:00 - 16:30', '16:00:00', '16:30:00', 2),
(30, '16:30 - 17:00', '16:30:00', '17:00:00', 2),
(31, '17:30 - 18:00', '17:30:00', '18:00:00', 2),
(32, '18:00 - 18:30', '18:00:00', '18:30:00', 3),
(33, '18:30 - 19:00', '18:30:00', '19:00:00', 3),
(34, '19:00 - 19:30', '19:00:00', '19:30:00', 3),
(35, '19:30 - 20:00', '19:30:00', '20:00:00', 3),
(36, '20:30 - 21:00', '20:30:00', '21:00:00', 3),
(37, '21:00 - 21:30', '21:00:00', '21:30:00', 3),
(38, '21:30 - 22:00', '21:30:00', '22:00:00', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichkham`
--

CREATE TABLE `lichkham` (
  `maLich` int(11) UNSIGNED NOT NULL,
  `maBenhNhan` int(11) UNSIGNED NOT NULL,
  `maBacSi` int(11) UNSIGNED NOT NULL,
  `maKhungGio` int(11) UNSIGNED NOT NULL,
  `hoTenBenhNhan` varchar(100) NOT NULL,
  `giaKham` decimal(10,2) NOT NULL,
  `tienDatCoc` decimal(10,2) DEFAULT 0.00,
  `tienConLai` decimal(10,2) DEFAULT 0.00,
  `ngayKham` date NOT NULL,
  `lyDoKham` text DEFAULT NULL,
  `trangThai` enum('Chờ khám','Đã khám','Đã hủy') DEFAULT 'Chờ khám',
  `trangThaiThanhToan` enum('Chưa thanh toán','Đã đặt cọc','Đã thanh toán') DEFAULT 'Chưa thanh toán',
  `phuongthucthanhtoan` enum('Tiền mặt','VnPay') DEFAULT NULL,
  `hinhThucKham` enum('Chuyên khoa','Trực tuyến') NOT NULL DEFAULT 'Trực tuyến'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lichkham`
--

INSERT INTO `lichkham` (`maLich`, `maBenhNhan`, `maBacSi`, `maKhungGio`, `hoTenBenhNhan`, `giaKham`, `tienDatCoc`, `tienConLai`, `ngayKham`, `lyDoKham`, `trangThai`, `trangThaiThanhToan`, `phuongthucthanhtoan`, `hinhThucKham`) VALUES
(83, 19, 1, 17, 'Nguyễn Ánh', 100000.00, 0.00, 0.00, '2025-05-15', 'Đau đầu', 'Đã khám', 'Đã thanh toán', 'VnPay', 'Chuyên khoa'),
(84, 19, 1, 19, 'Nguyễn Ánh', 100000.00, 0.00, 0.00, '2025-05-16', 'Ốm', 'Đã khám', 'Chưa thanh toán', 'Tiền mặt', 'Chuyên khoa'),
(85, 19, 1, 17, 'Nguyễn Ánh', 100000.00, 0.00, 0.00, '2025-05-17', 'testcase', 'Đã khám', 'Chưa thanh toán', 'VnPay', 'Chuyên khoa'),
(88, 19, 1, 17, 'Nguyễn Ánh', 100000.00, 0.00, 0.00, '2025-05-21', 'Khám', 'Đã khám', 'Chưa thanh toán', 'Tiền mặt', 'Chuyên khoa'),
(89, 19, 1, 28, 'Nguyễn Ánh', 100000.00, 0.00, 0.00, '2025-05-22', 'Test', 'Đã hủy', 'Chưa thanh toán', 'Tiền mặt', 'Chuyên khoa'),
(90, 19, 1, 29, 'Nguyễn Ánh', 100000.00, 0.00, 0.00, '2025-05-22', 'Đau bụng', 'Chờ khám', 'Chưa thanh toán', 'Tiền mặt', 'Chuyên khoa'),
(91, 19, 1, 29, 'Nguyễn Ánh', 100000.00, 0.00, 0.00, '2025-05-25', 'Đau', 'Đã hủy', 'Chưa thanh toán', 'VnPay', 'Trực tuyến');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichlamviec`
--

CREATE TABLE `lichlamviec` (
  `maLichLamViec` int(11) UNSIGNED NOT NULL,
  `maBacSi` int(11) UNSIGNED NOT NULL,
  `ngayLamViec` date NOT NULL,
  `hinhThucKham` enum('Chuyên khoa','Trực tuyến') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lichlamviec`
--

INSERT INTO `lichlamviec` (`maLichLamViec`, `maBacSi`, `ngayLamViec`, `hinhThucKham`) VALUES
(64, 1, '2025-04-20', 'Chuyên khoa'),
(65, 1, '2025-04-20', 'Trực tuyến'),
(66, 1, '2025-04-22', 'Chuyên khoa'),
(67, 1, '2025-04-22', 'Trực tuyến'),
(68, 1, '2025-05-15', 'Trực tuyến'),
(69, 1, '2025-05-15', 'Chuyên khoa'),
(70, 1, '2025-05-16', 'Chuyên khoa'),
(71, 1, '2025-05-16', 'Trực tuyến'),
(72, 1, '2025-05-17', 'Chuyên khoa'),
(73, 1, '2025-05-17', 'Trực tuyến'),
(74, 1, '2025-05-18', 'Chuyên khoa'),
(75, 1, '2025-05-18', 'Trực tuyến'),
(76, 1, '2025-05-20', 'Chuyên khoa'),
(77, 1, '2025-05-20', 'Trực tuyến'),
(78, 1, '2025-05-21', 'Trực tuyến'),
(79, 1, '2025-05-22', 'Trực tuyến'),
(80, 1, '2025-05-23', 'Trực tuyến'),
(81, 1, '2025-05-24', 'Trực tuyến'),
(82, 1, '2025-05-25', 'Trực tuyến'),
(83, 1, '2025-05-21', 'Chuyên khoa'),
(84, 1, '2025-05-22', 'Chuyên khoa'),
(85, 1, '2025-05-26', 'Chuyên khoa'),
(86, 1, '2025-05-26', 'Trực tuyến'),
(87, 1, '2025-05-27', 'Trực tuyến'),
(88, 1, '2025-05-27', 'Chuyên khoa'),
(89, 1, '2025-05-28', 'Chuyên khoa'),
(90, 1, '2025-05-28', 'Trực tuyến'),
(91, 2, '2025-05-26', 'Chuyên khoa'),
(92, 2, '2025-05-27', 'Chuyên khoa'),
(93, 2, '2025-05-27', 'Trực tuyến'),
(94, 2, '2025-05-28', 'Trực tuyến'),
(95, 2, '2025-05-29', 'Chuyên khoa'),
(96, 2, '2025-05-30', 'Chuyên khoa'),
(97, 2, '2025-05-30', 'Trực tuyến'),
(98, 5, '2025-05-27', 'Chuyên khoa'),
(99, 5, '2025-05-27', 'Trực tuyến'),
(100, 5, '2025-05-28', 'Trực tuyến'),
(101, 5, '2025-05-28', 'Chuyên khoa'),
(102, 5, '2025-05-29', 'Chuyên khoa'),
(103, 5, '2025-05-29', 'Trực tuyến'),
(104, 5, '2025-05-30', 'Trực tuyến'),
(105, 5, '2025-05-30', 'Chuyên khoa'),
(106, 5, '2025-05-31', 'Chuyên khoa'),
(107, 5, '2025-05-31', 'Trực tuyến'),
(108, 6, '2025-05-26', 'Chuyên khoa'),
(109, 6, '2025-05-26', 'Trực tuyến'),
(110, 6, '2025-05-27', 'Trực tuyến'),
(111, 6, '2025-05-27', 'Chuyên khoa'),
(112, 6, '2025-05-29', 'Chuyên khoa'),
(113, 6, '2025-05-30', 'Chuyên khoa'),
(114, 6, '2025-05-30', 'Trực tuyến'),
(115, 7, '2025-05-26', 'Chuyên khoa'),
(116, 7, '2025-05-27', 'Trực tuyến'),
(117, 7, '2025-05-27', 'Chuyên khoa'),
(118, 7, '2025-05-28', 'Chuyên khoa'),
(119, 7, '2025-05-28', 'Trực tuyến'),
(120, 7, '2025-05-29', 'Trực tuyến'),
(121, 7, '2025-05-29', 'Chuyên khoa'),
(122, 7, '2025-05-30', 'Trực tuyến'),
(123, 8, '2025-05-27', 'Chuyên khoa'),
(124, 8, '2025-05-28', 'Chuyên khoa'),
(125, 8, '2025-05-29', 'Chuyên khoa'),
(126, 8, '2025-05-29', 'Trực tuyến'),
(127, 8, '2025-05-30', 'Trực tuyến'),
(128, 9, '2025-05-27', 'Chuyên khoa'),
(129, 9, '2025-05-28', 'Chuyên khoa'),
(130, 9, '2025-05-28', 'Trực tuyến'),
(131, 9, '2025-05-29', 'Trực tuyến'),
(132, 9, '2025-05-29', 'Chuyên khoa'),
(133, 9, '2025-05-30', 'Chuyên khoa'),
(134, 9, '2025-05-30', 'Trực tuyến'),
(135, 10, '2025-05-27', 'Chuyên khoa'),
(136, 10, '2025-05-27', 'Trực tuyến'),
(137, 10, '2025-05-28', 'Trực tuyến'),
(138, 10, '2025-05-28', 'Chuyên khoa'),
(139, 10, '2025-05-29', 'Chuyên khoa'),
(140, 10, '2025-05-30', 'Chuyên khoa'),
(141, 10, '2025-05-30', 'Trực tuyến'),
(142, 11, '2025-05-27', 'Chuyên khoa'),
(143, 11, '2025-05-28', 'Chuyên khoa'),
(144, 11, '2025-05-28', 'Trực tuyến'),
(145, 11, '2025-05-29', 'Trực tuyến'),
(146, 11, '2025-05-29', 'Chuyên khoa'),
(147, 11, '2025-05-30', 'Chuyên khoa'),
(148, 11, '2025-05-30', 'Trực tuyến'),
(149, 11, '2025-05-31', 'Trực tuyến'),
(150, 12, '2025-05-27', 'Chuyên khoa'),
(151, 12, '2025-05-27', 'Trực tuyến'),
(152, 12, '2025-05-28', 'Trực tuyến'),
(153, 12, '2025-05-29', 'Chuyên khoa'),
(154, 12, '2025-05-30', 'Chuyên khoa'),
(155, 12, '2025-05-30', 'Trực tuyến'),
(156, 13, '2025-05-27', 'Chuyên khoa'),
(157, 13, '2025-05-27', 'Trực tuyến'),
(158, 13, '2025-05-28', 'Chuyên khoa'),
(159, 13, '2025-05-29', 'Chuyên khoa'),
(160, 13, '2025-05-29', 'Trực tuyến'),
(161, 13, '2025-05-30', 'Trực tuyến'),
(162, 13, '2025-05-30', 'Chuyên khoa'),
(163, 14, '2025-05-27', 'Chuyên khoa'),
(164, 14, '2025-05-27', 'Trực tuyến'),
(165, 14, '2025-05-28', 'Trực tuyến'),
(166, 14, '2025-05-28', 'Chuyên khoa'),
(167, 14, '2025-05-29', 'Chuyên khoa'),
(168, 14, '2025-05-30', 'Trực tuyến'),
(169, 15, '2025-05-27', 'Chuyên khoa'),
(170, 15, '2025-05-27', 'Trực tuyến'),
(171, 15, '2025-05-28', 'Trực tuyến'),
(172, 15, '2025-05-28', 'Chuyên khoa'),
(173, 15, '2025-05-29', 'Chuyên khoa'),
(174, 15, '2025-05-29', 'Trực tuyến'),
(175, 15, '2025-05-30', 'Chuyên khoa'),
(176, 15, '2025-05-31', 'Trực tuyến'),
(177, 16, '2025-05-27', 'Chuyên khoa'),
(178, 16, '2025-05-28', 'Trực tuyến'),
(179, 16, '2025-05-29', 'Chuyên khoa'),
(180, 16, '2025-05-29', 'Trực tuyến'),
(181, 16, '2025-05-30', 'Trực tuyến'),
(182, 17, '2025-05-27', 'Chuyên khoa'),
(183, 17, '2025-05-28', 'Chuyên khoa'),
(184, 17, '2025-05-28', 'Trực tuyến'),
(185, 17, '2025-05-29', 'Trực tuyến'),
(186, 17, '2025-05-29', 'Chuyên khoa'),
(187, 17, '2025-05-30', 'Chuyên khoa'),
(188, 17, '2025-05-31', 'Trực tuyến'),
(189, 18, '2025-05-27', 'Chuyên khoa'),
(190, 18, '2025-05-28', 'Chuyên khoa'),
(191, 18, '2025-05-28', 'Trực tuyến'),
(192, 18, '2025-05-29', 'Chuyên khoa'),
(193, 18, '2025-05-30', 'Trực tuyến'),
(194, 18, '2025-05-31', 'Trực tuyến'),
(195, 19, '2025-05-27', 'Chuyên khoa'),
(196, 19, '2025-05-27', 'Trực tuyến'),
(197, 19, '2025-05-28', 'Trực tuyến'),
(198, 19, '2025-05-28', 'Chuyên khoa'),
(199, 19, '2025-05-29', 'Chuyên khoa'),
(200, 19, '2025-05-29', 'Trực tuyến'),
(201, 19, '2025-05-30', 'Trực tuyến'),
(202, 20, '2025-05-27', 'Chuyên khoa'),
(203, 20, '2025-05-28', 'Chuyên khoa'),
(204, 20, '2025-05-28', 'Trực tuyến'),
(205, 20, '2025-05-29', 'Trực tuyến'),
(206, 20, '2025-05-29', 'Chuyên khoa'),
(207, 20, '2025-05-30', 'Chuyên khoa');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieukhambenh`
--

CREATE TABLE `phieukhambenh` (
  `maPhieu` int(11) UNSIGNED NOT NULL,
  `maHoSo` int(11) UNSIGNED NOT NULL,
  `maBacSi` int(11) UNSIGNED NOT NULL,
  `maLichKham` int(11) UNSIGNED NOT NULL,
  `hoTenBenhNhan` varchar(100) NOT NULL,
  `ngayKham` date NOT NULL,
  `khungGioKham` varchar(50) NOT NULL,
  `tienSu` text DEFAULT NULL,
  `chanDoan` text DEFAULT NULL,
  `lyDoKham` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phieukhambenh`
--

INSERT INTO `phieukhambenh` (`maPhieu`, `maHoSo`, `maBacSi`, `maLichKham`, `hoTenBenhNhan`, `ngayKham`, `khungGioKham`, `tienSu`, `chanDoan`, `lyDoKham`) VALUES
(174, 21, 1, 83, 'Nguyễn Ánh', '2025-05-15', '08:00 - 08:30', 'Không', 'Không', 'Đau đầu'),
(175, 21, 1, 84, 'Nguyễn Ánh', '2025-05-16', '09:00 - 09:30', 'Không', 'Có', 'Ốm'),
(194, 21, 1, 85, 'Nguyễn Ánh', '2025-05-17', '08:00 - 08:30', 'Có', 'Có', 'testcase'),
(196, 21, 1, 88, 'Nguyễn Ánh', '2025-05-21', '08:00 - 08:30', 'Có', 'Có', 'Khám');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `maTaiKhoan` int(11) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `matKhau` varchar(255) NOT NULL,
  `maVaiTro` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`maTaiKhoan`, `username`, `matKhau`, `maVaiTro`) VALUES
(1, 'bacsi1', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(2, 'bacsi2', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(3, 'bacsi19', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(4, 'bacsi20', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(5, 'bacsi3', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(6, 'bacsi4', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(7, 'bacsi5', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(8, 'bacsi6', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(9, 'bacsi7', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(10, 'bacsi8', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(11, 'bacsi9', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(12, 'bacsi10', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(13, 'bacsi11', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(14, 'bacsi12', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(15, 'bacsi13', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(16, 'bacsi14', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(17, 'bacsi15', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(18, 'bacsi16', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(19, 'bacsi17', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(20, 'bacsi18', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 2),
(21, 'benhnhan1', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(22, 'benhnhan2', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(23, 'benhnhan3', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(24, 'benhnhan4', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(25, 'benhnhan5', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(26, 'benhnhan6', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(27, 'benhnhan7', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(28, 'benhnhan8', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(29, 'benhnhan9', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(30, 'benhnhan10', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(31, 'benhnhan11', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(32, 'benhnhan12', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(33, 'benhnhan13', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(34, 'benhnhan14', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(35, 'benhnhan15', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(36, 'benhnhan16', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(37, 'benhnhan17', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(38, 'benhnhan18', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(39, 'ahnyn', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 3),
(40, 'admin', '$2a$12$YxEQsPz9Niyr2HMJYspgNeMA5gJbXeXn1cLRdjfM9UuEt.XVSfzWS', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tinnhan`
--

CREATE TABLE `tinnhan` (
  `id` int(11) NOT NULL,
  `lichhen_id` int(11) UNSIGNED NOT NULL,
  `nguoigui_id` int(10) UNSIGNED NOT NULL,
  `role` enum('bacsi','benhnhan') NOT NULL,
  `noidung` text NOT NULL,
  `loaitinnhan` enum('text','file','image','video') NOT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `thoigian` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tinnhan`
--

INSERT INTO `tinnhan` (`id`, `lichhen_id`, `nguoigui_id`, `role`, `noidung`, `loaitinnhan`, `file_url`, `thoigian`) VALUES
(53, 83, 1, 'bacsi', 'Chào bạn', 'text', NULL, '2025-05-22 10:21:21'),
(54, 91, 19, 'benhnhan', 'Hi', 'text', NULL, '2025-05-22 10:22:07'),
(55, 91, 1, 'bacsi', 'Chào bạn', 'text', NULL, '2025-05-22 10:22:20'),
(56, 89, 19, 'benhnhan', 'Hi', 'text', NULL, '2025-05-22 10:24:00'),
(57, 83, 19, 'benhnhan', 'Chào', 'text', NULL, '2025-05-22 10:25:17'),
(58, 83, 1, 'bacsi', 'Có gì hông', 'text', NULL, '2025-05-22 10:25:30'),
(59, 83, 1, 'bacsi', 'Hôg', 'text', NULL, '2025-05-22 10:25:42'),
(60, 83, 19, 'benhnhan', 'h', 'text', NULL, '2025-05-22 10:26:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vaitro`
--

CREATE TABLE `vaitro` (
  `maVaiTro` int(11) UNSIGNED NOT NULL,
  `tenVaiTro` varchar(50) NOT NULL,
  `trangThai` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `vaitro`
--

INSERT INTO `vaitro` (`maVaiTro`, `tenVaiTro`, `trangThai`) VALUES
(1, 'quantrivien', 'Đang hoạt động'),
(2, 'bacsi', 'Đang hoạt động'),
(3, 'benhnhan', 'Đang hoạt động');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bacsi`
--
ALTER TABLE `bacsi`
  ADD PRIMARY KEY (`maBacSi`),
  ADD KEY `maKhoa` (`maKhoa`),
  ADD KEY `maTaiKhoan` (`maTaiKhoan`);

--
-- Chỉ mục cho bảng `benhnhan`
--
ALTER TABLE `benhnhan`
  ADD PRIMARY KEY (`maBenhNhan`),
  ADD KEY `maTaiKhoan` (`maTaiKhoan`);

--
-- Chỉ mục cho bảng `calamviec`
--
ALTER TABLE `calamviec`
  ADD PRIMARY KEY (`maCa`);

--
-- Chỉ mục cho bảng `chitiet_donthuoc`
--
ALTER TABLE `chitiet_donthuoc`
  ADD PRIMARY KEY (`maThuoc`),
  ADD KEY `FK_THUOC_DT` (`maDonThuoc`);

--
-- Chỉ mục cho bảng `chitiet_lichlamviec`
--
ALTER TABLE `chitiet_lichlamviec`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_lichLamViec` (`lichLamViec_ID`),
  ADD KEY `fk_caLamViec` (`caLamViec_ID`),
  ADD KEY `fk_khungGio` (`khungGio_ID`);

--
-- Chỉ mục cho bảng `donthuoc`
--
ALTER TABLE `donthuoc`
  ADD PRIMARY KEY (`maDonThuoc`),
  ADD KEY `FK_DT_PKB` (`maPhieuKhamBenh`);

--
-- Chỉ mục cho bảng `giaodichvnpay`
--
ALTER TABLE `giaodichvnpay`
  ADD PRIMARY KEY (`id_vnpay`),
  ADD KEY `maLich` (`maLich`);

--
-- Chỉ mục cho bảng `hosobenhnhan`
--
ALTER TABLE `hosobenhnhan`
  ADD PRIMARY KEY (`maHoSo`),
  ADD UNIQUE KEY `CCCD` (`CCCD`),
  ADD KEY `maBenhNhan` (`maBenhNhan`);

--
-- Chỉ mục cho bảng `khoa`
--
ALTER TABLE `khoa`
  ADD PRIMARY KEY (`maKhoa`);

--
-- Chỉ mục cho bảng `khunggio`
--
ALTER TABLE `khunggio`
  ADD PRIMARY KEY (`maKhungGio`),
  ADD KEY `fk_maCaLamViec` (`maCaLamViec`);

--
-- Chỉ mục cho bảng `lichkham`
--
ALTER TABLE `lichkham`
  ADD PRIMARY KEY (`maLich`),
  ADD KEY `maBenhNhan` (`maBenhNhan`),
  ADD KEY `maBacSi` (`maBacSi`),
  ADD KEY `maKhungGio` (`maKhungGio`);

--
-- Chỉ mục cho bảng `lichlamviec`
--
ALTER TABLE `lichlamviec`
  ADD PRIMARY KEY (`maLichLamViec`),
  ADD KEY `maBacSi` (`maBacSi`);

--
-- Chỉ mục cho bảng `phieukhambenh`
--
ALTER TABLE `phieukhambenh`
  ADD PRIMARY KEY (`maPhieu`),
  ADD KEY `maHoSo` (`maHoSo`),
  ADD KEY `maBacSi` (`maBacSi`),
  ADD KEY `phieukhambenh_ibfk_3` (`maLichKham`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`maTaiKhoan`),
  ADD KEY `maVaiTro` (`maVaiTro`);

--
-- Chỉ mục cho bảng `tinnhan`
--
ALTER TABLE `tinnhan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_TN_LK` (`lichhen_id`);

--
-- Chỉ mục cho bảng `vaitro`
--
ALTER TABLE `vaitro`
  ADD PRIMARY KEY (`maVaiTro`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bacsi`
--
ALTER TABLE `bacsi`
  MODIFY `maBacSi` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `benhnhan`
--
ALTER TABLE `benhnhan`
  MODIFY `maBenhNhan` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `calamviec`
--
ALTER TABLE `calamviec`
  MODIFY `maCa` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `chitiet_donthuoc`
--
ALTER TABLE `chitiet_donthuoc`
  MODIFY `maThuoc` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT cho bảng `chitiet_lichlamviec`
--
ALTER TABLE `chitiet_lichlamviec`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1152;

--
-- AUTO_INCREMENT cho bảng `donthuoc`
--
ALTER TABLE `donthuoc`
  MODIFY `maDonThuoc` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT cho bảng `giaodichvnpay`
--
ALTER TABLE `giaodichvnpay`
  MODIFY `id_vnpay` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT cho bảng `hosobenhnhan`
--
ALTER TABLE `hosobenhnhan`
  MODIFY `maHoSo` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `khoa`
--
ALTER TABLE `khoa`
  MODIFY `maKhoa` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `khunggio`
--
ALTER TABLE `khunggio`
  MODIFY `maKhungGio` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT cho bảng `lichkham`
--
ALTER TABLE `lichkham`
  MODIFY `maLich` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT cho bảng `lichlamviec`
--
ALTER TABLE `lichlamviec`
  MODIFY `maLichLamViec` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT cho bảng `phieukhambenh`
--
ALTER TABLE `phieukhambenh`
  MODIFY `maPhieu` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `maTaiKhoan` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT cho bảng `tinnhan`
--
ALTER TABLE `tinnhan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT cho bảng `vaitro`
--
ALTER TABLE `vaitro`
  MODIFY `maVaiTro` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bacsi`
--
ALTER TABLE `bacsi`
  ADD CONSTRAINT `bacsi_ibfk_1` FOREIGN KEY (`maKhoa`) REFERENCES `khoa` (`maKhoa`),
  ADD CONSTRAINT `bacsi_ibfk_2` FOREIGN KEY (`maTaiKhoan`) REFERENCES `taikhoan` (`maTaiKhoan`);

--
-- Các ràng buộc cho bảng `benhnhan`
--
ALTER TABLE `benhnhan`
  ADD CONSTRAINT `benhnhan_ibfk_1` FOREIGN KEY (`maTaiKhoan`) REFERENCES `taikhoan` (`maTaiKhoan`);

--
-- Các ràng buộc cho bảng `chitiet_donthuoc`
--
ALTER TABLE `chitiet_donthuoc`
  ADD CONSTRAINT `FK_THUOC_DT` FOREIGN KEY (`maDonThuoc`) REFERENCES `donthuoc` (`maDonThuoc`);

--
-- Các ràng buộc cho bảng `chitiet_lichlamviec`
--
ALTER TABLE `chitiet_lichlamviec`
  ADD CONSTRAINT `fk_caLamViec` FOREIGN KEY (`caLamViec_ID`) REFERENCES `calamviec` (`maCa`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_khungGio` FOREIGN KEY (`khungGio_ID`) REFERENCES `khunggio` (`maKhungGio`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_lichLamViec` FOREIGN KEY (`lichLamViec_ID`) REFERENCES `lichlamviec` (`maLichLamViec`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `donthuoc`
--
ALTER TABLE `donthuoc`
  ADD CONSTRAINT `FK_DT_PKB` FOREIGN KEY (`maPhieuKhamBenh`) REFERENCES `phieukhambenh` (`maPhieu`);

--
-- Các ràng buộc cho bảng `giaodichvnpay`
--
ALTER TABLE `giaodichvnpay`
  ADD CONSTRAINT `giaodichvnpay_ibfk_1` FOREIGN KEY (`maLich`) REFERENCES `lichkham` (`maLich`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `hosobenhnhan`
--
ALTER TABLE `hosobenhnhan`
  ADD CONSTRAINT `hosobenhnhan_ibfk_1` FOREIGN KEY (`maBenhNhan`) REFERENCES `benhnhan` (`maBenhNhan`);

--
-- Các ràng buộc cho bảng `khunggio`
--
ALTER TABLE `khunggio`
  ADD CONSTRAINT `fk_maCaLamViec` FOREIGN KEY (`maCaLamViec`) REFERENCES `calamviec` (`maCa`);

--
-- Các ràng buộc cho bảng `lichkham`
--
ALTER TABLE `lichkham`
  ADD CONSTRAINT `lichkham_ibfk_1` FOREIGN KEY (`maBenhNhan`) REFERENCES `benhnhan` (`maBenhNhan`),
  ADD CONSTRAINT `lichkham_ibfk_2` FOREIGN KEY (`maBacSi`) REFERENCES `bacsi` (`maBacSi`),
  ADD CONSTRAINT `lichkham_ibfk_3` FOREIGN KEY (`maKhungGio`) REFERENCES `khunggio` (`maKhungGio`);

--
-- Các ràng buộc cho bảng `lichlamviec`
--
ALTER TABLE `lichlamviec`
  ADD CONSTRAINT `lichlamviec_ibfk_1` FOREIGN KEY (`maBacSi`) REFERENCES `bacsi` (`maBacSi`);

--
-- Các ràng buộc cho bảng `phieukhambenh`
--
ALTER TABLE `phieukhambenh`
  ADD CONSTRAINT `phieukhambenh_ibfk_1` FOREIGN KEY (`maHoSo`) REFERENCES `hosobenhnhan` (`maHoSo`),
  ADD CONSTRAINT `phieukhambenh_ibfk_2` FOREIGN KEY (`maBacSi`) REFERENCES `bacsi` (`maBacSi`),
  ADD CONSTRAINT `phieukhambenh_ibfk_3` FOREIGN KEY (`maLichKham`) REFERENCES `lichkham` (`maLich`);

--
-- Các ràng buộc cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `taikhoan_ibfk_1` FOREIGN KEY (`maVaiTro`) REFERENCES `vaitro` (`maVaiTro`);

--
-- Các ràng buộc cho bảng `tinnhan`
--
ALTER TABLE `tinnhan`
  ADD CONSTRAINT `FK_TN_LK` FOREIGN KEY (`lichhen_id`) REFERENCES `lichkham` (`maLich`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
