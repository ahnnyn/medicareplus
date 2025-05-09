import "./ChatList.css";
import { fetchOneAccKH, fetchBacSiByMaBS } from "../../../services/api";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ChatList = () => {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const patientId = searchParams.get("patientId");
  const doctorId = searchParams.get("doctorId");
  const currentUserID = searchParams.get("currentUserID");
  const currentUserRole = searchParams.get("currentRole");

  const [targetUser, setTargetUser] = useState(null);

  useEffect(() => {
    const fetchTargetUser = async () => {
      try {
        let res;
        if (currentUserRole === "benhnhan" && doctorId) {
          res = await fetchBacSiByMaBS(doctorId);
        } else if (currentUserRole === "bacsi" && patientId) {
          res = await fetchOneAccKH(patientId);
        }

        if (res && res.data) {
          setTargetUser(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người chat cùng:", error);
      }
    };

    if (currentUserRole && (doctorId || patientId)) {
      fetchTargetUser();
    }
  }, [currentUserRole, doctorId, patientId]);

  // Tạo link avatar
  const getAvatarUrl = () => {
    if (targetUser?.hinhAnh) {
      const folder = currentUserRole === "benhnhan" ? "bacsi" : "benhnhan";
      return `${import.meta.env.VITE_BACKEND_URL}/public/${folder}/${targetUser.hinhAnh}`;
    }
    return "./avatar.png";
  };

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img src="./minus.png" alt="" className="add" />
      </div>

      <div className="item" style={{ backgroundColor: "transparent" }}>
        <img src={getAvatarUrl()} alt="avatar" />
        <div className="texts">
          <span>{targetUser?.hoTen || "Đang tải..."}</span>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
