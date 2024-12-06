"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage, limits: {
        fileSize: 5 * 1024 * 1024
    } });
router.post("/", AuthController_1.createUser);
router.post("/login", AuthController_1.loginUser);
router.patch('/', auth_1.protect, upload.single("picture"), AuthController_1.updateCurrentUser);
router.get('/', auth_1.protect, AuthController_1.getUser);
exports.default = router;
