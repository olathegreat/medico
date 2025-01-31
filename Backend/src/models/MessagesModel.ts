import mongoose, { Schema, Document, ObjectId } from "mongoose";


export interface MessageDocument extends Document {
    _id: ObjectId;
    sender: ObjectId;
    recipient: ObjectId;
    recipientModel?:string;
    senderModel?: string;
    messageType: string;
    content?: string;
    fileUrl?: string;
    timeStamp: Date;
}   


const messageSchema = new Schema<MessageDocument>({

    sender: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'senderModel', // Dynamically reference User or Doctor
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['User', 'Doctor'], // Limit to valid models
    },
    recipient: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'recipientModel', // Dynamically reference User or Doctor
    },
    recipientModel: {
        type: String,
        required: true,
        enum: ['User', 'Doctor'], // Limit to valid models
    },
    messageType:{
        type: String,
        required: true,
        enum: ['text', 'file']
    },
    content:{
        type: String,
        required: function(){
            return this.messageType === 'text';
        }

    },
    fileUrl:{
        type: String,
        required: function(){
            return this.messageType === 'file';
        }
    },
    timeStamp:{
        type: Date,
        default: Date.now()
    }

})


const Message = mongoose.model("Messages", messageSchema);

export default Message;