import React, { useContext, useEffect, useState } from "react";
import CollectionSideBar from "../../Components/CollectionSideBar";
import { shopDataContext } from "../userContext/ShopContext";
import ItemCard from "../../Components/ItemCard";

function Collection() {
  // const [allProducts, setAllProducts] = useState(null);
  const [filterProduct, setfilterProduct] = useState();
  const {products, Currency, Search } = useContext(shopDataContext);
  const [MianCategory, setMainCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [ProductType, setProductType] = useState([]);
  const [sortType, setsortType] = useState("Relevent");
  // for show filter
  const [showFilter, setShowFilter] = useState(false);

  // Cotegories
  const MianCtgy = (e) => {
    if (MianCategory.includes(e.target.value)) {
      console.log(e.target.value)
      setMainCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setMainCategory((prev) => [...prev, e.target.value]);
    }
  };
  const SubCtgy = (e) => {
    if (SubCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const setPrdctType = (e) => {
    if (ProductType.includes(e.target.value)) {
      setProductType((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setProductType((prev) => [...prev, e.target.value]);
    }
  };

  const filtering = () => {
    if (products) {
      let copyProduct = [...products];
      // setting the filter for the gender
      if (MianCategory.length > 0) {
        copyProduct = copyProduct.filter((elem) =>
          elem.Gender === "All" || MianCategory.includes(elem.Gender) 
        ); 
      }
      if (SubCategory.length > 0) {
        if (SubCategory.includes("Affordable")) {
          copyProduct = copyProduct.filter((elem) => elem.Affordable);
        } else if (SubCategory.includes("Luxury")) {
          copyProduct = copyProduct.filter((elem) => elem.Luxury);
        }
      }
      if (ProductType.length > 0) {
        copyProduct = copyProduct.filter((elem) =>
          ProductType.includes(elem.Type)
        );
      }
      setfilterProduct(copyProduct);
    }
  };

  const Sorting = () => {
    let copypro = filterProduct && filterProduct.slice();
    switch (sortType) {
      case "high-low":
        filterProduct &&
          setfilterProduct(copypro.sort((a, b) => b.Price - a.Price));
        break;

      case "low-high":
        filterProduct &&
          setfilterProduct(copypro.sort((a, b) => a.Price - b.Price));
        break;

      default:
        filtering();
        break;
    }
  };

  const filterSearch = () => {
    if (products) {
      if (
        MianCategory.length > 0 ||
        SubCategory.length > 0 ||
        ProductType.length > 0
      ) {
        let copypro2 = filterProduct.slice(); 
        setfilterProduct(
          copypro2.filter((item) => item.Discription.toLowerCase().includes(Search) || item.Name.toLowerCase().includes(Search))          
        );
         
    } else {
      let copypro2 = products.slice(); 
      setfilterProduct(
        copypro2.filter((item) => item.Discription.toLowerCase().includes(Search) || item.Name.toLowerCase().includes(Search))
      );

      }
    }
  };

  useEffect(() => {
    filterSearch();
  }, [Search]);

  useEffect(() => {
    filtering();
  }, [MianCategory, SubCategory, ProductType]);

  useEffect(() => {
    Sorting();
  }, [sortType]);

  // const helperTopMap = () => {
  //   if (products) {
  //     console.log("error here");
  //     if (filterProduct) {
  //       console.log("bellow the error here");
  //       if (filterProduct.length === 0) {
  //         console.log("called first no available");
  //         return (
  //           <div className="text-[26px] text-white center m-auto ">
  //             No Product Available
  //           </div>
  //         );
  //       } else {
  //         filterProduct.map((elem) => {
  //           console.log("calling first else");
  //           return (
  //             <ItemCard
  //               image={elem.image1}
  //               name={elem.Name}
  //               price={elem.Price}
  //               currency={Currency}
  //               key={elem._id}
  //             />
  //           );
  //         });
  //         console.log("calling first else");
  //       }
  //     } else {
  //       console.log("product mapping");
  //       products.map((elem) => {
  //         return (
  //           <ItemCard
  //             image={elem.image1}
  //             name={elem.Name}
  //             price={elem.Price}
  //             currency={Currency}
  //             key={elem._id}
  //           />
  //         );
  //       });
  //     }
  //   } else {
  //     console.log("called first no calling there");
  //     return (
  //       <div className="text-[26px] text-white center m-auto ">
  //         No Product Available
  //       </div>
  //     );
  //   }
  // };

  useEffect(()=>{ 
          window.scrollTo(0,0) 
      },[])

  return (
    <div className="pt-15 bg-gradient-to-r from-[#140220] to-[#01081f] w-[100vw] h-[100vh] overflow-x-hidden">
      <div
        className={`relative  left-0 md:fixed md:w-[22vw] lg:w-[20vw] md:h-[100vh] overflow-x-hidden ${
          showFilter ? "h-[100vh]" : "h-[40px]"
        } `}
      >
        <CollectionSideBar
          MianCtgy={MianCtgy}
          SubCtgy={SubCtgy}
          setPrdctType={setPrdctType}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
      </div>
      {/* heading  */}
      <div className="w-[100vw] md:w-[70vw] md:ml-[23vw] flex flex-row items-center justify-between">
        <h4 className="text-[20px]   ml-3 md:text-[34px] text-[#dbeed5] ">
          ALL COLLECTIONS{" "}
        </h4>
        <div className="Select text-white mr-3 md:mr-0">
          <select
            name="sort"
            id="sort"
            className="self-end h-[30px] md:h-[40px] cursor-pointer bg-slate-700 w-[90px] md:w-[160px] text-[#f5cbf1] rounded-lg ring-1 ring-[white]  "
            onChange={(e) => {
              setsortType(e.target.value);
            }}
          >
            <option
              value="Relevent"
              className="cursor-pointer focus:ring-0 hidden md:block bg-amber-200  text-black"
            >
              Sort By: Relevent
            </option>
            <option
              value="low-high"
              className="focus:ring-0 cursor-pointer hidden md:block bg-amber-200  text-black"
            >
              Sort By: Low-High
            </option>
            <option
              value="high-low"
              className="focus:ring-0 cursor-pointer hidden md:block bg-amber-200   text-black"
            >
              Sort By: High-Low
            </option>

            {/* option for mobile */}
            <option
              value="Relevent"
              className="focus:ring-0 cursor-pointer md:hidden bg-amber-200 h-[100%] w-[100%] text-black"
            >
              Relevent
            </option>
            <option
              value="low-high"
              className="focus:ring-0 cursor-pointer md:hidden bg-amber-200 h-[100%] w-[100%] text-black"
            >
              Low-High
            </option>
            <option
              value="high-low"
              className="focus:ring-0 md:hidden cursor-pointer bg-amber-200 h-[100%] w-[100%] text-black"
            >
              High-Low
            </option>
          </select>
        </div>
      </div>
      {/* lg:w-[75vw] md:w-[70vw]  */}
      <div className=" min-h-[70%] ml-7 lg:ml-[20vw] md:ml-[23vw] ">
        <div className="w-[80vw] lg:ml-[40px] pb-20 lg:w-[75vw] md:pl-5 md:pr-12 lg:pl-0  md:px-10  lg:px-15 flex flex-row flex-wrap   gap-x-[15px]  gap-y-5 justify-center mt-10   ">
          {products ? (
            filterProduct ? (
              filterProduct.length > 0 ? (
                filterProduct.map((elem) => {
                  return (
                    <ItemCard
                      image={elem.image1}
                      name={elem.Name}
                      price={elem.Price}
                      currency={Currency}
                      id={elem._id}
                      key={elem._id}
                    />
                  );
                })
              ) : (
                <div className="md:text-[26px] text-white center m-auto text-[18px] ">
                  No Product Available
                </div>
              )
            ) : (
              products.map((elem) => {
                return (
                  <ItemCard
                    image={elem.image1}
                    name={elem.Name}
                    price={elem.Price}
                    currency={Currency}
                    id={elem._id}
                    key={elem._id}
                  />
                );
              })
            )
          ) : (
            <div className="md:text-[26px] text-white center m-auto text-[18px] ">
              No Product Available
            </div>
          )}
          {/* {helperTopMap()} */}
        </div>
      </div>
    </div>
  );
}

export default Collection;
