
function Title({title, title2, body}) {
  return (
    <div className='w-[100%] h-[20%] flex flex-col items-center  '>
      <div className="md:text-[34px] text-[#f3f2cc] font-semi text-[20px] ">
        <p className='inline'> {title} &nbsp;</p>  
        <p className='inline text-[#cddfe4]'>{title2} </p>  
      </div> 
      <div className="md:text-[24px] text-[#f5e7ab] font-light font-sans text-[14px] ">
        {body}
      </div>
    </div>
  )
}

export default Title
