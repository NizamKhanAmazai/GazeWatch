import React from "react";
import glassSlide1 from "../src/assets/newGlassSlide1.png";
import WatchSlide3 from "../src/assets/newWatchSlide1.png";
import glassSlide2 from "../src/assets/newGlassSlide2.png";
import WatchSlide4 from "../src/assets/newWatchSlide2.png";

function BackgroundReal({ slideCount }) {
  if (slideCount === 0) {
    return (
      <div className="  w-[50vw] md:h-[80vh] lg:h-[100%] flex flex-col flex-nowrap items-center justify-start sm:h-[60vh] h-[40vh] ">
        <div className=" w-[100%] h-[90%] md:h-[100%] rounded-sm">
          <img src={glassSlide1} alt="" className="h-[100%]  rounded-sm" />
        </div> 
      </div>
    );
  } else if (slideCount === 1) {
    return (
      <div className="  w-[50vw] md:h-[80vh] lg:h-[100%] flex flex-col flex-nowrap items-center justify-start sm:h-[60vh] h-[40vh] ">
        <div className=" w-[100%] h-[90%] md:h-[100%] rounded-sm">
          <img src={WatchSlide3} alt="" className="h-[100%]  rounded-sm" />
        </div>
      </div>
    );
  } else if (slideCount === 2) {
    return (
      <div className="  w-[50vw] md:h-[80vh] lg:h-[100%] flex flex-col flex-nowrap items-center justify-start sm:h-[60vh] h-[40vh] ">
        <div className=" w-[100%] h-[90%] md:h-[100%] rounded-sm">
          <img src={glassSlide2} alt="" className="h-[100%]  rounded-sm" />
        </div>
      </div>
    );
  } else if (slideCount === 3) {
    return (
      <div className="  w-[50vw] md:h-[80vh] lg:h-[100%] flex flex-col flex-nowrap items-center justify-start sm:h-[60vh] h-[40vh] ">
        <div className=" w-[100%] h-[90%] md:h-[100%] rounded-sm">
          <img src={WatchSlide4} alt="" className="h-[100%]  rounded-sm" />
        </div>
      </div>
    );
  }
}

export default BackgroundReal;
