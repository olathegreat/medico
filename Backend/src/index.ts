import express , {Request, Response} from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import {v2 as cloudinary} from "cloudinary"
import UserRoutes from "./routes/UserRoutes"    


dotenv.config();
mongoose.connect(process.env.DATABASE_LOCAL as string).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

app.use(cors());

app.use(express.json());

app.get('/health', async(req:Request, res:Response)=>{ 
    res.send({
        message: "health is okay!"
        
    })
})

app.use('/api/v1/user', UserRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})
