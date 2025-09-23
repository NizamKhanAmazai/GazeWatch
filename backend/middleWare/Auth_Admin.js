import jwt from "jsonwebtoken";


const auth_admin = async (req, res, next) => {
    try {
        const {GZA_T} = req.cookies;

        if(!GZA_T){
            return res.status(200).json({message: "token not found!"});
        } 
        const email = jwt.verify(GZA_T, process.env.TOKEN_SECURE_KEY);
         
        req.email = email.email;
        next();
    } catch (error) {
        return res.status(500).json({message: "token error!"});        
    }
}

export default auth_admin;