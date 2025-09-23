import express from "express";
import {Get_All_Products, Get_Cart_Products } from "../controllers/Products_Controllers.js";

const ProductRoute = express.Router();
 
ProductRoute.get("/all", Get_All_Products);
ProductRoute.post("/cart/all", Get_Cart_Products);// /api/product/all

export default ProductRoute