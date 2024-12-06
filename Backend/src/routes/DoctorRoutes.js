"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DoctorController_1 = require("../controllers/DoctorController");
const adminChecker_1 = require("../middleware/adminChecker");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage, limits: {
        fileSize: 5 * 1024 * 1024
    } });
router.post('/', adminChecker_1.adminAccess, upload.single('picture'), DoctorController_1.createDoctor);
router.post('/login-doctor', DoctorController_1.loginDoctor);
router.patch('/:id', adminChecker_1.adminOrDoctorAccess, upload.single('picture'), DoctorController_1.updateDoctor);
router.get('/', DoctorController_1.getDoctors);
router.get('/:id', DoctorController_1.getOneDoctor);
// router.get('/get-doctor',adminOrDoctorAccess, getOneDoctor)
router.delete('/:id', adminChecker_1.adminOrDoctorAccess, DoctorController_1.deleteDoctor);
router.get('/doctor-appointment-statistics/:id', adminChecker_1.adminOrDoctorAccess, DoctorController_1.doctorAppointmentData);
exports.default = router;
