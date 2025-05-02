import axios from "../utils/axios-customize";
export const fetchOneAccKH = (maBenhNhan) => {
    const URL_BACKEND = `/api/benhnhan.php?action=getThongTinBenhNhan&maBenhNhan=${maBenhNhan}`;
    return axios.get(URL_BACKEND);
};
    // lấy bác sĩ thông qua id
    export const fetchBacSiByMaBS = (maBacSi) => {
        console.log("Đang gọi API với maBacSi: ", maBacSi); // 👈 debug ở đây
        const URL_BACKEND = `/api/bacsi.php?action=getBacSiByID&maBacSi=${maBacSi}`;
        return axios.get(URL_BACKEND);
    };
    