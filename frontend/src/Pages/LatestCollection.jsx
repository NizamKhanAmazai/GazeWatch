import { useContext, useEffect, useState } from "react";
import Title from "../../Components/Title.jsx";
import ItemCard from "../../Components/ItemCard.jsx";
import { shopDataContext } from "../userContext/ShopContext.jsx";

function LatestCollection() {
  const { Currency, products } = useContext(shopDataContext);
  const [latestProduct, setLatestProduct] = useState(null);

  const Watch = () => {
    if (products) {
    const watch = products.filter(watch => watch.Type === "Watch")
    const glass = products.filter(glass => glass.Type === "Glass")
    // let both = watch.slice(0,3).concate(glass.slice(0,3))
    let glass1;
    let watch1;
    if (glass.length >= 10 && watch.length >= 10) {
        glass1 = glass.slice(0, 4);
        watch1 = watch.slice(0, 4);
      } else if(glass.length >= 4 && watch.length >= 4){
        glass1 = glass.slice(0,4)
        watch1 = watch.slice(0,4)
      }else{
        glass1 = glass; 
        watch1 = watch; 
      }
    const both = glass1.concat(watch1);
    setLatestProduct(both) 
    }
  };
  useEffect(() => {
    Watch();
  }, [products]);

  return (
    <div className="bg-gradient-to-r from-[#140220] to-[#01081f] w-[100vw]  min-h-[100%] max-h-[100%]   ">
      <div className="pt-10">
        <Title
          title={"LATEST"}
          title2={"COLLECTION"}
          body={"Style that watches time, and frames the view."}
        />
      </div>
      <div className="w-[100vw] max-h-[100%] px-10 md:px-15 min-h-[100%]  overflow-y-hidden   flex flex-row flex-wrap gap-x-5  gap-y-5 justify-center mt-10   ">
        {/* <ItemCard image={""}/> */}
        {/* {products ? <div className='text-white text-xl'>Hello </div>: ""} min-h-[100vh] h-[100%]*/}

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

export default LatestCollection;
