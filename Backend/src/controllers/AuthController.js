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
exports.getUser = exports.updateCurrentUser = exports.loginUser = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = __importDefault(require("cloudinary"));
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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, address, gender, phone, birthday, picture, password } = req.body;
    try {
        const existingUser = yield UserModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: "Email already taken"
            });
            return;
        }
        const newUser = yield UserModel_1.default.create(req.body);
        createSendToken(newUser, 201, res);
    }
    catch (err) {
        res.status(400).json(err);
        return;
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "Please provide email and password"
        });
        return;
    }
    const user = yield UserModel_1.default.findOne({ email }).select("+password");
    if (!user || !(yield user.correctPassword(password, user.password))) {
        res.status(401).json({
            message: "Incorrect email or password"
        });
        return;
    }
    createSendToken(user, 200, res);
});
exports.loginUser = loginUser;
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
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, address, gender, phone, birthday, picture } = req.body;
        const existingUser = yield UserModel_1.default.findById(req.user._id);
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        existingUser.fullname = fullname;
        existingUser.address = address;
        existingUser.gender = gender;
        existingUser.phone = phone;
        existingUser.birthday = birthday;
        if (req.file) {
            const imageUrl = yield uploadImage(req.file);
            existingUser.picture = imageUrl;
        }
        yield existingUser.save();
        res.json(existingUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error Updating User" });
    }
});
exports.updateCurrentUser = updateCurrentUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield UserModel_1.default.findById(req.user._id);
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(existingUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error getting User" });
    }
});
exports.getUser = getUser;
// export const forgotPassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//     const user = await User.findOne({email: req.body.email});
//      if(!user){
//         return res.status(404).json({message: "There is no existing user with email"})
//      }
//      const resetToken = user.createPasswordResetToken();
// }
