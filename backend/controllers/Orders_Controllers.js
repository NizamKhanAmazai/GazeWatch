import Orders from "../Models/Orders_Model.js";
import Product from "../Models/Product_Model.js";
import User from "../Models/User_Model.js"; 
import connectToDB from "../config/_Db_.js"



export const Place_Order = async (req, res) => {
    try {
        // const id = req.id; //set when implement
        const {
            firstName, lastName, email, street, city, state, pincode, country, phone, userId, products,
            payment, paymentMethod, totalAmount, orderState
        } = req.body
        await connectToDB()

        
        if(!firstName || !email || !street || !city || !pincode || !country || !phone || !userId || !products || payment == undefined || !paymentMethod || !totalAmount || !orderState){
            console.log(firstName, lastName, email, street, city, state, pincode, country, phone, userId, products,
                payment, paymentMethod, totalAmount, orderState)
            return res.status(400).json({message: "send all details"})
        }

        const Update_User_Cart = await User.findByIdAndUpdate(userId, {cartData: []})
        if(!Update_User_Cart){
            return res.status(404).json({message: "User not found!"});
        }
        
        const new_Order = await Orders.create({
            firstName, lastName, email, street, city, state, pincode, country, phone, userId, products,
            payment, paymentMethod, totalAmount, orderState, date: Date.now()
        })
        if(!new_Order){
            return res.status(500).json({message: "Order not created!"});
        }

        res.status(201).json({message: "Order successfully created."})
    } catch (error) {
        res.status(500).json({message: "Error in placing order!"})        
    }
}

export const Get_User_Orders = async (req, res) => {
    try { 
        const id = req.params.userId;
        // console.log(id ) 
         await connectToDB()
 
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found!"});
        } 

        let userOrders = id && await Orders.find({userId: id});
        if(!userOrders.length){
            return res.status(404).json({message: "Orders not found!"});
        }

        const pendingOrders = userOrders.filter(elem => (elem.orderState !== "finished"));

        // console.log(uniqueProductIds)
        // checking orders is only pending orders are send to the user  finished --> check it in admin pannel
                
        let uniqueProductIds = [];
        if (pendingOrders.length > 1) {
          // Collect all product IDs from all orders
          pendingOrders.forEach((order) => {
            if (Array.isArray(order.products)) {
              uniqueProductIds.push(...order.products);  
            }
            });
            if (!uniqueProductIds || !uniqueProductIds.length ){
            return res.status(400).json({ message: "Products array is empty" });
            }
        } else {
          // if there is a single order 
          uniqueProductIds = pendingOrders[0].products;
        } 

        if(!uniqueProductIds.length){
            return res.status(404).json({message: "products not found!"})
        } 

        uniqueProductIds = await Product.find({_id: {$in:  uniqueProductIds}}); 
        
        // console.log(pendingOrders);
        // pendingOrders, uniqueProductIds we send it before 
        res.status(200).json({uniqueProductIds, pendingOrders }) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "error in fetching user orders!"});
    } 
}

// sending all incomplete orders or pending orders
export const Get_All_Orders = async (req, res) => {
    try {
        const email = req.email;
        
        if(!email){
            return res.status(400).json({message: "user not found!"});
        }
        await connectToDB()

        let allOrders = await Orders.find({orderState: {$ne : "finished"}});

        if(!allOrders.length){
            return res.status(404).json({message: "Orders not found!"});
        }

        // getting all product ids 
        let allProductIds = [];
        let uniqueProductIds;
        if (allOrders.length > 1) {
            // Collect all product IDs from all orders
            allOrders.forEach((order) => {
            if (Array.isArray(order.products)) {
              allProductIds.push(...order.products);  
            }
            });
            uniqueProductIds = [...allProductIds] 
  
            if (!uniqueProductIds || uniqueProductIds.length === 0) {
              return res.status(400).json({ message: "Products array is empty" });
            }
        } else {
            // if there is a single order  
            uniqueProductIds = allOrders[0].products;
        }
    
    // Fetch products from the Product model
    uniqueProductIds = await Product.find({ _id: { $in: uniqueProductIds } });
    res.status(200).json({allOrders , uniqueProductIds});

} catch (error) {
    res.status(500).json({message : "error in sending orders!"})
}
}

// sending all complete orders 
export const Get_All_Incomplete_Orders = async (req, res) => {
    try {
        const email = req.email;
        
        if(!email){
            return res.status(400).json({message: "user not found in finished orders!"});
        }
        await connectToDB()

        let allOrders = await Orders.find({orderState: {$eq : "finished"}});

        if(!allOrders.length){
            return res.status(404).json({message: "Finished orders not found!"});
        }

        // getting all product ids 
        let allProductIds = [];
        let uniqueProductIds;
        if (allOrders.length > 1) {
            // Collect all product IDs from all orders
            allOrders.forEach((order) => {
            if (Array.isArray(order.products)) {
              allProductIds.push(...order.products);  
            }
            });
            uniqueProductIds = [...allProductIds] 
  
            if (!uniqueProductIds || uniqueProductIds.length === 0) {
              return res.status(400).json({ message: "Products array is empty in finished" });
            }
        } else {
            // if there is a single order  
            uniqueProductIds = allOrders[0].products;
        }
    
    // Fetch products from the Product model
    uniqueProductIds = await Product.find({ _id: { $in: uniqueProductIds } });
    res.status(200).json({allOrders , uniqueProductIds});

} catch (error) {
    console.log(error)
    res.status(500).json({message : "error in sending finished orders!"})
}
}

export const Update_Order = async (req, res) => {
try {
    const auth_email = req.email;
        const { id, orderState, date } = req.body

        if(!id || !orderState || !date){
            console.log( id, orderState, date)
            return res.status(400).json({message: "send details first!"});
        }
        await connectToDB()
         
        if(!auth_email){
            res.status(400).json({message: "Admin not Authentic"})
        }
         
        const Update_Current_Order = await Orders.findById(id);
        if(!Update_Current_Order){
            return res.status(404).json({message: "Order not found!"})
        }

        const updated = await Orders.findByIdAndUpdate(id, {orderState: orderState, date: new Date(date)})
        if(!updated){
            return res.status(500).json({message: "Order not updated!"});
        }
        res.status(201).json({message: "Order successfully updated."});
    } catch (error) {
        return res.status(500).json({message: "Error in order updated!"});
    }
}
