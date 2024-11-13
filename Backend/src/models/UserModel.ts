import mongoose, {Schema, Document, ObjectId} from "mongoose"
import bcrypt from "bcryptjs"
import crypto from "crypto"

export interface UserDocument extends Document {
    _id: ObjectId;
    fullname: string;
    email: string;
    address?: string;
    gender?: "male" | "female" | "other";
    phone?: string;
    birthday?: string;
    picture?: string;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    passwordChangedAt?: Date;
    correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>;
    changedPasswordAfter: (JWTTimestamp: number) => boolean;    
    // createPasswordResetToken = () => string;

}



const userSchema = new Schema<UserDocument>({
    
    fullname:{
        type:String,
        required: [true,'Name is required'] ,
        trim:true
        



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
        sparse: true,
        minLength: 9,
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
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date, 

})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})
userSchema.methods.correctPassword = async function(candidatePassword:string, userPassword:string){
    return await bcrypt.compare(candidatePassword, userPassword);
} 
userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
        const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}; 
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}


const User = mongoose.model("User", userSchema)

export default User;