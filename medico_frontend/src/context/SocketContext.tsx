import  {
    createContext,
    useContext,
    useEffect,
    useRef,
    ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { DoctorType, UserType } from "../utils/types";
import { addMessages } from "../utils/appSlice";

const SocketContext = createContext<Socket | null>(null);

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

// Hook to access socket context
export const useSocket = () => {
    return useContext(SocketContext);
};

// Provider Component
export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const socket = useRef<Socket | null>(null);
    const user = useSelector((state: any) => state.app.user);
    const doctor = useSelector((state: any) => state.app.doctor);
    const selectedChatData = useSelector((state: any) => state.app.selectedChatData);
    const dispatch = useDispatch();

    const HOST = import.meta.env.VITE_ORIGIN;
    

    useEffect(() => {
        // Determine the user type (User or Doctor)
        const currentUser = user || doctor;
        const userType = user ? "User" : "Doctor";

        if (currentUser) {
            // Initialize socket connection
            socket.current = io(HOST, {
                withCredentials: true,
                query: {
                    userId: currentUser._id,
                    userType,
                },
            });

            // On successful connection
            socket.current.on("connect", () => {
                console.log("Connected to socket server as", userType);
            });

            // Handle received messages
            const handleReceiveMessage = (message: any) => {
                if (
                    selectedChatData &&
                    (selectedChatData._id === message.sender._id ||
                        selectedChatData._id === message.recipient._id)
                ) {
                    console.log("Message received:", message);
                    dispatch(addMessages(message)); // Dispatch action to Redux store
                }
            };

            socket.current.on("receive-message", handleReceiveMessage);
            socket.current.on("sent-message", handleReceiveMessage);

            // Cleanup on component unmount
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
