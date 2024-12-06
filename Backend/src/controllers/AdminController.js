"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDoctorAndAppointmentData = exports.getAdmin = exports.loginAdmin = exports.createAdmin = void 0;
const AdminModel_1 = __importDefault(require("../models/AdminModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const DoctorModel_1 = __importDefault(require("../models/DoctorModel"));
const AppointmentOrder_1 = __importDefault(require("../models/AppointmentOrder"));
dotenv_1.default.config();
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id: id.toString() }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
};
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieExpires = Number(process.env.JWT_COOKIE_EXPIRES || 1) * 24 * 60 * 60 * 1000;
    const cookieOptions = {
        expires: new Date(Date.now() + cookieExpires),
        httpOnly: true
    };
    // user.password = undefined;
    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        }
    });
};
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = yield cloudinary_1.default.v2.uploader.upload(dataURI, {
        quality: "auto",
        fetch_format: "auto",
        timeout: 180000
    });
    return uploadResponse.url;
});
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const existingAdmin = yield AdminModel_1.default.findOne({ email });
        if (existingAdmin) {
            res.status(400).json({
                message: "Email already taken"
            });
            return;
        }
        if (req.file) {
            const imageUrl = yield uploadImage(req.file);
            req.body.picture = imageUrl;
        }
        const newAdmin = yield AdminModel_1.default.create(req.body);
        createSendToken(newAdmin, 200, res);
        res.status(201).json({
            message: "Admin successfully created",
            newAdmin
        });
    }
    catch (err) {
        res.status(400).json(err);
        return;
    }
});
exports.createAdmin = createAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "Please provide email and password"
        });
        return;
    }
    const admin = yield AdminModel_1.default.findOne({ email }).select("+password");
    if (!admin || !(yield admin.correctPassword(password, admin.password))) {
        res.status(401).json({
            message: "Incorrect email or password"
        });
        return;
    }
    createSendToken(admin, 200, res);
});
exports.loginAdmin = loginAdmin;
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.admin;
    try {
        res.status(200).json({
            data
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAdmin = getAdmin;
const userDoctorAndAppointmentData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userNumber = yield UserModel_1.default.find().countDocuments();
        const doctorNumber = yield DoctorModel_1.default.find().countDocuments();
        const appointmentNumber = yield AppointmentOrder_1.default.find({ cancelled: false }).countDocuments();
        res.status(200).json({
            userNumber, doctorNumber, appointmentNumber
        });
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
});
exports.userDoctorAndAppointmentData = userDoctorAndAppointmentData;
