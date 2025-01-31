import { Request, Response } from "express";
import Message from "../models/MessagesModel";
import { UserDocument } from "../models/UserModel";
import { DoctorDocument } from "../models/DoctorModel";
import { AdminDocument } from "../models/AdminModel";
import { mkdirSync, renameSync } from "fs"
import mongoose from "mongoose";

interface AuthenticatedUser extends Request {
    user?: UserDocument | undefined;
    doctor?: DoctorDocument | undefined;
    admin?: AdminDocument | undefined;
}


export const getMessages = async (req: AuthenticatedUser, res: Response): Promise<void> => {
    try {

        const user1 = req.user!._id;
        console.log(req.params.id)
        const user2 = req.params.id;

        console.log(user1, user2)

        if (!user1 || !user2) {
            res.status(400).send("both user ids are required")
            return;
        }

        const messages = await Message.find({
            $or: [
                {
                    sender: user1,
                    recipient: user2
                },
                {
                    sender: user2,
                    recipient: user1
                }
            ]

        }).sort({ timeStamp: 1 })

        res.status(200).json({ messages })
        return

    } catch (err) {
        console.log(err)
        res.status(500).send("internal server error")
        return;
    }
}

export const uploadFiles = async (req: Request, res: Response) => {
    try {

        if (!req.file) {
            return res.status(400).send("file is required");
        }

        const date = Date.now();
        let fileDir = `uploads/files/${date}`;
        let fileName = `${fileDir}/${req.file.originalname}`;

        mkdirSync(fileDir, { recursive: true });

        renameSync(req.file.path, fileName);
        console.log(fileName);
        return res.status(200).json({ filePath: fileName });
    } catch (err) {
        console.log({ err });
        res.status(500).send("internal server error");
        return;
    }
};



export const getUserMessagesList = async (req: AuthenticatedUser, res: Response): Promise<void> => {
    try {

        
        const userId = typeof req.user!._id === "string" 
        ? new mongoose.Types.ObjectId(req.user!._id) 
        : req.user!._id;

        const contacts = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { sender: userId },
                        { recipient: userId }
                    ]
                }
            },
            {
                $sort: { timeStamp: -1 }
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$recipient",
                            else: "$sender"
                        }
                    },
                    lastMessageTime: { $first: "$timeStamp" }
                }
            },
            {
                $lookup: {
                    from: "doctors",
                    localField: "_id",
                    foreignField: "_id",
                    as: "contactInfo"
                }
            },
            {
                $unwind: "$contactInfo"
            },
            {
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    email: "$contactInfo.email",
                    name: "$contactInfo.name",
                    picture: "$contactInfo.picture",
                    
                }
            },
            {
                $sort: { lastMessageTime: -1 }
            }
        ]);

        res.status(200).json({ contacts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

export const getDoctorMessagesList = async (req: AuthenticatedUser, res: Response): Promise<void> => {
    try {


        const userId = typeof req.user!._id === "string" 
        ? new mongoose.Types.ObjectId(req.user!._id) 
        : req.user!._id;


        const contacts = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { sender: userId },
                        { recipient: userId }
                    ]
                }
            },
            {
                $sort: { timeStamp: -1 }
            },
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] },
                            then: "$recipient",
                            else: "$sender"
                        }
                    },
                    lastMessageTime: { $first: "$timeStamp" }
                }
            },
            {
                $lookup: {
                    from: "Users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "contactInfo"
                }
            },
            {
                $unwind: "$contactInfo"
            },
            {
                $project: {
                    _id: 1,
                    lastMessageTime: 1,
                    email: "$contactInfo.email",
                    firstname: "$contactInfo.firstname",
                    lastname: "$contactInfo.lastname",
                    image: "$contactInfo.image",
                    color: "$contactInfo.color"
                }
            },
            {
                $sort: { lastMessageTime: -1 }
            }
        ]);

        res.status(200).json({ contacts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

