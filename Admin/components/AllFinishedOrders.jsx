import React, { useContext, useEffect, useState } from "react"; 
import OrderPopUp from "./OrderPopUp";
import { ProductDataContext } from "../userContext/ProductContext"; 
import ShowProductsInAllOrder from "./ShowProductsInAllOrder"; 
import NewOrder from "../src/assets/newOrder.jpg"
// import { userDataContex } from "../src/userContext/dataContext";
// import { orderDataContext } from "../src/userContext/OrderContext";

function AllFinishedOrders(props) { 
  const [quantityOfProduct, setQuantityOfProduct] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  let {orders} = useContext(ProductDataContext)

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
     mobileNumber,
     id
    } = props;

    const settingProducts = ()=>{
      let x = orders.uniqueProductIds.filter(elem => numberOfProducts.includes(elem._id)) 
      setProducts(x);
    }

    useEffect(()=>{
      settingProducts();
    },[showProducts])

  return (
    <>
      <div
        className={` w-[100%]  h-[100px] md:h-[100px] lg:h-[120px] bg-gradient-to-l from-gray-300 to-gray-400 ${
          showDetails ? "rounded-t-sm" : "rounded-sm ring-offset-1"
        }  flex items-center pl-2 ring-1  ring-gray-300 ring-offset-gray-300 shadow-[0_2px_0_2px_theme('color.gray-300')]  `}
      >
        <div className="w-[30%] md:w-[24%] h-[80%] bg-gray-200 rounded-xl flex justify-center md:h-[95px] lg:h-[100px] xl:h-[108px]  ">
          <img src={NewOrder} className="text-[85px] md:text-[95px] w-full pb-1 md:hover:text-[100px] transition-all" />
        </div>
        <div className="w-[75%] h-[100%] px-1 py-2 md:p-3 flex flex-row md:h-[80%] md:items-center justify-between">
          <div className="w-[60%]">
            <div className=" text-[#0215be] md:text-[14px] text-[12px] font-semibold w-[100%] ">
              {name.toUpperCase()}
            </div>
              <div className="text-[#17038a] md:text-[12px] lg:text-md text-[12px]  font-serif flex flex-row justify-start gap-x-2 ">
                Phone: 
              <span className="font-sans"> {mobileNumber}</span>
              {/* <span className="font-serif ">*/}  
            </div>  
            <div className="text-[#443b96] md:text-[12px] lg:text-md text-[11px]  font-bold font-sans italic ">
              <span className="font-sans italic underline ">{props.email}</span>
            </div>
            <div className="text-[#8a0eaf]  md:text-[12px] lg:text-md text-[10px]  font-bold font-sans ">
              Date: &nbsp;
              <span className="font-sans font-medium italic text-[10px] md:text-[14px]">
                {new Date(props.orderDate).toDateString()}
              </span>
            </div>
            <div className="text-[#8a0eaf]  md:text-[12px] lg:text-md text-[10px] md:w-[100%] w-[150px] font-bold font-sans italic text-start">
              Payment M:
              <span className="font-sans text-[10px] md:text-md lg:text-lg text-center">
                {/* {paymentMethod.length > 0 && paymentMethod.find(elem => elem === id) ? "Cash On Delivery" : "easypaisa/jazcash"} */}
                {paymentMethod}
              </span>
            </div>
          </div>
          <div className="w-[45%] md:h-[50px] h-[80px]  flex flex-col lg:gap-y-5 gap-y-2 md:gap-y-3  justify-center  items-center  ">
            <div className="btn w-[100%]  ">
              <button
                className={`w-[100%] cursor-pointer ${
                  showDetails ? "bg-amber-600" : "bg-gray-400"
                } hover:bg-[#1bce7a] h-[25px] md:text-[16px] lg:text-[18px]  rounded-sm ring-1 hover:ring-cyan-700 ring-green-300 shadow-[0_0_8px_3px_skyBlue] text-[10px] transition-all`}
                onClick={() => {
                  setShowDetails((prev) => !prev); 
                  setUpdate(prev => !prev); 
                }}
              >
                  Order details 
              </button>
            </div>
            <div className="btn w-[100%]  ">
              <button
                className={`w-[100%] cursor-pointer ${
                  showProducts ? "bg-amber-600" : "bg-gray-400"
                } hover:bg-[#4b8ee6] h-[25px] md:text-[16px] lg:text-[18px]  rounded-sm ring-1 hover:ring-cyan-700 ring-green-300 shadow-[0_0_8px_3px_skyBlue] text-[10px] transition-all`}
                onClick={() => { 
                  setShowProducts((prev) => !prev);  
                }}
              >
                { showProducts ? "Hide Products" : "See Products"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* details pannel */} 
        <OrderPopUp
        showDetails = {showDetails}
        setShowDetails = {setShowDetails} 
        name = {name}
        shippingDate = {shippingDate}
        orderState = {orderState}
        numberOfProducts = {numberOfProducts.length}
        totalAmount = {totalAmount}
        city = {city}
        payment = {payment}
        paymentMethod = {paymentMethod} 
        streetAddress = {streetAddress}
        mobileNumber = {mobileNumber}
        id = {id}
        update= {update}
        setUpdate={setUpdate}
      /> 
      <div className="">
        <div className={` ${showProducts ? "block" : "hidden"} min-h-[50vh] h-[100%]   bg-gradient-to-l from-gray-300 to-gray-400 rounded-b -sm shadow-[0_2px_0_2px_theme('color.gray-300')]  transition-all mb-8`}>
          <div className="w-[100%] h-[88%] p-4 flex  flex-col items-center justify-start gap-y-2 lg:gap-y-3 lg:gap-x-3  lg:flex-row lg:flex-wrap    ">
            {products.map(elem => {
              return(
                <ShowProductsInAllOrder 
                  name = {elem.Name}
                  price = {elem.Price}
                  category = {elem.Gender}
                  image1 = {elem.image1}
                  key={elem._id}
                />
              )
            })}

          </div>
        {/* <div className="w-[100vw] h-[10vh] "></div> */}

        </div> 
      </div>
    </>
  );
}

export default AllFinishedOrders;
