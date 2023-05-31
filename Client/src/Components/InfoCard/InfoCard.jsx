import React, { useEffect, useState } from 'react'
// import { useState } from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as UserApi from '../../Api/UserRequest.js'
import { logOut } from '../../Actions/AuthActions';



function InfoCard() {
    const dispatch = useDispatch()
    const params = useParams()

    const profileUserId = params.id

    const [profileUser, setProfileUser] = useState({})

    const { user } = useSelector((state) => state.AuthReducer.authData)
    const [modalOpened, setModalOpened] = useState(false)
    useEffect(() => {
        const fetchProfileUser = async()=>{
            if(profileUserId===user._id){
                setProfileUser(user)
                
                
            }else{
                const profileUser = await UserApi.getUser(profileUserId)
                setProfileUser(profileUser)
                
            }
        }
        fetchProfileUser()
    }, [user])

const logOutHandle = ()=>{
    dispatch(logOut())
}


    return (
        <div className='InfoCard'>
            <div className="InfoHead">
                <h4>Profile</h4>
                {user._id === profileUserId ? (
                     <div>
                     <UilPen width='2rem' height='1.2rem' onClick={() => {
                         setModalOpened(true)
                     }} />
                     <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
                 </div>
                ) : ""}
               
            </div>
            <div className="info">
                <span><b>Status</b></span>
                <span> {profileUser.RelationShip}</span>
            </div>
            <div className="info">
                <span><b>Lives in </b></span>
                <span>{profileUser.LivesIn}</span>
            </div>
            <div className="info">
                <span><b>Works At </b></span>
                <span>{profileUser.worksAt}</span>
            </div>
            <button className="button logout-btn"onClick={logOutHandle}>LogOut</button>
        </div>
    )
}

export default InfoCard
