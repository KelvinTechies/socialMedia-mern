import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch';
import FolowersCard from '../FollowersCard/FolowersCard';
import InfoCard from '../InfoCard/InfoCard';

function ProfileLeft() {
  return (
    <div classname='Profile'>
      <LogoSearch />
      <InfoCard />
      <FolowersCard />
    </div>
  )
}

export default ProfileLeft
