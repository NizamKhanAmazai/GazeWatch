import {useState, useEffect, useContext, useRef} from 'react'; 
import { shopDataContext } from "../src/userContext/ShopContext";
import { userDataContex } from "../src/userContext/dataContext";
import axios from "axios";
import { GazeWatchContext } from "../src/userContext/UserContext"; 
import Title from "./Title"; 
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

function PlaceOrder() { 
    const [shippingFee, setShippingFee] = useState(0); 
    const { Currency, setCartProducts, cartProducts, cartItemsCount, Delivery_fee, DBCartItems, setCartItems, setCartItemsCount } = useContext(shopDataContext);
    const { userData, authorizeUser, setToastSuccess, setToastError } = useContext(userDataContex);
    const [subTotal, setSubTotal] = useState(0);
    const { serverUrl } = useContext(GazeWatchContext);
    const submitbtn = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [countToastError, setCountToastError] = useState(0)

    // form details
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pincode, setPincode] = useState('')
    const [country, setCountry] = useState("")
    const [phone, setPhone] = useState('')
    const userId =userData && userData._id
    
    // cart data information 
    const [payment, setPayment] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery") 
    const [products, setProducts] = useState([])
    const [orderState, setOrderState] = useState('Order Placed')
      
       const settingProducts = (cartProducts)=>{
         if(cartProducts){
         const copyProducts = cartProducts.slice();
         setProducts(copyProducts.map(elem => elem._id))  
       }   
     }
    
    const handleSubmit =async (event) => { 
      event.preventDefault();
      try {
        setLoading(true)
        console.log({
          firstName,
          lastName,
          email,
          street,
          city, 
          state,
          pincode: Number(pincode),
          country,
          phone : Number(phone),
          products,
          userId,
          payment,
          paymentMethod,
          totalAmount : subTotal + shippingFee,
          orderState
        })
        
        const result =await axios.post("/api/order/place/new", {
          firstName,
          lastName,
          email,
          street,
          city, 
          state,
          pincode: Number(pincode),
          country,
          phone : Number(phone),
          products,
          userId,
          payment,
          paymentMethod,
          totalAmount : subTotal + shippingFee,
          orderState,
        }) 
        setCartProducts([])
        setCartItems([])
        setCartItemsCount(0)
        navigate("/orders")
        console.log(result)
        setLoading(false)
      } catch (error) {
        setCountToastError(prev => prev+1)
        setToastError("Order Not Placed" + countToastError)
        setLoading(false)
        console.log(
          firstName + lastName+ email+ street+ city+ state+ pincode+ country+ phone+ products+ payment+ paymentMethod
        )
        console.log(error)
      }
  };

    
    // SubTotal  call in cart
    const getSubTotal = (prodt) => { 
      // if(prodt){
        let prices = prodt.map((elem) => elem.Price);
        let x = 0;
        prices.forEach((element) => {
          x += element;
        });
        prices +=  prices.map(elem => elem)
        return x;
        // };
      };
 
      useEffect(()=>{  
        setSubTotal(cartProducts ? getSubTotal(cartProducts)  : 0) 
        setShippingFee(cartItemsCount * Delivery_fee) 
        settingProducts(cartProducts)
      },[cartProducts])
       
      useEffect(()=>{  
        window.scrollTo(0,0) 
      },[cartProducts])

      const selectedBtn = "border-5 border-x-[#f092f0] border-y-[#92edf0]"
      
  return (
    <>
        <div className="w-[100vw] h-[170vh] min-h-[100vh] md:h-[100vh] md:min-h-[100%] overflow-y-hidden bg-gradient-to-r from-[#140220] to-[#01081f] pb-10 pt-15  ">
        <div className="text-3xl h-[50px] pt-2 md:pt-0 text-white md:h-[70px] lg:h-[60px] xl:h-[80px] w-full  font-sans font-semibold  ">
              <Title title={"PlaceOrder"} title2={"PAGE"} />
        </div>
        <div className="w-[100vw] h-[100%] overflow-y-hidden userDetails flex flex-row md:flex-nowrap flex-wrap ">
          <div className="w-[100vw] md:w-[49vw] h-[43%] md:h-[75%] lg:h-[80%] ">
            <div className="tilte w-[80%] md:w-[100%] lg:h-[10%] xl:h-[13%]">
              <div className="w-[100%] h-[20%] flex flex-col items-center  ">
                <div className="md:text-[24px] lg:text-[28px] text-[#f3f2cc] font-semi text-[18px] brightness-85 md:brightness-100 ">
                  <p className="inline"> DELIVERY &nbsp;</p>
                  <p className="inline text-[#cddfe4]"> INFORMATION </p>
                </div>
              </div>
            </div>
            <form
              className="w-[85%]  md:w-[100%] lg:h-[85%] xl:h-[70%] m-auto lg:py-7 md:px-5 md:py-3  flex flex-row flex-wrap items-center gap-y-3 justify-between "
            onSubmit={(event)=> {handleSubmit(event)}}
            >
      {/* for First Name  */} 
                {/*required*/}  <input required type="text" className="1    w-[48%] h-[40px] text-[black] text-[18px]  bg-gray-200 placeholder:text-[#e8ebeaa8] placeholder-shown:bg-gray-600  focus:brightness-130 brightness-100  ring-0 placeholder:text-[18px] pl-2 focus:ring-2 ring-blue-400 rounded-sm " placeholder="First Name" onChange={(e)=>{setFirstName(e.target.value)}} value={firstName}/> 
      {/* for last Name  */} 
                <input required type="text" className="1  w-[48%] h-[40px] text-[black] bg-gray-200 placeholder-shown:bg-gray-600 text-[18px] placeholder:text-[#e8ebeaa8] focus:brightness-130 brightness-100  ring-0 placeholder:text-[18px] pl-2 focus:ring-2 ring-blue-400 rounded-sm " placeholder="Last Name" onChange={(e)=>{setLastName(e.target.value)}} value={lastName} /> 
      {/* for Email address  */} 
                {/*required*/}  <input required type="email" className="1   w-[100%] h-[40px] text-[black] bg-gray-200 placeholder-shown:bg-gray-600 text-[18px] placeholder:text-[#e8ebeaa8] focus:brightness-130 brightness-100  ring-0 placeholder:text-[18px] pl-2 focus:ring-2 ring-blue-400 rounded-sm " placeholder="Email address" onChange={(e)=>{setEmail(e.target.value)}} value={email} /> 
      {/* for  Streat Addres  */} 
                {/*required*/}  <input required type="text" className="1    w-[100%] h-[40px] text-[black] bg-gray-200 placeholder-shown:bg-gray-600 placeholder:text-[#e8ebeaa8] text-[18px] focus:brightness-130 brightness-100  ring-0 placeholder:text-[18px] pl-2 focus:ring-2 ring-blue-400 rounded-sm " placeholder="streat address" onChange={(e)=>{setStreet(e.target.value)}} value={street} /> 
      {/* for city  */} 
                {/*required*/}  <input required type="text" className="1     w-[48%] h-[40px] text-[black] bg-gray-200 placeholder-shown:bg-gray-600 text-[18px] placeholder:text-[#e8ebeaa8] focus:brightness-130 brightness-100  ring-0 placeholder:text-[18px] pl-2 focus:ring-2 ring-blue-400 rounded-sm " placeholder="City" onChange={(e)=>{setCity(e.target.value)}} value={city} /> 
      {/* for State  */} 
                <input required type="text" className="1     w-[48%] h-[40px]   text-[black] bg-gray-200 placeholder-shown:bg-gray-600 text-[18px] placeholder:text-[#e8ebeaa8] focus:brightness-130 brightness-100  ring-0 placeholder:text-[18px] pl-2 focus:ring-2 ring-blue-400 rounded-sm " placeholder="State" onChange={(e)=>{setState(e.target.value)}} value={state} /> 
      {/* for Pincode  */} 
                {/*required*/}  <input required type="number" className="1   w-[48%] h-[40px] text-[black] bg-gray-200 placeholder-shown:bg-gray-600 text-[18px] placeholder:text-[#e8ebeaa8] focus:brightness-130 brightness-100  ring-0 placeholder:text-[18px] pl-2 focus:ring-2 ring-blue-400 rounded-sm " placeholder="Pincode" onChange={(e)=>{setPincode(e.target.value)}} value={pincode} /> 
      {/* for Country  */} 
                {/*required*/}  <input required type="text" className="1      w-[48%] h-[40px] text-[black] bg-gray-200 placeholder-shown:bg-gray-600 text-[18px] placeholder:text-[#e8ebeaa8] focus:brightness-130 brightness-100  ring-0 placeholder:text-[18px] pl-2 focus:ring-2 ring-blue-400 rounded-sm " placeholder="Country" onChange={(e)=>{setCountry(e.target.value)}} value={country} /> 
      {/* for  phone number  */} 
                {/*required*/}  <input required type="number" className="1    w-[100%] h-[40px] text-[black] bg-gray-200 placeholder-shown:bg-gray-600 placeholder:text-[#e8ebeaa8] text-[18px] focus:brightness-130 brightness-100  ring-0 placeholder:text-[18px] pl-2 focus:ring-2 ring-blue-400 rounded-sm " placeholder="Phone" onChange={(e)=>{setPhone(e.target.value)}} value={phone} /> 
                <label htmlFor="submit" ref={submitbtn} hidden >
                    <input required id='submit' value={'submit'} type='submit' className=" right-[242px] bottom-[49px] transition-all z-10 hover:font-serif w-[241px] h-[40px] text-[18px] font-light hover:scale-106 bg-[#81f3c7] rounded-sm"  onSubmit={(event)=> {handleSubmit(event); return false;}} /> 
                </label>  
            </form> 
           <div className="hidden formdetails w-[85%] md:w-[90%] m-auto lg:h-[8%] xl:h-[17%] xl:p-0 lg:p-5 xl:items-center text-white   md:flex flex-row items-start justify-center "> 
                
              <span className='md:pl-3lg:pl-0 w-[85px] md:w-[90px] text-[16px] md:text-[18px] text-red-500 font-semibold font-serif ' >Alert : &nbsp; </span>
              <p className='pt-1 lg:text-[14px] text-[12px] xl:text-[16px] ' >check your Details before submit any mistake will loss your order.</p>
            </div>
          </div>
           
          <div className="w-[100vw] md:w-[49vw] h-[57%] lg:h-[60%] md:h-[60%] "> 
              <div className="w-[100%] md:h-[18%] h-[10%] lg:h-[20%] md:pl-0 pl-7 flex flex-col items-start md:items-center  ">
                <div className="md:text-[24px] lg:text-[28px] text-[#f3f2cc] font-semi text-[18px] brightness-85 md:brightness-100 ">
                  <p className="inline"> CART </p>
                  <p className="inline text-[#cddfe4]"> TOTALs </p>
                </div> 
            </div> 
          <div className="w-[100%] lg:h-[75%] h-[90%] xl:h-[90%] lg:p-2 xl:p-5 flex flex-row flex-wrap items-center gap-y-0 md:gap-y-3 justify-center ">
            <div className="box ring-1 ring-white w-[85%] rounded-sm md:w-[90%] lg:w-[80%] min-h-[200px] h-[50%] md:h-[80%] flex flex-col items-start justify-evenly md:px-5 lg:px-10 px-2 ">
              <div className="text-[18px] w-full text-[#f8fae5] flex flex-row justify-between">
                <span className="" >Subtotal</span>
                 <span className="" >{Currency} {subTotal ? subTotal : 0}.00</span>{/*{getSubTotal(products)} */}
              </div>
              <p className="row h-[2px] bg-gray-500 w-[100%] "></p>
              <div className="text-[18px] w-full text-[#f8fae5] flex flex-row justify-between">
                <span className="" >Shipping Fee</span>
                <span className="" >{Currency} {shippingFee}.00</span>
              </div> 
              <p className="row h-[2px] bg-gray-500 w-[100%] "></p> 
              <div className="text-[18px] w-full text-[#f8fae5] flex flex-row justify-between">
                <span className="" >Total</span>
                <span className="" >{Currency} {cartProducts && subTotal + shippingFee}.00</span>
              </div> 
            </div>
            <div className="PAYMENT METHOD  w-[100%] h-[43%] md:h-[30%] lg:h-[200px] xl:h-[80px] flex flex-col items-center ">
                <div className="md:text-[22px] lg:text-[28px] text-[#92916d] font-semi text-[18px] brightness-85 md:brightness-100">
                  <p className="inline text-[#68909b]"> PAYMENT &nbsp;</p>
                  <p className="inline "> METHOD </p>
                </div> 
                <div className="buttons md:w-[100%]   lg:w-[80%] md:pt-3 xl:pt-5 lg:h-[50%] xl:h-[80%] flex flex-row justify-around items-center flex-wrap"> 
                  <div className="w-[40%] h-[30px] md:h-[40px] brightness-90 mb-3 hover:mb-0">
                    <button className={` cursor-pointer ${paymentMethod === "Cash On Delivery" ? '' : selectedBtn}  transition-all hover:font-serif font-serif w-[100%] text-[#4a26ca] hover:shadow-none h-[30px] md:h-[40px] text-[12px] md:text-[14px] lg:text-[16px] font-light shadow-md shadow-gray-600 hover:bg-lime-200 bg-[#dbcfa9] rounded-sm `}>
                      EasyPaisa/JazzCash
                    </button>
                  </div>
                  <div className="w-[40%] h-[30px] md:h-[40px] brightness-90 mb-3 hover:mb-0">
                    <button className={`cursor-pointer ${paymentMethod === "Cash On Delivery" ? selectedBtn : ''} transition-all hover:font-serif font-serif text-[#4a26ca] w-[100%] hover:shadow-none h-[30px] md:h-[40px] text-[12px] md:text-[14px] lg:text-[16px] font-light shadow-md shadow-gray-600 hover:bg-lime-200 bg-[#dbcfa9] rounded-sm `} onClick={()=>{setPaymentMethod("Cash On Delivery")}} >
                      Cash On Delivery
                    </button>
                  </div>
                <div className="relative placeOrder w-[60%] flex flex-row justify-center md:pt-2 lg:pt-1 xl:pt-6 " >
                  <button className="transition-all cursor-pointer z-5 hover:font-serif w-[80%] h-[35px] md:h-[40px] text-[14px] md:text-[16px] lg:text-[18px] font-light hover:scale-106 bg-[#81f3c7] rounded-sm " onClick={()=>{submitbtn.current.click()}} >
                   {loading ? <Loading/> :  "PLACE ORDER"}
                  </button>    {/*animate-ping hover:animate-none hover:opacity-0  */}
                    <p className="absolute w-[80%] h-[30px] md:h-[40px]  rounded-md hover:animate-none hover:opacity-0 ">
                     <span className="absolute w-[65%]   2xl:left-18 2xl:w-[72%]  left-6 md:w-[70%] xl:w-[60%] md:left-7 lg:left-7 xl:left-12 h-[25px] md:h-[30px] top-[5px] rounded-md bg-[#00f8f8] opacity-80 animate-ping  "></span>
                    </p>
                </div> 
                </div>
            </div>
          </div>
          </div>
        </div>  
       </div>{/*absolute w-[60%] left-12 h-[30px] top-[5px] rounded-md bg-[#00f8f8] opacity-80 animate-ping   */}
    </>
  )
}

export default PlaceOrder
