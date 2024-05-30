import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
export default function Home() {
  const {currentUser} = useSelector((state)=>state.user)
  const [posts,setPosts] = useState({})
  useEffect(()=>{
    const fetchPosts =async ()=>{
      const res= await fetch(`/api/post/getposts`);
      const data = await res.json();
      if(!res.ok){
        return toast.error(data.message);
      }
      if(res.ok){
        setPosts(data.posts)
      }
    }
    fetchPosts();
  },[])
  return (
    <div className='h-full p-5'>
      <h1 className='text-slate-900 dark:text-slate-200 text-2xl' >Welcome to my Blog Website</h1>
      <p className='textlg' >Here You will blogs related to the <span className='block'>sports like cricket, football, Kabaddi, etc</span></p>
      <div className="">
        {

        }
      </div>
    </div>
  )
}
