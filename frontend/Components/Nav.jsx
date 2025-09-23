import React, { useContext, useEffect, useRef } from "react";
import logo from "../src/assets/logo2.png";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContex } from "../src/userContext/dataContext";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { shopDataContext } from "../src/userContext/ShopContext";
import { AiOutlineHome } from "react-icons/ai";
import { HiCollection } from "react-icons/hi";
import { BiCollection } from "react-icons/bi";
import { MdOutlineContacts } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import axios from "axios";
import { GazeWatchContext } from "../src/userContext/UserContext";
import { toast } from "react-toastify";


function Nav() {
  const UserPnl = useRef(Element);
  const searchbar = useRef(Element);

  const { Search, setSearch, cartItemsCount, setCartItemsCount , showSearch, setShowsearch, userPanel, setUserPanel } = useContext(shopDataContext);
  const {serverUrl} = useContext(GazeWatchContext);
  const { userData, authorizeUser, setToastSuccess, setToastError } = useContext(userDataContex);
  // const userData = false;

  const Navigate = useNavigate();
  const Location = useLocation();
  // user   name
  let userName = userData && userData.name;
  const Name = userName ? (
    userData.name.slice(0, 1).toUpperCase()
  ) : (
    ""
    // "<FaRegUserCircle />"
  );
  
  useEffect((e) => {  
    const handleClickUserPanel = (e) => {
      if (
        UserPnl.current &&
        typeof UserPnl.current.contains === "function" &&
        !UserPnl.current.contains(e.target)
      ) {
        setUserPanel((prev) => !prev);
      }
    }; 
    document.addEventListener("mousedown", handleClickUserPanel);
    return () => {
      document.removeEventListener("mousedown", handleClickUserPanel);
    };
  }, [userPanel]);

  useEffect((e)=>{
    const handleClicksearchbar = (e) => {   
    if(searchbar.current && typeof searchbar.current.contains === "function" && !searchbar.current.contains(e.target)){
      setShowsearch(!showSearch)
    }
     }

     document.addEventListener('mousedown', handleClicksearchbar)
     return ()=> {
      document.removeEventListener("mousedown", handleClicksearchbar)
     }
  },[showSearch])

  const Logout = async () => {  
    try {
      let result = await axios.get(serverUrl + "/api/auth/user/Logout", {withCredentials: true})
      authorizeUser()
      // window.location.reload();
      setToastSuccess("logout Successfull")
      console.log(result.data) 
    } catch (error) {
      toast.error("User not Logout")
      console.log(error.responce.data)      
    }
  }

  return (   
    <div className="w-[100vw] select-none h-[60px] bg-cyan-800 fixed top-0 flex justify-between pr-0 md:pr-8 z-10 lg:pr-13   ">
      {/* Logo */}
      <div
        className="lg:w-[20vw] flex flex-row items-center md:w-[30vw] cursor-pointer    "
        onClick={() => {
          Location.pathname !== "/" && Navigate("/");
        }}
      >
        <img src={logo} alt="" className="w-[70px] h-[65px] mx-[2px] " />
        <h1 className="text-[16px] md:text-[25px] text-amber-300 font-extrabold ">
          GazeWatch
        </h1>
      </div>
      {/* Navigation Links */}
      <div className="hidden md:flex lg:w-[60vw] md:w-[50vw] text-white   flex-col items-center justify-center ">
        <ul className="flex flex-row flex-nowrap lg:gap-x-[20px] md:gap-x-[5px] items-center justify-center md:text-sm">
          <li
            className="h-[40px] p-[2px] px-4 flex justify-center items-center rounded-xl bg-gray-950 cursor-pointer active:bg-gray-500 font-[300]  "
            onClick={() => {
              Location.pathname !== "/" && Navigate("/");
            }}
          >
            HOME
          </li>
          <li
            className="h-[40px] p-[2px] px-4 flex justify-center items-center rounded-xl bg-gray-950 cursor-pointer active:bg-gray-500 font-[300]  "
            onClick={() => {
              Location.pathname !== "/collection" && Navigate("/collection");
            }}
          >
            COLLECTION
          </li>
          <li
            className="h-[40px] p-[2px] px-4 flex justify-center items-center rounded-xl bg-gray-950 cursor-pointer active:bg-gray-500 font-[300]  "
            onClick={() => {
              Location.pathname !== "/about" && Navigate("/about");
            }}
          >
            ABOUT
          </li>
          <li
            className="h-[40px] p-[2px] px-4 flex justify-center items-center rounded-xl bg-gray-950 cursor-pointer active:bg-gray-500 font-[300]  "
            onClick={() => {
              Location.pathname !== "/contact" && Navigate("/contact");
            }}
          >
            CONTACT
          </li>
        </ul>
      </div>
      {/* Icons */}
      <div className="flex flex-row flex-nowrap items-center justify-center md:gap-x-3  gap-[5px] mr-5 ">
        {showSearch ? (
          <IoSearchCircleSharp
            className="h-[45px] text-[30px] text-white cursor-pointer w-[40px]   "
            onClick={() => {
              setShowsearch((prev) => !prev);
            }}
          />
        ) : (
          <IoSearchCircleOutline
            className="h-[45px] text-[30px] text-white cursor-pointer w-[40px]   "
            onClick={() => {
              setShowsearch((prev) => !prev);
              Navigate("/collection");
            }}
          />
        )}
        {userData && (
          <div className="">
            {userPanel && (
              <div
                className="h-[25px] text-[18px] flex items-center justify-center font-serif font-semibold text-center select-none ring-3 w-[25px] rounded-full bg-white ring-white text-cyan-950 cursor-pointer"
                onClick={() => setUserPanel((prev) => !prev)}
              >
                {Name}
              </div>
            )}
            {!userPanel && (
              <div
                className="h-[25px] text-[18px] flex items-center justify-center font-serif font-semibold text-center select-none ring-3 w-[25px]  text-white rounded-full  cursor-pointer"
                onClick={() => setUserPanel((prev) => !prev)}
              >
                {Name}
              </div>
            )}
          </div>
        )}{" "}
        {!userData && (
          <div className="">
            {userPanel ? (
              <FaCircleUser
                className="h-[30px] text-[25px]  w-[30px]  text-white cursor-pointer "
                onClick={() => setUserPanel((prev) => !prev)}
              />
            ) : (
              <FaRegUserCircle
                className="h-[30px] text-[25px]  w-[30px]  text-white cursor-pointer "
                onClick={() => setUserPanel((prev) => !prev)}
              />
            )}
          </div>
        )}
        <div
          className=""
          onClick={() => {
            Location.pathname !== "/cart" && Navigate("/cart");
          }}
        >
          <MdOutlineShoppingCart className=" hidden md:block cursor-pointer h-[30px] text-[25px]  w-[30px]  text-white" />
          <p className="hidden md:block absolute h-[25px] text-[16px] w-[25px] lg:right-15 md:right-10 right-7 top-[5%] font-semibold bg-black text-white rounded-full text-center cursor-pointer ">
            {cartItemsCount}
          </p>
        </div>
      </div>
      {/* Search Bar */}
      {showSearch && (
        <div ref={searchbar} className="w-[100%] h-[60px] absolute top-[100%] left-0 right-0  gap-x-2   flex flex-row items-center justify-center ">
          <div className="absolute w-[100%] h-[100%] bg-gradient-to-l opacity-70 from-fuchsia-400 to-fuchsia-700">
            {" "}
          </div>
          <input
            type="text"
            name="search"
            value={Search}
            id="search "
            className="md:w-[50%] w-[70%] md:h-[40px] h-[30px]  bg-white rounded-2xl z-10 px-5 text-[14px] md:text-[18px]   "
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      )}
      {/* user dashboard */}
      {userPanel && (
        <div
          ref={UserPnl}
          className="h-[30vh] w-[40vw] p-[20px] sm:w-[20vw] xl:w-[15vw] bg-black  absolute top-15 right-2 lg:right-8 ring-1  shadow-[0_0_20px_gray] lg:rounded-2xl rounded-sm "
        >
          {userData ? (
            <p
              className="text-white w-[100%] h-[33%] flex flex-col justify-center hover:shadow-[0_0_5px_blue] items-center text-[14px] hover:bg-gray-600 rounded-sm cursor-pointer "
              onClick={() => {
                Logout() 
                authorizeUser();
                setUserPanel((prev) => !prev);
              }}
            >
              Logout
            </p>
          ) : (
            <p
              className="text-white w-[100%] h-[33%] flex flex-col justify-center hover:shadow-[0_0_5px_blue] items-center text-[14px] hover:bg-gray-600 rounded-sm cursor-pointer "
              onClick={() => {
                Navigate("/login");
                setUserPanel((prev) => !prev);
              }}
            >
              Login
            </p>
          )}
          {userData ? (
            <p
              className="text-white w-[100%] h-[33%] flex flex-col justify-center hover:shadow-[0_0_5px_blue] items-center text-[14px] hover:bg-gray-600 rounded-sm cursor-pointer "
              onClick={() => {
                Location.pathname !== "/orders" && Navigate("/orders");
                setUserPanel((prev) => !prev);
              }}
            >
              Orders
            </p>
          ) : (
            <p
              className="text-white w-[100%] h-[33%] flex flex-col justify-center hover:shadow-[0_0_5px_blue] items-center text-[14px] hover:bg-gray-600 rounded-sm cursor-pointer "
              onClick={() => {
                Location.pathname !== "/contact" && Navigate("/contact");
                setUserPanel((prev) => !prev);
              }}
            >
              Contact us
            </p>
          )}
          <p
            className="text-white w-[100%] h-[33%] flex flex-col justify-center hover:shadow-[0_0_5px_blue] items-center text-[14px] hover:bg-gray-600 rounded-sm cursor-pointer "
            onClick={() => {
              Location.pathname === "/about" ? " " : Navigate("/about");

              setUserPanel(!prev);
            }}
          >
            About
          </p>
        </div>
      )}
      {/* bottom nav for mobile */}
      <div className="md:hidden fixed bottom-0 flex items-center justify-center w-[100vw] h-[50px] bg-gradient-to-b from-[#943a88]  to-[#68479c] z-1000 ">
        <ul className="w-[90%] flex flex-row flex-nowrap gap-x-[5px] items-center justify-between">
          <li
            className={`h-[40px]  ${
              Location.pathname === "/"
                ? "scale-115 text-[#46f7df] "
                : "text-white"
            }   text-[12px] p-[4px]  rounded-xl   cursor-pointer hover:bg-gray-500 font-[500] font-serif `}
            onClick={() => {
              Location.pathname !== "/" && Navigate("/");
            }}
          >
            {" "}
            <p className="flex flex-row flex-nowrap justify-center">
              {" "}
              {Location.pathname == "/" ? (
                <MdHome className="w-[30px] h-[20px]  " />
              ) : (
                <AiOutlineHome className="w-[30px] h-[20px]  " />
              )}
            </p>{" "}
            HOME
          </li>
          <li
            className={`h-[40px] ${
              Location.pathname === "/collection"
                ? "scale-115 text-[#46f7df] "
                : "text-white"
            }  text-[12px] p-[4px]  rounded-xl  cursor-pointer hover:bg-gray-500 font-[500] font-serif `}
            onClick={() => {
              Location.pathname !== "/collection" && Navigate("/collection");
            }}
          >
            {" "}
            <p className="flex flex-row flex-nowrap justify-center">
              {" "}
              {Location.pathname == "/collection" ? (
                <HiCollection className="w-[30px] h-[20px]  " />
              ) : (
                <BiCollection className="w-[30px] h-[20px]  " />
              )}
            </p>{" "}
            COLLECTION
          </li>
          <li
            className={`h-[40px] ${
              Location.pathname === "/contact"
                ? "scale-115 text-[#46f7df] "
                : "text-white"
            } text-[12px] p-[4px]  rounded-xl  cursor-pointer hover:bg-gray-500 font-[500] font-serif `}
            onClick={() => {
              Location.pathname !== "/contact" && Navigate("/contact");
            }}
          >
            <p className="flex flex-row flex-nowrap justify-center">
              {Location.pathname == "/contact" ? (
                <MdContacts className="w-[30px] h-[20px]  " />
              ) : (
                <MdOutlineContacts className="w-[30px] h-[20px]  " />
              )}
            </p>
            CONTACT
          </li>
          <li
            className={`h-[40px] ${
              Location.pathname === "/cart"
                ? "scale-115 text-[#46f7df] "
                : "text-white"
            } text-[12px] p-[4px] relative rounded-xl cursor-pointer hover:bg-gray-500 font-[500] font-serif `}
            onClick={() => {
              Location.pathname !== "/cart" && Navigate("/cart");
            }}
          >
            <p className="flex flex-row flex-nowrap justify-center">
              {Location.pathname == "/cart" ? (
                <IoMdCart className="w-[30px] h-[20px]  " />
              ) : (
                <MdOutlineShoppingCart className="w-[30px] h-[20px]  " />
              )}
            </p>
            CART
            <p className=" absolute size-[18px]  text-[14px] leading-3.5 right-0 bottom-[30px] font-semibold bg-black text-white rounded-full text-center">
              {cartItemsCount}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
