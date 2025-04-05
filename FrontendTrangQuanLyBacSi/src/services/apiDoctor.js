import axios from "../utils/axios-customize";

// doctor
export const fetchAllDoctor = (query) => {
  const URL_BACKEND = `/api/doctor/fetch-all-doctor?${query}`;
  return axios.get(URL_BACKEND);
};
export const fetchAllDoctorByID = (maBacSi) => {
  const URL_BACKEND = `/api/bacsi.php?action=getBacSiByID&maBacSi=${maBacSi}`;
  return axios.get(URL_BACKEND);
};
export const callCreateDoctor = (
  email,
  password,
  firstName,
  lastName,
  address,
  phoneNumber,
  chucVuId,
  gender,
  image,
  chuyenKhoaId,
  phongKhamId,
  mota,
  giaKhamVN,
  giaKhamNuocNgoai
) => {
  return axios.post("/api/doctor/create-doctor", {
    email,
    password,
    firstName,
    lastName,
    address,
    phoneNumber,
    chucVuId,
    gender,
    image,
    chuyenKhoaId,
    phongKhamId,
    mota,
    giaKhamVN,
    giaKhamNuocNgoai,
  });
};
export const updateDoctor = (
  maBacSi,
  hoTen,
  gioiTinh,
  soDienThoai,
  email,
  diaChi,
  giaKham,
  hinhAnh,
  moTa,
  maKhoa
) => {
  return axios.post("/api/bacsi.php?action=update-thongtin-bacsi", {
    maBacSi,
    hoTen,
    gioiTinh,
    soDienThoai,
    email,
    diaChi,
    giaKham,
    hinhAnh,
    moTa,
    maKhoa,
  });
};

export const deleteDoctor = (_id) => {
  return axios.delete(`/api/doctor/delete-doctor/${_id}`);
};

export const deleteLichHenn = (_id) => {
  return axios.delete(`/api/doctor/delete-lich-hen/${_id}`);
};

// CHUYÊN KHOA //
export const fetchAllChuyenKhoa = async () => {
  const URL_BACKEND = `/api/chuyenkhoa.php?action=getAllChuyenKhoa`;
  return axios.get(URL_BACKEND);
};
export const fetchChuyenKhoaByID = (query) => {
  const URL_BACKEND = `/api/doctor/fetch-chuyen-khoa-by-id?id=${query}`;
  return axios.get(URL_BACKEND);
};
export const createChuyenKhoa = (name, description, image) => {
  return axios.post("/api/doctor/create-chuyen-khoa", {
    name,
    description,
    image,
  });
};
export const deleteChuyenKhoa = (_id) => {
  return axios.delete(`/api/doctor/delete-chuyen-khoa/${_id}`);
};
export const updateChuyenKhoa = (_id, name, description, image) => {
  return axios.put("/api/doctor/update-chuyen-khoa", {
    _id,
    name,
    description,
    image,
  });
};

