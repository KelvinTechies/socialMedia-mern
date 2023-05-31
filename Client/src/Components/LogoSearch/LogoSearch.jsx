import React from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import Logo from '../../img/logo.png'
import './LogoSearch.css'
function LogoSearch() {
    return (
        <div className='LogoSearch'>
            <img src={Logo} />
            <div className="Search">
            <input type='search' placeholder='#Explore'  />
            <div className="s-icons">
            <UilSearch />
            </div>
            </div>
        </div>
    )
}

export default LogoSearch
