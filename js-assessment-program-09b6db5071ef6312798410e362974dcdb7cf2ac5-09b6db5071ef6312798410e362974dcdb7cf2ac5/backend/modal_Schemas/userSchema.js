import mongoose from 'mongoose';
import validator from 'validator';
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true, "First name is required"],
        maxlength:[30,"First name cannot exceed 30 character"],
        minlength:[3,"First name should be atleast 3 character"] 
    },
    lastname:{
        type:String,
        required:[true, "Last name is required"],
        maxlength:[30,"Last name cannot exceed 30 character"],
        minlength:[3,"Last name should be atleast 3 character"] 
    },
    email:{
        type:String,
        required:[true, "email is required"],
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password:{
        type:String,
        required: [true, "password is required"],
        minlength: [8, "password should be greater than 8 character"]
    },
    profile:{
        type: String,
        required:"true"
    }
})
export default mongoose.model("userCollection",userSchema)