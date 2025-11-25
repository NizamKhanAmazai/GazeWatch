 
function Loading(props) {
  return (
    <div className='w-[100%] h-[100%] flex flex-row justify-center items-center' >
        <span className={`size-6 animate-spin rounded-full border-4 border-t-transparent ${props.color ? `border-[${props.color}]` :"border-white"}  `}></span>
    </div>
  )
}

export default Loading
