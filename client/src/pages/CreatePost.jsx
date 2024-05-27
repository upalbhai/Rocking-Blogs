import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Select, TextInput,FileInput, Button } from 'flowbite-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
export default function CreatePost() {
    const [file,setFile] = useState(null);
    const [formData,setFormData] = useState({})
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
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center my-7 text-3xl font-semibold' >Create A Post</h1>
      <form className='flex flex-col gap-4'>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <TextInput type='text' placeholder='Title' required id='title' className='flex-1'  />
        <Select>
            <option value='uncategorized' >Select a Category</option>
            <option value='cricket' >Cricket</option>
            <option value='football' >Football</option>
            <option value='kabaddi' >Kabaddi</option>
        </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 ">
            <FileInput type='file' accept='image/*'  onChange={(e)=>setFile(e.target.files[0])}/>
            <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>{
                imageUploadProgress ? <div className='w-16 h-16' >
                    <CircularProgressbar  value={imageUploadProgress} text={`${imageUploadProgress  || 0}%`} /> 
                </div> : 'Upload Image'
            }</Button>
        </div>
        {
            formData.image && <img src={formData.image} alt='image' className='w-full h-72 object-cover' />
        }
        <ReactQuill theme="snow" placeholder='Write something ...' className='h-72 mb-12' />
        <Button type='submit' gradientDuoTone='purpleToPink' >Publish</Button>
      </form>
    </div>
  )
}
