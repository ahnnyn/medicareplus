import axios from "../utils/axios-customize";

// CHUYÊN KHOA //
export const fetchAllChuyenKhoa = async (query = '') => {
    let URL_BACKEND = `/api/chuyenkhoa.php?action=getAllChuyenKhoa`;
    if (query) {
        URL_BACKEND += `&name=${encodeURIComponent(query)}`;
    }
    return axios.get(URL_BACKEND);
};


export const fetchChuyenKhoaByID = (maKhoa) => {
    const URL_BACKEND = `/api/chuyenkhoa.php?action=getChuyenKhoaById&maKhoa=${maKhoa}`
    return axios.get(URL_BACKEND)
}
export const findChuyenKhoaByTen = (query) => {
    const URL_BACKEND = `/api/chuyenkhoa.php?action=search&${query}`;
    return axios.get(URL_BACKEND);
};

// BÁC SĨ //
export const fetchAllBacSi = async () => {
    const URL_BACKEND = `/api/bacsi.php?action=getAllDoctors`;
    return axios.get(URL_BACKEND)
};
export const findBacSiByTen = (query) => {
    const URL_BACKEND = `/api/bacsi.php?action=search&${query}`;
    return axios.get(URL_BACKEND);
  };
export const updateBacSi = (maBacSi, email, firstName, lastName, address, phoneNumber, chucVuId, gender, image, chuyenKhoaId, phongKhamId, roleId, mota, giaKhamVN, giaKhamNuocNgoai) => {
    return axios.put('/api/bacsi.php', {
        _id, email, firstName, lastName, address, phoneNumber, chucVuId, gender, image, chuyenKhoaId, phongKhamId, roleId, mota, giaKhamVN, giaKhamNuocNgoai
    })
}

export const deleteBacSi = (maBacSi) => {
    return axios.delete(`/api/bacsi.php/${maBacSi}`)
}
    // lấy thông tin bác sĩ theo chuyên khoa
    export const fetchBacSiByChuyenKhoa = (maKhoa) => {
        const URL_BACKEND = `/api/bacsi.php?action=getBacSiByChuyenKhoa&maKhoa=${maKhoa}`
        return axios.get(URL_BACKEND)
    }
    
    // lấy bác sĩ thông qua id
    export const fetchBacSiByMaBS = (maBacSi) => {
        console.log("Đang gọi API với maBacSi: ", maBacSi); // 👈 debug ở đây
        const URL_BACKEND = `/api/bacsi.php?action=getBacSiByID&maBacSi=${maBacSi}`;
        return axios.get(URL_BACKEND);
    };
    

    // hiển thị info doctor kèm theo thgian khám cho page đặt lịch khám
