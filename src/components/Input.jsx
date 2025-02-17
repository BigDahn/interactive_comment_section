

const Input = ({currentUser}) => {
   
    const {image} = currentUser
    console.log(image)
  return (
    <div className='flex items-start gap-3 px-4 py-3 w-[30rem] bg-white  rounded-md'>
        <img src={image.png} alt="img" width={30}/>
        <input className="w-full h-20 pb-13 pl-2 border-1 border-gray-200 outline-0  " placeholder="Add a comment..." type="text"/>
        <button className="rounded-sm bg-[#5457b6] px-2 py-0.5 text-white uppercase font-black ">send</button>
    </div>
  )
}

export default Input