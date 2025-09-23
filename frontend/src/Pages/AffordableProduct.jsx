import React, { useContext, useEffect, useState } from "react";
import Title from "../../Components/Title.jsx";
import ItemCard from "../../Components/ItemCard.jsx";
import { shopDataContext } from "../userContext/ShopContext.jsx";

function AffordableProduct() {
  const { Currency, products } = useContext(shopDataContext);
  const [latestProduct, setLatestProduct] = useState(null);

  const Watch = ()=>{
    if(products){ 
      const watches = products.filter((watch) => watch.Type === "Watch");
      const glassess = products.filter((glass) => glass.Type === "Glass");
      
      const glass  = glassess.filter(elem => elem.Affordable)
      const watch  =  watches.filter(elem => elem.Affordable)

      let glass1;
      let watch1;
      if (glass.length >= 10 || watch.length >= 10) {
        glass1 = glass.slice(3, 7);
        watch1 = watch.slice(3, 7);
      } else if (glass.length >= 4 || watch.length >= 4) {
        glass1 = glass.slice(0, 4);
        watch1 = watch.slice(0, 4);
      } else {
        glass1 = glass;
        watch1 = watch;
      }
      const both = glass1.concat(watch1);
      setLatestProduct(both);
    }
  }

  
  useEffect(() => { 
    Watch();
  }, [products]); 
  return (
    <div className="overflow-x-hidden bg-gradient-to-r from-[#140220] to-[#01081f] min-h-[100%] max-h-[100%] pt-[70px] overflow-y-hidden ">
      <div className="pt-10">
        <Title
          title={"AFFORDABLE "}
          title2={"PRODUCTS"}
          body={"Style within reach.  Movement made possible."}
        />
      </div>
      <div className="w-[100vw] max-h-[100%] px-10 md:px-15 min-h-[100%] flex flex-row flex-wrap gap-x-5  gap-y-5 justify-center mt-10   ">
        {/* <ItemCard image={""}/> */}
        {/* {products ? <div className='text-white text-xl'>Hello </div>: ""}min-h-[100vh] h-[100%] */}

        {latestProduct
          ? latestProduct.map((elem) => {
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
          : ""}
      </div>
    </div>
  );
}

export default AffordableProduct;