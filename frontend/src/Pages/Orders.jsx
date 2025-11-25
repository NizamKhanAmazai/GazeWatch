import { useContext, useEffect, useState } from 'react' 
import { orderDataContext } from '../userContext/OrderContext';
import TotalOrders from '../../Components/TotalOrders';

function Orders() { 
    const { orders } = useContext(orderDataContext)
    const [totalProducts, setTotalProducts] = useState([]);
    const [totalOrdersProductCount, setTotlaOrdersProductCount] = useState([]); 
    const [totalAmount, setTotalAmount] = useState([]) 
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const settingTotalProducts = (orders)=>{
       let allProductIds = [] ;
          if(orders){
           orders.forEach((order) => {
             if (Array.isArray(order.products)) {
               allProductIds.push(...order.products);  
             }
           }); 
         }
         setTotlaOrdersProductCount(allProductIds)
    }  

    const settingTotalAmount = (orders)=>{
      // console.log(orders)
         let amount = []; 
      let x = orders.pendingOrders.length > 0 && orders.pendingOrders.filter(elem => amount.push([Number(elem.totalAmount) ]));
      let result = amount.reduce((a, b) => Number(a) + Number(b))
      // console.log(amount)
      // console.log(result)
      setTotalAmount(result)

       }


    const settingAddress = (orders)=>{ 
      let street;
      let city;
      orders.pendingOrders.filter(elem => street = elem.street)
      orders.pendingOrders.filter(elem => city = elem.city)
      setAddress(city + " " + street) 
    }
 
    const settingProductsPaymentMethod = (orders)=>{
      let allProductIds3 = [];
      let deliverdProducts =  orders.length > 0 && orders.filter(elem => elem.paymentMethod === "Cash On Delivery")
      if(deliverdProducts){
        deliverdProducts.forEach((order) => {
          if (Array.isArray(order.products)) {
            allProductIds3.push(...order.products);  
          }
        }); 
      }  
      setPaymentMethod(allProductIds3);
      // console.log(allProductIds2);   // open it if place order functionality is not working
    }

    useEffect(()=>{ 
     orders && settingTotalProducts(orders.pendingOrders)  
     orders && settingTotalAmount(orders)  
     orders && settingAddress(orders)  
     orders && settingProductsPaymentMethod(orders.pendingOrders)  
    },[orders])
    
const ListedProducts = () => { 
    if (totalProducts.length > 0 ) {
      return totalProducts.map((elem) => {  
        // console.log("yes there is some items")
        return (
          <TotalOrders 
          name={elem.Name} 
              price={elem.Price}
              image1= {elem.image1}
              id={elem._id}
              category={elem.Gender}  
              paymentMethod={paymentMethod}
              key={elem._id}  
            />
          ); 
      });
    } else { 
      // console.log("No there is some items")
      return (
        <div className="text-[26px] text-[#837e7e] w-full text-center ">
          No Product Available
        </div>
      );
    }
   };





    useEffect(()=>{
      if(orders){
        setTotalProducts([...orders.uniqueProductIds.reverse()]) 
        // settingOrderState(totalOrders); 
      }
        
    },[orders])
 
  return (
    <>
    <div className="w-[100vw] h-[50px] lg:pt-[15px] mt-[60px] bg-gradient-to-r from-[#140220] to-[#01081f] ">
        <div className="tilte w-[100%] md:w-[100%] lg:h-[10%] xl:h-[13%] md:bg-none bg-gradient-to-tl from-emerald-700 ">
          <div className="w-[100%] h-[20%] flex flex-row justify-center items-center  ">
            <div className="md:text-[24px] lg:text-[28px] text-[#f3f2cc] font-semi text-[28px] brightness-85 md:brightness-100 ">
              <p className="inline"> ORDER &nbsp;</p>
              <p className="inline text-[#cddfe4]"> PAGE </p>
            </div>
          </div>
        </div>
    </div>
    <div className="w-[100vw] h-[100%] md:h-[100%] min-h-[100vh] flex flex-col-reverse md:flex-row-reverse flex-wrap md:items-start items-center md:pb-5 bg-gradient-to-r from-[#140220] to-[#01081f]"> 
      
      <div className="md:w-[65%] lg:w-[71%] overflow-hidden w-[90%] h-[50%] md:h-[100%] min-h-[95vh]  ">
          <div className=" w-[100%] min-h-[100%] h-[100%] pt-6 flex flex-col items-center ">
            <div className="text-3xl text-white h-[40px] md:h-[80px] w-full  font-sans font-semibold  ">
              <div className="tilte w-[100%] md:w-[100%] lg:h-[10%] xl:h-[13%]">
              <div className="w-[100%] h-[10%] md:h-[20%] flex flex-col items-center  ">
                <div className="md:text-[20px] lg:text-[28px] text-[#f3f2cc] font-light text-[16px] brightness-65 md:brightness-100 ">
                  <p className="inline"> ORDERED &nbsp;</p>
                  <p className="inline text-[#cddfe4]"> PRODUCTS </p>
                </div>
              </div>
            </div>
            </div>
            <div className="lg:w-[80%] md:mb-0 mb-20 md:w-[90%] 2xl:w-[90%] w-[100%] min-h-[65vh] h-full flex flex-col gap-x-2 items-center 2xl:gap-y-5   flex-wrap content-start gap-y-2 lg:justify-center 2xl:flex-row 2xl:flex-wrap 2xl:justify-around ">
              { ListedProducts()}
            </div>
          </div> 
      </div>
      {/* <hv /> h-[70vh] md:pt-20*/}
      <div className="absolute top-25.5 h-[2px] w-[100vw] bg-[#7e7c7c] block md:hidden"></div>
      {/* <hv /> h-[70vh] md:pt-20*/}
      <div className="md:w-[35%] lg:w-[30%] h-[45vh] w-[100vw] md:h-[98vh] bg-gradient-to-r from-[#140220] to-[#01081f]  md:fixed md:mt-4 left-0 top-28 ">
      <div className="w-[100%] h-[50%] md:p-2 lg:p-5 flex flex-row flex-wrap items-center gap-y-3 justify-center bg-gradient-to-r from-[#140220] to-[#01081f]">
            <div className="tilte w-[80%]  ">
              <div className="w-[100%]  lg:h-[20%] flex flex-col items-center  ">
                <div className="md:text-[24px] text-[#f3f2cc] font-semi text-[20px]  brightness-65 md:brightness-100 ">
                  <p className="inline"> ORDER &nbsp;</p>
                  <p className="inline text-[#cddfe4]"> DETAILS </p>
                </div>
              </div>
            </div>
            <div className="box ring-1 ring-white w-[80%] md:w-[100%] min-h-[200px] h-[80%] flex flex-col items-start justify-evenly md:px-2 lg:px-5 xl:px-10 2xl:px-20 px-3 lg:rounded-md rounded-sm ">
              <div className="text-[18px] w-full text-[#f8fae5] flex flex-row justify-between">
                <span className="" >total Products</span>
                 <span className="" > {orders ? totalOrdersProductCount.length : 0 }</span>{/*{getSubTotal(products)} */}
              </div>
              <p className="row h-[2px] bg-gray-500 w-[100%] "></p>
              <div className="text-[18px] w-full text-[#f8fae5] flex flex-row justify-between">
                <span className="" >total amount </span>
                <span className="" > &#8360; {totalAmount ? totalAmount : 0}.00</span>
              </div>  
            </div> 
        </div>
        </div>
    </div>
    </>
  )
}

export default Orders
