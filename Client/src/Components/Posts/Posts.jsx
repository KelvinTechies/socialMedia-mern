import React from 'react'
import {useState,useEffect} from 'react'
import './Posts.css'
import {PostData} from '../../PostData'
import Post from '../Post/Post';
import {useDispatch, useSelector} from 'react-redux'
import {getTimeLinePosts} from '../../Actions/PostAction'
import { useParams } from 'react-router';

function Posts() {
    const param = useParams()
    const dispatch = useDispatch()
    const{user} = useSelector((state)=>state.AuthReducer.authData)
    let{posts, loading} = useSelector((state)=>state.PostReducer)
    useEffect(() => {
        dispatch(getTimeLinePosts(user._id))
      
    }, [])
    if(!posts)return "no Posts"
    if(param.id) posts = posts.filter((post)=>post.UserId === param.id)
    return (
        <div className='Posts'>
            {
                loading ? "Fetching Posts":
                posts.map((post, id)=>{
                return(
                   <Post data={post.newPost} id={id} />
                )
            })}
        </div>
    )
}

export default Posts
