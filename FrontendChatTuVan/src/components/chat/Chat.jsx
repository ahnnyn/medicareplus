import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import { format } from "timeago.js";
import { fetchOneAccKH, fetchBacSiByMaBS } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import "./Chat.css";

const socket = io("http://localhost:5000"); // Server Socket.IO

const Chat = () => {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const patientId = searchParams.get("patientId");
  const doctorId = searchParams.get("doctorId");
  const currentUserID = searchParams.get("currentUserID");
  const currentUserRole = searchParams.get("currentRole");

  const [currentUserData, setCurrentUserData] = useState(null);
  const [receiverUserData, setReceiverUserData] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [text, setText] = useState("");
  const [img, setImg] = useState({ file: null, url: "" });
  const [emojiOpen, setEmojiOpen] = useState(false);

  const scrollRef = useRef();

  // Lấy thông tin người dùng
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUserRole === "benhnhan") {
          const currentUser = await fetchOneAccKH(currentUserID);
          const receiverUser = await fetchBacSiByMaBS(doctorId);
          setCurrentUserData(currentUser.data);
          setReceiverUserData(receiverUser.data);
        } else if (currentUserRole === "bacsi") {
          const currentUser = await fetchBacSiByMaBS(currentUserID);
          const receiverUser = await fetchOneAccKH(patientId);
          setCurrentUserData(currentUser.data);
          setReceiverUserData(receiverUser.data);
        }
      } catch (error) {
        console.error("Lỗi khi fetch người dùng:", error);
      }
    };

    fetchData();
  }, [currentUserID, currentUserRole, doctorId, patientId]);

  // Kết nối socket
  useEffect(() => {
    if (currentUserID) {
      socket.emit("addUser", currentUserID);
    }

    socket.on("receiveMessage", (message) => {
      setChatMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUserID]);

  // Gửi tin nhắn
  const handleSendMessage = () => {
    if (text.trim() !== "") {
      const newMessage = {
        senderId: currentUserID,
        receiverId: currentUserRole === "benhnhan" ? doctorId : patientId,
        text: text,
        img: img.url || null,
      };

      // Gửi qua socket
      socket.emit("sendMessage", newMessage);

      // Hiển thị local ngay
      setChatMessages((prev) => [
        ...prev,
        { ...newMessage, createdAt: new Date() },
      ]);
      setText("");
      setImg({ file: null, url: "" });
      setEmojiOpen(false);
    }
  };

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const avatarUrl = (user) => {
    if (!user || !user.hinhAnh) return "./avatar.png";
    const isDoctor = Object.prototype.hasOwnProperty.call(user, "maBacSi");
    const folder = isDoctor ? "bacsi" : "benhnhan";
    return `${import.meta.env.VITE_BACKEND_URL}/public/${folder}/${user.hinhAnh}`;
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={avatarUrl(receiverUserData)} alt="" />
          <div className="texts">
            <span>{receiverUserData?.hoTen || "Người dùng"}</span>
            <p>Đang trò chuyện</p>
          </div>
        </div>
      </div>

      <div className="center">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            ref={scrollRef}
            className={msg.senderId === currentUserID ? "message own" : "message"}
          >
            <div className="texts">
              {msg.img && <img src={msg.img} alt="img" />}
              <p>{msg.text}</p>
              <span>{format(msg.createdAt)}</span>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="preview" />
            </div>
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="upload" />
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleImg} />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt="emoji"
            onClick={() => setEmojiOpen((prev) => !prev)}
          />
          <div className="picker">{emojiOpen && <EmojiPicker onEmojiClick={handleEmoji} />}</div>
        </div>
        <button className="sendButton" onClick={handleSendMessage}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default Chat;
