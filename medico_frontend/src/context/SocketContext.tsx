import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import io from "socket.io-client";
// import { Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { DoctorType, UserType } from "../utils/types";
import { addMessages } from "../utils/appSlice";




  

  
export interface UserMessageDocument {
  _id: string;
  sender: UserType;
  recipient: DoctorType;
  recipientModel?: string;
  senderModel?: string;
  messageType: string;
  content?: string;
  fileUrl?: string;
  timeStamp?: Date;
}

export interface DoctorMessageDocument {
  _id: string;
  sender: DoctorType;
  recipient: UserType;
  recipientModel?: string;
  senderModel?: string;
  messageType: string;
  content?: string;
  fileUrl?: string;
  timeStamp: Date;
}
const SocketContext = createContext<any>(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef<any>(null);
  const user = useSelector((state: any) => state.app.user);
  const doctor = useSelector((state: any) => state.app.doctor);
  const selectedChatData = useSelector((state: any) => state.app.selectedChatData);
  const dispatch = useDispatch();

  const HOST = import.meta.env.VITE_ORIGIN;

  useEffect(() => {
    const currentUser = user ? user  : doctor ;
    const userType = user ? "User" : "Doctor";

    if (currentUser) {
      socket.current = io(HOST, {
        transportOptions: {
            polling: {
              withCredentials: true,  // Use this in transportOptions
            },
          },
        query: {
          userId: currentUser._id,
          userType,
        },
      });

      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });

      socket.current.on("connect_error", (err: any) => {
        console.error("Socket connection error:", err); // Add this log
    });

      
         
      
      const handleReceiveMessage = (message: any) => {
        
        
        if (
          selectedChatData &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          console.log("Message received:", message);
          dispatch(addMessages(message));
        }
      };

      socket.current.on("receive-message", handleReceiveMessage);
      socket.current.on("sent-message", handleReceiveMessage);

    //   return () => {
    //     socket.current.disconnect();
    //     console.log("Disconnected from socket server");
    //   };
    }
  }, [user, doctor]);

  return (
    <SocketContext.Provider value={socket.current}>
       
      {children}
    </SocketContext.Provider>
  );
};
