import mongoose, {Schema, Document, ObjectId} from "mongoose"
import bcrypt from "bcryptjs"
import crypto from "crypto"

interface UserDocument extends Document {
    _id: ObjectId;
    fullname: string;
    email: string;
    address?: string;
    gender?: "male" | "female" | "other";
    phone?: string;
    birthday?: string;
    picture?: string;
    password: string;
    correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>;
}



const userSchema = new Schema<UserDocument>({
    
    fullname:{
        type:String,
        required: [true,'Name is required'] 
        



    },
    email:{
        type: String,
        required: [true,'Email is required'],
        unique:true,
        lowercase: true,    
    },
    address:{
        type: String,

    },
    gender:{
        type: String,
        enum: ["male", "female", "other"],

    },
    phone:{
        type: String,
        unique:true,
    },
    birthday:{
        type: String,
    },
    picture:{
        type: String,   
    },
    password:{
        type: String,
        required: [true,'Password is required'],
        select: false,
        minLength: 8,
    }

})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})
userSchema.methods.correctPassword = async function(candidatePassword:string, userPassword:string){
    return await bcrypt.compare(candidatePassword, userPassword);
}   
const User = mongoose.model("User", userSchema)

export default User;