import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashPost() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore,setShowMore] = useState(true)
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
          const data = await res.json();
            console.log(userPosts)
          if (!res.ok) {
            return toast.error(data.message || 'Failed to fetch posts');
          }
          if(data.length<9){
            setShowMore(false)
          }
  
          setUserPosts(data.posts);
        } catch (error) {
          toast.error(error.message || 'An error occurred');
        }
      };
  
      if (currentUser && currentUser.isAdmin) {
        fetchPosts();
      }
    }, [currentUser._id]);
    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
          const res = await fetch(
            `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
          );
          const data = await res.json();
          if (res.ok) {
            setUserPosts((prev) => [...prev, ...data.posts]);
            if (data.posts.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          toast.error(error.message);
        }
      };
    
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scroll-bar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scroll-bar-thumb-slate-500' >
        {currentUser.isAdmin && userPosts.length>0 ? (
           <>
           <Table hoverable className='shadow-md'>
             <Table.Head>
               <Table.HeadCell>Date Updated</Table.HeadCell>
               <Table.HeadCell>Post Image</Table.HeadCell>
               <Table.HeadCell>Post Title</Table.HeadCell>
               <Table.HeadCell>Category</Table.HeadCell>
               <Table.HeadCell>Delete</Table.HeadCell>
               <Table.HeadCell><span>Edit</span></Table.HeadCell>
             </Table.Head>
             <Table.Body className='divide-y'>
               {userPosts.map((post) => (
                 <Table.Row key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800' >
                   <Table.Cell>
                     {new Date(post.updatedAt).toLocaleDateString()}
                   </Table.Cell>
                   <Table.Cell>
                     <Link to={`/post/${post.slug}`}>
                       <img className='h-10 w-20 object-cover bg-gray-500' src={post.image} alt={post.title} />
                     </Link>
                   </Table.Cell>
                   <Table.Cell className='font-medium text-gray-900 dark:text-white' >{post.title}</Table.Cell>
                   <Table.Cell>{post.category}</Table.Cell>
                   <Table.Cell>
                     {/* Implement the delete functionality */}
                     <button><span className='font-medium text-red-500 hover:underline cursor-pointer' >Delete</span></button>
                   </Table.Cell>
                   <Table.Cell>
                     <Link to={`/update-post/${post._id}`}>
                       <button><span className='text-teal-500 hover:underline' >Edit</span></button>
                     </Link>
                   </Table.Cell>
                 </Table.Row>
               ))}
             </Table.Body>
           </Table>
           {
            showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                    Show More
                </button>
            )
           }
         </>
        ):(
            <p>no posts</p>
        )}
    </div>
  )
}
