import React, { useState } from 'react'
import { IoImageOutline } from "react-icons/io5";
import pic from "../src/assets/picture.png";

function ShowProductsInAllOrder(props) {
    const [ItemImage, setItemImage] = useState(props.image1);
      
      const handleImage = () => {
          setItemImage(pic)
       };
  return (
    <div className={` lg:w-[49%] w-[90%] h-[100%] bg-gradient-to-l from-gray-300 to-gray-400  rounded-t-sm rounded-sm ring-offset-1   flex items-center pl-2 ring-1  `}> 
        <div   className={`lg:w-[100%] w-[95%] h-[60px] md:h-[70px] lg:h-[120px] bg-gradient-to-l   from-gray-300 to-gray-400 rounded-sm flex items-center pl-2  `} > 
           <div className="w-[30%] md:w-[22%] h-[80%] bg-gray-200 rounded-md flex justify-center hover:h-[90px] hover:w-[22%] transition-all">
             {props.image1 ? <img src={ItemImage} onError={handleImage}  alt="item" className="h-full w-full rounded-md" /> : 
             <IoImageOutline className="text-[53px] md:text-[100px] w-full pb-1 hover:text-[115px] transition-all" />}
           </div>
           <div className="w-[75%] h-[80%] p-3 flex flex-row items-center justify-between"> 
               <div className=" text-[#0215be] md:text-lg text-[10px] font-semibold ">
                 {props.name}
               </div>
               <div className="text-[#17038a]  md:text-lg text-[10px] font-serif   ">
                 {props.category}
               </div>
               <div className="text-[#8a0eaf]  md:text-lg text-[10px] font-bold font-serif italic ">
                 &#8360; : {props.price}
               </div>  
          </div>
     </div>
    </div>
  )
}

export default ShowProductsInAllOrder
