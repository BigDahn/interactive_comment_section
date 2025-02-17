import { useState } from 'react'
import {comments,currentUser} from '../../data.json'
import Input from './Input'

const Layout = () => {

const replyButton = (id) =>{
  console.log(id)
}

const editButton = (id) =>{
  console.log(id)
}

const deleteButton = (id) =>{
  console.log(id)
}

const [update,setUpdate ] = useState(comments)

const increaseButton = (id) =>{
  const newComments = comments.map((comment)=>{ 
  comment.replies.map((reply)=>{
   if(reply.id === id ) return {
    ...reply, score:reply.score++
   }  
   return reply
  })
    if (comment.id === id) {
     return {
      ...comment, score:comment.score ++
     }
    }
    return comment
    
  })

  setUpdate(newComments)
}

const decreaseButton = (id) =>{
  const newComments = comments.map((comment)=>{ 
    comment.replies.map((reply)=>{
      if(reply.id === id ) return {
       ...reply, score:reply.score <= 1 ? 1 : reply.score--
      }  
      return reply
     })
    if (comment.id === id) {
      console.log(comment.score)
     return {
      ...comment, score:comment.score <= 1 ? 1 : comment.score--
     }
    }
    return comment
    
  })

  setUpdate(newComments)
}




  return (
    <main className="grid gap-3 py-5">
       {
       comments.map((comment)=>{
        const {id,content,createdAt,score,user,replies} = comment
       
        return <>
        <section className='flex flex-col'>
        <section key={id} className='flex items-center gap-3 px-4 py-2 w-[30rem] bg-white  rounded-md'>
         
           <div className='bg-[#eaecf1] flex flex-col  gap-3 items-center justify-center h-20 w-12 rounded-sm py-2 '>
           <button className='cursor-pointer' onClick={()=>increaseButton(id)}>
           <img src='/Images/Icons/icon-plus.svg'/>
                </button>
            <p className='text-lg font-extrabold text-center text-[#5457b6]'>{score}</p>
            <button className='cursor-pointer' onClick={()=>decreaseButton(id)}>
            <img src='/Images/Icons/icon-minus.svg'/>
            </button>
           </div>

           <div className='w-full '>
           <article className='flex justify-between items-center'>
            <div className='grid gap-5'>
            <div className='flex gap-2 '>
            <img src={user.image.png} alt='img' height={20} width={20}/>
            <p>{user.username}</p>
            <p>{createdAt}</p>
            </div>
            </div>
                <button className='flex items-center gap-2 cursor-pointer text-[#5457b6]'onClick={()=>replyButton(id)}> <img src='/Images/Icons/icon-reply.svg'/> reply </button>
            </article>   

            <p className='w-[23rem]  text-justify'>{content}</p>
           </div>
           
          
           
        </section>
        <div className='grid ml-16 gap-3 pt-2'>
            {replies.map((reply)=>{
              const { content,id,createdAt,score,replyingTo,user} = reply;
              return <div key={id} className='flex items-center gap-3 px-4 py-2 w-[30rem] bg-white  rounded-md'>
                <div className='bg-[#eaecf1] flex flex-col h-20 gap-3 items-center justify-center w-12 rounded-sm py-2 '>
           <button className='cursor-pointer' onClick={()=>increaseButton(id)}>
           <img src='/Images/Icons/icon-plus.svg'/>
                </button>
            <p className='text-lg font-extrabold text-center text-[#5457b6]'>{score}</p>
            <button className='cursor-pointer'onClick={()=>decreaseButton(id)}>
            <img src='/Images/Icons/icon-minus.svg'/>
            </button>
           </div>
           <div className='w-full '>
           <article className='flex justify-between items-center'>
            <div className='grid gap-3'>
            <div className='flex items-center gap-2 '>
            <img src={user.image.png} alt='img' height={0} width={20}/>
            <p>{user.username}</p>
            <p>{createdAt}</p>
            </div>
            </div>
           <div className='flex gap-5  '> 
           {user.username === "juliusomo" ? <button className='flex gap-x-0.5  cursor-pointer  text-center text-red-600/65 font-black'onClick={()=>deleteButton(id)}> <img src='/Images/Icons/icon-delete.svg'  /> Delete </button> : ""}
           {user.username === "juliusomo" ? <button className='flex gap-x-0.5 cursor-pointer text-[#5457b6] font-black'onClick={()=>editButton(id)}> <img src='/Images/Icons/icon-edit.svg' /> Edit </button> : <button className='flex items-center gap-2 cursor-pointer text-[#5457b6]'onClick={()=>replyButton(id)}> <img src='/Images/Icons/icon-reply.svg'/> reply </button>}
           </div>
            </article>   

            <p className='w-[23rem]  text-justify'> <span className='text-[#5457b6] font-extrabold'>@{replyingTo}</span> {content}</p>
           </div>
              </div>
            })}
           </div>
        </section>
        </>
       })}
       <Input currentUser={currentUser}/>
    </main>
  )
}

export default Layout