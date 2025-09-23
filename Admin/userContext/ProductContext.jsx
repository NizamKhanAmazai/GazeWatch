import axios from 'axios';
import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { serverContext } from './UserContext';

export const ProductDataContext = createContext();

function ProductContext({children}) {
    const [products, setProducts] = useState([])
    const [productType, setProductType] = useState("all")
    const location = useLocation();
    const [orders, setOrders] = useState([]); 
    const [finished_Orders, setFinished_Orders] = useState([]); 
    const {serverUrl, setProgress} = useContext(serverContext)  
    const [listLoading, setListLoading] = useState(false)
    const [orderLoading, setOrderLoading] = useState(false)
    


 

// fetch product for List 
const fetchProducts = async (productType) => { 
    try {
      setListLoading(true) 
      let result = await axios.get(
        serverUrl + `/api/auth/admin/products`, 
        { withCredentials: true }
      );  
      setProducts(result.data); 
      setListLoading(false)
      // console.log(result.data);
    } catch (error) { 
      setListLoading(false)
      setProducts(); 
      console.log(error);
    }  
  };
  useEffect(()=>{ 
    if(!products.length && (location.pathname === "/list")){
        fetchProducts(productType)
        // console.log("fetchproduct call")
    }
  },[location.pathname])


//   fetch pending orders
const fetchOrders = async () => {
    try { 
      setOrderLoading(true)  
      let result = await axios.get(serverUrl + "/api/order/admin/pending", {withCredentials: true})
      setOrders(result.data) 
      // console.log(result)
      setOrderLoading(false)
    } catch (error) { 
      setOrderLoading(false)
      console.log(error)
    } 
  }


//   fetch completed Orders
const fetch_Finished_Orders = async () => {
    try { 
      setOrderLoading(true) 
      let result = await axios.get(serverUrl + "/api/order/admin/completed", {withCredentials: true})
      setFinished_Orders(result.data) 
      // console.log(result)
      setOrderLoading(false)
    } catch (error) { 
      setOrderLoading(false)
      console.log(error)
    } 
  }
  
  // pending orders
  useEffect(()=>{
    if(orders.length < 1 && (location.pathname === "/orders")){
        fetchOrders(); 
      } 
  },[location.pathname === "/orders"])

  // completed orders
  useEffect(()=>{
    if(finished_Orders.length < 1 && (location.pathname === "/orders")){
        fetch_Finished_Orders(); 
      } 
      console.log(location.pathname.includes("finished"))
  },[location.pathname === "/orders"])
  
  


  const values = {
    fetchProducts,
    products,
    setProducts,
    productType,
    setProductType,
    orders, 
    setOrders,
    finished_Orders,
    setFinished_Orders,
    listLoading,
    orderLoading,
    fetch_Finished_Orders,
    fetchOrders
  }


  return (
    <ProductDataContext.Provider value={values} >
        {children}
    </ProductDataContext.Provider>
  )
}

export default ProductContext
