import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true, 
    },
    street: {
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
    },
    pincode:{
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    },
    products:{
        type: Array,
        required: true,
    },
    payment:{
        type: Boolean,
        reqiured: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    totalAmount:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        required: true
    },
    orderState: {
        type: String,
        required: true,
    },
     
},{timestamps: true})

const Orders = mongoose.model("orders", OrderSchema);

export default Orders;