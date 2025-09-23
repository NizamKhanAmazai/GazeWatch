import { Upload_Image } from "../Cloudinary/Upload_On_Cloudinary.js";
import Product from "../Models/Product_Model.js"
import connectToDB from "../config/_Db_.js"

export const Get_All_Products = async (req, res) => {
    try { 
        let allProducts = await Product.find();
        // console.log(allProducts)
        if(!allProducts.length){
            return res.status(404).json({message: "products not found"});
        }
        await connectToDB()

        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const Get_Cart_Products = async (req, res) => {
    try {
        const {ProductArray} = req.body;  
        if(!ProductArray.length ){
            return res.status(400).json({message: 'cart is Empty'})
        }
        await connectToDB()

        const UserProducts = await Product.find({_id: {$in: ProductArray}});
        if(!UserProducts.length){
            return res.status(404).json({message: "Cart product is not found!"})
        }

        res.status(200).json({UserProducts});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "error in Fetching cart"});
    } 
}