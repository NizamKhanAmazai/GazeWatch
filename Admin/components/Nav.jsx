import React, { useState } from "react";
import logo from "../src/assets/logo2.png"; 
import { useContext } from "react";
import { serverContext } from "../userContext/UserContext";
import axios from "axios"
import { adminDataContext } from "../userContext/DataContext";
import { toast } from "react-toastify";
import Loading from "./Loading";
import {useNavigate} from "react-router-dom"


function Nav() {
  let {serverUrl} = useContext(serverContext)
  const { setUserData } = useContext(adminDataContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleLogout = async ()=>{
    try {
      setLoading(true)
      let result = await axios.get(serverUrl + "/api/auth/admin/logout" , {withCredentials: true})
      setUserData(null);

      toast.success('Logout Successfull')
      setLoading(false)
      console.log(result.data.message);
    } catch (error) {
      toast.error('Logout Error')
      setLoading(false)
      console.log(error)
    }
  }
  return (
    <div className="select-none w-[100vw] h-[60px] bg-cyan-800 fixed top-0 flex justify-between z-40 overflow-hidden">
      <div className="lg:w-[20vw] flex flex-row items-center md:w-[30vw] overflow-hidden">
        <img src={logo} alt="" className="w-[70px] h-[65px] mx-[2px] " />
        <h1 className="text-[16px] md:text-[25px] text-amber-300 font-extrabold ">
          GazeWatch
        </h1>
      </div> 
      <div  className="  flex w-[45vw] md:w-[20vw] mr-2 space-x-2 md:mr-10 text-black text-[12px] font-bold md:text-[14px] lg:text-[16px] 2xl:text-[18px] flex-row items-center justify-center  ">
        <button className=" h-[40px] md:p-[5px] w-[70px] md:w-[100px]  items-center rounded-md cursor-pointer hover:bg-blue-300 flex flex-col justify-center hover:scale-110 hover:flex-row gap-x-3 hover:text-[16px] transition bg-gradient-to-tl from-blue-400 to-yellow-200 " onClick={()=>{location.pathname !== "/" && navigate("/")} } >  HOME </button>
        <button className=" h-[40px] md:p-[5px] w-[70px] md:w-[100px]  items-center rounded-md cursor-pointer    hover:bg-blue-300 flex flex-col justify-center hover:scale-110 hover:flex-row gap-x-3 hover:text-[16px] transition bg-gradient-to-tl from-emerald-400 to-slate-200 text-black  " onClick={()=>{handleLogout()}} > {loading ? <Loading color={"green"}/> :  "LogOut"  } </button>
      </div>
    </div>
  );
}

export default Nav;
