import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    Name: {
        type:String,
        required: true
    },
    Discription: {
        type: String,
        required: true
    },
    image1: {
        type: String
    }, 
    image2: {
        type: String
    }, 
    image3: {
        type: String
    },
    image4: {
        type: String
    },
    Price: {
        type: Number,
        required: true,
    },
    Quantity: {
        type: Number,
    },
    Gender:{
        type: String,
    },
    Variant:{
        type: String,
    },
    Style:{
        type: String,
    },
    Purpose:{
        type: String,
    },
    Lense:{
        type: String,
    },
    Frame:{
        type: String,
    },
    Affordable:{
        type: Boolean,
    },
    Luxury: {
        type: Boolean
    },
    date:{
        type: Date,
    },
    Type:{
        type: String,
        required: true,
    }
}, {timestamps: true})

const Product = mongoose.model("products", ProductSchema);

export default Product;