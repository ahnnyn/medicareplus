import axios from "../utils/axios-customize";
export const callLogin = (username, matKhau) => {
    const URL_BACKEND = '/api/user.php?action=login'
    const data = {
        username, matKhau
    }
    return axios.post(URL_BACKEND, data)
}

export const callLoginBenhNhan = (username, matKhau) => {
    const URL_BACKEND = '/api/user.php?action=login'
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

export const callRegisterBenhNhan = (email, password, firstName, lastName, address, phone, gender) => {
    const URL_BACKEND = '/api/user.php'
    const data = {
        email, password, firstName, lastName, address, phone, gender
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


export const fetchOneAccKH = (id) => {
    const URL_BACKEND = `/api/user.php`    
    return axios.get(URL_BACKEND)
}

export const doiThongTinKH = (_idAcc, lastName, firstName, email, phone, address, passwordMoi, image) => {
    return axios.put('/api/user.php', {
        _idAcc, lastName, firstName, email, phone, address, passwordMoi, image
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