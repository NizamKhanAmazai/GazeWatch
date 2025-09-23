import React, { useContext, useState } from "react";
import google from "../assets/google.png";
import logo from "../assets/logo2.png";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GazeWatchContext } from "../userContext/UserContext";
import { signInWithPopup } from "firebase/auth";
import { Auth, provider } from "../../Utils/firebaseAuth";
import axios from "axios";
import { userDataContex } from "../userContext/dataContext"; 
import Loading from "../../Components/Loading";

function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false)
  const [count, setCount] = useState(0)

  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const { serverUrl } = useContext(GazeWatchContext);
  const { authorizeUser,  setToastSuccess, setToastError } = useContext(userDataContex);

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        let user = await axios.post(
          serverUrl + "/api/user/login", 
          { email: email, password: password },
          { withCredentials: true }
        );
        navigate("/");
        authorizeUser();
        setToastSuccess("Login Successfull")
        console.log(user.data);
      }catch (error) {
        setCount(prev => prev + 1)
        setToastError("Error In LogIn--"+count)
        console.log(error);
      }
    }else{
      alert("fill details")
    }
  };
  
  // handle google log in
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true)
      let responce = await signInWithPopup(Auth, provider);
      let user = responce.user;
      let email = user.email;
      let name = user.displayName;
      
      let result = await axios.post( serverUrl + "/api/user/oauth/google", { email: email, name: name }, { withCredentials: true });
      setToastSuccess("LogIn Successfull")
      navigate("/");
      console.log(result);
      setGoogleLoading(false)
      authorizeUser();
    } catch (error) {
      setGoogleLoading(false)
      setCount(prev=> prev+1)
      setToastError(error.message + count)
      console.log(error + count);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#140220] to-[#01081f] select-none">
      <div className="w-[100vw] h-[60px] flex flex-row bg-black items-center  ">
        <img
          src={logo}
          alt="logo"
          className="w-[70px] h-[70px] mx-5 cursor-pointer "
          onClick={() => {
            navigate("/");
          }}
        />
        <div
          className=" font-extrabold text-[30px] text-amber-300 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          GazeWatch
        </div>
      </div>
      <form
        className="w-[100vw] h-[80vh] flex flex-col items-center justify-center "
        onSubmit={handleLogin}
      >
        <div className=" flex flex-col items-center  w-[70vw] h-[15vh] justify-center ">
          <span className="text-3xl font-bold font-serif text-white ">
            Login Page
          </span>
          <span className="md:text-xl font-light font-sans text-gray-300 text-center">
            Wellcome to Login Page. Start where you left.
          </span>
        </div>
        <div className="lg:w-[40vw] sm:w-[60vw] w-[80vw] bg-gray-900  h-[70vh] flex flex-col items-center justify-center gap-[10px] lg:gap-[15px] rounded-sm ring-1 ring-green-950 ">
          {/* Login with google  */}
          <div
            className="w-[80%] h-[40px] flex flex-row justify-center items-center ring-1 ring-[#116b3a] rounded-sm bg-[#434365] hover:bg-yellow-800 cursor-pointer"
            onClick={handleGoogleLogin}
          >
            {googleLoading ? <Loading/> :
            <>
            <img
              src={google}
              alt="googlelogo"
              className="w-[30px] h-[30px] mx-[10px] "
            />
            <span className="font-bold text-white md:text-[18px] text-[16px] ">
              Login with Google
            </span>
            </>}
          </div>
          {/* OR line */}
          <div className="w-[80%] flex flex-row justify-center items-center text-white ">
            <div className="h-[1px] w-[48%] bg-[#104350]  "></div>OR
            <div className="h-[1px] w-[48%] bg-[#104350]  "></div>
          </div>
          {/*   inputs fields */}

          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="email"
            className="pl-5  text-gray-50 text-[18px] w-[80%] h-[40px] flex flex-row justify-center items-center ring-1 ring-[#116b3a] rounded-sm"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <div className="text-gray-50 d-flex  w-[80%] relative h-[40px] ring-1 ring-[#116b3a] rounded-sm">
            <input
              type={!show ? "password" : "text"}
              name="password"
              id="password"
              value={password}
              placeholder="password"
              className="pl-5  text-gray-50 text-[18px] w-[100%] h-[40px] flex flex-row justify-center items-center ring-1 ring-[#116b3a] rounded-sm"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {show ? (
              <IoIosEyeOff
                className="absolute text-yellow-400 cursor-pointer right-[2vw] top-[0.8vh] h-[30px] w-[30px]  "
                onClick={() => setShow(!show)}
              />
            ) : (
              <IoIosEye
                className="absolute  right-[2vw] cursor-pointer top-[0.8vh] h-[30px] w-[30px]  "
                onClick={() => setShow(!show)}
              />
            )}
          </div>
          {/* signup button */}

          <button className="mt-5 font-serif text-xl bg-indigo-700 cursor-pointer hover:bg-green-600 text-gray-50  w-[80%] h-[40px] flex flex-row justify-center items-center ring-1 ring-[#116b3a] rounded-sm">
            Login
          </button>
          {/* don't have any account */}
          <p className="text-white">
            Don't have an account{" "}
            <span
              className="text-indigo-400 cursor-pointer text-lg ml-[5px] "
              onClick={() => navigate("/Register")}
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
