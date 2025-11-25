import { useContext, useEffect, useState } from "react";
import Nav from "../../components/Nav";
import SideBar from "../../components/SideBar";
import ListWatch from "../../components/ListWatch";
import ListGlass from "../../components/ListGlass";
import ListAll from "../../components/ListAll";  
import { ProductDataContext } from "../../userContext/ProductContext.jsx";

function List() {
  // const [productType, setProductType] = useState("all"); ------------2
  const {products, productType, setProductType} = useContext(ProductDataContext); 
  // const [products, setProducts] = useState([]); ------------1
  // all product is work when products change to substages then the all products removed this will remain store all products
  const [allProducts, setAllProducts] = useState([]);  
  let all =
    productType === "all"
      ? "bg-emerald-500 text-white shadow-md shadow-white"
      : "bg-gray-500";
  let watch =
    productType === "Watch"
      ? "bg-emerald-500 text-white shadow-md shadow-white"
      : "bg-gray-500";
  let glass =
    productType === "Glass"
      ? "bg-emerald-500 text-white shadow-md shadow-white"
      : "bg-gray-500";

  const settingProducts = async () => {
    setAllProducts(products)
  };

  const changingProduct = ()=>{
    switch (productType) {
      case "Watch":
        setAllProducts(products.filter(elem => elem.Type === "Watch"))
        break;
      case "Glass":
        setAllProducts(products.filter(elem => elem.Type === "Glass"))
        break; 
        default:
        setAllProducts(products)
          break;
    }
  }
 
  useEffect(()=>{
    products && changingProduct()
    products && settingProducts
  }, [productType, products])

  const ListedProducts = () => { 
      if (allProducts.length) {
        return allProducts.map((elem) => {
          if (productType === "all") {
            return (
              <ListAll
                length={elem.length}
                name={elem.Name}
                price={elem.Price}
                id={elem._id}
                category={elem.Gender}
                image1={elem.image1}
                image2={elem.image2}
                image3={elem.image3}
                image4={elem.image4}
                key={elem._id}
                // fetchProducts={fetchProducts}
              />
            );
          } else if (productType === "Watch") {
            return (
              <ListWatch
               length={elem.length}
                name={elem.Name}
                price={elem.Price}
                id={elem._id}
                category={elem.Gender}
                image1={elem.image1}
                image2={elem.image2}
                image3={elem.image3}
                image4={elem.image4}
                key={elem._id}
                // fetchProducts={fetchProducts}
              />
            );
          } else if (productType === "Glass") {
            return (
              <ListGlass
                length={elem.length}
                name={elem.Name}
                price={elem.Price}
                id={elem._id}
                category={elem.Gender}
                image1={elem.image1}
                image2={elem.image2}
                image3={elem.image3}
                image4={elem.image4}
                key={elem._id}
                // fetchProducts={fetchProducts}
              />
            );
          }
        });
      }else {
        return <div className="text-[26px] ">Products Not Found</div>;
      } 
  };
  return (
    <>
      <div className="overflow-x-hidden min-h-[100vh]">
        <Nav />
        <div className=" select-none bg-gradient-to-r from-gray-900 to-emerald-900  700 min-h-[100vh] flex flex-row flex-nowrap w-[100vw] pt-[45px] ">
          <div className="sm:w-[20vw] sm:h-[100%] relative w-100vw h-[60px] ">
            <SideBar color={"list"} />
          </div>
          <div className="sm:w-[80vw] w-[100vw] bg-gradient-to-r from-teal-700   to-gray-600 ">
            <div className="w-[98%] h-[100%] pt-6 flex flex-col items-center">
              <p className="text-3xl text-white   font-sans font-semibold  ">
                Product List Page
              </p>
              <div className="h-[100px] md:w-[70%]sm:w-[30%] w-[80%] mt-5 flex flex-col items-center ">
                {/*<p className="sm:text-[18px] text-[14px] text-gray-200 font-serif  ">
              What type of Product you want to Add
            </p>*/}
                <div className="flex flex-row gap-x-5 justify-center">
                  <p
                    className={`flex flex-row items-center justify-center cursor-pointer w-[60px] h-[30px] p-1 text-[12px] md:w-[100px] md:h-[45px] mt-2 ring-1 md:text-[18px] font-semibold md:font-bold rounded-lg md:pt-2 ${all}   `}
                    onClick={() => setProductType("all")}
                  >
                    All
                  </p>
                  <p
                    className={`flex flex-row items-center justify-center cursor-pointer w-[60px] h-[30px] p-1 text-[12px] md:w-[100px] md:h-[45px] mt-2 ring-1 md:text-[18px] font-semibold md:font-bold rounded-lg md:pt-2 ${watch}   `}
                    onClick={() => setProductType("Watch")}
                  >
                    Watches
                  </p>
                  <p
                    className={`flex flex-row items-center justify-center cursor-pointer w-[60px] h-[30px] p-1 text-[12px] md:w-[100px] md:h-[45px] mt-2 ring-1 md:text-[18px] font-semibold md:font-bold rounded-lg md:pt-2 ${glass}   `}
                    onClick={() => setProductType("Glass")}
                  >
                    Glasses
                  </p>
                </div>
              </div>
              <div className="w-[100%] min-h-[60vh] h-[100%]   flex flex-col lg:flex-row gap-x-2 lg:justify-center items-center gap-y-1 lg:flex-wrap md:gap-y-2 lg:gap-y-1 lg:items-start mb-15 md:mb-4 lg:mb-10">
               {ListedProducts()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default List;