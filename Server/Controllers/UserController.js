import User from '../Models/UserModels.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id)

        if (user) {
            const { Password, ...otherDetails } = user._doc
            res.status(200).json({ otherDetails, message: true })
            res.send('working')
            console.log(otherDetails)
        } else {
            res.status(401).json({ message: "User cannot be found" })


        }
    } catch (error) {
        console.log(error)
    }
}


export const getAllUsers = async (req, res) => {
    const id = req.params.id;

    try {
        let users= await User.find()
users=users.map((user)=>{
    const {Password, ...otherDetails} = user._doc
    return otherDetails
})
res.status(200).json(users)
        
    } catch (error) {
        console.log(error)
    }
}




export const UpdateUser = async (req, res) => {
    const id = req.params.id

    const { _id, currentUserAdminStatus, Password } = req.body

    if (id === _id) {
        try {
            if (Password) {
                const salt = await bcrypt.genSalt(10)
                req.body.Password = await bcrypt.hash(Password, salt)
            }
            const newUser = await User.findByIdAndUpdate(id, req.body, { new: true })
            const token = jwt.sign({username:newUser.Username}, process.env.JWT_SECRET,{expiresIn:'1d'})
            res.status(200).json({newUSer, token})
        } catch (error) {

            res.status(401).json({ message: error })
        }
    } else {

        res.status(403).json({ message: 'Access Denied... You can only update your own Profile' })
    }
}


export const DeleteUser = async (req, res) => {
    const id = req.params.id

    const { currentUserId, currentUserAdminStatus } = req.body
    if (id === currentUserId || currentUserAdminStatus) {
        try {
            const user = await User.findByIdAndDelete(id)
            if (user) {
                res.status(200).json({ message: true, user })
            } else {
                res.status(400).json({ message: `Could not delete id # ${id}` })

            }
        } catch (error) {

        }
    } else {
        res.status(403).json({ message: `Access Denied... You can only delete your own Profile since you are not id # ${id}` })

    }
}


export const FollowUser = async (req, res) => {
    const id = req.params.id
    const { _id } = req.body

    if (_id === id) {
        res.status(403).json("Action Forbidden")
    } else {
        try {
            const followUser = await User.findById(id)
            const followingUser = await User.findById(_id)

            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } })
                await followingUser.updateOne({ $push: { following: id } })
                res.status(200).json("User Followed")
            } else {
                res.status(403).json("User is already followed by You")

            }
        } catch (error) {

            console.log(error)
        }
    }
}

export const UnFollowUser = async (req, res) => {
    const id = req.params.id
    const { _id } = req.body

    if (_id === id) {
        res.status(403).json("Action Forbidden")
    } else {
        try {
            const followUser = await User.findById(id)
            const followingUser = await User.findById(_id)

            if (followUser.followers.includes(_id)) {
                await followUser.updateOne({ $pull: { followers: _id } })
                await followingUser.updateOne({ $pull: { following: id } })
                res.status(200).json("User unFollowed")
            } else {
                res.status(403).json("User is not followed by You")

            }
        } catch (error) {

            console.log(error)
        }
    }
}