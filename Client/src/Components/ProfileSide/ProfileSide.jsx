import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard';
import  './ProfileSide.css'
import FolowersCard from '../FollowersCard/FolowersCard';


function ProfileSide() {
    return (
        <div className='ProfileSide'>
            <LogoSearch />
            <ProfileCard  location='homepage'/>
            <FolowersCard />
        </div>
    )
}

export default ProfileSide
