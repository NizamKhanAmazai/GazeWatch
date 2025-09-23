import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    cartData:{
        type: Array,
        defualt: []
    }
},{timestamps: true})

const User = new mongoose.model("Users", userSchema);

export default User;