import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
import Product from "../Models/Product_Model.js";
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETE,
})  

export const Upload_Image = async (file) => {
    try {
        let image = await cloudinary.uploader.upload(file, {folder: "GazeWatch"})
        if(!image.secure_url){
            return console.log("error occured file not send")
        }

        fs.unlink(file, ()=>{
            console.log("file successfully deleted.")
        })
        return image.secure_url;
        
    } catch (error) {
        fs.unlink(file, ()=>{
            console.log("file successfully deleted.")
        })
        console.log(error, "error in cloudinary")
    }
}


export const delete_Image = async (product_id) => {
    try {
        const Prod = await Product.findById(product_id)
        
        if(!Prod){
            console.log("product not found!")
            return false
        }
        const findUrl = (url)=>{
            const parts = url.split("/upload/")
            if(parts.length < 2) {
                return false;
            }
            let path = parts[1];
            const pathParts = path.split("/");

            if(pathParts[0].startsWith("v") && !isNaN(pathParts[0].substring(1))){
                pathParts.shift();
            }

            const file_With_Ext = pathParts.join('/');
            const public_Id = file_With_Ext.substring(0, file_With_Ext.lastIndexOf("."));
            return public_Id;
        };
        const image1 = findUrl(Prod.image1)
        const image2 = findUrl(Prod.image2)
        const image3 = findUrl(Prod.image3)
        const image4 = findUrl(Prod.image4)

        await cloudinary.api.delete_resources(
            [image1, image2, image3, image4],
            (result) => {return result}
        );
        
        console.log("file deleted Successfully");
        return true

    } catch (error) {
        console.log(error)
    }
}

