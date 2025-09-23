import express from "express"; 
import { Auth } from "../middleWare/UserAuth.js";
import { Add_To_Cart, is_Auth_User , Logout_User, Remove_From_Cart} from "../controllers/Auth_Controllers.js"; 

const Auth_Route = express.Router()

Auth_Route.get("/user/isauth", Auth, is_Auth_User)
Auth_Route.get("/user/Logout", Auth, Logout_User)  
 
Auth_Route.put("/cart/update", Auth, Add_To_Cart) 
Auth_Route.delete("/cart/delete", Remove_From_Cart) 

export default Auth_Route;