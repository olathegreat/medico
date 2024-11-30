import {Request, Response} from "express";
import Appointment, {AppointmentDocument} from "../models/AppointmentOrder";
import mongoose, {ObjectId} from "mongoose";
import Doctor, { DoctorDocument } from "../models/DoctorModel";
import User, { UserDocument } from "../models/UserModel";
import { AdminDocument } from "../models/AdminModel";

interface AuthenticatedUser extends Request{
    user?: UserDocument | undefined;
    doctor?: DoctorDocument | undefined;
    admin?: AdminDocument | undefined;
}


export const createAppointment = async(req:AuthenticatedUser, res:Response) : Promise<void>=>{

    console.log(req.body);

    const  user = await User.findById(req.user!._id);

    if(!user){
        res.status(400).json({
            message: "user doesnt exist"
        });
        return;
    }
    const existingDoctor = await Doctor.findById(req.body.doctor);
    if(!existingDoctor){
        res.status(400).json({
            message: "doctor doesnt exist"
        })
        return;
    }


    try{

       const  newAppointment =  await Appointment.create({
        
        user: req.user!._id,
        doctor: req.body.doctor,
        date: req.body.date,
        time: req.body.time,
        
       })

       res.status(201).json({
        message: "appointment created",
        newAppointment
       })


    }catch(err){
        res.status(400).json(err);
        return;

    }
}


export const userGetAppointments = async(req: AuthenticatedUser, res: Response):Promise<void> =>{


    try{

        const userAppointments = await Appointment.find({user: req.user!._id, cancelled: false}).populate({
            path: 'user', select: "fullname picture birthday"
        }).populate({path: 'doctor', select: "name speciality address1 address2 fee picture"}).sort('-createdAt')
        

        if(!userAppointments){
            res.status(404).json({message: "No appointments"});
            return;
        }

        res.status(200).json(userAppointments)

    }catch(err){
        console.log(err);
        res.status(500).json({err})
    }

}

export const doctorGetAppointments = async(req: AuthenticatedUser, res: Response):Promise<void> =>{


    try{

        const doctorAppointments = await Appointment.find({doctor: req.doctor!._id}).populate({
            path: 'user', select: "fullname picture birthday"
        }).populate({path: 'doctor', select: "name fee"})
        

        if(!doctorAppointments){
            res.status(404).json({message: "No appointments"});
            return;
        }

        res.status(200).json(doctorAppointments)

    }catch(err){
        console.log(err);
        res.status(500).json({err})
    }

}

export const adminGetAllAppointments = async(req: AuthenticatedUser, res: Response):Promise<void> =>{

    if(!req.admin){
        res.status(400).json({
            message: "you are not authorised to get all appointments"
        })
        return;
    }
    try{

        const allAppointments = await Appointment.find({cancelled:false}).populate({
            path: 'user', select: "fullname picture birthday"
        }).populate({path: 'doctor', select: "name fee"})
        

        if(!allAppointments){
            res.status(404).json({message: "No appointments"});
            return;
        }

        res.status(200).json(allAppointments)

    }catch(err){
        console.log(err);
        res.status(500).json({err})
    }

}

export const doctorGetAllAppointments = async(req: AuthenticatedUser, res: Response):Promise<void> =>{

    if(!req.doctor){
        res.status(400).json({
            message: "you are not authorised to get all appointments"
        })
        return;
    }
    try{

        const allAppointments = await Appointment.find({cancelled:false,  doctor: req.doctor._id}).populate({
            path: 'user', select: "fullname picture birthday"
        }).populate({path: 'doctor', select: "name fee"})
        

        if(!allAppointments){
            res.status(404).json({message: "No appointments"});
            return;
        }

        res.status(200).json(allAppointments)

    }catch(err){
        console.log(err);
        res.status(500).json({err})
    }

}

export const updateAppointment = async(req:AuthenticatedUser, res: Response):Promise<void> =>{
   console.log(req!.user);
   
   
    // if(!req.user){
    //     res.status(400).json({
    //         message: "you are not authorised"
    //     })
    // }

    const {id} = req.params
    try{

        const existingAppointment = await Appointment.findById(id);
        if(!existingAppointment){
            res.status(404).json({message: "no appointment with this id"});
            return;
        }
        existingAppointment.time = req.body.time || existingAppointment.time
        existingAppointment.date = req.body.date || existingAppointment.date
        existingAppointment.isCompleted = req.body.isComplete || existingAppointment.isCompleted
        existingAppointment.payment = req.body.payment || existingAppointment.payment
        existingAppointment.cancelled = req.body.cancelled || existingAppointment.cancelled


        await existingAppointment.save();
        res.status(201).json({
            existingAppointment
        })




    }catch(err){
        console.log(err);
        res.status(500).json({err});
        return;
    }
}