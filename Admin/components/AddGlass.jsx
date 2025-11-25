import React, { useContext, useState } from "react";
import { RiFileUploadFill } from "react-icons/ri"; 
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading"; 
import { ProductDataContext } from "../userContext/ProductContext";
function AddGlass({productType}) {
    let {fetchProducts} = useContext(ProductDataContext)
  

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDiscription, setProductDiscription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setproductQuantity] = useState("");
  const [productVariant, setProductVariant] = useState("");
  const [productSuitableFor, setProductSuitableFor] = useState("");
  const [ProductStyle, setProductStyle] = useState("");
  const [ProductPurpose, setProductPurpose] = useState("");
  const [IsAffordable, setIsAffordable] = useState(true);
  const [IsLuxury, setIsLuxury] = useState(false);
  const [ProductFrameMaterial, setProductFrameMaterial] = useState("");
  const [ProductLense, setProductLense] = useState("");
  const [loading, setLoading] = useState(false)
 

  const handleClearState = ()=>{
    setImage1(null)
    setImage2(null)
    setImage3(null)
    setImage4(null)
    setProductName("")
    setProductDiscription("")
    setProductPrice("")
    setproductQuantity("")
    setProductVariant("")
    setProductSuitableFor("")
    setProductStyle("")
    setProductPurpose("")
    setIsAffordable(true)
    setIsLuxury(false)
    setProductFrameMaterial("")
    setProductLense("")
  }

  const textInputs = ()=>{
    let name = productName.trim().replace(/\s/g ,"");
    let discription = productDiscription.trim().replace(/\s/g ,"");
    if(/^\d+$/.test(name) ){
      return alert("product name is not in numbers")
    }else if(/^\d+$/.test(discription)){
      return alert("discription is not in number")
    }
  }

  const handleAddProduct =async (e) => {
    e.preventDefault();
    try {
      textInputs();
      if(!image1 || !image2 || !image3 || !image4){
        return alert("Please upload all images");
      } 

      if(IsAffordable === false && IsLuxury === false){
        return alert("Please select at least one checkbox below")
      }
      setLoading(true)
      
      let formdata = new FormData();
      formdata.append("image1", image1)
      formdata.append("image2", image2)
      formdata.append("image3", image3)
      formdata.append("image4", image4)

      formdata.append("Name", productName)
      formdata.append("Price", productPrice)
      formdata.append("Discription", productDiscription)
      formdata.append("Quantity", productQuantity)  
      formdata.append("Variant", productVariant)
      formdata.append("Gender", productSuitableFor)
      formdata.append("Style", ProductStyle) 
      formdata.append("Purpose", ProductPurpose)
      formdata.append("Affordable", IsAffordable)
      formdata.append("Luxury", IsLuxury)
      formdata.append("Frame", ProductFrameMaterial)
      formdata.append("Lense", ProductLense) 
      formdata.append("Type", productType)
        
        let result =await  axios.post("/api/auth/admin/product/add", formdata, {withCredentials: true,
          headers:{
            "Content-Type": "multipart/json"
          }
        }) 
        console.log(result.data);
        setLoading(false) 
        toast.success("Product Successfully Added")
        handleClearState();
        fetchProducts("all")
      } catch (error) {
        setLoading(false)
        toast.error("Error in Add product")
        console.log(error)
    }
  };
  
  return (
    <div className="flex flex-row justify-center w-[100%] ">
      
      <form
        action=""
        className="w-[100%] flex flex-col items-center"
        onSubmit={handleAddProduct}
      >
        
        {/* product Name */}
        <div className=" sm:w-[100%] w-[80%] mt-2 flex flex-col items-center">
          
          <h1 className="text-gray-100 sm:text-[18px] p-[3px] self-start sm:self-center pl-5 sm:pl-0 md:w-[80%] text-[12px] md:text-[14px] ">
            Product Name
          </h1>
          <input
            type="text"
            value={productName}
            className="ring-green-300 outline-1 ring-2 rounded-md text-white pl-2 text-[14px] md:text-[18px] w-[90%] h-[40px] placeholder-blue-100 md:w-[80%] "
            placeholder="type here...."
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        {/* Product Discription */}
        <div className="md:w-[100%] w-[80%] h-[130px] mt-2 flex flex-col items-center">
          
          <h1 className="text-gray-200 md:text-[16px] text-[12px] p-[3px] md:w-[80%] self-start sm:self-center pl-5 sm:pl-0">
            Product Discription
          </h1>
          <textarea
            required
            type="text"
            value={productDiscription}
            className="ring-green-300 outline-1 ring-2 rounded-md text-white pl-2 md:text-[18px] text-[12px] w-[90%] h-[100px] placeholder-blue-100 md:w-[80%]"
            placeholder="type here...."
            onChange={(e) => setProductDiscription(e.target.value)}
          />
        </div>
        {/* Images */}
        <div className=" mt-5">
          
          <h1 className="text-gray-100 md:text-[18px] text-[14px] p-[3px] md:w-[100%] ">
            Product Images
          </h1>
        </div>
        <div className="sm:mt-2 flex flex-wrap sm:flex-nowrap gap-y-3 sm:flex-row sm:gap-y-3 justify-between md:w-[80%] w-[75%] ">
          
          <div className="bg-amber-300 size-[110px] sm:size-[90px] rounded-sm ">
            
            <label htmlFor="image1" className=" h-[100%] w-[100%] ">
              
              {image1 ? (
                <img
                  src={URL.createObjectURL(image1)}
                  className="w-[100%] h-[100%] rounded-sm cursor-pointer "
                />
              ) : (
                <RiFileUploadFill className="sm:text-[90px] text-[110px] w-[100%] cursor-pointer " />
              )}
              <input
                type="file"
                id="image1"
                onChange={(e) => {
                  setImage1(e.target.files[0]);
                }}
                hidden
              />
            </label>
          </div>
          {/* image 2 */}
          <div className="bg-amber-300 size-[110px] sm:size-[90px] rounded-sm ">
            
            <label htmlFor="image2" className=" h-[100%] w-[100%] ">
              
              {image2 ? (
                <img
                  src={URL.createObjectURL(image2)}
                  className="w-[100%] h-[100%] rounded-sm cursor-pointer"
                />
              ) : (
                <RiFileUploadFill className="sm:text-[90px] text-[110px] w-[100%] cursor-pointer" />
              )}
              <input
                type="file"
                id="image2"
                onChange={(e) => {
                  setImage2(e.target.files[0]);
                }}
                hidden
              />
            </label>
          </div>
          {/* image 3 */}
          <div className="bg-amber-300 size-[110px] sm:size-[90px] rounded-sm ">
            
            <label htmlFor="image3" className=" h-[100%] w-[100%] ">
              
              {image3 ? (
                <img
                  src={URL.createObjectURL(image3)}
                  className="w-[100%] h-[100%] rounded-sm cursor-pointer "
                />
              ) : (
                <RiFileUploadFill className="sm:text-[90px] text-[110px] w-[100%] cursor-pointer" />
              )}
              <input
                type="file"
                id="image3"
                onChange={(e) => {
                  setImage3(e.target.files[0]);
                }}
                hidden
              />
            </label>
          </div>
          {/* image 4 */}
          <div className="bg-amber-300 size-[110px] sm:size-[90px] rounded-sm ">
            
            <label htmlFor="image4" className=" h-[100%] w-[100%] ">
              
              {image4 ? (
                <img
                  src={URL.createObjectURL(image4)}
                  className="w-[100%] h-[100%] rounded-sm cursor-pointer "
                />
              ) : (
                <RiFileUploadFill className="sm:text-[90px] text-[110px] w-[100%] cursor-pointer " />
              )}
              <input
                type="file"
                id="image4"
                onChange={(e) => {
                  setImage4(e.target.files[0]);
                }}
                hidden
              />
            </label>
          </div>
        </div>
        {/* Product Price */}
        <div className="md:w-[100%] w-[80%] h-[80px] mt-2 flex flex-col items-center">
          
          <h1 className="text-gray-200 md:text-[16px] text-[12px] p-[3px] md:w-[80%] self-start sm:self-center pl-5 sm:pl-0">
            Product Price
          </h1>
          <input
            type="number"
            value={productPrice}
            required
            className="input "
            placeholder="Amount in ₨"
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        {/* Product Quantity */}
        <div className="md:w-[100%] w-[80%] h-[80px] mt-2 flex flex-col items-center ">
          
          <h1 className="text-gray-200 md:text-[16px] text-[12px] p-[3px] md:w-[80%] self-start sm:self-center pl-5 sm:pl-0">
            Quantity
          </h1>
          <input
            type="number"
            required
            value={productQuantity}
            className="input "
            placeholder="Quantity"
            onChange={(e) => setproductQuantity(e.target.value)}
          /> 
        </div> 
        {/* Product Categories */} 
        <div className="flex w-[72%] md:w-[80%] md:flex-row flex-col justify-between ">
           
          {/* Product For */} 
          <div className="sm:w-[40%] w-[100%] h-[80px] mt-2 ">
             
            <h1 className="text-gray-200 md:text-[16px] text-[12px] p-[3px] ">
              Product Suitable For
            </h1> 
            <select
              value={productSuitableFor}
              required
              className="cursor-pointer md:text-[20px] text-[14px] rounded-sm outline-1 ring-2 ring-green-300 pl-2 text-white focus:bg-lime-600 w-[100%] h-[40px] "
              placeholder="Quantity"
              onChange={(e) => setProductSuitableFor(e.target.value)}
            >
              
              <option className="bg-white text-black " value="">
                Select
              </option>
              <option className="bg-white text-black " value="All">
                All
              </option>
              <option className="bg-white text-black " value="Men">
                Men
              </option>
              <option className="bg-white text-black " value="Women">
                Women
              </option>
              <option className="bg-white text-black " value="Kids">
                Kids
              </option>
            </select>
          </div>
          {/* Product Type */}
          <div className="md:w-[40%] w-[100%] h-[80px] mt-2 ">
            
            <h1 className="text-gray-200 md:text-[16px] text-[12px] p-[3px] ">
              Product Variant
            </h1>
            <select
              required
              value={productVariant}
              name="ProductType"
              id="ProductType"
              className="cursor-pointer md:text-[18px] text-[14px] rounded-sm outline-1 ring-2 ring-green-300 pl-2 text-white focus:bg-lime-600 w-[100%] h-[40px] "
              placeholder="Quantity"
              onChange={(e) => setProductVariant(e.target.value)}
            >
              
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value=""
              >
                Select
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Eyeglasses "
              >
                Eyeglasses
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Sunglasses "
              >
                Sunglasses
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Safety Glasses"
              >
                Safety Glasses
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Others"
              >
                Others
              </option>
            </select>
          </div>
        </div>
        {/* subCotegories */}
        <div className="flex w-[72%] md:flex-row flex-col justify-between md:w-[80%]">
          
          {/* Product Style */}
          <div className="md:w-[40%] w-[100%] h-[80px] mt-2 ">
            
            <h1 className="text-gray-200 md:text-[16px] text-[12px] p-[3px] ">
              Product Style
            </h1>
            <select
              required
              value={ProductStyle}
              className="cursor-pointer md:text-[18px] text-[14px] rounded-sm outline-1 ring-2 ring-green-300 pl-2 text-white focus:bg-lime-600 w-[100%] h-[40px] "
              placeholder="Quantity"
              onChange={(e) => setProductStyle(e.target.value)}
            >
              
              <option className="bg-white text-black " value="">
                
                Select
              </option>
              <option className="bg-white text-black " value="Aviator Glasses">
                
                Aviator Glasses
              </option>
              <option className="bg-white text-black " value="Wayfarer Glasses">
                Wayfarer Glasses
              </option>
              <option className="bg-white text-black " value="Rounded Glasses">
                
                Rounded Glasses
              </option>
              <option
                className="bg-white text-black "
                value="Rectangular Glasses"
              >
                
                Rectangular Glasses
              </option>
              <option className="bg-white text-black " value="Others">
                
                Others
              </option>
            </select>
          </div>
          {/* Product Movement */}
          <div className="md:w-[40%] w-[100%] h-[80px] mt-2 ">
            
            <h1 className="text-gray-200 md:text-[16px] text-[12px] p-[3px] ">
              Product Purpose
            </h1>
            <select
              required
              value={ProductPurpose}
              name="ProductType"
              id="ProductType"
              className="cursor-pointer md:text-[18px] text-[14px] rounded-sm outline-1 ring-2 ring-green-300 pl-2 text-white focus:bg-lime-600 w-[100%] h-[40px] "
              placeholder="Quantity"
              onChange={(e) => setProductPurpose(e.target.value)}
            >
              
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value=""
              >
                Select
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Prescription Glass"
              >
                Prescription Glass
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Reading Glass "
              >
                Reading Glass
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Computer Glass "
              >
                Computer Glass
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Sport Glass "
              >
                Sport Glass
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Others "
              >
                Others
              </option>
            </select>
          </div>
        </div>
        {/*Lense type frame materail */}
        <div className="flex w-[72%] md:flex-row flex-col justify-between md:w-[80%]">
          
          {/* Product Style */}
          <div className="md:w-[40%] w-[100%] h-[80px] mt-2 ">
            
            <h1 className="text-gray-200 md:text-[16px] text-[12px] p-[3px] ">
              Lense Type
            </h1>
            <select
              value={ProductLense}
              required
              className="cursor-pointer md:text-[18px] text-[14px] rounded-sm outline-1 ring-2 ring-green-300 pl-2 text-white focus:bg-lime-600 w-[100%] h-[40px] "
              placeholder="Quantity"
              onChange={(e) => setProductLense(e.target.value)}
            >
              
              <option className="bg-white text-black " value="">
                
                Select
              </option>
              <option
                className="bg-white text-black "
                value="Single Vision Lense"
              >
                
                Single Vision Lense
              </option>
              <option
                className="bg-white text-black "
                value="Bifocal / Progressive Lense"
              >
                Bifocal / Progressive Lense
              </option>
              <option className="bg-white text-black " value="Polorize Lenses">
                
                Polorize Lenses
              </option>
              <option className="bg-white text-black " value="PhotoChromic">
                
                PhotoChromic
              </option>
              <option className="bg-white text-black " value="Others">
                
                Others
              </option>
            </select>
          </div>
          {/* Product Movement */}
          <div className="md:w-[40%] w-[100%] h-[80px] mt-2 ">
            
            <h1 className="text-gray-200 md:text-[16px] text-[12px] p-[3px] ">
              Frame Material
            </h1>
            <select
              required
              value={ProductFrameMaterial}
              name="ProductType"
              id="ProductType"
              className="cursor-pointer md:text-[18px] text-[14px] rounded-sm outline-1 ring-2 ring-green-300 pl-2 text-white focus:bg-lime-600 w-[100%] h-[40px] "
              placeholder="Quantity"
              onChange={(e) => setProductFrameMaterial(e.target.value)}
            >
              
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value=""
              >
                Select
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Acetate Frame"
              >
                Acetate Frame
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Metal Frame"
              >
                Metal Frame
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Wooden/Other Material "
              >
                Wooden/Other Material
              </option>
              <option
                id="ProductType"
                name="ProductType"
                className="bg-white text-black "
                value="Others "
              >
                Others
              </option>
            </select>
          </div>
        </div>
        {/*sub into subCotegories */}
        <div className="flex w-[73%] flex-col md:flex-row justify-between md:w-[80%]">
          
          {/* Product Style */}
          <div className="md:w-[40%] w-[80%] md:h-[80px] h-[40px] mt-2 flex flex-row items-center gap-x-3">
            
            <input 
              checked={IsAffordable}
              type="checkbox"
              className="cursor-pointer md:w-[20px] md:h-[30px] size-[15px] ml-1 "
              onChange={(e) => setIsAffordable((prev) => !prev)}
            />
            <h1 className="text-gray-200 md:text-[16px] text-[12px] p-[3px]  ">  
              Affordable Glasses
              {IsAffordable && <span className="text-[10px] md:text-[16px] text-green-500 "> (Selected)</span>}
              {/* AFFORDABLE Glasses */}
            </h1>
          </div>
          {/* Product Movement */}
          <div className="md:w-[40%] w-[80%] md:h-[80px] h-[40px] mt-2 flex flex-row items-center gap-x-3">
            
            <input
            checked={IsLuxury}
              type="checkbox"
              className="cursor-pointer md:w-[20px] md:h-[30px] size-[15px] ml-1 "
              onChange={(e) => setIsLuxury((prev) => !prev)}
            />
            <h1 className="text-gray-200 md:text-[16px] text-[12px] p-[3px] ">
              LUXURY Glasses
              {IsLuxury && <span className="text-[10px] md:text-[16px] text-green-500  "> (Selected)</span>} 
            </h1>
          </div>
        </div>
        {/* Add Product */}
        <div className=" w-[80%] h-[80px] mt-2 ">
          
          <button className="cursor-pointer bg-green-500 shadow-md shadow-lime-300 hover:shadow-md hover:shadow-gray-200 text-[24px] font-semibold text-black hover:text-white w-[100%] h-[40px] rounded-md outline-1 ring-1 ring-lime-500 ">
            { 
            loading ? <Loading/> : "Add Product" 
            }
          </button> 
        </div>
        <div className="h-[10vh] w-[100vw] "></div>
      </form>
    </div>
  );
}
export default AddGlass;
