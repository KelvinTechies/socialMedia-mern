import React from 'react'
import Cover from '../img/cover.jpg'
import Profile from '../img/profileImg.jpg'
import './ProfileCard.css'
import {useSelector } from 'react-redux'
import { Link } from 'react-router-dom';



const ProfileCard = ({location}) => {
const { user } = useSelector((state)=>state.AuthReducer.authData)
const posts = useSelector((state)=>state.PostReducer.posts)
const publicServer = process.env.REACT_APP_PUBLIC_FOLDER
    const ProfilePage=false


    return (
        <div className='ProfileCard'>
            <div className="profileImages">
                <img src={user.Cover ? publicServer + user.Cover : publicServer + "dave-hoefler-7Q-x0TH6z4w-unsplash (1).jpg"} />
                <img src={user.Profile ? publicServer + user.Profile : publicServer + "default-img2.jpg"} />
            </div>

            <div className="profileName">
                <span> {user.FirstName} {user.LastName}</span>
                <span>{user.worksAt ? user.worksAt : "Write About YourSelf"}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{user.following.length}</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user.followers.length}</span>
                        <span>Followers</span>
                    </div>
                    {location==='profilepage' && (
                        <>
                        <div className="vl">

                        </div>
                        <div className="follow">
                        <span>{posts.filter((post)=>post.UserId === user._id)
                        
                        }</span>
                        <span>Posts</span>
                        </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            <span>
               {location==='profilepage'  ? "" : 
               <span><Link style={{ textDecoration:'none', color:'inherint' }} to={`/profile/${user._id}`}>My Profile </Link></span>
                 }
            </span>
        </div>
    )
}

export default ProfileCard
