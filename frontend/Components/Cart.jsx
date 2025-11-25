import { useContext, useEffect, useState } from "react";
import ListAll from "./ListAll"; 
import { shopDataContext } from "../src/userContext/ShopContext";
import { userDataContex } from "../src/userContext/dataContext";  
import Title from "./Title"; 
import { useNavigate } from "react-router-dom";

function Cart() { 
  
  const [shippingFee, setShippingFee] = useState(0); 
  const { Currency, cartProducts, cartItemsCount, Delivery_fee } = useContext(shopDataContext);
  const { userData } = useContext(userDataContex);
  const [subTotal, setSubTotal] = useState(0); 
  const navigate = useNavigate()
  
  const ListedProducts = () => { 
    if (cartProducts) {
      return cartProducts.map((elem) => { 
          return (
            <ListAll
              length={elem.length}
              name={elem.Name}
              price={elem.Price}
              image1= {elem.image1}
              id={elem._id}
              category={elem.Gender} 
              key={elem._id}  
            />
          ); 
      });
    } else { 
      return (
        <div className="text-[26px] text-[#837e7e] w-full text-center ">
          No Product Available
        </div>
      );
    }
   };


   // SubTotal  call in cart
     const getSubTotal = (prodt) => {  
       let prices = prodt.map((elem) => elem.Price);
       let x = 0;
         prices.forEach((element) => {
         x += element;
       });
       prices +=  prices.map(elem => elem)
       return x; 
     };
     useEffect(()=>{
      let x = cartProducts ? getSubTotal(cartProducts)  : 0
      setSubTotal(x)
      cartProducts && setShippingFee(cartItemsCount * Delivery_fee)  
     },[cartProducts])

     useEffect(()=>{ 
          window.scrollTo(0,0) 
      },[]) 
      //
  return (
    <div className="w-[100vw] h-[100%] min-h-[100vh] flex flex-col-reverse md:flex-row-reverse pt-[40px] flex-wrap md:items-start items-center md:pb-5 bg-gradient-to-r from-[#140220] to-[#01081f]"> 
      <div className="md:w-[65%] lg:w-[71%] overflow-x-hidden w-[90%] h-[100%] min-h-[100%] ">
          <div className=" w-[100%] min-h-[100%] h-[100%] pt-6 flex flex-col items-center">
            <div className="text-3xl text-white h-[80px] w-full  font-sans font-semibold  ">
              <Title title={"PRODUCTS"} title2={"DETAILS"} />
            </div>
            <div className="lg:w-[80%] md:mb-0 mb-20 md:w-[90%]  w-[100%] min-h-[100%] h-full flex flex-col gap-x-2 items-center 2xl:gap-y-5 lg:flex-row flex-wrap content-start gap-y-2 lg:justify-center ">
              {ListedProducts()}
            </div>
          </div> 
      </div>
      {/* <hv /> */}
      <div className="md:w-[35%] lg:w-[30%] h-[70vh] w-[100vw] md:h-[98vh] bg-gradient-to-r from-[#140220] to-[#01081f] pt-7 md:pt-16 md:fixed left-0 top-0 ">
      <div className="w-[100%] h-[50%] md:pt-20 md:p-2 lg:p-5 flex flex-row flex-wrap items-center gap-y-3 justify-center bg-gradient-to-r from-[#140220] to-[#01081f]">
            <div className="tilte w-[80%]  ">
              <div className="w-[100%] h-[20%] flex flex-col items-center  ">
                <div className="md:text-[24px] text-[#f3f2cc] font-semi text-[20px] ">
                  <p className="inline"> CART &nbsp;</p>
                  <p className="inline text-[#cddfe4]"> TOTALS </p>
                </div>
              </div>
            </div>
            <div className="box ring-1 ring-white w-[80%] md:w-[100%] min-h-[200px] h-[80%] flex flex-col items-start justify-evenly md:px-2 lg:px-10 px-3 lg:rounded-md rounded-sm ">
              <div className="text-[18px] w-full text-[#f8fae5] flex flex-row justify-between">
                <span className="" >Subtotal</span>
                 <span className="" >{Currency} {subTotal}.00</span>{/*{getSubTotal(products)} */}
              </div>
              <p className="row h-[2px] bg-gray-500 w-[100%] "></p>
              <div className="text-[18px] w-full text-[#f8fae5] flex flex-row justify-between">
                <span className="" >Shipping Fee</span>
                <span className="" >{Currency} { subTotal ? shippingFee : 0}.00</span>
              </div> 
              <p className="row h-[2px] bg-gray-500 w-[100%] "></p> 
              <div className="text-[18px] w-full text-[#f8fae5] flex flex-row justify-between">
                <span className="" >Total</span>
                <span className="" >{Currency} {cartProducts ? subTotal + shippingFee : 0}.00</span>
              </div> 
            </div>
          <div className="PAYMENT METHOD  w-[100%] h-[80px] flex flex-col items-center ">
              {/* <div className="md:text-[28px] text-[#92916d] font-semi text-[20px] ">
               <p className="inline text-[#68909b]"> PAYMENT &nbsp;</p>
                <p className="inline "> METHOD </p>
              </div>  */} 
              <div className="buttons w-[100%] pt-5 h-[60%] md:h-[80%] flex flex-row justify-center md:justify-around items-center flex-wrap"> 
                
                <div className="relative placeOrder w-[100%] flex flex-row justify-center pt-6" >
                  <button className="cursor-pointer transition-all z-5 hover:font-serif w-[80%] h-[40px] text-[18px] font-light hover:scale-106 bg-[#81f3c7] rounded-sm " onClick={()=>{userData ? navigate("/cart/placeorder") : navigate("/login")}} >
                    Proceed to Checkout
                  </button>  
                  <p className="absolute w-[80%] h-[40px]  rounded-md hover:animate-none hover:opacity-0">
                     <span className="absolute w-[65%]   2xl:left-18 2xl:w-[72%] left-12 md:w-[70%] xl:w-[60%] md:left-9 xl:left-15 h-[30px] top-[5px] rounded-md bg-[#00f8f8] opacity-80 animate-ping  "></span>
                  </p>
                </div>
                <button className="cursor-pointer transition-all z-5 hover:text-[blue] underline text-[#5451fa] hover:font-serif w-[80%] h-[30px] text-[18px] rounded-sm mt-2" onClick={()=>{userData ? navigate("/orders") : navigate("/login")}} >
                    See Your Orders
                  </button>
                
              </div>
          </div>
        </div>
        </div>
    </div>
  );
}

export default Cart;
