import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
export const Auth =async (req, res, next) => {
    try {
        let {GZ_T} =await req.cookies;  

        if(!GZ_T){
            return res.status(400).json({message: "token not found"}) 
        }
        
        let user = jwt.verify(GZ_T, process.env.TOKEN_SECURE_KEY)
        if(!user){
            return res.status(404).json({message: "user not found"})
        } 

        req.id = user.id ;
        next();
    } catch (error) {
        res.status(500).json({message: "error in Auth"})
    }
}

