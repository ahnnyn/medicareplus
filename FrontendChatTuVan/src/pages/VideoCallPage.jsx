// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";
// import IncomingCallModal from "../components/IncommingCallModal";

// const socket = io("http://localhost:5000");

// const VideoCallPage = () => {
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const peerConnection = useRef(null);
//   const { roomId } = useParams();
//   const [incomingCallModal, setIncomingCallModal] = useState(null); // State for modal

//   useEffect(() => {
//     if (!roomId) {
//       console.error("Room ID is required!");
//       return;
//     }

//     // Join the room
//     socket.emit("join", roomId);

//     // Request user media (camera and microphone)
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         localVideoRef.current.srcObject = stream;

//         socket.on("joined", async () => {
//           peerConnection.current = createPeerConnection();
//           stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));

//           const offer = await peerConnection.current.createOffer();
//           await peerConnection.current.setLocalDescription(offer);
//           socket.emit("offer", { offer, room: roomId });
//         });

//         socket.on("offer", async (offer) => {
//           peerConnection.current = createPeerConnection();
//           await peerConnection.current.setRemoteDescription(offer);
//           const answer = await peerConnection.current.createAnswer();
//           await peerConnection.current.setLocalDescription(answer);
//           socket.emit("answer", { answer, room: roomId });
//         });

//         socket.on("answer", async (answer) => {
//           await peerConnection.current.setRemoteDescription(answer);
//         });

//         socket.on("ice-candidate", async (candidate) => {
//           if (peerConnection.current) {
//             await peerConnection.current.addIceCandidate(candidate);
//           }
//         });

//         socket.on("incomingCallFromDoctor", ({ from, roomId }) => {
//           const audio = new Audio("/ringtone.mp3");
//           audio.play().catch(e => console.warn("⚠️ Cannot play ringtone:", e));

//           // Show incoming call modal
//           setIncomingCallModal({ isOpen: true, from, roomId });
//         });
//       })
//       .catch(err => {
//         console.error("Error accessing media devices:", err);
//       });
//   }, [roomId]);

//   const createPeerConnection = () => {
//     const pc = new RTCPeerConnection();
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { candidate: event.candidate, room: roomId });
//       }
//     };
//     pc.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };
//     return pc;
//   };

//   // Handle the acceptance of the call
//   const handleAcceptCall = () => {
//     socket.emit("answerCall", { roomId });
//     setIncomingCallModal(null);
//   };

//   // Handle the rejection of the call
//   const handleRejectCall = () => {
//     setIncomingCallModal(null); // Close the modal
//   };

//   return (
//     <div>
//       <h2>Cuộc gọi video với bác sĩ</h2>
//       <video ref={localVideoRef} autoPlay muted style={{ width: '100%' }} />
//       <video ref={remoteVideoRef} autoPlay style={{ width: '100%' }} />
      
//       {/* Display Incoming Call Modal */}
//       {incomingCallModal && (
//         <IncomingCallModal
//           visible={incomingCallModal.isOpen}
//           from={incomingCallModal.from}
//           roomId={incomingCallModal.roomId}
//           onAccept={handleAcceptCall}
//           onReject={handleRejectCall}
//         />
//       )}
//     </div>
//   );
// };

// export default VideoCallPage;