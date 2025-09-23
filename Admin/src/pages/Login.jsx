import React, { useContext, useState } from "react"; 
import logo from "../assets/logo2.png";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";  
import axios from "axios";
import   { serverContext } from "../../userContext/UserContext";
import { adminDataContext } from "../../userContext/DataContext";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

function Login() {

  const [email, setemail] = useState("") 
  const [password, setPassword] = useState("")
  const { setUserData ,setAllPageData } = useContext(adminDataContext)
  const [loading, setLoading] = useState(false)

  const [show , setShow] = useState(false)

  const navigate = useNavigate() 
  const {serverUrl} = useContext(serverContext)  
  // handle login
  const handleAdminLogin = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      let admin =await axios.post(serverUrl + "/api/auth/admin/login", {email: email, password: password}, {withCredentials:true})
      setUserData(admin.data.admin); 
      setAllPageData(admin.data)
      navigate("/")
      toast.success("Login Successfull")
      setLoading(false)
      console.log(`login successfull`)
    } catch (error) {
      setLoading(false)
      toast.error("Login Error")
      console.log( error)
    }
  }
 
  return (
    <div className="w-[100vw] h-[100vh] bg-[#104350] select-none">
      <div className="w-[100vw] h-[60px] flex flex-row bg-black items-center  ">
        <img
          src={logo}
          alt="logo"
          className="w-[70px] h-[70px] mx-5 cursor-pointer "
          onClick={()=>{navigate("/")}}
        />
        <div className=" font-extrabold text-[30px] text-amber-300 cursor-pointer" onClick={()=>{navigate("/")}}>
          GazeWatch
        </div>
      </div>
      <form className="w-[100vw] h-[80vh] flex flex-col items-center justify-center " onSubmit={handleAdminLogin}> 
        <div className="lg:w-[40vw] sm:w-[60vw] w-[80vw] bg-gray-900  h-[70vh] flex flex-col items-center justify-center gap-[10px] lg:gap-[15px] rounded-sm ring-1 ring-green-950 ">
        <div className="mb-20 flex flex-col items-center  w-[70vw] h-[15vh] justify-center ">
          <span className="text-3xl font-bold font-serif text-white ">
            Login Page
          </span>
          <span className="md:text-xl font-light font-sans text-gray-300 text-center">
            Wellcome to Login Page. Apply to Admin Login.
          </span>
        </div>
          
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="email"
            className="pl-5  text-gray-50 text-[18px] w-[80%] h-[40px] flex flex-row justify-center items-center ring-1 ring-[#116b3a] rounded-sm"
            onChange={(e)=>{setemail(e.target.value)}}
          />
          <div className="text-gray-50 d-flex  w-[80%] relative h-[40px] ring-1 ring-[#116b3a] rounded-sm">
          <input  
            type={!show ? "password" : "text"}
            name="password"
            id="password"
            value={password}
            placeholder="password"
            className="pl-5  text-gray-50 text-[18px] w-[100%] h-[40px] flex flex-row justify-center items-center ring-1 ring-[#116b3a] rounded-sm"
            onChange={(e)=>{setPassword(e.target.value)}}
          />{
            show ? <IoIosEyeOff className="absolute text-yellow-400 right-[2vw] top-[0.8vh] h-[30px] w-[30px]  " onClick={()=> setShow(!show)} /> : <IoIosEye className="absolute  right-[2vw] top-[0.8vh] h-[30px] w-[30px]  "onClick={()=> setShow(!show)}/>
          } 
          </div>
          {/* signup button */}

          <button className="mt-5 font-serif text-xl bg-indigo-700 hover:bg-green-600 text-gray-50  w-[80%] h-[40px] flex flex-row justify-center items-center ring-1 ring-[#116b3a] rounded-sm">{loading ? <Loading /> :  "Login"}</button>
           </div>
      </form>
    </div>
  );
}

export default Login;
