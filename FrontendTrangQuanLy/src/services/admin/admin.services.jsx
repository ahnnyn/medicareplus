import axios from "utils/axios-customize"

export const fetchAllVaiTro = async () => {
  const URL_BACKEND = `/api/vaitro.php?action=layDanhSachVaiTro`;
  return axios.get(URL_BACKEND);
};
export const createVaiTro = async (tenVaiTro) => {
  return axios.post("/api/vaitro.php?action=themVaiTro", { tenVaiTro });
};

export const updateVaiTro = async (maVaiTro, tenVaiTro) => {
  return axios.post("/api/vaitro.php?action=suaVaiTro", { maVaiTro, tenVaiTro });
};

export const deleteVaiTro = async (maVaiTro) => {
  return axios.delete(`/api/vaitro.php?action=xoaVaiTro&maVaiTro=${ maVaiTro }`);
};

export const fetchAllBenhNhan = async () => {
  const URL_BACKEND = `/api/benhnhan.php?action=getAllBenhNhan`;
  return axios.get(URL_BACKEND);
};

export const fetchOneAccKH = (maBenhNhan) => {
  const URL_BACKEND = `/api/benhnhan.php?action=getThongTinBenhNhan&maBenhNhan=${maBenhNhan}`;
  return axios.get(URL_BACKEND);
};