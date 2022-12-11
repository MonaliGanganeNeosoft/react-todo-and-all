import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    user_email:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    demo:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    flag:{
        type:Number,
        default:1
    }
})
export default mongoose.model("projectCollection",projectSchema)