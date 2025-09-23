import express from "express"
import {Register_User , Login_User, Google_Auth_Login, Get_Unregister_User_Cart }  from "../controllers/User_Controlls.js" 

const UserRoute = express.Router();

UserRoute.post("/register", Register_User)
UserRoute.post("/login", Login_User)
UserRoute.post("/oauth/google", Google_Auth_Login)

// cart products for not register users
UserRoute.post("/not/register/cart", Get_Unregister_User_Cart)
542685


export default UserRoute;