export const fetchBacSiByNgayGio1 = (id, idGioKhamBenh, ngayKham) => {
    const URL_BACKEND = `/api/bacsi.php?id=${id}&idGioKhamBenh=${idGioKhamBenh}&ngayKham=${ngayKham}`
    return axios.get(URL_BACKEND)
}
export const fetchBacSiByNgayGio = (query) => {
    const URL_BACKEND = `/api/bacsi.php`
    return axios.get(URL_BACKEND)
}

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

  export const getTimeSlotsByDoctor = async (maBacSi) => {
    const URL_BACKEND = `/api/lichlamviec.php?action=getLichLamViec&maBacSi=${maBacSi}`;
  
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

// fetch time
export const fetchAllTime = () => {
    const URL_BACKEND = `/api/bacsi.php`;
    return axios.get(URL_BACKEND)
}
export const fetchAllTime2 = (doctorId, date) => {
    const URL_BACKEND = `/api/bacsi.php`;
    return axios.get(URL_BACKEND);
}

// them thoi gian kham benh
export const addTimeKhamBenh = (date, time, _id) => {
    return axios.post('/api/bacsi.php', {
        date, time, _id
    })
}
// xoa lich cu
export const xoaLichCu = (_id) => {
    return axios.post('/api/bacsi.php', { _id: _id })
}

// upload hình ảnh
export const callUploadBacSiImg = (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    return axios({
        method: 'post',
        url: '/api/bacsi.php',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}

// thêm bệnh nhân
export const createBenhNhan = (email, password, firstName, lastName, phone, image, address) => {
    return axios.post('/api/bacsi.php', {
        email, password, firstName, lastName, phone, image, address
    })
}
export const updateBenhNhan = (_id, email, password, firstName, lastName, phone, image, address) => {
    return axios.put('/api/bacsi.php', {
        _id, email, password, firstName, lastName, phone, image, address
    })
}

// dat lich kham
// Đặt lịch khám thông thường
export const datLichKhamBenh = (
    maBenhNhan, maBacSi, khungGioKham, tenBenhNhan,email, soDienThoai, giaKham, gioKham, ngayKhamBenh, lyDoKham, hinhThucThanhToan, hinhThucKham
) => {
    return axios.post('/api/lichkham.php?action=dat-lich-kham-moi', {
        maBenhNhan,
        maBacSi,
        khungGioKham,
        tenBenhNhan,
        email,
        soDienThoai,
        giaKham,
        gioKham,
        ngayKhamBenh,
        lyDoKham,
        hinhThucThanhToan,
        hinhThucKham
    })
}

export const datLichKhamBenhVnPay = (maBenhNhan, maBacSi, khungGioKham, tenBenhNhan, email, soDienThoai, giaKham, gioKham, ngayKhamBenh, lyDoKham, hinhThucThanhToan, hinhThucKham
) => {
    return axios.post('/api/lichkham.php?action=dat-lich-kham-moi', {
        maBenhNhan,
        maBacSi,
        khungGioKham,
        tenBenhNhan,
        email,
        soDienThoai,
        giaKham,
        gioKham,
        ngayKhamBenh,
        lyDoKham,
        hinhThucThanhToan,
        hinhThucKham
    })
};

export const taoVnPayUrl = (maLichKham, amount, tenBenhNhan) => {
    const URL_BACKEND = `/api/thanhtoan.php?action=thanh-toan&maLichKham=${maLichKham}&amount=${amount}&tenBenhNhan=${tenBenhNhan}`    
    return axios.get(URL_BACKEND)
}

export const getThongBaoThanhToan = (data) => {
  const URL_BACKEND = `/api/thanhtoan.php?action=thong-tin-thanh-toan`;
  return axios.post(URL_BACKEND, data); // truyền data để lưu
};

export const capNhatTrangThaiThanhToanLichKham = (data) => {
  const URL_BACKEND = `/api/lichkham.php?action=cap-nhat-thanh-toan`;
  return axios.post(URL_BACKEND, data); // truyền mã lịch khám
};


// get lich kham
export const fetchLichKham = (maBenhNhan) => {
    const URL_BACKEND = `/api/lichhen.php?action=lich-hen&maBenhNhan=${maBenhNhan}`;
    return axios.get(URL_BACKEND);
};


export const handleHuyOrder = (query) => {
    const URL_BACKEND = `/api/bacsi.php?idHuy=${query}`
    return axios.post(URL_BACKEND)
}

export const findAllLichHen = (query) => {
    const URL_BACKEND = `/api/bacsi.php?${query}`
    return axios.get(URL_BACKEND)
}

export const handleCreateCauHoi = (email, firstName, lastName, chuyenKhoaId, cauHoi) => {
    const URL_BACKEND = `/api/bacsi.php`
    const data = {
        email, firstName, lastName, chuyenKhoaId, cauHoi
    }
    return axios.post(URL_BACKEND, data)
}

export const getAllCauHoi = (query) => {
    const URL_BACKEND = `/api/bacsi.php?${query}`
    return axios.get(URL_BACKEND)
}

export const handleQuenPassword = (email_doimk) => {
    const URL_BACKEND = '/api/benhnhan.php?action=quenMatKhau'
    return axios.post(URL_BACKEND, { email_doimk })
}

export const handleThongKe = (trangThaiKham, _idDoctor) => {
    const URL_BACKEND = `/api/bacsi.php`
    let data = {
        trangThaiKham, _idDoctor
    }
    return axios.post(URL_BACKEND, data)
}
export const fetchHoSoBenhNhan = (maBenhNhan) => {
    const URL_BACKEND = `/api/hosobenhnhan.php?action=getHoSoBenhNhan&maBenhNhan=${maBenhNhan}`;
    return axios.get(URL_BACKEND);
};

export const taoHoSoBenhNhan = (maBenhNhan, hoTenBenhNhan, ngaySinh, gioiTinh, ngheNghiep, CCCD, diaChi) => {
    const URL_BACKEND = `/api/hosobenhnhan.php?action=taoHoSo`
    const data = {
        maBenhNhan, hoTenBenhNhan, ngaySinh, gioiTinh, ngheNghiep, CCCD, diaChi
    }
    return axios.post(URL_BACKEND, data);
};
export const updateHoSoBenhNhan = (maBenhNhan, hoTenBenhNhan, ngaySinh, gioiTinh, ngheNghiep, CCCD, diaChi) => {
    const URL_BACKEND = `/api/hosobenhnhan.php?action=updateHoSo`
    const data = {
        maBenhNhan, hoTenBenhNhan, ngaySinh, gioiTinh, ngheNghiep, CCCD, diaChi
    }
    return axios.post(URL_BACKEND, data);
};
export const deleteHoSoBenhNhan = (maBenhNhan) => {
    return axios.delete(`/api/hosobenhnhan.php?action=xoaHoSo&maBenhNhan=${maBenhNhan}`);
};


export const fetchAllPhieuKhamBenh = (maHoSo) => {
    const URL_BACKEND = `/api/phieukhambenh.php?action=lay-phieu-kham-benh&maHoSo=${maHoSo}`;
    return axios.get(URL_BACKEND);
};

export const updateLichHen = (maLich, maBacSi, maKhungGio, ngayKham, lyDoKham, hinhThucKham) => {
  const URL_BACKEND = `/api/lichhen.php?action=updateLichHen`;
  const data = {
    maLich,
    maBacSi,
    maKhungGio,
    ngayKham,
    lyDoKham,
    hinhThucKham,
  };

  return axios.post(URL_BACKEND, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteLichHen = (maLich) => {
    return axios.delete(`/api/lichhen.php?action=xoaLichHen&maLich=${maLich}`);
};

export const fetchKhungGioBacSiByNgay = (maBacSi, ngayLamViec) => {
  const URL_BACKEND = `/api/lichlamviec.php?action=getLichLamViecTheoNgay`;
  return axios.get(URL_BACKEND, {
    params: { maBacSi, ngayLamViec }
  });
};
export const getKhungGioByNgay = (maBacSi, hinhThucKham, ngayLamViec, maLichDangSua = null) => {
  const URL_BACKEND = `/api/khunggio.php?action=getKhungGioByNgay`;
  const params = { maBacSi, hinhThucKham, ngayLamViec };

  if (maLichDangSua) {
    params.maLichDangSua = maLichDangSua;
  }

  return axios.get(URL_BACKEND, { params });
};


export const fetchNgayLamViecByBacSi = (maBacSi, hinhThucKham) => {
  const URL_BACKEND = `/api/lichlamviec.php?action=getNgayLamViecByBacSi`;
  return axios.get(URL_BACKEND, {
    params: {maBacSi, hinhThucKham }
  });
};