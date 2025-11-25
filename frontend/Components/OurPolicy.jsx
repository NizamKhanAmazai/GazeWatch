import Title from "./Title";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { TbContract } from "react-icons/tb";

function OurPolicy() {
  return (
    <div className="w-[100vw] h-[100vh] md:h-[80vh] mt-20 md:mb-0  mb-[200px]">
      <div className="w-[100vw] h-[20%] md:h-[25%] ">
        <Title title={"OUR"} title2={"POLICY"} body={""} />
        <div className="text mt-8 text-center lg:px-0 md:px-8 text-[#f5e7ab] font-sans font-semibold px-2 text-[12px] md:text-[18px] ">
          Timepiece perfection, crafted with precision and passion Guaranteed
          quality, guaranteed style.
        </div>
      </div>
      {/*  exchange policy */}
      <div className="w-[100vw] h-[70%]  md:h-[55%] flex flex-row flex-wrap md:flex-nowrap items-center justify-center ">
        <div className="w-[45%] md:w-[24%] mx-1 md:mx-3 h-[70%] flex flex-col items-center justify-center">
          <MdOutlineCurrencyExchange className="md:text-[40px] text-[20px]  text-[#cae4c7] " />
          <p className="text-[#cae4c7] text-[18px] text-center md:text-[24px] font-semibold ">
            Exchange Policy
          </p>
          <p className="text-[#c3b3da] text-center text-[14px] md:text-[16px] font-light">
            Exchange are accepted within 3 days of delivery.
          </p>
          <p className="text-[#c3b3da] text-center text-[14px] md:text-[16px] font-light">
            contact with our customer support team with your order details and
            reason for Exchange. We'll guide you through the process.
          </p>
        </div>
        {/* 7 Day return  */}
        <div className="w-[45%] md:w-[24%] mx-1 md:mx-3 h-[70%] flex flex-col items-center justify-center ">
          <MdVerified className="md:text-[40px] text-[#cae4c7]  text-[20px]" />
          <p className="text-[#cae4c7] md:text-[24px] text-[18px] text-center font-semibold ">
            7 Day Return Policy
          </p>
          <p className="text-[#c3b3da] text-center text-[14px] md:text-[18px] font-light">
            Return are accepted in within 3 days of delivery.
          </p>
          <p className="text-[#c3b3da] text-[14px] md:text-[18px] font-light text-center">
            Upon receiving the return item, We'll process a full refund to your
            original payment method.
          </p>
        </div>
        {/* Customer support*/}
        <div className="w-[45%] md:w-[24%] mx-1 md:mx-3 h-[70%] flex flex-col items-center justify-center">
          <RiCustomerService2Fill className="md:text-[40px] text-[20px] text-[#cae4c7] " />
          <p className="text-[#cae4c7]   text-[18px] text-center md:text-[24px] font-semibold ">
            Customer Support
          </p>
          <p className="text-[#c3b3da] text-center md:text-[18px] text-[14px] font-light">
             we pride ourselves on out Best Customer support.
          </p>
          <p className="text-[#c3b3da] text-center text-[14px] md:text-[16px] font-light">
            Our dedicated team is avialbale to assist you with any question, concerns, or issues.
          </p>
          <p className="text-[#c3b3da] text-center text-[14px] md:text-[16px] font-light">
            Reach out to us via <span className="text-[#94eb94] hover:text-[#f58de4] italic font-semibold">admin@gaizwatch.com</span>
          </p>
        </div>
        {/* Conditions */}
        <div className="w-[45%] md:w-[24%] mx-1 md:mx-3 h-[70%] flex flex-col items-center justify-center">
          <TbContract className="md:text-[40px] text-[20px] text-[#cae4c7] " />
          <p className="text-[#cae4c7]   text-[18px] text-center md:text-[24px] font-semibold ">
            Conditions
          </p>
          <p className="text-[#c3b3da] text-center md:text-[18px] text-[14px] font-light">
            Item must be in original condition with all tags and packaging included.
          </p>
          <p className="text-[#c3b3da] text-center text-[14px] md:text-[16px] font-light">
            Customer is responsible for return shipping costs unless the item is
            defective.
          </p>
        </div>
      </div> 
    </div>
  );
}

export default OurPolicy;
