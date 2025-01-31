import { Server as SocketIOServer } from "socket.io";
import Message, { MessageDocument } from "./models/MessagesModel";

const setupSocket = (server: any) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN   || "https://medico-w92y.onrender.com",
            // origin: "*",
            methods: ["GET", "POST", "PATCH", "DELETE"],
            credentials: true,
        },
    });


    const userSocketMap = new Map<string, string>();


    const doctorSocketMap = new Map<string, string>();

    const disconnect = (socket: any) => {
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }

        for (const [doctorId, socketId] of doctorSocketMap.entries()) {
            if (socketId === socket.id) {
                doctorSocketMap.delete(doctorId);
                break;
            }
        }
    };


    const sendMesage = async (message: MessageDocument) => {
        try {
            console.log("Saving message to database:", message); // Add this log
            const createdMessage = await Message.create(message);
            console.log("Message saved successfully:", createdMessage); // Add this log
    
            let messageData;
    
            if (message.senderModel === "User" && message.recipientModel === "Doctor") {
                messageData = await Message.findById(createdMessage._id)
                    .populate("sender", "fullname gender picture birthday address")
                    .populate("recipient", "name picture specialty experience fee about availability");
            } else if (message.senderModel === "Doctor" && message.recipientModel === "User") {
                messageData = await Message.findById(createdMessage._id)
                    .populate("recipient", "fullname gender picture birthday address")
                    .populate("sender", "name picture specialty experience fee about availability");
            }
    
            
    
            const recipientSocketId = message.recipientModel === "User"
                ? userSocketMap.get(message.recipient.toString())
                : doctorSocketMap.get(message.recipient.toString());
    
            const senderSocketId = message.senderModel === "User"
                ? userSocketMap.get(message.sender.toString())
                : doctorSocketMap.get(message.sender.toString());
    
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("receive-message", messageData);
            }
            if (senderSocketId) {
                io.to(senderSocketId).emit("sent-message", messageData);
            }
        } catch (err) {
            console.error("Error saving message to database:", err); // Add this log
        }
    };

    io.on("connection", (socket) => {
        console.log("a client connected");
        console.log(socket.handshake.query)

        const userId = Array.isArray(socket.handshake.query.userId)
            ? socket.handshake.query.userId[0]
            : socket.handshake.query.userId;

        const userType = Array.isArray(socket.handshake.query.userType)
            ? socket.handshake.query.userType[0]
            : socket.handshake.query.userType;

        if (userId && userType) {
            if (userType === "User") {
                userSocketMap.set(userId, socket.id);
                console.log("User connected", userId, "with socket Id", socket.id);
            } else if (userType === "Doctor") {
                doctorSocketMap.set(userId, socket.id);
                console.log("Doctor connected", userId, "with socket Id", socket.id);
            } else {
                console.log("Invalid user type");
            }
        } else {
            console.log("User ID or user type not provided");
        }

        socket.on("send-message", async (message) => {
            console.log("Received send-message event:", message); 
            await sendMesage(message);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
            disconnect(socket);
        });
    });
};

export default setupSocket;
