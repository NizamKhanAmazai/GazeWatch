import express from "express"
import connectToDB from "./config/_Db_.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"; 
import cors from "cors" 
import bodyParser from "body-parser";
import UserRoute from "./Routes/User_Route.js"
import Auth_Route from "./Routes/Auth_Route.js";
import ProductRoute from "./Routes/Product_Routes.js";
import OrderRoute from "./Routes/Order_Routes.js";
import admin_Route from "./Routes/Admin_Routes.js";
dotenv.config();

const app = express();


app.use(cookieParser()) 
app.use(bodyParser.json())
app.use(cors(
    {
        origin: ["https://gaze-watch-frontend.vercel.app/" , "https://gaze-watch.vercel.app/" ],
        credentials: true,
    }
))


app.use("/api/user", UserRoute)// /api/auth/
app.use("/api/auth", Auth_Route);// /api/auth/
app.use("/api/product", ProductRoute);
app.use("/api/order", OrderRoute);
app.use("/api/auth", admin_Route);

const port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.status(201).send("Hello, I am availble for requests.")
})

app.listen(port, ()=>{
    console.log("server started at port ", port)
    connectToDB();
})