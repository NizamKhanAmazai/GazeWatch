import React, { useContext, useState } from "react";
import pic from "../src/assets/picture.png";
import { IoTrashOutline } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { serverContext } from "../userContext/UserContext";
import axios from "axios"; 
import Loading from "./Loading";
import { toast } from "react-toastify";
import { ProductDataContext } from "../userContext/ProductContext";

function ListAll(props) {
   
  const [ItemImage, setItemImage] = useState(props.image1);
  const [loading, setLoading] = useState(false)
  let {fetchProducts} = useContext(ProductDataContext)
  
  const handleImage = () => {
      setItemImage(pic)
   };

  let { image1, image2, image3, image4 } = props;

 


  const { serverUrl } = useContext(serverContext);

  const Remove = async (id) => { 
      try {
        setLoading(true) 
        let result = await axios.delete(serverUrl + `/api/auth/admin/product/remove/${id}`, {
          withCredentials: true,
        });
        
        setLoading(false) 
        toast.success("Product successfully deleted") 
        console.log(result.data);
        fetchProducts("all");
      } catch (error) {
        toast.error("Product not deleted")
        setLoading(false) 
        console.log(error);
      }  
  }; 
  return (
    <> 
      <div
      className={`lg:w-[45%] w-[90%] h-[80px] md:h-[100px] lg:h-[120px] bg-gradient-to-l from-gray-300 to-gray-400 rounded-sm flex items-center pl-2  `}
    > 
      <div className="w-[30%] md:w-[22%] h-[80%] bg-gray-200 rounded-xl flex justify-center hover:h-[90px] hover:w-[22%] transition-all">
        {props.image1 ? <img src={ItemImage} onError={handleImage}  alt="item" className="h-full w-full rounded-xl" /> : 
        <IoImageOutline className="text-[80px] md:text-[100px] w-full pb-1 hover:text-[115px] transition-all" />}
      </div>
      <div className="w-[75%] h-[80%] p-3 flex flex-row items-center justify-between">
        <div className="">
          <div className=" text-[#0215be] md:text-lg text-sm font-semibold ">
            {props.name}
          </div>
          <div className="text-[#17038a]  md:text-lg text-sm font-serif   ">
            {props.category}
          </div>
          <div className="text-[#8a0eaf]  md:text-lg text-sm font-bold font-serif italic ">
            &#8360; : {props.price}
          </div>
        </div>
        {/* <div className="w-[50px] h-full flex flex-row items-center ml-4">
                    <input type="number" className='w-full h-[30px] ring-2 ring-lime-600 rounded-sm focus:outline-1 ' value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
                </div> */}
        <div
          className="w-[15%] h-[50px]  flex justify-center items-center  "
          onClick={() => {
            Remove(props.id);
          }}
        >
          {loading ? <Loading color={"green"} /> : <IoTrashOutline className="text-red-500 text-[30px] hover:text-[45px] transition-all " />}
        </div>
      </div>
    </div>
    </>
  );
}

export default ListAll;
 