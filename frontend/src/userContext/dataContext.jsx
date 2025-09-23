import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { GazeWatchContext } from './UserContext';
import { shopDataContext } from './ShopContext';
import { toast } from 'react-toastify';

export const userDataContex= createContext();
function DataContext({children}) {
      const [toastSuccess, setToastSuccess] = useState(false)
      const [toastError, setToastError] = useState(false)

    

    let {serverUrl} = useContext(GazeWatchContext) 
    // const {DBCartItems, cartItems} = useContext(shopDataContext)
    let [userData, setUserData] = useState(null)

    const authorizeUser =async ()=>{
        try {
            let result =await axios.get(serverUrl + "/api/auth/user/isauth", {withCredentials: true}) 
            setUserData(result.data)  
        } catch (error) { 
            // console.log(error)
            setUserData(null) 
        }
    }
    useEffect(()=>{
        authorizeUser(); 
        // console.log(userData) //check user data if need
    },[])
    useEffect(()=>{
        setTimeout(() => {
            toast.success(toastSuccess)            
        }, 500);
    },[toastSuccess])
    useEffect(()=>{
        toast.error(toastError)
    },[toastError])

    const value = {
        userData,
        setUserData,
        authorizeUser,
        toastSuccess,
        toastError,
        setToastSuccess,
        setToastError
    }

  return (
    <userDataContex.Provider value={value}>
        {children}
    </userDataContex.Provider>
  )
}

export default DataContext;
