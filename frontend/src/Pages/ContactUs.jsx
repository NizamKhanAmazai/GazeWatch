import contact from "../assets/Contact.jpg";
import { FaFacebook, FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";

function ContactUs() {
  return (
    <div className="w-[100vw] mxn-h-[100%] h-[100vh] pt-[60px] bg-gradient-to-r from-[#140220] to-[#01081f]   ">
      <div className="heading w-[100%] h-[15%] flex flex-row items-center justify-center font-bold font-serif  ">
        <h1 className="text-[30px] text-[#f3f7bc]  ">CONTACT US</h1>
      </div>
      <div className="w-[100%] md:w-[80%] h-[40%] md:h-[80%] flex flex-row items-start md:items-center justify-center  ">
        <img
          src={contact}
          alt=""
          className="  brightness-140 w-[50%] md:w-[50%] h-[80%] md:h-[90%]  "
        />
        <div className="w-[40%] md:w-[45%] lg:w-[40%]  h-[90%] pl-3 md:pl-20  ">
          <h1 className="text-[20px] md:text-[26px] text-[#e0f3ae]  font-semibold ">
            Our Store
          </h1>
          <p className="text-[12px] md:text-[14px] lg:text-[18px] text-[#aef3d3] md:pt-8 lg:pt-10 ">
            123 Shange, Apt 456, Chakli Heights, city, pakistan
          </p>
          <p className="text-[12px] md:text-[14px] lg:text-[18px] text-[#aef3d3] md:pt-8 lg:pt-10  ">
            tel: +92-9876543210
          </p>
          <p className="text-[12px] md:text-[14px] lg:text-[18px] text-[#aef3d3] md:pt-0 lg:pt-1  ">
            Email: admin@gazewatch.com
          </p>
          <p className="text-[12px] hidden md:block md:text-[14px] lg:text-[18px] text-[#aef3d3] md:pt-8 ">
            Follow us on social media:
          </p>
          <div className="md:flex flex-row items-center justify-start gap-x-3 hidden pt-5 ">
            <a
              href="https://www.facebook.com/gazewatch"
              target="_blank"
              rel="noopener noreferrer"
              className="size-[35px] rounded-full bg-white hover:bg-[blue] relative  "
            >
              <FaFacebook className="text-[blue] absolute top-[0px] md:left-[-0.5px] lg:left-0   text-[35px] hover:text-[#f3f7bc]  " />
              {/* <RiInstagramFill className="text-[blue] text-[35px] hover:text-[#f3f7bc]" />  */}
            </a>
            <a
              href="https://www.instagram.com/gazewatch"
              target="_blank"
              rel="noopener noreferrer"
              className="size-[30px] rounded-lg bg-white hover:bg-[#e1306c] relative "
            >
              <RiInstagramFill className="text-[#e1306c] absolute top-[-3px] left-[-4px] text-[38px] hover:text-[#f3f7bc]" />
            </a>
            <a
              href="https://www.twitter.com/gazewatch"
              target="_blank"
              rel="noopener noreferrer"
              className="size-[30px] rounded-lg bg-white hover:bg-[#1da1f2] relative "
            >
              <FaTwitterSquare className="text-[#1da1f2] text-[35px] absolute top-[-3px] left-[-3px] hover:text-[#f3f7bc]" />
            </a>
            <a
              href="https://www.linkedin.com/company/gazewatch"
              target="_blank"
              rel="noopener noreferrer"
              className="size-[30px] rounded-lg bg-white hover:bg-[#0077b5] relative "
            >
              <FaLinkedin className="text-[#0077b5] text-[35px] absolute top-[-3px] left-[-3px] hover:text-[#f3f7bc]" />
            </a>
            <a
              href="https://www.youtube.com/gazewatch"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[23px] w-[35px] relative rounded-lg bg-white hover:bg-[#ff0000] flex flex-row items-center justify-center "
            >
              <IoLogoYoutube className="text-[#ff0000] absolute top-[-6px] text-[40px]  hover:text-[#f3f7bc]" />
            </a>
          </div>
        </div>
      </div>
        <div className="mobile_SocialMediaLInks md:hidden flex flex-col items-center justify-center w-[100%] h-[20%] bg-gradient-to-r from-[#140220] to-[#01081f] ">
          <p className="text-[12px] md:text-[14px] lg:text-[18px] text-[#aef3d3] md:pt-8 ">
            Follow us on social media:
          </p>
          <div className="flex flex-row items-center justify-start gap-x-3 pt-5 ">
            <a
              href="https://www.facebook.com/gazewatch"
              target="_blank"
              rel="noopener noreferrer"
              className="size-[35px] rounded-full bg-white hover:bg-[blue] relative  "
            >
              <FaFacebook className="text-[blue] absolute top-0 text-[35px] hover:text-[#f3f7bc]" />
              {/* <RiInstagramFill className="text-[blue] text-[35px] hover:text-[#f3f7bc]" />  */}
            </a>
            <a
              href="https://www.instagram.com/gazewatch"
              target="_blank"
              rel="noopener noreferrer"
              className="size-[30px] rounded-lg bg-white hover:bg-[#e1306c] relative "
            >
              <RiInstagramFill className="text-[#e1306c] absolute top-[-3px] left-[-4px] text-[38px] hover:text-[#f3f7bc]" />
            </a>
            <a
              href="https://www.twitter.com/gazewatch"
              target="_blank"
              rel="noopener noreferrer"
              className="size-[30px] rounded-lg bg-white hover:bg-[#1da1f2] relative "
            >
              <FaTwitterSquare className="text-[#1da1f2] text-[35px] absolute top-[-3px] left-[-3px] hover:text-[#f3f7bc]" />
            </a>
            <a
              href="https://www.linkedin.com/company/gazewatch"
              target="_blank"
              rel="noopener noreferrer"
              className="size-[30px] rounded-lg bg-white hover:bg-[#0077b5] relative "
            >
              <FaLinkedin className="text-[#0077b5] text-[35px] absolute top-[-3px] left-[-3px] hover:text-[#f3f7bc]" />
            </a>
            <a
              href="https://www.youtube.com/gazewatch"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[23px] w-[35px] relative rounded-lg bg-white hover:bg-[#ff0000] flex flex-row items-center justify-center "
            >
              <IoLogoYoutube className="text-[#ff0000] absolute top-[-6px] text-[40px]  hover:text-[#f3f7bc]" />
            </a>
          </div>
        </div>
    </div>
  );
}

export default ContactUs;
