"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AppointmentController_1 = require("../controllers/AppointmentController");
const auth_1 = require("../middleware/auth");
const adminChecker_1 = require("../middleware/adminChecker");
const router = express_1.default.Router();
router.post('/', auth_1.protect, AppointmentController_1.createAppointment);
router.get('/user-appointment', auth_1.protect, AppointmentController_1.userGetAppointments);
router.get('/doctor-appointment', adminChecker_1.adminOrDoctorAccess, AppointmentController_1.doctorGetAppointments);
router.get('/', adminChecker_1.adminOrDoctorAccess, AppointmentController_1.adminGetAllAppointments);
router.get('/doctor-appointment', adminChecker_1.adminOrDoctorAccess, AppointmentController_1.doctorGetAppointments);
router.patch('/:id', auth_1.protect, AppointmentController_1.updateAppointment);
router.patch('/admin-or-doctor/:id', adminChecker_1.adminOrDoctorAccess, AppointmentController_1.updateAppointment);
exports.default = router;
