import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/Nav";  
import { serverContext } from "../../userContext/UserContext"; 
import { ProductDataContext } from "../../userContext/ProductContext"; 
import AllOrders from "../../components/AllOrders"; 
import SideBar from "../../components/SideBar"; 
import { useNavigate } from "react-router-dom";

function Orders() {
 
  const [totalProducts, setTotalProducts] = useState([]);
  const navigate = useNavigate();
  // const [orders, setOrders] = useState([]); 
  const {serverUrl} = useContext(serverContext);
  const {orders } = useContext(ProductDataContext);
  // const [totalOrdersProductCount, setTotlaOrdersProductCount] = useState([]);

  const settingProducts = (orders)=>{
    let x =orders.allOrders 
    setTotalProducts(x)
  }
 
   useEffect(()=>{ 
    settingProducts(orders)
   },[orders])
    

  return (
    <div className="w-[100vw] overflow-x-hidden h-[100%] min-h-[100vh] overflow-hidden bg-gradient-to-r from-teal-700 to-gray-600   "> 
      <div className="">
        <Nav/>
      </div>
      <div className="tilte w-[100%] md:w-[100%] lg:h-[10%] xl:h-[8%] md:bg-none mt-[60px]  flex flex-row justify-end items-center overflow-hidden ">
        <div className="w-[100%] h-[100%] md:w-[80%] flex flex-row justify-center items-center ">
          <div className="md:text-[24px] lg:text-[34px] text-[#f3f2cc] font-semi text-[28px] brightness-85 md:brightness-100 ">
            <p className="inline"> ORDER &nbsp;</p>
            <p className="inline text-[#cddfe4]"> PAGE </p>
          </div>
        </div>
      </div>
      <div className="w-[100vw] min-h-[100%] flex flex-row flex-wrap justify-end md:justify-center overflow-x-hidden ">
        <div className="sm:w-[20vw] sm:h-[100%] relative w-100vw h-[60px] ">
            <SideBar color={"orders"} />
          </div>
        {/* <div className="w-[30vw] h-[95vh] bg-[#bbbbb9] fixed top-15 left-0">
          {/* <OrderSidebar />   
        </div> */}
        <div className="hideScroll w-[100vw] md:w-[60vw] lg:w-[70vw] xl:w-[70vw] 2xl:w-[40vw] h-[100%] min-h-[100%]  overflow-x-hidden gap-y-3 flex flex-col justify-start items-center md:items-center md:pl-2 pt-3 pb-20 md:pb-0 ">
            {totalProducts ? totalProducts.map((elem) =>{
              return (
                <div className="w-[80vw] md:w-[50vw] lg:w-[65vw] xl:w-[60vw] 2xl:w-[40vw] " key={elem._id}> 
                  <AllOrders
                  name={elem.firstName + "  " + elem.lastName} 
                  price={elem.totalAmount} 
                  email={elem.email} 
                  orderDate={elem.createdAt}
                  numberOfProducts={elem.products}
                  paymentMethod={elem.paymentMethod}
                  products = {orders.uniqueProductIds}
                  phone={elem.phone} 
                  shippingDate={elem.date}
                  orderState = {elem.orderState} 
                  totalAmount = {elem.totalAmount}
                  city = {elem.city}
                  payment = {elem.payment} 
                  streetAddress = {elem.street}
                  mobileNumber = {elem.phone}
                  id={elem._id}
                   />
                </div>
              )
            }) :  
              (<div className="text-[26px] text-center ">Order Not Found</div>) 
          } 
          <div className=" w-full text-center">
            <span className="text-[20px] cursor-pointer text-white hover:no-underline hover:text-[#0fbe53] underline underline-offset-4" onClick={()=>navigate("/orders/finished")} >See Fineshed Orders</span>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Orders;
