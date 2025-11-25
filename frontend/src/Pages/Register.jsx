import React, { useContext, useState } from "react";
import logo from "../assets/logo2.png";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import google from "../assets/google.png";
import { useLocation, useNavigate } from "react-router-dom";
import { GazeWatchContext } from "../userContext/UserContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { Auth, provider } from "../../Utils/firebaseAuth";
import { userDataContex } from "../userContext/dataContext"; 
import Loading from "../../Components/Loading";


function Register() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [count, setCount]= useState(0)

  const { serverUrl } = useContext(GazeWatchContext);
  const {setUserData, setToastSuccess, setToastError} = useContext(userDataContex)
  
  const location = useLocation();
  // handle submit
  
  const details = {
    name,
    email,
    password,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        "/api/user/register",
        details,
        {
          withCredentials: true,
        }
      );
      navigate('/')
      setToastSuccess("Registeration Successfull")
      console.log(result.data);
      setUserData(result.data)
    } catch (error) {
      setCount(prev => prev+1)
      setToastError("Error in Registeration"+count)
      console.log(error);
    }
  };

  // google LogIn
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true)
      let GoogUser = await signInWithPopup(Auth, provider);
      let user = GoogUser.user;
      let name = user.displayName;
      let email = user.email;
      let result = await axios.post(
        "/api/user/oauth/google",
        {
          name: name,
          email: email,
        },
        { withCredentials: true }
      );
      navigate('/')
      setToastSuccess("Registeration Successfull")
      setUserData(result.data);
    } catch (error) {
      setCount(prev=> prev+1)
      setToastError("Error in Registeration" + count)
      setGoogleLoading(false)
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#140220] to-[#01081f] select-none">
      <div className=" w-[100%] bg-black h-[60px]    flex flex-row items-center">
        <img
          src={logo}
          alt="logo"
          className="ml-5  w-[70px] h-[70px] cursor-pointer "
          onClick={() => navigate("/")}
        />
        <span
          className="ml-5 text-[30px] text-amber-300 font-extrabold cursor-pointer "
          onClick={() => navigate("/")}
        >
          {"GazeWatch"}
        </span>
      </div>
      <form
        className="flex justify-center flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-100%  flex flex-col justify-center items-center mb-[2%] ">
          <div className="sm:text-[35px] text-white font-serif font-bold">
            Register Page
          </div>
          <div className="sm:text-[18px] text-gray-200 text-center md:w-[100%] w-[80%] ">
            Wellcome to GazeWatch - Register and fullfill your need{" "}
          </div>
        </div>
        <div className="w-[80vw] sm:w-[40vw] h-[70vh]     md:gap-[15px] 2xl:h-[40vh] flex flex-col items-center gap-[10px] border-1 border-[#136c83] bg-gray-900 rounded-sm  ">
          <div
            className="w-[80%] h-[40px] flex flex-row justify-center ring-[#104350] text-[16px] sm:text-[18px] text-center leading-[40px] text-white ring rounded-sm mt-5 bg-[#434365] cursor-pointer hover:bg-yellow-800"
            onClick={() => {
              handleGoogleLogin();
            }}
          >
             
            {googleLoading ? <Loading /> : <> <img src={google} alt="" className="w-[40px] " /> Register with Google </>}
          </div>
          <div className="flex flex-row items-center w-[80%] text-white">
            <div className="h-[1px] w-[90%]  bg-[#104350] "></div>{" "}
            <div className=" w-[30px] text-center">OR</div>
            <div className="h-[1px] w-[90%] bg-[#104350] "></div>
          </div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="  pl-5 w-[80%] h-[40px] ring-[#116b3a]  text-[12px] md:text-[18px] text-white ring rounded-sm border-[#104350]    "
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="pl-5 w-[80%] h-[40px] ring-[#116b3a] text-[12px] md:text-[18px] text-white ring rounded-sm border-[#104350]    "
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="w-[80%] relative h-[40px] ring-[#116b3a] text-[18px] text-white ring rounded-sm border-[#104350] ">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              className="pl-5 w-[100%] h-[40px] ring-[#116b3a]  text-[12px] md:text-[18px] text-white ring rounded-sm border-[#104350]    "
              onChange={(e) => setPassword(e.target.value)}
            />

            {show ? (
              <IoIosEyeOff  
                className="h-[30px] cursor-pointer text-yellow-400 right-[2vw] top-[0.8vh]  w-[30px] absolute   "
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoIosEye 
                className="h-[30px] cursor-pointer right-[2vw] top-[0.8vh] w-[30px] absolute "
                onClick={() => {
                  setShow((prev) => !prev);
                }}
              />
            )} 
          </div>

          <button className="w-[80%] h-[40px] ring-[#104350] text-[18px] text-center leading-[40px] text-white ring rounded-sm mt-5 bg-indigo-700 cursor-pointer hover:bg-green-600 ">
            Create Account
          </button>
          <p className="text-center text-white">
            Already have an account{" "}
            <span
              className="text-indigo-400 cursor-pointer p-[5px] "
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
