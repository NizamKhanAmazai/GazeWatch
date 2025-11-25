import { useContext, useState } from 'react'
import Aiimage from "../src/assets/Ai1.png"
import Ai2 from "../src/assets/AI2.png"
import { shopDataContext } from '../src/userContext/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import openVoiceSound from "../src/assets/audio1.wav"
import { userDataContex } from '../src/userContext/dataContext'

const Ai = () => { 
    let {showSearch, setShowsearch, userPanel, setUserPanel} = useContext(shopDataContext)
    let {userData} = useContext(userDataContex)
    let navigate = useNavigate();
    const [activeAI, setActiveAI] = useState(false)
    let openingAudio = new Audio(openVoiceSound)

    function speak (message){
        let utterence =new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterence)
    }

    const speechRecoginition =  window.SpeechRecognition ||   window.webkitSpeechRecognition;
    const recognition =new speechRecoginition() 
    if(!recognition){
        toast.error("not supported")
    }
     
    recognition.onresult =  (e)=>{
         let transcript = e.results[0][0].transcript.trim();  
        if(transcript.toLowerCase().includes(("search")) && transcript.toLowerCase().includes("open") && !showSearch){
            speak("opening search")
            setShowsearch(true)
            navigate("/collection")
        }else if(transcript.toLowerCase().includes(("search")) && transcript.toLowerCase().includes("Close") && showSearch){
            speak("closing search")
            setShowsearch(false) 
        }else if(transcript.toLowerCase().includes(("collection")) || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes(("product")) ){
            speak("opening collection page")
            navigate('/collection')
        }else if(transcript.toLowerCase().includes(("about")) || transcript.toLowerCase().includes("aboutpage") || transcript.toLowerCase().includes(("abouts")) ){
            speak("opening about page")
            navigate('/about')
        }else if(transcript.toLowerCase().includes(("home")) || transcript.toLowerCase().includes("homepage") || transcript.toLowerCase().includes(("hom")) ){
            speak("opening home page")
            navigate('/')
        }else if(transcript.toLowerCase().includes(("cart")) || transcript.toLowerCase().includes("cartpage") || transcript.toLowerCase().includes(("kaat")) || transcript.toLowerCase().includes(("caat")) ){
            speak("opening your cart")
            navigate('/cart')
        }else if(transcript.toLowerCase().includes(("contact")) || transcript.toLowerCase().includes("contactpage") || transcript.toLowerCase().includes(("contacts")) || transcript.toLowerCase().includes(("cantect")) ){
            speak("opening contact page")
            navigate('/contact')
        }else if(transcript.toLowerCase().includes(("order")) || transcript.toLowerCase().includes("orderpage") || transcript.toLowerCase().includes(("orders")) || transcript.toLowerCase().includes(("orderspage")) ){
            if(userData){
              speak("opening Order page")
              return navigate('/orders')
             }
            speak("please register and place an order")
            navigate("/login")
            
        }else if((transcript.toLowerCase().includes(("profile")) || transcript.toLowerCase().includes("myprofile") || transcript.toLowerCase().includes(("profilepage")) || transcript.toLowerCase().includes(("detail"))) && !userPanel ){
            speak("opening your Profile")
            setUserPanel(true)
        }else if((transcript.toLowerCase().includes(("profile")) || transcript.toLowerCase().includes("myprofile") || transcript.toLowerCase().includes(("profilepage")) || transcript.toLowerCase().includes(("detail"))) && userPanel ){
            speak("closing your Profile")
            setUserPanel(false)
        }else{
            toast.error("try again")
        }
    }
    recognition.onend= ()=>{
        setActiveAI(false)
    }

    // const recognitioning= ()=>{
    //     let speechRecoginitiones =new window.SpeechRecognition || new window.webkitSpeechRecognition
    //      speechRecoginitiones.start();
    //      speechRecoginitiones.onresult = (e)=>{
    //         console.log(e) ; setActiveAI(true)
    //      }
    // }
  return (
    <div className={`fixed bottom-[12%] ${location.pathname === "/collection" ? "right-[2%]" : "left-[2%]"} ${activeAI ? "size-[120px]" : "size-[60px]"}  z-29 cursor-pointer transition-all `} onClick={()=> {recognition.start(); setActiveAI(true); openingAudio.play()}}>
      {activeAI && <img src={Ai2} alt="speaking" className={`fixed size-[60px] xl:bottom-22 xl:left-26 bottom-20 md:left-24 lg:left-25 left-22 animate-pulse transition-all ${location.pathname === "/collection" && "hidden"}`} />}
      <img src={Aiimage} alt="ai picture" className=' object-fill '  />
    </div>
  )
}

export default Ai
