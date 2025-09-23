import React, { useEffect, useState } from "react";
import BackgroundReal from "../../Components/BackgroundReal";
import Hero from "../../Components/Hero";
import LatestCollection from "./LatestCollection";
import LuxuryProducts from "./LuxuryProducts";
import AffordableProduct from "./AffordableProduct";
import OurPolicy from "../../Components/OurPolicy";
import Footer from "../../Components/Footer"; 

function Home() {
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setSlideCount((prev) => (prev === 3 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const text = [
    {
      slide: {
        heading: "See the World in Style",
        Text: "Elevate Your Style with Our Trendy Glasses",
        CTA: "Shop Now!",
      },
    },
    {
      slide: {
        heading: "Time is Precious",
        Text: "Make Every Moment Count with Our Timepeices",
        CTA: "Explore Our Collection!",
      },
    },
    {
      slide: {
        heading: "Protect Your Eyes",
        Text: "Protect Your Eyes with Our High-Quality Glasses",
        CTA: "Shop Now!",
      },
    },
    {
      slide: {
        heading: "Make a Statement",
        Text: "Make a Statement with Our Unique Watches",
        CTA: "Limited Time Only!",
      },
    },
  ];

  useEffect(()=>{ 
            window.scrollTo(0,0) 
        },[])
  return (
    <div className="overflow-x-hidden bg-gradient-to-r from-[#140220] to-[#01081f]">
      <div className="bg-gradient-to-r from-[#140220]  md:h-[80vh] to-[#01081f] h-[50vh] lg:h-[100vh] flex flex-row overflow-y-hidden flex-nowrap overflow-x-hidden w-[100vw] pt-[60px] ">
        <div className="w-[100vw]   lg:h-[100%] h-[50vh] flex flex-row flex-nowrap ">
          <Hero slideCount={slideCount} setSlideCount={setSlideCount} text={text[slideCount]} /> 
          <BackgroundReal slideCount={slideCount}/> 
        </div>
      </div>
      <div  >
        <LatestCollection/> 
        <LuxuryProducts/>
        <AffordableProduct/>
        {/* for testing  */}
        {/* <RelativeProduct Gender={"Men"} Id={"687df62c797e7754fa946681"} Type={"Watch"} /> */}
        <OurPolicy/>
        <Footer/>
      </div> 
    </div>
  );
}

export default Home;

// {/* <button className='text-[22px] mx-[20px] border bg-gradient-to-l from-yellow-400 to-blue-400' onClick={()=>navigate('/login')}>Login</button>
//  <button className='text-[22px] mx-6 border bg-gradient-to-b from-yellow-400 to-blue-400' onClick={()=>navigate('/register')}>signup</button> */}
