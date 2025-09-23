import express from "express"
import { Get_All_Incomplete_Orders, Get_All_Orders, Get_User_Orders, Place_Order, Update_Order,  } from "../controllers/Orders_Controllers.js"; 
import { Auth } from "../middleWare/UserAuth.js";
import auth_admin from "../middleWare/Auth_Admin.js";

const OrderRoute = express.Router();

OrderRoute.post("/place/new", Place_Order)
OrderRoute.get("/user/pending/:userId", Get_User_Orders)
 
OrderRoute.get("/admin/pending", auth_admin, Get_All_Orders );
OrderRoute.get("/admin/completed", auth_admin, Get_All_Incomplete_Orders );
OrderRoute.post("/admin/update", auth_admin, Update_Order);
 
export default OrderRoute;