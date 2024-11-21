import mongoose , {Schema, Document, ObjectId} from "mongoose"
import bcrypt from "bcryptjs"
import crypto from "crypto"



export interface DoctorDocument extends Document {
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
    availability?:string;
    picture?: string;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    passwordChangedAt?: Date;
    correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>;
    changedPasswordAfter: (JWTTimestamp: number) => boolean; 
}


const doctorSchema = new Schema<DoctorDocument>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    speciality: {
        type: String,
        required: [true, "A doctor must have a speciality"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "A doctor must have an email"],
        trim: true,
        lowercase: true,
    },
    degree: {
        type: String,
        required: [true, "A doctor must have a degree"],
        trim: true,
    },
    
    password:{
        type: String,
        required: [true,'Password is required'],
        select: false,
        minLength: 8,
    },
    address1:{
        type: String,
        minLength: 1,
    },
    address2:{
        type: String,
        minLength: 1,
    },
    experience:{
        type: String,
        

    },
    fee:{
        type: Number,
        required: [true, "Set fee"]
    },
    about:{
        type:String,
        required: [true, "Set doctors about"]
    },
    picture: {
        type: String
    },
     availability:{
        type: String,
        default: "Available"
    }


})

doctorSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})
doctorSchema.methods.correctPassword = async function(candidatePassword:string, userPassword:string){
    return await bcrypt.compare(candidatePassword, userPassword);
} 
doctorSchema.methods.changedPasswordAfter = function (JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
        const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}; 





const Doctor = mongoose.model("Doctor", doctorSchema)

export default Doctor