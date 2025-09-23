import React from 'react'

function Hero({slideCount, setSlideCount, text}) {
  return (
    <div>
      <div className="buttons md:w-[50vw] w-[50vw] xl:h-[40%] 2xl:h-[20%] lg:h-[60%] md:h-[90%] h-[100%] ">
        <div className="flex flex-col flex-nowrap items-center justify-start">
          <span className="text-[#47e0ba] w-[80%] h-[20%] pt-[20px] md:text-[24px] lg:text-[30px]  text-[14px]  font-serif font-extrabold md:pt-[80px] md:p-[10px]">
            {text.slide.Text}
          </span>
          <span className="text-amber-500 w-[80%] h-[20%] text-[12px] md:text-[24px] lg:text-[30px] font-sans font-bold pt-[5px]   ">
            {text.slide.CTA}
          </span> 
        </div>
        

        </div>
        <div className="flex flex-row items-center justify-start md:pt-10 md:pl-25 md:gap-x-[10px] pt-[5px] pl-10  gap-x-[5px]   ">
            <button className={`size-[13px] rounded-full  cursor-pointer ${slideCount === 0 ? "bg-amber-300" : "bg-gray-600" }`} onClick={() => {setSlideCount(0);}}>&nbsp;</button>
            <button className={`size-[13px] rounded-full  cursor-pointer ${slideCount === 1 ? "bg-amber-300" : "bg-gray-600" }`} onClick={() => {setSlideCount(1);}}>&nbsp;</button>
            <button className={`size-[13px] rounded-full  cursor-pointer ${slideCount === 2 ? "bg-amber-300" : "bg-gray-600" }`} onClick={() => {setSlideCount(2);}}>&nbsp;</button>
            <button className={`size-[13px] rounded-full  cursor-pointer ${slideCount === 3 ? "bg-amber-300" : "bg-gray-600" }`} onClick={() =>{setSlideCount(3);}}>&nbsp;</button>
        </div>
    </div>
  )
}

export default Hero;
