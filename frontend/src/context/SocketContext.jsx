import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext.jsx";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext)
}
// create provider
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://chatorbit-deploy.onrender.com", {
        query : {
            userId: authUser._id
        }
      });
      //  backend addr
      setSocket(socket);

      // to get the users who are online: see socket.js -> we have getOnlineUsers event
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // cleanup - when socket unmounted then close the connection
      return () => socket.close();
    } else {
      // if the user is not auth...close the socket connection if existing
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
