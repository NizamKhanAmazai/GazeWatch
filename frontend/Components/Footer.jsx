import logo from "../src/assets/logo2.png"

function Footer() {
  return (
    <div className='w-[100vw] overflow-hidden md:pb-0 pb-15 h-[45vh] lg:h-[62vh] xl:h-[43vh] md:h-[87vh]   '>
       <div className="w-[100%] md:h-[92%] h-[92%] flex flex-row bg-gradient-to-br to-purple-600 from-teal-700 items-start justify-center md:gap-x-5  ">
        <div className=" h-[40%] md:h-[80%] w-[33%] md:w-[45%]     ">
            <div className="logo size-[50px] md:size-[80px] ">
                <img src={logo} alt="" className=' size-[50px] md:size-[80px]  ' />
            </div>
            <div className="text-[#1100ff] text-[16px] md:font-bold ">
                GAZEWATCH
            </div>
            <div className="large hidden md:flex text-[#0b0a38] font-medium text-[16px] ">
                Welcome to Gaze Watch, your one-stop shop for premium watches and stylish glasses.
                Our e-commerce platform is designed to offer seamless shopping with trusted service and quality products.
                Whether you're upgrading your looki or buying a gift, we've got perfect accessory for every occasion.
                Explore our curated collection and enjoy the elegance o time and vision in one place.
                At GazeWatch, we value style, precision, and customer satisfaction above all.
            </div>
            <div className='text-[#0b0a38] md:hidden text-[10px]  '>
                GazeWatch brings you stylish watches and glasses with trusted sevice. Shop quality accessories anytime,
                anywhere.
            </div>
        </div>
        <div className="h-[40%] md:h-[80%] w-[25%] md:w-[20%] mt-13 flex flex-col justify-start md:mt-21 items-center ">
            <div className=' text-[14px] md:text-20 text-[#1100ff] font-semibold    '> COMPANY</div> 
            <ul className=' flex flex-col items-center font-bold text-[#0b0a38] md:text-[14px] text-[10px] '>
                <li className='  '>Home</li>
                <li className='  '>About Us</li>
                <li className='  '>Delivery</li>
                <li className='  '>Privacy Policy</li>
            </ul>
        </div>
        <div className="h-[40%] md:h-[80%] w-[40%] md:w-[20%] mt-13 flex flex-col justify-start md:mt-21 items-center pr-10px ">
            <p className="text-[14px] md:text-20 text-[#1100ff] font-semibold ">GET IN TOUCH</p>
             <ul className=' md:text-[14px] text-[10px] flex flex-col items-center  text-[#0b0a38] '>
                <li className='font-semibold  '>+923400105107</li>
                <li className='font-serif  '>nizamkhank640@gmail.com</li>
                <li className='font-semibold  '>+923439437645</li>
                <li className='font-serif  '>admin@gazewatch.com</li>
            </ul>
        </div>
       </div>
       <div className="h-[1px] w-[100vw] bg-slate-400  "></div>
       <div className="text-center text-[10px]  md:h-[8%] h-[13%] w-[100%] md:text-[12px] flex flex-row items-center justify-center font-semibold bg-[#9ddbd3]  ">Copyright 2025@GazeWatch.com-All Rights Reserved</div>
    </div>
  )
}

export default Footer
