import { useState } from "react"


const Input = ({currentUser,setUpdate,update}) => {
    const {image} = currentUser




    const [content, setContent] = useState('')
    const handleSubmit = (e)=>{
      console.log(update)
            e.preventDefault()
            if(!content) return null
            const id = Math.floor(Math.random() * 4 + 5 * 2)
            const comment = {"id":id,
              "content": content,
              "createdAt": "few seconds ago",
              "score": 1,
              "replies":[],
              "user": currentUser,}
         const newUpdate = [...update, comment]

         console.log(newUpdate)
           setUpdate(newUpdate)
           setContent('')

           
    }
        
  return (
    <form className='flex items-start gap-3 px-4 py-3 w-[30rem] bg-white  rounded-md'>
        <img src={image.png} alt="img" width={30}/>
        <input className="w-full h-20 pb-13 pl-2 border-1 border-gray-200 outline-0  " placeholder="Add a comment..." type="text" value={content} onChange={(e)=>setContent(e.target.value)}/>
        <button className="rounded-sm bg-[#5457b6] px-2 py-0.5 text-white uppercase font-black " onClick={handleSubmit}>send</button>
    </form>
  )
}

export default Input