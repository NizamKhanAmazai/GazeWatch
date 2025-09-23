import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../src/userContext/ShopContext";
import ItemCard from "./ItemCard";

function RelativeProduct({ Gender, Type, Id }) {
  const { products, Currency } = useContext(shopDataContext);
  const [relatedProduct, setRelatedProduct] = useState();

  const relativePro = () => {
    if (products.length) {
      let copyproducts = products.slice(); 
      copyproducts = copyproducts.filter(
        (elem) => elem.Type === Type && elem.Gender === Gender
      );
      if(copyproducts.length < 4){
        copyproducts = products.slice();
        copyproducts = copyproducts.filter(elem => elem.Type === Type) 
      }
      copyproducts = copyproducts.reverse() 
      copyproducts = copyproducts.filter((elem) => elem._id !== Id);
      if (copyproducts.length > 0) {
        setRelatedProduct(copyproducts.slice(0, 4));
      } else {
        setRelatedProduct(copyproducts);
      }
    }
  };
  useEffect(() => {
    relativePro();
  }, [products, Id]);
  return (
    <div className="w-[80%] md:w-[100vw] gap-y-3  md:gap-y-0 h-[100%] md:h-[100%]  flex md:flex-row  items-center md:justify-center gap-x-2    flex-col justify-start   "  >
      {relatedProduct &&
        relatedProduct.map((elem) => {  
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
        })}
    </div>
  );
}

export default RelativeProduct;
