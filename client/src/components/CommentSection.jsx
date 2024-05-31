import { Alert, Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { HiOutlineExclamationCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';
import Comment from './Comment';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  console.log(comments)
  useEffect(()=>{
    const getComments = async()=>{
        try {
            const res= await fetch(`/api/comment/getcomment/${postId}`);
            const data = await res.json();
            if(res.ok){
                
                setComments(data)
            }
            else{
                setCommentError(data.message)
            }
        } catch (error) {
            setCommentError(error.message)
        }
    }
    getComments();
  },[postId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      setCommentError('Comment cannot exceed 200 characters');
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId: postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
    //   console.log(data)
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      } else {
        setCommentError(data.message);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt=''
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}
        {comments.length===0 ?(
            <p className='text-sm my-5' >No comments on this post</p>
        ):
        
        (<>
        <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments {}</p>
            <div className="border border-gray-400 rounded-sm py-1 px-2">
                <p>{comments.length}</p>
            </div>
        </div>
        {comments.map((comment)=>(
            <Comment key={comment._id} comment={comment} />
        ))}
        </>)}
    </div>
  );
}