import mongoose,{Schema, Document, ObjectId} from "mongoose";


export interface AppointmentDocument extends Document {
    _id: ObjectId;
    user: ObjectId;
    doctor: ObjectId;
    date: string;
    time: string;
    cancelled?: boolean;
    payment?: boolean;
    isCompleted?: boolean;
    createdAt?:string;

}

const appointmentSchema = new Schema<AppointmentDocument>({
    
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor'
    },
    date: {
        type: String,
        required: [true, "date is required"]
    },
    time: {
        type: String,
        required: [true, "time is required"]
    },
    cancelled:{
        type: Boolean,
        default: false
    },
    payment:{
        type: Boolean,
        default: false
    },
    isCompleted:{
        type:Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      }
     
})

// appointmentSchema.pre(/^find/, function(next){
//     this.populate({
//         path: 'doctor',
//         select: ""
//     }).populate({
//         path: 'user',
//         select: "fullname picture birthday"
//     })
//     next();
// })

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment