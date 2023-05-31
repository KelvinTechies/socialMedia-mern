import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, UnFollowUser } from '../../Actions/userActions';
import { useState } from 'react'



function User({ person }) {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.AuthReducer.authData)
    const [following, setFollowing] = useState(person.followers.includes(user._id))
    const publicServer = process.env.REACT_APP_PUBLIC_FOLDER
    const ToFollowUser = () => {
        following ?
            dispatch(UnFollowUser(person._id, user)) :
            dispatch(followUser(person._id, user))
        setFollowing((prev) => !prev)
    }
    return (
        <div className="follower">
            <div className="img">
                <img src={person.Profile ? publicServer + person.Profile : publicServer + "default-img2.jpg"} className='followerImg' />
                <div className="name">
                    <span>{person.name}</span>
                    <span>@{person.Username}</span>
                </div>
            </div>
            <button className={following ? 'button fc-btn unfollowButton' : "button fc-btn"} onClick={ToFollowUser}>{following ? "Unfollow" : "Follow"}</button>
        </div>
    )
}

export default User
