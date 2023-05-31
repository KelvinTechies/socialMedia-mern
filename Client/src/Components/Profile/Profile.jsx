import React from 'react'
import './Profile.css'
import ProfileLeft from '../ProfileLeft/ProfileLeft';
import ProfileCard from '../ProfileCard'
import PostSide from '../PostSide/PostSide'
import RightSide from '../RightSide/RightSide';



function Profile() {
  return (
    <div className='Profile'>
      <ProfileLeft />
      <div className="Profile-center">
      <ProfileCard location={"profilepage"} />
      <PostSide />
      </div>
      <RightSide />
    </div>
  )
}

export default Profile
