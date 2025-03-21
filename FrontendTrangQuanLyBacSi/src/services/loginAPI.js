import axios from "../utils/axios-customize"

export const handleLoginDoctor = (username, password) => {
    const URL_BACKEND = '/api/user.php?action=login';
    const data = { username, password };
    return axios.post(URL_BACKEND, data);
}

export const handleLogouDoctort = () => {
    const URL_BACKEND = '/api/user.php?action=logout'    
    return axios.post(URL_BACKEND)
}

export const doiThongTinDoctor = (_idAcc, lastName, firstName, email, passwordMoi) => {
    return axios.put('/api/user.php?action=doi-mat-khau', {
        _idAcc, lastName, firstName, email, passwordMoi
    })
}

export const handleQuenPassword = (email_doimk) => {
    const URL_BACKEND = '/api/user.php?action=quen-mat-khau'       
    return axios.post(URL_BACKEND, {email_doimk})
}


