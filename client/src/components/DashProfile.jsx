import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import toast from 'react-hot-toast';
export default function DashProfile() {
    const {currentUser}= useSelector((state)=>state.user);
    const [imageFile,setImageFile] = useState(null);
    const [imageUrl,setImageUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError,setImageFileUploadError] = useState(null)
    const filePickerRef = useRef();
    console.log(imageFileUploadProgress,imageUrl)
    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    },[imageFile]);

const uploadImage = async () => {
  try {
    if (!imageFile) {
      setImageFileUploadError('No file selected.');
      return toast.error('no file selected');
    }

    const fileType = imageFile.type.split('/')[0];
    const maxSizeMB = 2;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (fileType !== 'image') {
      setImageFileUploadError('Only image files are allowed.');
      return toast.error("Only images are allowed");
    }

    if (imageFile.size > maxSizeBytes) {
      setImageFileUploadError(`File size should be less than ${maxSizeMB} MB.`);
      return;
    }

    console.log('Uploading...');
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${imageFile.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        let errorMessage = 'An error occurred during the upload.';
        if (error.code === 'storage/unauthorized') {
          errorMessage = 'You are not authorized to upload this file.';
        } else if (error.code === 'storage/canceled') {
          errorMessage = 'File upload was canceled.';
        } else if (error.code === 'storage/unknown') {
          errorMessage = 'Unknown error occurred, please try again later.';
        }
        setImageFileUploadError(errorMessage);
        setImageFile(null)
        setImageUrl(null)
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);
          console.log('File available at', downloadURL);
        } catch (urlError) {
          setImageFileUploadError('Failed to get the download URL.');
        }
      }
    );
  } catch (error) {
    console.error('Upload failed:', error);
    setImageFileUploadError('An unexpected error occurred during the upload.');
  }
};

    const handleChangeImage = (e)=>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file))
        }
    }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl' >Profile</h1>
      <form className='flex flex-col gap-4'>
        <input className='hidden' type="file" accept='image/*' ref={filePickerRef} onChange={handleChangeImage}/>
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>filePickerRef.current.click()} >


        {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}

            <img src={imageUrl || currentUser.profilePicture} className={`rounded-full w-full h-full border-8 object-cover border-[lightgray]' alt="" ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60' } `} />
        </div>
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline >Update</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer' >Delete</span>
        <span className='cursor-pointer' >SignOut</span>
      </div>
    </div>
  )
}
 