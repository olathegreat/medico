import express from "express";
import multer from 'multer';
import { getDoctorMessagesList, getMessages, getUserMessagesList } from "../controllers/MessageController";
import { protect } from "../middleware/auth";
import { adminOrDoctorAccess } from "../middleware/adminChecker";



const messagesRoutes = express.Router();
const storage = multer.memoryStorage();


const upload = multer({
    storage, limits: {
        fileSize: 5 * 1024 * 1024
    }
});


messagesRoutes.get("/get-user-messages/:id", protect, getMessages);

messagesRoutes.get("/get-doctor-messages", adminOrDoctorAccess, getMessages)

messagesRoutes.get("/get-user-messages-contact", protect, getUserMessagesList)

messagesRoutes.get("/get-doctor-messages-contact", protect, getDoctorMessagesList)


export default messagesRoutes;

