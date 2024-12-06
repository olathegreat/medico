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
exports.adminOrDoctorAccess = exports.adminAccess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminModel_1 = __importDefault(require("../models/AdminModel"));
const DoctorModel_1 = __importDefault(require("../models/DoctorModel"));
const adminAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new Error('You are not logged in as admin, please do so'));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const freshAdmin = yield AdminModel_1.default.findById(decoded.id);
        if (!freshAdmin)
            throw new Error('Admin no longer exists');
        if (freshAdmin.changedPasswordAfter(decoded.iat))
            throw new Error('Password recently changed');
        req.admin = freshAdmin;
        next();
    }
    catch (error) {
        res.status(401).json({ message: error.message || 'Unauthorized' });
    }
});
exports.adminAccess = adminAccess;
const adminOrDoctorAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new Error('You are not logged in as admin, please do so'));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const freshAdmin = yield AdminModel_1.default.findById(decoded.id);
        const freshDoctor = yield DoctorModel_1.default.findById(decoded.id);
        if (!freshAdmin && !freshDoctor)
            throw new Error('Admin or Doctor no longer exists');
        if (freshDoctor && freshDoctor.changedPasswordAfter(decoded.iat)) {
            throw new Error('Doctor password recently changed. Please log in again.');
        }
        if (freshAdmin && freshAdmin.changedPasswordAfter(decoded.iat))
            throw new Error('Password recently changed');
        if (freshAdmin) {
            req.admin = freshAdmin;
        }
        if (freshDoctor) {
            req.doctor = freshDoctor;
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: error.message || 'Unauthorized' });
    }
});
exports.adminOrDoctorAccess = adminOrDoctorAccess;
