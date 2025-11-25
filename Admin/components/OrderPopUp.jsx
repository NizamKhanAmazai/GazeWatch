import { useContext, useEffect, useState } from "react";
import { ProductDataContext } from "../userContext/ProductContext";
import axios from "axios"; 
import { toast } from "react-toastify";
import Loading from "./Loading";

function OrderPopUp(props) {
  let {showDetails, setShowDetails,update, setUpdate } = props 
  let { fetch_Finished_Orders,fetchOrders } = useContext(ProductDataContext) 

  // set shipping date and order status 
  const [orderStatus, setOrderStatus] = useState(props.shippingDate)
  const [shipping, setShipping] = useState(props.orderState)
  const [loading, setLoading] = useState(false)
  const id = props.id;


  const handleUpdateOrder =async () => {
    if(update){
    try {
      setLoading(true)
      let results = await axios.post("/api/order/admin/update", { id, orderState: shipping, date: orderStatus }, {withCredentials: true});
      setUpdate(prev=> !prev) 
      toast.success("Updated Successfully")
      setLoading(false)
      // console.log(results) 
      fetch_Finished_Orders();
      fetchOrders();
    } catch (error) {
      setLoading(false)
      toast.error("Update Error")
      console.log(error)
    }
    }else{
      // toast.error("already updated. close and open again to want to change again")
      toast.alert(`are your want to delete ${<button>yes</button>} ${<button>No</button>}`)
    }
  }

  
  let {
     name,
     shippingDate,
     orderState,
     numberOfProducts,
     totalAmount,
     city,
     payment,
     paymentMethod,
     streetAddress,
     mobileNumber
    } = props


    const handleClose = ()=>{
      update && setUpdate(prev=> !prev)
      setShowDetails(prev=> !prev)
      // console.log(update)
    }
  useEffect(()=>{
    window.addEventListener("scroll", prevent_Scroll, {passive: false})
    function prevent_Scroll(e){
      e.preventDefault();
    }
  },[])
 
  return (
    <div className=" overflow-hidden  ">
      {/* OutLine */}
      <div className={` ${showDetails ? "md:block" : "hidden"} w-[100vw] h-[100vh]  absolute bg-gray-800 opacity-60 top-0 left-0  `}></div>
      <div className={`${showDetails ? "md:block" : "hidden"} z-10 absolute md:top-[15%] md:right-[15%] md:w-[50vw] md:h-[50vh] w-[90vw] h-[70vh] top-20 right-4`}>
      <div
        className={` h-[100%] w-[100%] md:h-[70vh] md:w-[50vw] bg-gradient-to-r from-[#bc73ec] to-[#9cb0f3]  ${
          showDetails ? "block " : "animate-ping hidden "
        }  rounded-sm shadow-[0_2px_0_2px_theme('color.gray-300')]  transition-all`}
      >
        {/* details about user  */}
        <div className="w-[100%] md:p-3 p-1 h-[15%] border-b-1 flex flex-row items-center justify-center">
          <div className=" w-[100%] px-1 md:px-4 flex flex-row">
            <span className="md:w-[40%] w-[45%] text-[14px] md:text-[16px] lg:text-[18px]  lg:font-bold   ">
              Order placed by :
            </span>
            <p className=" w-[49%] md:[16px] lg:text-[24px] [text-shadow: none] [-webkit-text-stroke:0.5px_black] font-serif font-bold text-right bg-gradient-to-l from-emerald-600 to-rose-500 bg-clip-text text-transparent " >
              {/* {products.length}      from-slate-300 to-gray-400 ring-offset-1 ring-1 ring-gray-300 ring-offset-gray-300 */}
              { name.toUpperCase() }
            </p>
          </div>
        </div>
        <div className="md:w-[100%] h-[50%]  w-[100%] flex flex-col justify-around p-0 md:p-4"> 
          <div className=" w-[100%] h-[25px] flex flex-row justify-between px-4 hover:bg-[#ffffff65] hover:rounded-[2px] hover:border-1 hover:border-[#ffffff8f] hover:ring-1 hover:ring-[#53515157] hover:ring-offset-1 hover:ring-offset-[#ffffd39d]  ">
            <span className="w-[80%] md:w-[50%] font-semibold text-[14px] md:text-[16px] text-[#1d0892] ">
              Number of Products:
            </span>
            <p className=" w-[30%] md:w-[49%] italic font-semibold text-[14px]  text-right">
              {numberOfProducts}
            </p>
          </div>
          <div className=" w-[100%] h-[25px] font-semibold flex flex-row justify-between px-4 hover:bg-[#ffffff65] hover:rounded-[2px] hover:border-1 hover:border-[#ffffff8f] hover:ring-1 hover:ring-[#53515157] hover:ring-offset-1 hover:ring-offset-[#ffffd39d] ">
            <span className="w-[50%] text-[14px] font-semibold md:text-[16px] text-[#1d0892] ">
              total Amount:
            </span>
            <p className=" w-[49%] text-[14px] italic text-right">{totalAmount}</p>
          </div>
          <div className=" w-[100%] h-[25px] flex flex-row justify-between px-4 hover:bg-[#ffffff65] hover:rounded-[2px] hover:border-1 hover:border-[#ffffff8f] hover:ring-1 hover:ring-[#53515157] hover:ring-offset-1 hover:ring-offset-[#ffffd39d]  ">
            <span className="w-[50%] text-[14px] font-semibold md:text-[16px] text-[#1d0892] ">
              city:
            </span>
            <p className=" w-[49%] text-[14px] font-semiboldc  text-right">{city}</p>
          </div>
          <div className=" w-[100%] h-[25px] flex flex-row justify-between px-4 hover:bg-[#ffffff65] hover:rounded-[2px] hover:border-1 hover:border-[#ffffff8f] hover:ring-1 hover:ring-[#53515157] hover:ring-offset-1 hover:ring-offset-[#ffffd39d] ">
            <span className="w-[50%] text-[14px] font-semibold md:text-[16px] text-[#1d0892] ">
              payment:
            </span>
            <p className=" w-[49%] text-[14px] font-semibold text-right">{payment ? "Done": "Pending"}</p>
          </div>
          <div className=" w-[100%] h-[25px] flex flex-row justify-between px-4  hover:bg-[#ffffff65] hover:rounded-[2px] hover:border-1 hover:border-[#ffffff8f] hover:ring-1 hover:ring-[#53515157] hover:ring-offset-1 hover:ring-offset-[#ffffd39d] ">
            <span className="w-[52%] md:w-[50%] font-semibold text-[14px] md:text-[16px] text-[#1d0892] ">
              Payment Methode:
            </span>
            <p className=" w-[47%] md:w-[49%] font-semibold text-[14px]  text-right">{paymentMethod}</p>
          </div>
          <div className=" w-[100%] h-[25px] flex flex-row justify-between px-4 hover:bg-[#ffffff65] hover:rounded-[2px] hover:border-1 hover:border-[#ffffff8f] hover:ring-1 hover:ring-[#53515157] hover:ring-offset-1 hover:ring-offset-[#ffffd39d] ">
            <span className="w-[35%] text-[14px] font-semibold md:text-[16px] text-[#1d0892] ">
              Street Add:
            </span>
            <p className={`${ streetAddress.length > 22 ? "text-[10px] md:text-[12px] lg:text-[14px] 2xl:[18px]" : "text-[14px]"} w-[64%]  h-[100%] text-right`}>{streetAddress}</p>
          </div>
          <div className=" w-[100%] h-[25px] flex flex-row justify-between px-4 hover:bg-[#ffffff65] hover:rounded-[2px] hover:border-1 hover:border-[#ffffff8f] hover:ring-1 hover:ring-[#53515157] hover:ring-offset-1 hover:ring-offset-[#ffffd39d] ">
            <span className="w-[50%] text-[14px] font-semibold md:text-[16px] text-[#1d0892] ">
              Mobile Number:
            </span>
            <p className=" w-[49%] text-[14px] font-semibold italic text-right"> +92 {mobileNumber}</p>
          </div>
          {/* updating product for user */}
        </div>
        <div className="w-[100%] h-[35%] flex flex-col items-center justify-center bg-[#828ea7] rounded-md">
          <div className="w-[90%] h-[30%] flex flex-row items-center justify-between">
            <span className="text-[14px] w-[50%] lg:text-[16px] font-semibold xl:text-[18px]  ">
              Set Shipping Date:
            </span>
            <label
              htmlFor="date"
              className=" text-[14px] font-semibold w-[50%] h-[30px] text-[#300870] "
            >
              <input type="date" id="date" className="text-[#1900ff] border-2 w-[100%] h-[100%] border-[#09ff00] ring-1 ring-[#daff0b] rounded-md" value={new Date(orderStatus).toISOString().split("T").slice(0, 1)}  onChange={(e)=>{ setOrderStatus(e.target.value)}} />
            </label>
          </div>
          <div className="w-[90%] h-[30%] flex flex-row items-center justify-between">
            <span className="text-[14px] font-semibold w-[50%] lg:text-[16px] xl:text-[18px]">
              Set Order State
            </span>
            <label
              htmlFor="OrderState"
              className=" text-[14px] w-[50%] font-semibold h-[30px] text-[#300870] "
            >
              <select name="" id="OrderState" className="text-[#2600ff] border-2 w-[100%] h-[100%] border-[#09ff00] ring-1 ring-[#daff0b] rounded-md bg-slate-400 font-bold " value={shipping} onChange={(e)=>{ setShipping(e.target.value)}} >
                <option className="text-[#f82b9c] font-bold" value="Order place">Order Placed</option>
                <option className="text-[#f82b9c] font-bold" value="Packing">Packing</option>
                <option className="text-[#f82b9c] font-bold" value="Shipping">Shipping</option>
                <option className="text-[#f82b9c] font-bold" value="Out for delivery">Out for delivery</option>
                <option className="text-[#f82b9c] font-bold" value="Delivered">Delivered</option>
                <option className="text-[#f82b9c] font-bold" value="finished">finished</option>
              </select>
            </label>
          </div>
          <div className="w-[90%] h-[30%] flex flex-row items-center justify-center gap-x-5 ">
            <button className="cursor-pointer w-[100px] text-white text-[12px] md:text-[14px] h-[30px] bg-red-700 rounded-sm hover:shadow-[0_0_10px_6px_yellow] shadow-[0_0_10px_1px_gainsboro] hover:scale-110  transition-all" onClick={()=>{handleClose()}} >
               CLOSE
            </button>
            <button className="w-[100px] cursor-pointer text-[12px] text-white md:text-[14px] h-[30px] bg-emerald-700 rounded-sm hover:shadow-[0_0_10px_6px_yellow] shadow-[0_0_10px_1px_gainsboro] hover:scale-110 transition-all" onClick={()=>{handleUpdateOrder()}} >
               {loading ? <Loading /> : "SAVE"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default OrderPopUp;
