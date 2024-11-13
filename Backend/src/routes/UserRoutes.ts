import express from "express";
import { createUser, getUser, loginUser, updateCurrentUser } from "../controllers/AuthController";
import { protect } from "../midlleware/auth";
import multer from 'multer'

const router = express.Router();
const storage = multer.memoryStorage(); 

const upload = multer({ storage, limits:{
    fileSize: 5* 1024 *1024
} }); 
router.post("/register", createUser);
router.post("/login", loginUser);
router.patch('/update-user', protect,upload.single("picture"), updateCurrentUser);    
router.get('/', protect, getUser)

export default router;


