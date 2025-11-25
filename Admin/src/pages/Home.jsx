import { useContext, useEffect, useRef } from "react";
import Nav from "../../components/Nav";
import SideBar from "../../components/SideBar"; 
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";  
import { adminDataContext } from "../../userContext/DataContext";


function Home() { 
   
  const { allPageData } = useContext(adminDataContext)
 

  useEffect(()=>{
     allPageData
  },[allPageData])



  const box1 = useRef(null)
  const box2 = useRef(null)
  const text1 = useRef(null)
  const text2 = useRef(null)
  const subBox1 = useRef(null)
  const subBox2 = useRef(null)

  useGSAP(()=>{
    gsap.from(box1.current, {x: -800, duration: 1,  borderRadius: "50%"})
  },{}) 
  useGSAP(()=>{
    gsap.from(box2.current, {x: 800, duration: 1, rotate: 360, backgroundColor: "white", scale: 2,} )
  },{})
  useGSAP(()=>{
    gsap.from(text1.current, {x: -1800, delay: 2, scale: 5, duration: 0.5})
  },{})
  useGSAP(()=>{
    gsap.from(text2.current, {x:  1800, delay: 2, scale: 5, duration: 0.5})
  },{})
  useGSAP(()=>{
    gsap.from(subBox1.current, {opacity: 0, scale: 100, delay: 1, duration: 0.5})
  },{})
  useGSAP(()=>{
    gsap.from(subBox2.current, {opacity: 0, scale: 100, delay: 1, duration: 0.5})
  },{})
  return (
    <div className="overflow-x-hidden bg-gradient-to-r from-teal-700 to-gray-600 w-[100vw] min-h-[100vh]">
      
      <Nav />
      <div className="sm:w-[20vw] sm:h-[100%] relative w-[100vw] h-[60px]">
        <SideBar />
       </div>{/*shadow-[0_0_5px_5px_gray] */}
       <div className=" md:pt-[80px] md:pl-20 md:h-[30vh] xl:h-[20vh] 2xl:h-[15vh]">
          <span className="flex flex-row items-center justify-center text-white text-[24px] md:text-[50px] h-[10vh] ">ADMIN DASHBOARD</span>
        </div>
      <div className=" w-[100vw] h-[100%] min-h-[95vh] overflow-hidden pb-20 pt-5 flex flex-col items-center justify-center gap-y-8 md:w-[75vw] md:h-[60vh] md:min-h-0 md:ml-[170px]   md:gap-y-0 md:pb-0 md:flex-row lg:ml-[210px] xl:ml-[350px] 2xl:ml-[600px]  ">
       
        {/* <div className="w-[100%] h-[100%] min-h-[85vh] flex flex-col items-center justify-center gap-y-8 md:w-[70vw] md:h-[60vh] md:min-h-0 md:ml-[170px] md:pt-[80px] md:gap-y-0 md:pb-0 md:flex-row"> */}
          <div ref={box1} className="box1 bg-[#0e135c] slideLeft ring-offset-2 ring-offset-[blue] ring-2 ring-[yellow] shadow-[0_0_5px_8px_orange] w-[90vw] h-[50vh] m-auto flex flex-col justify-center items-center rounded-sm md:rounded-md md:w-[45%] md:h-[90%] ">
           <div ref={text1} className="font-semibold text-[24px] bg-gradient-to-r [text-shadow: none] from-yellow-400 via-lime-500 to-fuchsia-400 bg-clip-text text-transparent  font-mono "> No. Of Products  </div>
           <div ref={subBox1} className="size-[80px] rounded-2xl bg-[#07006b] text-center content-center text-[white] text-[35px] font-semibold ring-offset-2 ring-offset-[#ca288c] ring-1 ring-[#19d5ee] shadow-[0_0_5px_8px_aqua]  mt-3">
             <span>{allPageData  ? allPageData.Products  : 0 }</span>
           </div>
         </div>
         <div ref={box2} className="box1 bg-[#0e135c] slideright container ring-offset-2 ring-offset-[blue] ring-2 ring-[yellow] shadow-[0_0_5px_8px_orange] w-[90vw] h-[50vh] m-auto flex flex-col justify-center items-center rounded-sm md:rounded-md md:w-[45%] md:h-[90%]">
           <div ref={text2} className="  font-semibold  text-[24px] bg-gradient-to-r [text-shadow: none] from-yellow-400 via-lime-500 to-fuchsia-400 bg-clip-text text-transparent  font-mono "> No. Of Orders  </div>
           <div ref={subBox2} className=" size-[80px] rounded-2xl ring-offset-2 bg-[#07006b] text-center content-center text-[white] text-[35px] ring-offset-[#ca288c] ring-1 ring-[#19d5ee] shadow-[0_0_5px_8px_aqua]  mt-3">
             <span>{allPageData ? allPageData.Orders : 0}</span>
          </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Home;
