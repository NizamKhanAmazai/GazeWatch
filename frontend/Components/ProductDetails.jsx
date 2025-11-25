import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { shopDataContext } from "../src/userContext/ShopContext";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Title from "../Components/Title.jsx";
import RelativeProduct from "./RelativeProduct.jsx"; 
import Loading from "./Loading.jsx";

function ProductDetails() {
  // making image zoom
  const MainImage = useRef(Element);
  const frontImage = useRef(Element); 

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 
  const handlerightChange = () => {
    setImage((prev) =>
      prev === image1
        ? image2
        : prev === image2
        ? image3
        : prev === image3
        ? image4
        : image1
    );
  };

  const handleLeftChange = () => {
    setImage((prev) =>
      prev === image1
        ? image4
        : prev === image2
        ? image1
        : prev === image3
        ? image2
        : image3
    );
  };

  // context
  const { products, Currency, settingCartItem, cartLoading } = useContext(shopDataContext);

  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  // setting image and all images
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const gettingDetails =  (id) => {
    products && products.map((elem) => {
      if (elem._id === id) {
        setProductDetails(elem);

        setImage(elem.image1);
        setImage1(elem.image1);
        setImage2(elem.image2);
        setImage3(elem.image3);
        setImage4(elem.image4);
      }
    });
  };

  useEffect(() => {
    gettingDetails(id);
  }, [products, id,]);

  const handlezoom = (e) => {
    MainImage.current.style.setProperty("--displayimg", "1");
    const { left, top, height, width } =
      MainImage.current.getBoundingClientRect();

    const x12 = ((e.clientX - left) / width) * 100;
    const y12 = ((e.clientY - top) / height) * 100;

    MainImage.current.style.setProperty("--zoom-x", `${x12}%`);
    MainImage.current.style.setProperty("--zoom-y", `${y12}%`);
  };

  const hanldezoomout = () => {
    MainImage.current.style.setProperty("--displayimg", "0");
  };
  // drag to change image

  useEffect(()=>{ 
          window.scrollTo(0,0) 
      },[])

  return productDetails ? (
    <div
      key={id}
      className="bg-gradient-to-r from-[#140220] to-[#01081f] overflow-x-hidden"
    >
      <div className="w-[100vw] h-[120vh] md:h-[100vh] bg-gradient-to-r from-[#140220] to-[#01081f] pt-[60px] md:pt-[60px] flex flex-col md:flex-row flex-nowrap items-center  md:justify-center md:gap-x-5">
        <div className="pl-2 md:pl-0 w-[100%] lg:gap-y-2 gap-y-2 h-[45%] md:w-[45vw] xl:h-[90%] lg:w-[60vw] lg:h-[80%] md:h-[100%] flex  lg:flex-row md:flex-wrap   flex-col-reverse items-center justify-end md:justify-center  lg:justify-center lg:items-start xl:mt-20 lg:pt-0 pt-5 ">
          <div className="small_images lg:w-[25%] w-[85%] md:w-[100%] gap-y-2 md:gap-y-0 h-[80%]   md:items-center md:h-[20%] lg:h-[80%] xl:h-[80%] flex  lg:flex-col lg:items-center  justify-between   flex-row ">
            {" "}
            {/* place-content-center  */}
            <img
              src={image1}
              alt="product Image 1"
              className="text-white cursor-pointer rounded-lg lg:size-[80px] xl:size-[100px] hover:object-fill object-cover size-[42px]  md:size-[80px] "
              onClick={() => setImage(image1)}
            />
            <img
              src={image2}
              alt="product Image 2"
              className="text-white cursor-pointer rounded-lg lg:size-[80px] xl:size-[100px] hover:object-fill object-cover size-[42px]  md:size-[80px] "
              onClick={() => setImage(image2)}
            />
            <img
              src={image3}
              alt="product Image 3"
              className="text-white cursor-pointer rounded-lg lg:size-[80px] xl:size-[100px] hover:object-fill object-cover size-[42px]  md:size-[80px] "
              onClick={() => setImage(image3)}
            />
            <img
              src={image4}
              alt="product Image 4"
              className="text-white cursor-pointer rounded-lg lg:size-[80px] xl:size-[100px] hover:object-fill object-cover size-[42px]  md:size-[80px] "
              onClick={() => setImage(image4)}
            />
          </div>
          {/* <div className='relative'> */}
          <div
            className="relative large_image cursor-grabes  h-[80%] md:h-[70%] flex flex-row w-[90%] md:mr-0 mr-3 md:w-[100%] lg:w-[65%] lg:h-[80%] xl:h-[80%]  rounded-xl"
            onMouseOut={hanldezoomout}
            onMouseMove={handlezoom}
            style={{
              "--displayimg": "0",
              "--imgurl": `url(${image})`,
              "--zoom-x": "111.7%",
              "--zoom-y": "0%",
            }}
            ref={MainImage}
          >
            <button
              className="z-1 absolute h-[80px] cursor-pointer w-[40px] rounded-xl top-[30%] md:top-[40%] right-0 hover:bg-slate-400 hover:text-[50px] mr-2 "
              onClick={handlerightChange}
            >
              <IoIosArrowForward className=" text-[40px]" />{" "}
            </button>
            <button
              className="z-1 absolute h-[80px] w-[40px] cursor-pointer top-[30%] md:top-[40%] left-0 rounded-xl hover:bg-slate-400  hover:text-[50px] ml-2  "
              onClick={handleLeftChange}
            >
              <IoIosArrowBack className="  text-[40px]" />{" "}
            </button>
            <img
              src={image}
              alt="main image"
              ref={frontImage}
              className="rounded-xl w-[100%] h-[100%] object-fill "
            />
          </div>
          {/* </div> */}
        </div>
        <div className="product_details mt-5 md:mt-0 h-[50%] w-[94vw] md:w-[49vw] md:h-[90%] md:pt-5 lg:pt-0 lg:h-[80%] xl:h-[75%] flex flex-row md:flex-nowrap flex-wrap md:flex-col items-start justify-start  overflow-hidden">
          <h1 className="md:text-[24px] text-[22px]  w-[90%] text-[white] font-semibold font-serif ">
            {productDetails.Name.toUpperCase()}
          </h1>
          <p className="starts w-[45%] md:w-[80%] h-[40px] md:h-[8%] italic text-[18px]  text-white font-semibold flex flex-row md:justify-start items-center justify-center  ">
            <FaStar className="text-22px inline fill-amber-400" />
            <FaStar className="text-22px inline fill-amber-400" />
            <FaStar className="text-22px inline fill-amber-400" />
            <FaStar className="text-22px inline fill-amber-400" />
            <FaStarHalfAlt className="text-22px inline fill-amber-400" />
            <span className="text-[16px] pl-1 not-italic ">(124)</span>
          </p>
          <p className="price w-[45%] md:w-[80%] h-[40px] text-[16px] md:h-[8%] italic md:text-[18px] text-white font-semibold flex flex-row items-center md:justify-start justify-center ">
            {" "}
            {Currency}{" "}
            <span className="text-[#f1f5bb]">&nbsp; {productDetails.Price} PKR</span>{" "}
          </p>
          <p className="discription xl:h-[250px]  w-[90%] lg:h-[200px] text-[10px] md:h-[180px] md:w-[90%] lg:w-[80%] text-[white] lg:text-[14px] xl:text-[16px] md:text-[12px] ">
            {productDetails.Discription}  
            temporibus libero accusantium omnis quo commodi, reprehenderit cum
            voluptatibus dolores voluptatum eligendi eum, veniam totam repellat!{" "}
          </p>
          <p
            className="size md:mt-5 h-[30px] mt-2  italic font-semibold text-[#f1f5bb] lg:h-[40px] lg:w-[120px] md:h-[50px] md:w-[150px] flex flex-row items-center justify-center rounded-md md:rounded-lg lg:rounded-xl lg:mt-3 xl:p-3 lg:p-2 bg-slate-600 cursor-pointer p-3 text-[12px] md:text-[16px]    focus:bg-slate-500 "
          >
            
            {/* {productDetails.Size
              ? console.log("sizes are availble" + productDetails.Size)
              : "Medium Size"}  */}
              {"for "} {productDetails.Gender ? productDetails.Gender : "All"}
          </p>
          <div className="addtocart h-[60px] lg:h-[100px] xl:h-[140px] md:h-[100px]  w-[100%] flex flex-row items-center justify-start   ">
            <button className="transition-all mb-2 md:mb-3 shadow-lg cursor-pointer shadow-gray-600 md:h-[35px] w-[90%] hover:mb-0 lg:mb-2 xl:mb-5 hover:shadow-none md:w-[80%] lg:h-[60% ] xl:h-[30%] rounded-lg bg-[#5294df] text-[18px] font-semibold text-[#f1f5bb]  " onClick={()=>{settingCartItem(productDetails._id)}}>
              {cartLoading ? <Loading/> : "ADD TO CART"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-[100vw] overflow-y-hidden min-h-[100%] md:h-[110vh] pt-3 xl:mb-0 mb-20 md:mb-0 lg:mb-20 flex flex-col items-center md:justify-start lg:justify-center bg-gradient-to-r from-[#140220] to-[#01081f]  ">
        <div className=" md:w-[80%] w-[90%]  ">
          <button className="w-[80px] md:w-[120px] md:text-[16px] text-[12px] text-[#faf9c0] border-1 border-green-600 p-2 hover:border-amber-600 active:ring-2">
            Discription
          </button>
          <button className="w-[80px] md:w-[120px] md:text-[16px] text-[12px] text-[#faf9c0] border-1 border-green-600 p-2 hover:border-amber-600 active:ring-2 ">
            Reviews
          </button>
        </div>
        <div className="area w-[90%] h-[90%] md:w-[80%] max-h-[300px] md:h-[35%] lg:h-[30%] xl:h-[20%] lg:text-[16px] text-[10px] md:text-[14px] font-serif leading-6 border-1 border-blue-900 indent-4 px-2 font-light text-[#f8f4bf] ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          unde nam iste enim nostrum id, eius in eos, debitis accusantium totam
          ducimus quis error corrupti rem repellat excepturi? Dolor, saepe!
          Iusto numquam id maiores enim incidunt dolorem tempore eaque expedita
          quisquam, temporibus placeat, nisi iure alias fugit rerum eos odio
          neque quasi, ipsum tempora reprehenderit modi. Dignissimos blanditiis
          delectus facilis. Expedita unde porro recusandae eligendi ipsa eum.
          Modi nulla provident, optio quod tempore deserunt dolorem ea esse
          similique facilis deleniti voluptas? Quod eveniet dolor quaerat? Sit
          nostrum officia omnis dolor?
        </div>
        <div className="xl:h-[60%] md:h-[80%] h-[100%] lg:h-[60%] w-[100vw]   ">
          <div className="w-[100%] h-[60px] xl:h-[20%] lg:h-[30%]  md:block flex flex-row justify-center items-center pb-5 md:pb-0 ">
            <Title title={"Relative"} title2={"Product"} />
          </div>
          <div className="w-[100%] h-[80%] md:h-[70] flex flex-col items-center justify-center ">
            <RelativeProduct
              Gender={productDetails.Gender}
              Id={productDetails._id}
              Type={productDetails.Type}
            />
          </div>
        </div>
      </div>
      <div className="md:h-[20vh] h-[1px] lg:h-[1px] "></div>
    </div>
  ) : (
    <div className="text-white"> product not found</div>
  );
}

export default ProductDetails;
