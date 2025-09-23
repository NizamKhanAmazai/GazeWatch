import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/Nav";  
import { serverContext } from "../../userContext/UserContext"; 
import { ProductDataContext } from "../../userContext/ProductContext";  
import SideBar from "../../components/SideBar"; 
import { useNavigate } from "react-router-dom";
import AllFinishedOrders from "../../components/AllFinishedOrders";

function FinishedOrders() {
 
  const [totalProducts, setTotalProducts] = useState([]);
  const navigate = useNavigate(); 
  const {serverUrl} = useContext(serverContext);
  const {orders, finished_Orders, setFinished_Orders } = useContext(ProductDataContext); 

  const settingProducts = (finished_Orders)=>{
    let x =finished_Orders.allOrders 
    setTotalProducts(x)
  }
 
   useEffect(()=>{ 
    settingProducts(finished_Orders)
   },[finished_Orders])
    

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
      <div className="w-[100vw] min-h-[100%] flex flex-row flex-wrap justify-end overflow-x-hidden ">
        <div className="sm:w-[20vw] sm:h-[100%] relative w-100vw h-[60px] ">
            <SideBar color={"orders"} />
          </div>
        {/* <div className="w-[30vw] h-[95vh] bg-[#bbbbb9] fixed top-15 left-0">
          {/* <OrderSidebar />   
        </div> */}
        <div className="hideScroll w-[100vw] md:w-[60vw] lg:w-[70vw] xl:w-[70vw] 2xl:w-[40vw] h-[100%] min-h-[100%]  overflow-x-hidden gap-y-3 flex flex-col justify-start items-center md:items-center md:pl-2 pt-3 pb-20 md:pb-0 ">
            {totalProducts ? totalProducts.map((elem) =>{
              return (
                <div className="w-[80vw] md:w-[50vw] lg:w-[65vw] xl:w-[60vw] 2xl:w-[40vw]  " key={elem._id}> 
                  <AllFinishedOrders
                  name={elem.firstName + "  " + elem.lastName} 
                  price={elem.totalAmount} 
                  email={elem.email} 
                  orderDate={elem.createdAt}
                  numberOfProducts={elem.products}
                  paymentMethod={elem.paymentMethod}
                  products = {finished_Orders.uniqueProductIds}
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
            <span className="text-[20px] cursor-pointer text-white   hover:text-[#1acc64] underline underline-offset-6" onClick={()=>navigate("/orders")} >See Pending Orders</span>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default FinishedOrders;
