import axios from "../utils/axios-customize"

export const findAllLichKhamByBacSi = (maBacSi) => {
    const URL_BACKEND = `/api/lichkham.php?action=lich-kham-by-bac-si&maBacSi=${maBacSi}`    
    return axios.get(URL_BACKEND)
}

// upload hình ảnh
export const callUploadDoctorImg = (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    return axios({
        method: 'post',
        url: '/api/doctor/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}