import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    firstName: {
        type: String,
        required: true, 
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    dob: {
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    preferences: {
        type: [String], 
        default: [],
    },
    image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
