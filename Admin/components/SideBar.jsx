import { useContext } from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5"; 
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductDataContext } from '../userContext/ProductContext';
import Loading from './Loading';

function SideBar(props) {
  const {listLoading, orderLoading} = useContext(ProductDataContext)

  let navigate = useNavigate(); 
  let locate = useLocation(); 

  let list = props.color === "list" && "bg-emerald-500 text-white shadow-sm shadow-gray-400      text-[16px]"
  let add = props.color === "add" && "bg-emerald-500 text-white shadow-sm shadow-gray-400        text-[16px]"
  let orders = props.color === "orders" && "bg-emerald-500 text-white shadow-sm shadow-gray-400  text-[16px]"
  return (
    <>
       <div className="z-20 fixed sm:left-0 sm:w-[20vw] sm:h-[100%]  sm:border-r-[1px] sm:border-r-gray-500 md:pt-20    
      //  small device properties
       h-[50px] w-[100%] bottom-0  bg-gray-800
       ">
          <div className=" w-[100%] h-[100%] flex sm:flex-col flex-row sm:items-end md:justify-start items-center justify-center sm:gap-y-3.5  sm:mt-3.5 gap-x-5">
            <button className={` cursor-pointer lg:w-[60%] md:w-[60%] md:text-md text-gray-400 md:pt-2 text-sm border-gray-500 hover:text-white hover:bg-emerald-500 sm:focus:hover:bg-emerald-600 border sm:rounded-0 rounded-sm p-[2px] md:p-[5px] sm:border-r-0 flex flex-row items-center sm:justify-start justify-center sm:w-0 w-[80px] md:rounded-r-none transition-all ${add} `} onClick={()=>{locate.pathname == "/add" ? "" : navigate("/add")}}    > <IoAddCircleOutline className='w-[30%] h-[30px]  '/> Add              </button>
            <button className={` cursor-pointer lg:w-[60%] md:w-[60%] md:text-md text-gray-400 md:pt-2 text-sm border-gray-500 hover:text-white hover:bg-emerald-500 sm:focus:hover:bg-emerald-600 border sm:rounded-0 rounded-sm p-[2px] md:p-[5px] sm:border-r-0 flex flex-row items-center sm:justify-start justify-center sm:w-0 w-[80px] md:rounded-r-none transition-all ${list} `} onClick={()=>{locate.pathname == "/list" ? "" : navigate("/list")}}   > { listLoading ? <Loading/> : <> <IoCheckmarkDoneCircleOutline className='w-[30%] h-[30px]  '/> List </> } </button>
            <button className={` cursor-pointer lg:w-[60%] md:w-[60%] md:text-md text-gray-400 md:pt-2 text-sm border-gray-500 hover:text-white hover:bg-emerald-500 sm:focus:hover:bg-emerald-600 border sm:rounded-0 rounded-sm p-[2px] md:p-[5px] sm:border-r-0 flex flex-row items-center sm:justify-start justify-center sm:w-0 w-[80px] md:rounded-r-none transition-all ${orders} `} onClick={()=>{locate.pathname == "/orders" ? "" : navigate("/orders")}}  > { orderLoading ? <Loading/> : <> <IoBagCheckOutline className='w-[30%] h-[30px]  '/>   Orders  </> }        </button>
          </div>
       </div>
    </>
  )
}

export default SideBar;
