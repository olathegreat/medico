import express from "express"
import { createAdmin, getAdmin, loginAdmin } from "../controllers/AdminController"
import { adminAccess } from "../middleware/adminChecker"
import multer from 'multer'


const router = express.Router();
const storage = multer.memoryStorage();


const upload = multer({ storage, limits:{
    fileSize: 5* 1024 *1024
} }); 


router.post('/', createAdmin)
router.post('/login-admin', loginAdmin)
router.get('/', adminAccess, getAdmin )






export default router
