import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const Admin_Token = (email) => {
    if(email){
        const token= jwt.sign({email}, process.env.TOKEN_SECURE_KEY, {expiresIn: '1h'})
        return token;
    }else{
        console.log(email, "id not found!")
    }
}

export default Admin_Token;