"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controllers/AdminController");
const adminChecker_1 = require("../middleware/adminChecker");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage, limits: {
        fileSize: 5 * 1024 * 1024
    } });
router.post('/', AdminController_1.createAdmin);
router.post('/login-admin', AdminController_1.loginAdmin);
router.get('/', adminChecker_1.adminAccess, AdminController_1.getAdmin);
router.get('/user-doctor-appointment-statistics', adminChecker_1.adminAccess, AdminController_1.userDoctorAndAppointmentData);
exports.default = router;
