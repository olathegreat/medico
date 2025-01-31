import express , {Request, Response} from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import {v2 as cloudinary} from "cloudinary"
import UserRoutes from "./routes/UserRoutes"    
import DoctorRoutes from "./routes/DoctorRoutes"
import AdminRoutes from "./routes/AdminRoutes"
import AppointmentRoutes from "./routes/AppointmentRoutes"
import setupSocket from "./socket"
import messagesRoutes from "./routes/MessageRoutes"


dotenv.config();
mongoose.connect(process.env.DATABASE_LOCAL as string).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
})
mongoose.connection.on("connected", () => console.log("Mongoose connected to DB"));
mongoose.connection.on("error", (err) => console.error("Mongoose connection error:", err));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
 
const app = express();
 
// app.use(cors()) 


const allowedOrigins = ["https://medico-w92y.onrender.com", "http://localhost:7000" ];

app.use(cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));


app.use(express.json()); 


app.get('/health', async(req:Request, res:Response)=>{ 
    res.send({
        message: "health is okay!"
        
    })
}) 



app.use('/api/v1/user', UserRoutes)
app.use('/api/v1/doctor', DoctorRoutes)
app.use('/api/v1/admin', AdminRoutes)
app.use('/api/v1/appointment' , AppointmentRoutes)
app.use("/api/v1/messages", messagesRoutes)
        
const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})

setupSocket(server);
