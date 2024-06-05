import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Select, TextInput,FileInput, Button } from 'flowbite-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
export default function CreatePost() {
    const [file,setFile] = useState(null);
    const [category1,setCategory1] = useState(false)
    const [formData,setFormData] = useState({});
    const navigate= useNavigate();
    const [imageUploadProgress,setImageuploadProgress] = useState(null)
    const handleUploadImage = async()=>{
        try {
            if(!file){
                return toast.error('No file Selected')
            }
            if(file.length>1){
                return toast.error('Only one file can be uploaded');
            }
            const storage= getStorage(app);
            const fileName = new Date().getTime() +'-'+file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef,file);
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageuploadProgress(progress.toFixed(0))
                },
                (error)=>{
                    setImageuploadProgress(null);
                    toast.error('Something went wrong');
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        setImageuploadProgress(null);
                        setFormData({...formData,image:downloadURL})
                    })
                }
            )

        } catch (error) {
            toast.error('Image Upload Failed');
            setImageuploadProgress(null)
        }
    }
    const handleSubmint =async(e)=>{
        e.preventDefault();
        if(!category1){
            toast.error('category not selected')
        }
        try {
            const res = await fetch(`/api/post/createpost`,{
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json();
            if(!res.ok){
                return toast.error(data.message);
            }
            if(res.ok){
                toast.success('Post Created Successfully');
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center my-7 text-3xl font-semibold' >Create A Post</h1>
      <form onSubmit={handleSubmint} className='flex flex-col gap-4'>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) =>setFormData({ ...formData, title: e.target.value })}  />
        <Select onChange={(e) => {
    setFormData({ ...formData, category: e.target.value });
    setCategory1(true);
}}
>
            <option value='uncategorized' >Select a Category</option>
            <option value='cricket' >Cricket</option>
            <option value='football' >Football</option>
            <option value='kabaddi' >Kabaddi</option>
        </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 ">
            <FileInput type='file' accept='image/*'  onChange={(e)=>setFile(e.target.files[0])}/>
            <Button type='button' className='dark:bg-custom-orange' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>{
                imageUploadProgress ? <div className='w-16 h-16' >
                    <CircularProgressbar  value={imageUploadProgress} text={`${imageUploadProgress  || 0}%`} /> 
                </div> : 'Upload Image'
            }</Button>
        </div>
        {
            formData.image && <img src={formData.image} alt='image' className='w-full h-72 object-cover'  />
        }
        <ReactQuill theme="snow" placeholder='Write something ...' className='h-72 mb-12' onChange={(value) => {setFormData({ ...formData, content: value });
          }} />
        <Button type='submit' className='bg-custom-btn' >Publish</Button>
      </form>
    </div>
  )
}
