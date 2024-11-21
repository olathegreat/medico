import {Request, Response} from "express";
import Doctor, {DoctorDocument} from "../models/DoctorModel";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import cloudinary from "cloudinary"
import {ObjectId } from "mongoose";


dotenv.config();


type DoctorType = {
    _id: ObjectId;
    name: string;
    email: string;
    address1?: string;
    address2?: string;
    speciality: string;
    experience?: string;
    degree: string;
    fee:number;
    about:string;
    picture?: string;
    password: string;
}

interface AuthenticatedRequest extends Request {
    user?: DoctorDocument | undefined;
}

const signToken = (id: ObjectId) => {
    return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

const createSendToken = (user: DoctorType, statusCode: number, res: Response): void => {
    const token = signToken(user._id as ObjectId);
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
    })


}
const uploadImage = async (file: Express.Multer.File) => {
    const image = file
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
        quality: "auto",
        fetch_format: "auto",
        timeout:180000
    });
    

    return uploadResponse.url;


}

// const uploadImageStream = (file: Express.Multer.File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.v2.up.upload_stream(
//             { folder: "doctors" },
//             (error:any, result:any) => {
//                 if (result) resolve(result.url);
//                 else reject(error);
//             }
//         );
//         stream.end(file.buffer);
//     });
// };

export const createDoctor = async(req: Request, res: Response) : Promise<void>=>{
    const {email} = req.body;
    console.log(req.body)

    try{
        const existingDoctor = await Doctor.findOne({email});
        if(existingDoctor){
            res.status(400).json({
                message: "Email already taken"
            })
            return;
        }
        if(req.file){
            const imageUrl = await uploadImage(req.file as Express.Multer.File);
            req.body.picture = imageUrl;
        }
        const newDoctor = await Doctor.create(req.body);

        res.status(201).json({
            message: "Doctor successfully created",
            newDoctor
        })

    }catch(err: any){
        res.status(400).json(err);
        return;
    }
}

export const loginDoctor = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400).json({
            message: "Please provide email and password"
        })
        return;
    }

    const doctor = await Doctor.findOne({email}).select("+password");

    if(!doctor || !(await doctor.correctPassword(password, doctor.password))){
        res.status(401).json({
            message: "Incorrect email or password"
        })
        return;
    }

    createSendToken(doctor as unknown as DoctorType, 200, res)
}


export const getDoctors =  async(req: Request, res: Response) : Promise<void>=>{
    const { speciality } = req.query;



    try{
        const query = speciality ? { speciality } : {}; // Construct query based on speciality
        const allDoctors = await Doctor.find(query).select("availability name speciality picture");
       if(!allDoctors){
            res.status(404).json({ message: "No Doctors not found" });
            return;
        }

        res.status(200).json(allDoctors);

    }catch(err: any){
        console.log(err);
        res.status(500).json({
            message: "error getting users"
        })
    }
}


export const getOneDoctor = async(req: Request, res: Response) : Promise<void>=>{
    const {id} = req.params;
    try{
        const doctor = await Doctor.findById(id);
        if(!doctor){
            res.status(404).json({ message: "No Doctors not found" });
            return;
        }
        res.status(200).json(doctor);

    }catch(err){
        console.log(err);

        res.status(500).json({
            message: "error getting users"
        })
    }
}

export const updateDoctor = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const {name,  address1 , address2 , speciality, experience, degree, fee, about} = req.body;
    const {id} = req.params;
    
    try{
        const existingDoctor = await Doctor.findById(id);

        if(!existingDoctor){
            res.status(404).json({ message: "User not found" });
            return;
        }

        existingDoctor.name = name || existingDoctor.name;
        existingDoctor.address1 = address1 || existingDoctor.address1;
        existingDoctor.address2 = address2 || existingDoctor.address2;
        existingDoctor.speciality = speciality || existingDoctor.speciality;
        existingDoctor.experience = experience || existingDoctor.experience;
        existingDoctor.degree = degree || existingDoctor.degree;
        existingDoctor.fee = fee || existingDoctor.fee;
        existingDoctor.about = about || existingDoctor.about;

        if(req.file){
            const imageUrl = await uploadImage(req.file as Express.Multer.File);
            existingDoctor.picture = imageUrl;
        }

        await existingDoctor.save();
        

        res.status(201).json({
            existingDoctor
        })




    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "error getting users"
        })
    }

}

export const deleteDoctor =  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const {name,  address1 , address2 , speciality, experience, degree, fee, about} = req.body;
    const {id} = req.params;
    
    try{
        const existingDoctor = await Doctor.findByIdAndDelete(id)
      
        res.status(204).json({message: "doctor deleted"})





    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "error getting users"
        })
    }

}