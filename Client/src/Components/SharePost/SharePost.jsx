import React from 'react'
import {useState, useRef } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import ProflieImage from '../../img/profileImg.jpg'
import './SharePost.css'
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons'
import { uploadImage, uploadPost } from '../../Actions/UploadActions/UploadActions';
import { UploadImage } from '../../Api/uploadRequest';

function SharePost() {
const publicServer = process.env.REACT_APP_PUBLIC_FOLDER
    
    const {user} = useSelector((state)=>state.AuthReducer.authData)
    const Desc = useRef()
    const dispatch = useDispatch()
    const uploading = useSelector((state=>state.PostReducer.uploading))

    const[image, setImage] = useState(null) 

    const imageRef = useRef()
const onInageChange =(event)=>{
    if(event.target.files && event.target.files[0]){
        let img = event.target.files[0];

        setImage(
            // image:URL.createObjectURL(img)
            img
        )
    }
}

const reset=()=>{
    setImage(null)
    Desc.current.value=null
}
const handleSubmit =  (e)=>{
    e.preventDefault()

    const newPost = {
        UserId : user._id,
        Desc : Desc.current.value
    }
    if(image){
        const data = new FormData()
        const fileName = Date.now() + image.name

        data.append("name", fileName)
        data.append("file", image)
        newPost.image = fileName;
        console.log(newPost);
        try {
            dispatch(uploadImage(data))
        } catch (error) {
            console.log(error);
            
        }
        
    }
    dispatch(uploadPost(newPost))
    reset()
}
    return (
        <div className='SharePost'>
            <img src={user.Profile ? publicServer + user.Profile : publicServer + "default-img2.jpg"} alt="" />
            <div className="input">
            <input type='text' name='Desc' ref={Desc} required placeholder='Whats happening' />
            <div className="postOptions">
            <div onClick={()=>imageRef.current.click()} className="options"  style={{color:"var(--photo)"}}>
            <UilScenery />
            Photo
            </div>
            <div className="options" style={{color:"var(--video)"}}>
            <UilPlayCircle />
            Video
            
            </div>
            <div className="options"  style={{color:"var(--location)"}}>
            <UilLocationPoint />
            Location
            </div>
            <div className="options"  style={{color:"var(--shedule)"}}>
            <UilSchedule />
            Schedule
            </div>
            <button className='sp-btn button' onClick={handleSubmit}disabled={uploading}>{ uploading ? "Uploading" :'Share'}</button>
           <div style  = {{display:'none'}}>
           <input type="file" name='myImage' ref={imageRef} onChange={onInageChange}/>
           </div>
        </div>
        {image && 
        
        <div className="previewImage">
        <UilTimes onClick={()=>setImage(null)} />
            <img src={URL.createObjectURL(image)}/>
        
        </div>
        }
        </div>
     
        </div>

     
    )
}

export default SharePost
