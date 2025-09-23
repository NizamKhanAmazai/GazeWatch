import User from "../Models/User_Model.js"
import bcrypt from "bcryptjs"
import Gen_Token from "../config/Generate_Token.js";  
import Product from "../Models/Product_Model.js";
import connectToDB from "../config/_Db_.js"

export const Register_User = async (req, res) => {
    try { 
        const { name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "send all details!"})
        }
        await connectToDB()
        
        const Is_User_Exist = await User.findOne({email: {$eq: email}})

        if(Is_User_Exist){
            return res.status(400).json({message: "User already exist", user: Is_User_Exist})
        }
        
        const Hash_Password = await bcrypt.hash(password, 5); 
        const New_User = await User.create({name, email, password: Hash_Password});
        
        if(!New_User){
            return res.status(400).json({message: "User not created"})
        }

        const token = Gen_Token(New_User._id)

        res.cookie("GZ_T", token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        })

        const newU = await User.findById(New_User._id);
        res.status(201).json(newU);
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

 export const Login_User = async (req, res) => {
    try { 
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "send all details"})
        }
        await connectToDB()

        let Is_User_Exist = await User.findOne({email: {$eq: email}})
        if(!Is_User_Exist){
            return res.status(404).json({message: "User not found!"});
        }

        const is_Password_Match =await bcrypt.compare(password, Is_User_Exist.password); 

        if(!is_Password_Match){
            return res.status(400).json({message: "Password is incorrect!"})
        }

        let token = Gen_Token(Is_User_Exist._id);

        res.cookie("GZ_T", token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        })

        Is_User_Exist = await User.findById(Is_User_Exist._id).select("-password"); 
        
        res.status(200).json(Is_User_Exist)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "error in Login."})        
    }
 
}
 
export const Google_Auth_Login = async (req, res) => {
    try {
        const {name, email} = req.body;
        let status = 200;
        
        let Is_User_Exist = await User.findOne({email: {$eq: email}})
        if(!Is_User_Exist){
            Is_User_Exist = await User.create({name, email})
            status = 201
        }
        await connectToDB()

        let token =  Gen_Token(Is_User_Exist._id);
        res.cookie("GZ_T", token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // res.status(status).json({message: `${status == 200 ? "User login successfully" : "User Successfully created!"}`})
        res.status(200).json(Is_User_Exist)
    } catch (error) {
        res.status(500).json({message: 'error occured in OAuth'})
    }
}

export const Get_Unregister_User_Cart = async (req, res) => {
    try {
        const {copyCart} = req.body; 
        if(!copyCart.length){
            return res.status(404).json({message: "products ids not found"})
        }
        await connectToDB()

        const cartProducts = await Product.find({_id: {$in: copyCart}}); 
        
        res.status(200).json(cartProducts);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error in products"});        
    }
}