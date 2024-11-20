import express from "express";
import { createDoctor, deleteDoctor, getDoctors, getOneDoctor, loginDoctor, updateDoctor } from "../controllers/DoctorController";
import {adminAccess, adminOrDoctorAccess} from "../middleware/adminChecker"
import multer from 'multer'



const router = express.Router();
const storage = multer.memoryStorage();


const upload = multer({ storage, limits:{
    fileSize: 5* 1024 *1024
} }); 

router.post('/', adminAccess, upload.single('picture'), createDoctor);
router.post('/login-doctor', loginDoctor)
router.patch('/:id',adminOrDoctorAccess, upload.single('picture'),updateDoctor )
router.get('/', getDoctors);
router.get('/:id', getOneDoctor)
router.delete('/:id', adminOrDoctorAccess,  deleteDoctor);

export default router;