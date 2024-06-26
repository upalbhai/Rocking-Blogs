import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import toast from 'react-hot-toast';
import logo from '../assets/logo.png'
import logo_white from '../assets/logo-white.png'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import Oath from '../components/Oath';
export default function SignIn() {
  const {loading, error:errorMessage} = useSelector((state)=>state.user)  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData,setFormData] = useState({});
  const handleChange =(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      // return toast.error("Fill the details")
      return dispatch(signInFailure('Please fill all the fields'))
    }
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success===false){
        // return setErrorMessage(data.message)
        // return toast.error(data.message)
        dispatch(signInFailure(data.message));
      }
      // setLoading(false);
      if(res.ok) {
        dispatch(signInSuccess(data))
        navigate('/');
        toast.success("Sign In Successfully")
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
      // setErrorMessage(error.message)
      // setLoading(false)
    }
  }

  return (
    <div className='min-h-screen mt-20' >
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
        <Link to='/'className='self-center font-bold dark:text-white text-4xl' >
        <img src={logo} className='w-auto h-3 sm:h-5 dark:hidden' /> 
<img src={logo_white} className='w-auto h-3 sm:h-5 hidden dark:inline' />         </Link>
        <p className='text-sm mt-5' >This is simple demo project which showcase my skill, you can able to creater a account</p>
        </div>
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
            <div className="">
              <Label value='Your Email' />
              <TextInput onChange={handleChange} type='email' placeholder='Email' id='email' />
            </div>
            <div className="">
              <Label value='Your Password'/>
              <TextInput onChange={handleChange} type='password' placeholder='Password' id='password' />
            </div>
            <Button className='bg-custom-btn' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'  />
                  <span className='pl-3' >Loading...</span>
                  </>
                  
                ) : 'Sign In'
              }
            </Button>
            <Oath />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span >Don't Have an Account?</span>
            <Link className='font-bold text-custom-orange dark:text-teal-500' to='/sign-up'>Sign Up</Link>
          </div>
          {
            errorMessage && 
            <Alert className='mt-5' color='failure' >
              {errorMessage}
            </Alert>
          }
        </div>
      </div>
    </div>
  )
}
