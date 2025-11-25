import React, { useContext, useEffect, useState } from "react";
import pic from "../src/assets/picture.png";
import { IoTrashOutline } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { userDataContex } from "../src/userContext/dataContext";
import { GazeWatchContext } from "../src/userContext/UserContext";
import axios from "axios";
import { shopDataContext } from "../src/userContext/ShopContext";
import Loading from "./Loading";
import { toast } from "react-toastify";

function ListAll(props) { 
  const [ItemImage, setItemImage] = useState(props.image1);
  const { userData, authorizeUser } = useContext(userDataContex);
  const { setCartProducts, cartProducts, setCartItemsCount, cartItems, setCartItems, getSubTotal } = useContext(shopDataContext);
  const { serverUrl } = useContext(GazeWatchContext);
  const [loading, setLoading] = useState(false)

  const handleImage = () => {
    setItemImage(pic);
  };
  let userId = userData && userData._id 
  let {   name, price, id, category, } = props;

  const Remove = async (id, userId) => { 
      try { 
        if (userData) {
          try {
            setLoading(true)// 
            let data = await axios.delete(`/api/auth/cart/delete?product=${id}&userid=${userId}`, {userId}, {
              WithCredential: true,
            }); 
            data && await authorizeUser();
            setLoading(false)
            // toast.success("Product Succeessfully Removed!")
            toast.success(data.data.message)
          } catch (error) {
            setLoading(false)
            console.log(error);
            // toast.error("Product Not Removed")
            console.log()
          }
        } else {
          setCartProducts((prev) => prev.filter((elem) => elem._id !== id));  
          setCartItems((prev) => prev.filter((elem) => elem !== id));
          setCartItemsCount(prev => prev -1 );
          getSubTotal(cartProducts)
          toast.success("Product Succeessfully Removed!")
        }
      } catch (error) {
        console.log(error);
      } 
    }; 

    useEffect(()=>{ 
              window.scrollTo(0,0) 
          },[])
    
    return (
      <div
      className={`lg:w-[45%] w-[100%] h-[80px] md:h-[100px] lg:h-[120px] bg-gradient-to-l from-gray-300 to-gray-400 rounded-sm flex items-center pl-2  `}
    > 
      <div className="w-[30%] md:w-[24%] h-[80%] bg-gray-200 rounded-xl flex justify-center md:hover:h-[95px] lg:hover:h-[100px] xl:hover:h-[108px] hover:w-[26%] transition-all">
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
      <div className="w-[75%] h-[80%] p-3 flex flex-row items-center justify-between">
        <div className="">
          <div className=" text-[#0215be] md:text-lg text-sm font-semibold ">
            {name}
          </div>
          <div className="text-[#17038a]  md:text-lg text-sm font-serif   ">
            {category}
          </div>
          <div className="text-[#8a0eaf]  md:text-lg text-sm font-bold font-serif italic ">
            &#8360; : {price}
          </div>
        </div>
        {/* <div className="w-[50px] h-full flex flex-row items-center ml-4">
                    <input type="number" className='w-full h-[30px] ring-2 ring-lime-600 rounded-sm focus:outline-1 ' value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
                </div> */}
        <div
          className="w-[15%] h-[50px]  flex justify-center items-center  "
          onClick={() => {
            Remove(id, userId);
          }}
        >
          {loading ? <Loading color={"yellow"} /> : <IoTrashOutline className="text-red-500 cursor-pointer text-[30px] hover:text-[45px] transition-all " />}
        </div>
      </div>
    </div>
  );
}

export default ListAll;
