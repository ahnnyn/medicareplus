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

export const doiThongTinDoctor = async (idAcc, idBS, username, password, passwordMoi) => {
    try {
        const response = await axios.post('/api/user.php?action=doi-mat-khau', {
            idAcc, idBS, username, password, passwordMoi
        });

        console.log("📥 API Full Response:", response);
        return response;
    } catch (error) {
        console.error("❌ Lỗi khi gửi request:", error);
        return {
            success: false,
            message: error.response?.message || "Không thể kết nối API"
        };
    }
};

export const handleQuenPassword = (email_doimk) => {
    const URL_BACKEND = '/api/user.php?action=quen-mat-khau'       
    return axios.post(URL_BACKEND, {email_doimk})
}


