import React, { useContext, useEffect, useState } from "react";
import pic from "../src/assets/picture.png"; 
import { IoImageOutline } from "react-icons/io5";
import { userDataContex } from "../src/userContext/dataContext";   
import { orderDataContext } from "../src/userContext/OrderContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function TotalOrders(props) { 
  let navigate = useNavigate();

  const [ItemImage, setItemImage] = useState(props.image1);
  const [orderStatus, setOrderStatus] = useState();
  const { userData, authorizeUser } = useContext(userDataContex);
  // const { setCartProducts, cartProducts, setCartItemsCount, cartItems, setCartItems, getSubTotal } = useContext(shopDataContext);
  // const { serverUrl } = useContext(GazeWatchContext);
  const { getOrders, orders, orderLoading, currentProductId  } = useContext(orderDataContext);

  // const [orderState, setOrderState] = useState(""); 
  const [quantityOfProduct, setQuantityOfProduct] = useState(""); 
  const [orderDate, setOrderDate] = useState() 

  const handleImage = () => {
    setItemImage(pic);
  };
  let userId = userData && userData._id 
  let { name, price, id, category, paymentMethod } = props;  
     

  // setting Date
  const settingProductsDate = (orders, id)=>{ 
    orders.pendingOrders.filter((elem) => {
      if(elem.products.includes(id)){
        setOrderDate(elem.date) 
      }
    })
  }
  
  // setting itemsQuantity
   const ItemsQuantity = (orders)=>{
    let allProductIds = [] ;
    if(orders){
      orders.pendingOrders.forEach((order) => {
        if (Array.isArray(order.products)) {
          allProductIds.push(...order.products);  
        }
      }); 
    } 
      // muawezateen  surah falaq and surah naas
      // azzahraween  2 nihayat tabnat aur roshan surate    //surah imran and another is next to it
     
    let x = allProductIds.filter(elem => elem === id) 
    setQuantityOfProduct(x.length) 
   }


  //  checking all order for the current product that from where this product is gain and set the orderstatus
  const handleOrderStatus = ()=>{
    // it will check the id. And the order return in which the id is available
    if(orders){
      let currentOrder = orders.pendingOrders.filter(elem => {
      return elem.products.find(elem => elem === id)
    }) 
    setOrderStatus(currentOrder); 
    } 
  }

  useEffect(()=>{
    ItemsQuantity(orders); 
    orders && settingProductsDate(orders , id) 
    orders && handleOrderStatus();
  },[orders])
 
 
  useEffect(()=>{ 
            window.scrollTo(0,0) 
  },[])
    
    return (
      <div
      className={`lg:w-[100%] w-[100%] h-[100px] md:h-[100px] lg:h-[120px] 2xl:w-[45%] bg-gradient-to-l from-gray-300 to-gray-400 rounded-sm flex items-center pl-2 ring-1 ring-offset-1 ring-gray-300 ring-offset-gray-300 shadow-[0_0_0_3px_blue] glow-3`}
       > 
      <div className="w-[30%] md:w-[24%] cursor-pointer h-[80%] bg-gray-200 rounded-xl flex justify-center md:h-[95px] lg:h-[100px] xl:h-[108px] "
        onClick={()=> {navigate(`/product/${id}`)}}
      >
        {props.image1 ? (
           
            <img
            src={ItemImage}
            onError={handleImage}
            alt="item"
            className="h-full w-full rounded-xl"
          /> 
        ) : (
          <IoImageOutline className="text-[60px] md:text-[100px] w-full pb-1 hover:text-[115px] transition-all" />
        )}
      </div>
      <div className="w-[75%] h-[100%] px-1 py-2 md:p-3 flex flex-row md:h-[80%] md:items-center justify-between">
        <div className="w-[60%]">
          <div className=" text-[#0215be] md:text-[14px] text-[12px] font-semibold w-[100%] ">
            {name}
          </div>
          <div className="text-[#17038a] md:text-[12px] lg:text-md text-[12px]  font-serif flex flex-row justify-start gap-x-2 ">
            {/* */}
            <span className="font-sans">&#8360; : {price}</span>
            <span className="font-serif ">{category} </span>
          </div>
          <div className="text-[#443b96] md:text-[12px] lg:text-md text-[11px]  font-bold font-sans italic ">
            Quantity:
            <span className="font-sans italic"> {quantityOfProduct}</span> 
          </div>
          <div className="text-[#8a0eaf]  md:text-[12px] lg:text-md text-[11px]  font-bold font-sans ">
            Date: 
            <span className="font-sans font-medium italic text-[10px] md:text-[14px]"> {new Date(orderDate).toDateString()}</span> 
          </div>
          <div className="text-[#8a0eaf]  md:text-[12px] lg:text-md text-[11px]  font-bold font-sans italic ">
            
            <span className="font-sans">Payment: {paymentMethod.length > 0 && paymentMethod.find(elem => elem === id) ? "C.O.D" : "Online"}</span> 
          </div>
        </div>
        {/* <div className="w-[50px] h-full flex flex-row items-center ml-4">
                    <input type="number" className='w-full h-[30px] ring-2 ring-lime-600 rounded-sm focus:outline-1 ' value={quantity} onChange={(e)=> setQuantity(e.target.value)} getOrders(userData._id)}window.location.reload()/>
                </div> */}
        <div className="w-[45%] md:h-[50px] h-[80px]  flex flex-col gap-y-2 md:justify-start justify-between  items-center  ">
          <div className="flex justify-start items-center">
            <span className="cricle size-[8px] bg-green-800 rounded-full "></span>
          <span className="text-[12px] text-[#2f00ff] pl-2 lg:text-lg" >{orderStatus && orderStatus[0].orderState}</span>
          </div>
          <div className="btn w-[100%] ">
            <button className="w-[100%] cursor-pointer hover:bg-amber-800 h-[25px] md:text-[16px] lg:text-[18px] bg-gray-400 rounded-sm ring-1 ring-green-300 shadow-[0_0px_0_3px_skyBlue] text-[10px] " onClick={()=>{getOrders(userData._id, id)}}>
              {(orderLoading && currentProductId === id ) ? <Loading color={"green"} /> : "Trace order"}
            </button>
          </div>
        </div>    
      </div>
    </div>
  );
}

export default TotalOrders;
