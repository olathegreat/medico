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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("cloudinary");
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const DoctorRoutes_1 = __importDefault(require("./routes/DoctorRoutes"));
const AdminRoutes_1 = __importDefault(require("./routes/AdminRoutes"));
const AppointmentRoutes_1 = __importDefault(require("./routes/AppointmentRoutes"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log(err);
});
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({
        message: "health is okay!"
    });
}));
app.use('/api/v1/user', UserRoutes_1.default);
app.use('/api/v1/doctor', DoctorRoutes_1.default);
app.use('/api/v1/admin', AdminRoutes_1.default);
app.use('/api/v1/appointment', AppointmentRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