// fetch time
export const fetchKhungGioByCaLamViec = async () => {
  const URL_BACKEND = `/api/khunggio.php?action=getKhungGioTheoCa`;
  try {
    const response = await axios.get(URL_BACKEND);
    console.log("Dữ liệu từ khung giờ of ca làm :", response);
    if (response.error) {
      console.error("Lỗi từ API:", response.error);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
    return response;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

export const fetchKhungGio = () => {
  const URL_BACKEND = `/api/khunggio.php?action=getKhungGio`;
  return axios.get(URL_BACKEND);
};

// Hàm gọi API lấy ca làm việc
export const fetchCaLamViec = async () => {
  const URL_BACKEND = `/api/calamviec.php?action=getCaLamViec`;

  try {
    const response = await axios.get(URL_BACKEND);

    // Log kết quả trả về từ API
    console.log("Dữ liệu từ API:", response);

    // Kiểm tra nếu response trả về có lỗi
    if (response.error) {
      console.error("Lỗi từ API:", response.error);
      return []; // Trả về mảng rỗng nếu có lỗi
    }

    // Trả về dữ liệu ca làm việc từ response
    return response;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

export const getTimeSlotsByDoctorAndDate = async (maBacSi, ngayLamViec) => {
  const URL_BACKEND = `/api/lichlamviec.php?action=getLichLamViecTheoNgay&maBacSi=${maBacSi}&ngayLamViec=${ngayLamViec}`;

  try {
    const response = await axios.get(URL_BACKEND);

    console.log("Dữ liệu lịch làm việc từ API:", response);

    return response; // Trả về response.data thay vì response
  } catch (error) {
    console.error(
      "Lỗi khi gọi lịch làm việc API:",
      error.response ? error.response : error.message
    );
    return [];
  }
};

// them thoi gian kham benh
export const dangKyKhungGioKham = (maBS, ngayLam, khungGio) => {
  return axios
    .post("/api/lichlamviec.php?action=dang-ky-gio-kham", {
      maBacSi: maBS,
      ngayLamViec: ngayLam,
      maKhungGio: khungGio,
    })
    .then((response) => {
      // Xử lý phản hồi thành công
      console.log("Đăng ký giờ khám thành công:", response);
      return response; // Hoặc xử lý dữ liệu theo yêu cầu
    })
    .catch((error) => {
      // Xử lý lỗi nếu có
      if (error.response) {
        // Nếu có lỗi từ server, ta lấy thông tin lỗi từ response
        console.error("Lỗi từ server:", error.response);
      } else if (error.request) {
        // Nếu lỗi yêu cầu không nhận được phản hồi
        console.error("Lỗi yêu cầu:", error.request);
      } else {
        // Nếu có lỗi khác trong quá trình cấu hình yêu cầu
        console.error("Lỗi không xác định:", error.message);
      }
      return { error: "Đăng ký giờ khám thất bại" }; // Hoặc bạn có thể xử lý lỗi theo cách khác
    });
};

// xoa lich cu
export const xoaLichCu = (_id) => {
  return axios.post("/api/doctor/delete-old-time-slots", { _id: _id });
};
export const callUploadDoctorImg = (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);

    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload.php`, bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

// lấy bác sĩ thông qua id
export const fetchBacSiByMaBS = (maBacSi) => {
  const URL_BACKEND = `/api/bacsi.php?action=getBacSiByID&maBacSi=${maBacSi}`;
  return axios.get(URL_BACKEND);
};

// tim ra doctor thong qua id
export const fetchDoctorById = (id) => {
  const URL_BACKEND = `/api/doctor/view-doctor?id=${id}`;
  return axios.get(URL_BACKEND);
};

// hiển thị info doctor kèm theo thgian khám cho page đặt lịch khám
export const fetchDoctorByNgayGio1 = (id, idGioKhamBenh, ngayKham) => {
  const URL_BACKEND = `/api/doctor/page-dat-lich-kham?id=${id}&idGioKhamBenh=${idGioKhamBenh}&ngayKham=${ngayKham}`;
  return axios.get(URL_BACKEND);
};
export const fetchDoctorByNgayGio = (query) => {
  const URL_BACKEND = `/api/doctor/page-dat-lich-kham${query}`;
  return axios.get(URL_BACKEND);
};

// dat lich kham
export const datLichKhamBenh = (
  _idDoctor,
  _idTaiKhoan,
  patientName,
  email,
  gender,
  phone,
  dateBenhNhan,
  address,
  lidokham,
  hinhThucTT,
  tenGioKham,
  ngayKhamBenh,
  giaKham
) => {
  const data = {
    _idDoctor,
    _idTaiKhoan,
    patientName,
    email,
    gender,
    phone,
    dateBenhNhan,
    address,
    lidokham,
    hinhThucTT,
    tenGioKham,
    ngayKhamBenh,
    giaKham,
  };
  return axios.post("/api/doctor/dat-lich-kham", data);
};

// get lich kham
export const fetchLichKham = (idKhachHang) => {
  const URL_BACKEND = `/api/doctor/lich-hen?idKhachHang=${idKhachHang}`;
  return axios.get(URL_BACKEND);
};

// tim bac si thong qua id chuyen khoa
export const fetchDoctorByChuyenKhoa = (idChuyenKhoa) => {
  const URL_BACKEND = `/api/doctor/doctor-chuyen-khoa?idChuyenKhoa=${idChuyenKhoa}`;
  return axios.get(URL_BACKEND);
};

export const handleHuyOrder = (query) => {
  const URL_BACKEND = `/api/doctor/huy-order?idHuy=${query}`;
  return axios.post(URL_BACKEND);
};

export const findAllLichKhamByBacSi = (maBacSi) => {
  const URL_BACKEND = `/api/lichkham.php?action=getLichKhamByBacSi`;
  return axios.get(URL_BACKEND);
};

// // -----------------------
// export const xacNhanLich = (maBacSi, trangThaiXacNhan) => {
//     return axios.put('/api/lichkham.php?action=getLichKhamByBacSi', {
//         id, trangThaiXacNhan
//     })
// }
export const updateThongTinlichKham = (maBacSi, maLichKham, trangThai) => {
  return axios.put(`/api/lichkham.php?action=update-trang-thai-lich-kham&maBacSi=${maBacSi}&maLichKham=${maLichKham}&trangThai=${trangThai}`);
};

export const taoPhieuKhamBenh = (idHoSo, idBS, hoTen, ngayKham, tienSu, chuanDoan, lyDoKham) => {
  return axios.post('/api/phieukhambenh.php?action=tao-phieu-kham', {
    idHoSo,
    idBS,
    hoTen,
    ngayKham,
    tienSu,
    chuanDoan,
    lyDoKham
  }, {
    headers: {
      'Content-Type': 'application/json' // Đảm bảo gửi với Content-Type là application/json
    }
  });
};

