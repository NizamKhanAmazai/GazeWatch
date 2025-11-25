import {useEffect} from "react";
import about from "../src/assets/About.png";



function About() {


  useEffect(()=>{ 
          window.scrollTo(0,0) 
      },[])
  return (
    <div className="w-[100vw] h-[100vh]  pt-[60px] bg-gradient-to-r from-[#140220] to-[#01081f]   ">
      <div className="overflow-x-hidden text-[38px] font-semibold font-serif w-[100vw] h-[10%] flex flex-row items-center justify-center text-[#f3f7bc]  ">
        About Us
      </div>
      <div className="md:h-[80%] h-[70%] flex md:nowrap flex-wrap flex-row items-start  justify-start md:justify-center overflow-x-hidden">
        <div className=" w-[35%] md:w-[40%] lg:w-[35%] h-[35%] md:h-[90%] relative">
          <img src={about} alt="" className="w-[100%] h-[100%] brightness-105" />
        </div>

        <div className="md:w-[50%] w-[65%] h-[38%] pl-3 md:pl-5 ">
          <p className="lg:text-[18px] text-[10px] md:text-[14px] text-[#eff0e8]  ">
            GazeWatch is a modern e-commerce platform offering a handpicked
            selection of premium watches and stylish glasses. Our goal is to
            combine elegance, precision, and comfort into every product we
            deliver. With a focus on quality and customer satisfaction,
            GazeWatch brings you the latest designs that elevate your look and
            match your lifestyle.{" "}
          </p>
          <p className="text-[24px] font-semibold text-[#e0f3ae] md:block hidden ">
            OUR MISSION
          </p>

          <p className="md:text-[14px] lg:text-[18px] text-[#eff0e8] md:block hidden ">
            Our mission is to provide top-quality timepieces and eyewear that
            reflect both personality and purpose. We aim to make luxury and
            style accessible to everyone by delivering affordable, high-quality
            products backed by exceptional service. At GazeWatch, we believe
            everyone deserves to feel confident and look their best—every day.
          </p>
        </div>
        {/* mobile */}
        <div className="md:hidden w-[100%]   h-[48%] ">
          <p className="text-[24px] text-center font-semibold text-[#e0f3ae] ">
            OUR MISSION
          </p>

          <p className=" text-[12px] p-3 text-center   text-[#eff0e8] ">
            Our mission is to provide top-quality timepieces and eyewear that
            reflect both personality and purpose. We aim to make luxury and
            style accessible to everyone by delivering affordable, high-quality
            products backed by exceptional service. At GazeWatch, we believe
            everyone deserves to feel confident and look their best—every day.
          </p>
        </div>
      </div>
      <div className="Why_Choose_Us w-[100%] overflow-x-hidden min-h-[100%] md:h-[60vh] bg-gradient-to-r from-[#140220] to-[#01081f] pb-15 md:pb-0 ">
        <div className="heading text-[#f3f7bc] md:h-[10%] lg:h-[20%] flex flex-row items-center justify-center text-[30px] font-semibold ">
          Why Choose Us
        </div>
        <div className="md:h-[90%] xl-h-[70%] lg:h-[80%] boxes flex flex-col md:gap-y-0 gap-y-4 md:flex-row justify-center items-center  ">
          <div className=" h-[30%]  xl:h-[80%] p-3 lg:h-[90%] md:h-[80%] w-[90%] md:w-[28%] ring-2 shadow-md brightness-70 shadow-slate-400 ring-gray-500 md:p-2 lg:p3 flex flex-col items-center text-[#aef3d3]">
            <h1 className="text-[22px] text-[#f3f6bc] text-center">
              Quality Assurance
            </h1>
            <p className=" md:text-[12px] text-[10px] lg:text-[14px]  ">
              At GazeWatch, we prioritize quality above all. Every product, from
              elegant watches to stylish glasses, undergoes strict quality
              checks to ensure durability, comfort, and superior craftsmanship.
              We believe in offering only the best to our customers-products you
              can rely on and wear with pride.
            </p>
          </div>
          <div className="h-[30%] p-3 lg:h-[90%] xl:h-[80%] md:h-[80%] w-[90%] md:w-[28%] ring-2 shadow-md brightness-70 shadow-slate-400 ring-gray-500  md:p-2 lg:p-3 flex flex-col items-center text-[#aef3d3]">
            <h1 className="text-[22px] text-[#f3f6bc] text-center">
              Convenience
            </h1>
            <p className="md:text-[12px] text-[10px] lg:text-[14px] ">
              Shopping with GazeWatch is simple, fast, and hassle-free. Our
              user-friendly website makes it easy to browse, choose, and
              purchase your favorite accessories from anywhere. With secure
              payment options and reliable delivery, we ensure a smooth shopping
              experience from start to finish.
            </p>
          </div>
          <div className="lg:h-[90%] xl:h-[80%] md:h-[80%] p-3 h-[30%] w-[90%] md:w-[28%] ring-2 shadow-md brightness-70 shadow-slate-400 ring-gray-500  md:p-2 lg:p-3 flex flex-col items-center text-[#aef3d3]">
            <h1 className="text-[22px] text-[#f3f6bc] text-center ">
              Exceptional Customer Service
            </h1>
            <p className="md:text-[12px] text-[10px] lg:text-[14px] ">
              Our customers are at the heart of everything we do. Whether you
              need help choosing a product or support after your purchase, our
              dedicated team is here for you. We are committed to providing
              responsive, friendly, and solution-focused service that you can
              trust.
            </p>
          </div>
        </div>
      </div>
      <div className=" md:hidden h-[5vh] bg-gradient-to-r from-[#140220] to-[#01081f]"></div>
    </div>
  );
}

export default About;
