import { Request, Response } from "express";
import Admin, { AdminDocument } from "../models/AdminModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import cloudinary from "cloudinary";
import { ObjectId } from "mongoose";


dotenv.config();

type AdminType = {
    _id: ObjectId;
    name: string;
    email: string;
    picture?: string;
    password: string;
    address1?: string;
    address2?: string;
}


interface AuthenticatedRequest extends Request{
    admin?: AdminDocument | undefined;

}



const signToken = (id: ObjectId) => {
    return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

const createSendToken = (user: AdminType, statusCode: number, res: Response): void => {
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

export const createAdmin = async(req: Request, res: Response) : Promise<void>=>{
    const {email} = req.body;

    try{
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            res.status(400).json({
                message: "Email already taken"
            })
            return;
        }
        if(req.file){
            const imageUrl = await uploadImage(req.file as Express.Multer.File);
            req.body.picture = imageUrl;
        }
        const newAdmin = await Admin.create(req.body);

        createSendToken(newAdmin as unknown as AdminType, 200, res)

        res.status(201).json({
            message: "Admin successfully created",
            newAdmin
        })

    }catch(err: any){
        res.status(400).json(err);
        return;
    }
}

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400).json({
            message: "Please provide email and password"
        })
        return; 
    }

    const admin = await Admin.findOne({email}).select("+password");

    if(!admin || !(await admin.correctPassword(password, admin.password))){
        res.status(401).json({
            message: "Incorrect email or password"
        })
        return;
    }

    createSendToken(admin as unknown as AdminType, 200, res)
}


export const getAdmin = async (req:AuthenticatedRequest , res: Response): Promise<void> =>{
     const data = req.admin
    try{
        res.status(200).json({
            data
        })

    }catch(err: any){
        console.log(err)
    }
}
