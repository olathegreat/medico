import { Request, Response } from "express";
import User, { UserDocument } from "../models/UserModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import cloudinary from "cloudinary";    
import mongoose, { ObjectId } from "mongoose";




dotenv.config();



type UserType = {
    _id: ObjectId | undefined;
    fullname: string;
    email: string;
    address?: string;
    gender?: "male" | "female" | "other";
    phone?: string;
    birthday?: string;
    picture?: string;
    password: string;

}
interface AuthenticatedRequest extends Request {
    user?: UserDocument | undefined;
  }
const signToken = (id: ObjectId) => {
    return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES
    });
}


const createSendToken = (user: UserType, statusCode: number, res: Response) => {
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

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { fullname, email, address, gender, phone, birthday, picture, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: "User already exists"
            })
        }
        const newUser = await User.create(req.body)

        createSendToken(newUser as unknown as UserType, 201, res);
    } catch (err) {

        console.log(err);
        res.status(400).json({
            message: "User not created"
        })

    }

}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "Please provide email and password"
        })
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
        res.status(401).json({
            message: "Incorrect email or password"
        })
    }
    createSendToken(user as unknown as UserType, 200, res);
}
const uploadImage = async(file:Express.Multer.File)=>{
    const image = file
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    return uploadResponse.url;

}


export const updateCurrentUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { fullname,  address,gender,phone,birthday,picture} = req.body
        const existingUser = await User.findById(req.user!._id  );
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        existingUser.fullname = fullname;
        existingUser.address = address;
        existingUser.gender= gender;
        existingUser.phone = phone;
        existingUser.birthday = birthday;  
        
        if(req.file){
            const imageUrl = await uploadImage(req.file as Express.Multer.File);   
            existingUser.picture = imageUrl;
        }
       
        
        await existingUser.save();

        res.json(existingUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error Updating User" });
    }
};

