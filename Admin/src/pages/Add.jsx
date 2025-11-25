import { useState } from "react"; 
import AddWatch from "../../components/AddWatch";
import AddGlass from "../../components/AddGlass";
import Nav from "../../components/Nav";
import SideBar from "../../components/SideBar";


function Add() { 
  const [productType, setProductType] = useState("Watch")
  
  let watch = productType === "Watch" ? "bg-emerald-500 text-white shadow-md shadow-white" : "bg-gray-500" 
  let glass = productType === "Watch" ?  "bg-gray-500" : "bg-emerald-500 text-white shadow-md shadow-white "
  return (
    <div className="overflow-x-hidden">  
      <Nav />
      <div className=" select-none bg-gradient-to-r from-gray-900 to-emerald-900  700 h-[100%] flex flex-row flex-nowrap w-[100vw] pt-[45px] ">
        <div className="sm:w-[20vw] sm:h-[100%] relative w-100vw h-[60px] ">
          <SideBar color={'add'} />
        </div>
        <div className="sm:w-[80vw] w-[100vw] bg-gradient-to-r from-teal-700   to-gray-600 ">
        <div className="w-[98%] h-[100%] pt-6 flex flex-col items-center">
            <p className="text-3xl text-white   font-sans font-semibold  ">
             Add Product Page
            </p>
        <div className="h-[100px] md:w-[70%]sm:w-[30%] w-[80%] mt-5 flex flex-col items-center ">
            <p className="sm:text-[18px] text-[14px] text-gray-200 font-serif  ">
              What type of Product you want to Add
            </p>
          <div className="flex flex-row gap-x-5 justify-center">
             <p className={`flex flex-row items-center justify-center cursor-pointer w-[60px] h-[30px] p-1 text-[12px] md:w-[100px] md:h-[45px] mt-2 ring-1 md:text-[18px] font-semibold md:font-bold rounded-lg md:pt-2 ${watch}   `} onClick={()=> setProductType("Watch")} >Watches</p>
             <p className={`flex flex-row items-center justify-center cursor-pointer w-[60px] h-[30px] p-1 text-[12px] md:w-[100px] md:h-[45px] mt-2 ring-1 md:text-[18px] font-semibold md:font-bold rounded-lg md:pt-2 ${glass}   `} onClick={()=> setProductType("Glass")} >Glasses</p>
          </div>
        </div>
          <div className="w-[100%] ">
                  {productType === "Watch" ?  <AddWatch productType={productType} /> : <AddGlass productType={productType} />}
          </div>
         </div>
        </div> 
      </div>
    </div> 
  );
}

export default Add;
