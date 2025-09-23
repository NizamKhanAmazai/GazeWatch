import React, { createContext, useContext, useEffect, useState } from 'react'
import { serverContext } from './UserContext';
import axios from 'axios';


export const adminDataContext = createContext();

function DataContext({children}) {

    const [userData, setUserData] = useState(null)
    const [allPageData, setAllPageData] = useState(null)
    

    const {serverUrl} = useContext(serverContext);

    const getCurrentAdmin = async ()=>{
        try {
            let admin =await axios.get(serverUrl + "/api/auth/admin/isCurrent", {withCredentials:true})
            setUserData(admin.data.admin); 
            setAllPageData(admin.data)
        } catch (error) {
            setUserData(null);
            console.log(`error occured while checking the current Admin     ${error}`)
        }
    }
    useEffect(()=>{
        getCurrentAdmin();
    },[])
  return ( 
    <adminDataContext.Provider value={{userData, setUserData, getCurrentAdmin, allPageData, setAllPageData}}>
        {children}
    </adminDataContext.Provider>
  )
}

export default DataContext ;
