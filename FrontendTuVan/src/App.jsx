import ChatPage from "./pages/ChatPage";

import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
const App = () => {


  return (
    <div className="container">
        <>
           <ChatPage />
           
        </>

    </div>
  );
};

export default App;