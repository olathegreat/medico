import mongoose , {Schema, Document, ObjectId} from "mongoose"
import bcrypt from "bcryptjs"
import crypto from "crypto"



export interface AdminDocument extends Document {
    _id: ObjectId;
    name: string;
    email: string;
    address1?: string;
    address2?: string;
    
    about:string;
    picture?: string;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    passwordChangedAt?: Date;
    correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>;
    changedPasswordAfter: (JWTTimestamp: number) => boolean; 
}


const adminSchema = new Schema<AdminDocument>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
   
    email:{
        type: String,
        required: [true, "A doctor must have an email"],
        trim: true,
        lowercase: true,
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
   
    picture: {
        type: String
    }


})

adminSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})
adminSchema.methods.correctPassword = async function(candidatePassword:string, userPassword:string){
    return await bcrypt.compare(candidatePassword, userPassword);
} 
adminSchema.methods.changedPasswordAfter = function (JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
        const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}; 





const Admin = mongoose.model("Admin", adminSchema)

export default Admin