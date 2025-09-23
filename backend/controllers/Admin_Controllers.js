import dotenv from "dotenv";
import Admin_Token from "../config/Admin_Token.js";
import Orders from "../Models/Orders_Model.js";
import Product from "../Models/Product_Model.js";
import connectToDB from "../config/_Db_.js"
import { delete_Image, Upload_Image } from "../Cloudinary/Upload_On_Cloudinary.js";
dotenv.config();

export const Admin_Login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "send all details!"});
        }

        if(!email == process.env.ADMIN_EMAIL && !password == process.env.ADMIN_PASSWORD){
            return res.status(400).json({message: "invalid credentials!"});
        }
        
        const token = Admin_Token(email)
        res.cookie("GZA_T", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000, 
        } )

        // res.status(200).json({message: "admin successfully login"})
        // sending all data about orders and products
        await connectToDB()
        let totalOrders = await Orders.find({});
        let totalProducts = await Product.find({});
        const admin = {email : email, role: "Admin"}
    
        if(!totalOrders && !totalProducts){
            return res.status(400).json({message: "orders Or products Not Available"}) 
        } 
        res.status(200).json({admin, Orders: totalOrders.length, Products: totalProducts.length})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "admin login error "})        
    }
}

export const LogOut_Admin = async (req, res) => {
    try {
        const email = req.email;
        if(!email){
            return res.status(404).json({message: "token not found!"});
        }

        res.clearCookie("GZA_T");
        res.status(200).json({message: "Logout successfull."})
    } catch (error) {
        console.log(error);
        res.status(200).json({message: "error in Logout!"})        
    }
}

export const isAuth = async (req, res) => {
    try {
        let email = req.email;
        if(!email == process.env.ADMIN_EMAIL){
            return res.status(400).json({message : "invalid credientials!"})
        }
        
        await connectToDB()
        let totalOrders = await Orders.find({});
        let totalProducts = await Product.find({});
        const admin = {email : email, role: "Admin"}
    
        if(!totalOrders && !totalProducts){
            return res.status(400).json({message: "orders Or products Not Available"}) 
        } 
        res.status(200).json({admin, Orders: totalOrders.length, Products: totalProducts.length})
    } catch (error) {
        console.log(error)
        res.status(200).json({message: "error in authentication"})
        
    }
}

export const Add_New_Product = async (req, res) => {
    try {
        const email = req.email;
        if(email != process.env.ADMIN_EMAIL){
            return res.status(404).json({message: 'Admin not found!'})
        }
        await connectToDB()

        const {
            Name, Discription, Price, Quantity, Gender, Variant, Style,
            Purpose, Lense, Frame , Affordable, Luxury, Type
        } = req.body;

        if(!Name || !Discription || !Price || !Quantity || !Gender || !Variant || !Style
                || !Affordable || !Type)
            {
            console.log( Name, Discription, Price, Quantity, Gender, Variant, Style,
                Affordable, Luxury, Type)
            return res.status(400).send("send all details")
        }
        
        // console.log('request is here 1')
        let image1url = req.files && req.files.image1[0].path;
        let image2url = req.files && req.files.image2[0].path;
        let image3url = req.files && req.files.image3[0].path;
        let image4url = req.files && req.files.image4[0].path;
        
        // console.log('request is here 2')
        let image1;
        let image2;
        let image3;
        let image4;
        if(image1url || image2url || image3url || image4url ){  
                image1 =await Upload_Image(image1url)
                image2 =await Upload_Image(image2url)
                image3 =await Upload_Image(image3url)
                image4 =await Upload_Image(image4url)
            }
        if(!image1 || !image2 || !image3 || !image4 ){
            return res.status(500).json( {message: 'images not upload On cloud'})
        }

        const NewProduct = await Product.create({ Name, Discription, Price, Quantity, Gender, Variant,
            Style, Purpose, Lense, Frame, Affordable, Luxury, image1, image2, image3, image4,
            Type, date: Date.now(),
        });
        res.status(200).json(NewProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error in creating Product", error});
    }
}

export const Remove_Product = async (req, res) => {
    try {
        const email = req.email;
        if(email !== process.env.ADMIN_EMAIL){
            return res.status(404).json({message: "Admin not found!"});
        }
        await connectToDB()

        const product_id = req.params.id;
        if(!product_id){
            return res.status(400).json({message: "Product id not found!"});
        }

        //delete the images from the cloud.
        const delete_all_images = delete_Image(product_id);

        if(!delete_all_images){
            return res.status(500).json({message: "Images not delete!"})
        }

        const Remove_P = await Product.findByIdAndDelete(product_id);
        if(!Remove_P){
            res.status(500).json({message: "Product not delete!", message2: "the images deleted successfully!"})
        }
        
        res.status(200).json({message: "Product Successfully deleted!"});
        // const deleteImage = 
    } catch (error) {
        res.status(500).json({message: "error while deleting product"})
    }
}
 
export const Get_All_Products_For_Admin = async (req, res) => {
    try {
        const email = req.email;

        if(!email){
            return res.status(400).json({message: "user not found login again"})
        }
        await connectToDB()

        const products = await Product.find({});

        if(!products.length){
            return res.status(404).json({message: "products not found!"});
        }

        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(200).json({message: "error in get all products!"})
    }
}
 
