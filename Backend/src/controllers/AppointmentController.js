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
exports.updateAppointment = exports.doctorGetAllAppointments = exports.adminGetAllAppointments = exports.doctorGetAppointments = exports.userGetAppointments = exports.createAppointment = void 0;
const AppointmentOrder_1 = __importDefault(require("../models/AppointmentOrder"));
const DoctorModel_1 = __importDefault(require("../models/DoctorModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const user = yield UserModel_1.default.findById(req.user._id);
    if (!user) {
        res.status(400).json({
            message: "user doesnt exist"
        });
        return;
    }
    const existingDoctor = yield DoctorModel_1.default.findById(req.body.doctor);
    if (!existingDoctor) {
        res.status(400).json({
            message: "doctor doesnt exist"
        });
        return;
    }
    try {
        const newAppointment = yield AppointmentOrder_1.default.create({
            user: req.user._id,
            doctor: req.body.doctor,
            date: req.body.date,
            time: req.body.time,
        });
        res.status(201).json({
            message: "appointment created",
            newAppointment
        });
    }
    catch (err) {
        res.status(400).json(err);
        return;
    }
});
exports.createAppointment = createAppointment;
const userGetAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAppointments = yield AppointmentOrder_1.default.find({ user: req.user._id, cancelled: false }).populate({
            path: 'user', select: "fullname picture birthday"
        }).populate({ path: 'doctor', select: "name speciality address1 address2 fee picture" }).sort('-createdAt');
        if (!userAppointments) {
            res.status(404).json({ message: "No appointments" });
            return;
        }
        res.status(200).json(userAppointments);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});
exports.userGetAppointments = userGetAppointments;
const doctorGetAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorAppointments = yield AppointmentOrder_1.default.find({ doctor: req.doctor._id }).populate({
            path: 'user', select: "fullname picture birthday"
        }).populate({ path: 'doctor', select: "name fee" });
        if (!doctorAppointments) {
            res.status(404).json({ message: "No appointments" });
            return;
        }
        res.status(200).json(doctorAppointments);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});
exports.doctorGetAppointments = doctorGetAppointments;
const adminGetAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.admin) {
        res.status(400).json({
            message: "you are not authorised to get all appointments"
        });
        return;
    }
    try {
        const allAppointments = yield AppointmentOrder_1.default.find({ cancelled: false }).populate({
            path: 'user', select: "fullname picture birthday"
        }).populate({ path: 'doctor', select: "name fee" });
        if (!allAppointments) {
            res.status(404).json({ message: "No appointments" });
            return;
        }
        res.status(200).json(allAppointments);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});
exports.adminGetAllAppointments = adminGetAllAppointments;
const doctorGetAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.doctor) {
        res.status(400).json({
            message: "you are not authorised to get all appointments"
        });
        return;
    }
    try {
        const allAppointments = yield AppointmentOrder_1.default.find({ cancelled: false, doctor: req.doctor._id }).populate({
            path: 'user', select: "fullname picture birthday"
        }).populate({ path: 'doctor', select: "name fee" });
        if (!allAppointments) {
            res.status(404).json({ message: "No appointments" });
            return;
        }
        res.status(200).json(allAppointments);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});
exports.doctorGetAllAppointments = doctorGetAllAppointments;
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    // if(!req.user){
    //     res.status(400).json({
    //         message: "you are not authorised"
    //     })
    // }
    const { id } = req.params;
    try {
        const existingAppointment = yield AppointmentOrder_1.default.findById(id);
        if (!existingAppointment) {
            res.status(404).json({ message: "no appointment with this id" });
            return;
        }
        existingAppointment.time = req.body.time || existingAppointment.time;
        existingAppointment.date = req.body.date || existingAppointment.date;
        existingAppointment.isCompleted = req.body.isComplete || existingAppointment.isCompleted;
        existingAppointment.payment = req.body.payment || existingAppointment.payment;
        existingAppointment.cancelled = req.body.cancelled || existingAppointment.cancelled;
        yield existingAppointment.save();
        res.status(201).json({
            existingAppointment
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err });
        return;
    }
});
exports.updateAppointment = updateAppointment;
