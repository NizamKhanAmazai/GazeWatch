import React, { createContext, useEffect, useContext, useState } from 'react' 
import { GazeWatchContext } from './UserContext';   
export const orderDataContext = createContext(); 
import { userDataContex } from "./dataContext";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function OrderContext({children}) {  
    
    const {serverUrl} = useContext(GazeWatchContext)
    const {userData} = useContext(userDataContex)
    const [orders, setOrders] = useState()
    const [orderLoading, setOrderLoading] = useState(false)
    const [currentProductId, setCurrentProductId] = useState(false) 

    const location = useLocation();
    const getOrders = async (userId, ProductId) => {  
            try {
              setCurrentProductId(ProductId)
              ProductId && setOrderLoading(true)
              const Id = userId;
              const result = await axios.get(`/api/order/user/pending/${Id}`, {withCredential: true})
              if(result.data.message !== "Orders not found"){
                setOrders(result.data)
              } 
              ProductId && setOrderLoading(false)
              ProductId && toast.success("Order Traced")
            } catch (error) {
              console.log(error);
              ProductId && setOrderLoading(false)
              ProductId && toast.success("Order Not Traced")
            console.log(error)            
        } 
    } 
    

    useEffect(()=>{
      let userId = userData && userData._id 
     if(userId && !orders && location.pathname === "/orders"){
      getOrders(userId, false)
    }
    },[userData, location.pathname])

let value  = {
    orders,
    setOrders,
    getOrders,
    orderLoading,
    setOrderLoading,
    currentProductId
}
  return (
    <orderDataContext.Provider value={value}>
      {children}
    </orderDataContext.Provider>
  )
}

export default OrderContext
