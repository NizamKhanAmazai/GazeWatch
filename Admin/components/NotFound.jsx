import {useNavigate} from "react-router-dom"

function NotFound() {
    const navigate = useNavigate()
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-r from-teal-700 to-gray-600 align-content flex flex-col      items-center justify-center  '>
      <div className="w-[100vw]  text-[50px] text-center ">404 Page Not Found</div>
      <button className='w-[140px] h-[40px] p-2 bg-gradient-to-b from-orange-500 to-slate-400 hover:bg-gradient-to-b hover:from-emerald-800 cursor-pointer hover:to-yellow-700 text-[18px] ' onClick={()=>{navigate("/")}} >Go Home Page</button>
    </div>
  )
}

export default NotFound
