import express from "express";
import { adminGetAllAppointments, createAppointment, doctorGetAppointments, updateAppointment, userGetAppointments } from "../controllers/AppointmentController";
import { protect } from "../middleware/auth";
import { adminOrDoctorAccess } from "../middleware/adminChecker";

const router = express.Router();


router.post('/', protect, createAppointment);
router.get('/user-appointment', protect, userGetAppointments) ;
router.get('/doctor-appointment', adminOrDoctorAccess, doctorGetAppointments);
router.get('/', adminOrDoctorAccess, adminGetAllAppointments );
router.get('/doctor-appointment', adminOrDoctorAccess, doctorGetAppointments)
router.patch('/:id' , protect , updateAppointment);
router.patch('/admin-or-doctor/:id', adminOrDoctorAccess, updateAppointment)


export default router;