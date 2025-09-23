import { useNavigate } from 'react-router-dom'

function ItemCard({image, name, price, currency, id}) {
  const Navigate = useNavigate();  
  return (
    <div className='lg:w-[20vw] md:w-[19vw] hover:scale-105 transition-all w-[100%] h-[280px] md:h-[300px] flex flex-row flex-wrap pt-2 bg-[#272b60] rounded-sm items-start justify-center '>
      <div className="w-[95%] h-[75%] bg-white rounded-sm" onClick={()=>{
        Navigate(`/product/${id}`)
      }} >
        {/* <img src={itemImg} alt="product Image" onError={handleImg} className='w-[100%] h-[100%]'/> */}
        {/* <a href={`/product/${id}`} className="w-[100%] h-[100%]">  if need a refresh with it*/}
          <img src={image} alt="product Image" className='w-[100%] h-[100%]  cursor-pointer'/>
        {/* </a> */}
      </div>
      <div className='h-[25%] w-full'>
        <p className="text-[14px] md:text-[18px] pl-3 text-[#c1eff7] h-[25px] pt-2 w-[97%]">{name && name.length > 13 ? name.slice(0,14)+"..." : name}</p>
        <div className="h-[1px] w-[90%] bg-slate-600 ml-2 mt-2 "></div>
        <p className="text-[14px] md:text-[18px] pl-3 text-[#f7f3c1] h-[25px] pt-1 italic font-serif w-[97%]">{currency} {price}</p>
      </div>
    </div>
  )
}

export default ItemCard
