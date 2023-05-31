import React from 'react'
import  './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/heart.png'
import NotLike from '../../img/notlike.png'
import {useSelector, useDispatch } from 'react-redux'
import {useState,useEffect} from 'react'
import { likePost } from '../../Api/PostRequest';
// import { LikeAPost } from '../../../../Server/Controllers/PostController';




function Post({data}) {
    const { user} = useSelector((state)=>state.AuthReducer.authData)
    const[liked, setLiked] = useState(data.Likes.includes(user._id))
    const[likes, setLikes] = useState(data.Likes.length)

    const handleLike = ()=>{
        setLiked((prev)=>!prev)
        likePost(data._id, user._id)
        liked ? setLikes((prev)=>prev-1):setLikes((prev)=>prev +1)
    }
    
    return (
        <div className='Post'>
            <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image:"" } />
            <div className="postReact">
                <img src={liked ? Heart : NotLike} alt="" style={{ cursor:"pointer" }} onClick={handleLike} />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>
            <span style={{ color:"var(--gray)", fontSize:"12px"}}> {likes} Likes</span>
          <div className="detail">
          <span><b>{data.name}</b></span>
            <span>{data.Desc}</span>
          </div>
        </div>
    )
}

export default Post
