import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const Gen_Token = (id) => {  
        let token = jwt.sign({id}, process.env.TOKEN_SECURE_KEY, {expiresIn: '7d'}) 
        return token ; 
}

export default Gen_Token;