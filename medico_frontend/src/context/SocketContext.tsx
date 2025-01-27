import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import io from "socket.io-client";
import { Socket } from "socket.io-client"; // Ensure proper imports
import { useSelector, useDispatch } from "react-redux";
import { DoctorType, UserType } from "../utils/types";
import { addMessages } from "../utils/appSlice";




  
  const SocketContext = createContext<typeof Socket | null>(null);
  
export interface UserMessageDocument {
  _id: string;
  sender: UserType;
  recipient: DoctorType;
  recipientModel?: string;
  senderModel?: string;
  messageType: string;
  content?: string;
  fileUrl?: string;
  timeStamp: Date;
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

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef<typeof Socket | null>(null);
  const user = useSelector((state: any) => state.app.user);
  const doctor = useSelector((state: any) => state.app.doctor);
  const selectedChatData = useSelector((state: any) => state.app.selectedChatData);
  const dispatch = useDispatch();

  const HOST = import.meta.env.VITE_ORIGIN;

  useEffect(() => {
    const currentUser = user || doctor;
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
        console.log("Connected to socket server as", userType);
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

      return () => {
        socket.current?.disconnect();
        console.log("Disconnected from socket server");
      };
    }
  }, [user, doctor, selectedChatData, dispatch, HOST]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
