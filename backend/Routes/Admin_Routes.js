import express from "express";
import { Add_New_Product, Admin_Login, Get_All_Products_For_Admin ,isAuth , LogOut_Admin, Remove_Product } from "../controllers/Admin_Controllers.js";
import auth_admin from "../middleWare/Auth_Admin.js";
import Local_Upload from "../Multer/Upload_On_Disk.js";

const admin_Route = express.Router();

admin_Route.post("/admin/login", Admin_Login);
admin_Route.get("/admin/products", auth_admin, Get_All_Products_For_Admin);
admin_Route.get("/admin/isCurrent", auth_admin, isAuth );

admin_Route.get("/admin/logout", auth_admin, LogOut_Admin );


admin_Route.post("/admin/product/add", Local_Upload.fields([
    {name: "image1", maxCount: 1},
    {name: "image2", maxCount: 1},
    {name: "image3", maxCount: 1},
    {name: "image4", maxCount: 1}
]), auth_admin, Add_New_Product);                                                                                // for admin use only and the admin checking middle ware
admin_Route.delete("/admin/product/remove/:id", auth_admin, Remove_Product)


export default admin_Route;