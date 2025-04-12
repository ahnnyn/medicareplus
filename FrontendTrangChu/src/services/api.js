import axios from "../utils/axios-customize";
export const callLogin = (username, matKhau) => {
    const URL_BACKEND = '/api/user.php?action=login'
    const data = {
        username, matKhau
    }
    return axios.post(URL_BACKEND, data)
}

export const callLoginBenhNhan = (username, matKhau) => {
    const URL_BACKEND = '/api/benhnhan.php?action=login'
    const data = {
        username, matKhau
    }
    return axios.post(URL_BACKEND, data)
}

export const callRegister = (email, password, firstName, lastName, address, phone, gender) => {
    const URL_BACKEND = '/api/user.php'
    const data = {
        email, password, firstName, lastName, address, phone, gender
    }
    return axios.post(URL_BACKEND, data)
}

export const callRegisterBenhNhan = (email, hoTen, soDienThoai, username, matKhau) => {
    const URL_BACKEND = '/api/benhnhan.php?action=register'
    const data = {
        email, hoTen, soDienThoai, username, matKhau
    }
    return axios.post(URL_BACKEND, data)
}

export const callLogout = () => {
    const URL_BACKEND = '/api/user.php'    
    return axios.post(URL_BACKEND)
}

export const callLogoutBenhNhan = () => {
    const URL_BACKEND = '/api/user.php'    
    return axios.post(URL_BACKEND)
}


export const fetchOneAccKH = (maBenhNhan) => {
    const URL_BACKEND = `/api/benhnhan.php?action=getThongTinBenhNhan&maBenhNhan=${maBenhNhan}`;
    return axios.get(URL_BACKEND);
};

export const doiMatKhau = (_idAcc, idBN, username, matKhau, matKhauMoi) => {
    return axios.put('/api/benhnhan.php?action=doiMatKhau', {
        _idAcc, idBN, username, matKhau, matKhauMoi
    })
}

export const updateBenhNhan = (maBenhNhan,hoTen,gioiTinh,soDienThoai,email,diaChi,hinhAnh) => {
    return axios.post('/api/benhnhan.php?action=updateThongTinBenhNhan', {
        maBenhNhan,hoTen,gioiTinh,soDienThoai,email,diaChi,hinhAnh
    })
}

export const fetchAllAccKH = (query) => {
    const URL_BACKEND = `/api/user.php`    
    return axios.get(URL_BACKEND)
}

export const deleteAccKH = (id) => {
    const URL_BACKEND = `/api/user.php`    
    return axios.delete(URL_BACKEND)
}
// upload hình ảnh
export const callUploadBenhNhanImg = (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    return axios({
        method: 'post',
        url: '/api/uploadBenhNhan.php',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}