import express from "express";
import { createDoctor, deleteDoctor, doctorAppointmentData, getDoctors, getOneDoctor, loginDoctor, updateDoctor } from "../controllers/DoctorController";
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
router.get('/:id', getOneDoctor);

// router.get('/get-doctor',adminOrDoctorAccess, getOneDoctor)
router.delete('/:id', adminOrDoctorAccess,  deleteDoctor);
router.get('/doctor-appointment-statistics/:id', adminOrDoctorAccess, doctorAppointmentData)

export default router;