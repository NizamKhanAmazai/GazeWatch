import User from "../Models/User_Model.js"; 
import connectToDB from "../config/_Db_.js"

export const is_Auth_User = async (req, res) => {
    try {
        let id = req.id;  
        let Is_User_Exist = await User.findById(id); 

        await connectToDB()
        if(!Is_User_Exist){
            return res.status(404).json({message: "user not found!"});
        }  
        res.status(200).json(Is_User_Exist); 
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "error in Auth_User"});        
    }
}

export const Logout_User = async (req, res) => {
    try {
        const {GZ_T} = req.cookies;
        if(!GZ_T){
            return res.status(404).json({message: "Token Not Found"})
        }
        await connectToDB()

        res.clearCookie("GZ_T")

        res.status(200).json({message: "User Successfully Logout."})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error in User Logout!"})        
    }
}


export const Add_To_Cart = async (req, res) => {
    try { 
        let Auth_id = req.id;
        const {ProductId, userid} = req.body; 

        if(!Auth_id == userid){
            return res.status(400).json({message: "User not authentic login again!"})
        }
        await connectToDB()

        const _user = await User.findById(Auth_id);
        if(ProductId){ 
            let is_Already_Availale = _user.cartData.filter(elem => elem.includes(ProductId))
            if(is_Already_Availale.length){
                return res.status(400).json({message: "Product already added"})
            }
        } 

        let cart_Updated = await User.updateOne({_id: userid}, {$push: {cartData: ProductId}});
        if(!cart_Updated) {
            return res.status(404).json({message: "cart Updated not updated!"})
        }

        res.status(200).json({message: "Cart updated!"})

    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}


export const Remove_From_Cart = async (req, res) => {
    try {
        // const {userId} = req.body;
        // const {id} = req.params.id;
        let id = req.query.product;
        let userId = req.query.userid 
        await connectToDB()
        
        if(!userId){
            return res.status(404).json({message: "User Id not found!"})
        }
         
        const requested_User = await User.findById(userId);
        if(!requested_User){
            return res.status(404).json({message: "User not found!"}) 
        } 
         
        let new_Cart_Data = requested_User.cartData.filter(elem => elem !== id)
          
        await User.findByIdAndUpdate(userId, {cartData:  new_Cart_Data });

        res.status(201).json({message: "Product Succeessfully Removed."}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Product not Removed!"}) 
    }
}