import PostModel from '../Models/PostModels.js'
import userModel from '../Models/UserModels.js'
import mongoose from 'mongoose'





export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body)
    try {
        await newPost.save()
        res.status(200).json({ msg: "New Post Created", newPost })
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getAPost = async (req, res) => {
    const post_id = req.params.post_id
    try {
        const post = await PostModel.findById(post_id)
        if (post) {
            res.status(201).json({ msg: 'success', post })

        } else {
            res.status(400).json('post not found')

        }
    } catch (error) {
        console.log(error);

    }
}

export const updateAPost = async (req, res) => {
    const post_id = req.params.post_id
    const { user_id } = req.body;
    try {
        const post = await PostModel.findById(post_id)

        if (post.UserId === user_id) {

            await post.updateOne({ $set: req.body })


            res.status(201).json({ msg: 'success' })

        } else {
            res.status(400).json('post not found')

        }
    } catch (error) {
        console.log(error);

    }
}

export const DeleteAPost = async (req, res) => {
    const post_id = req.params.post_id

    const { user_id } = req.body

    try {
        const post = await PostModel.findById(post_id)
        if (post.UserId === user_id) {
            await post.deleteOne()


            res.status(201).json({ msg: 'Deleted Succesfully' })
        } else {
            res.status(400).json('post not found')

        }
    } catch (error) {

    }
}

export const LikeAPost = async (req, res) => {
    const post_id = req.params.post_id
    const { user_id } = req.body

    try {
        const post = await PostModel.findById(post_id)

        if (!post.Likes.includes(user_id)) {
            const likedPost = await post.updateOne({ $push: { Likes: user_id } })
            if (likedPost) {
                res.status(201).json({ msg: 'Post Liked' })

            } else {
                await post.updateOne({ $pull: { Likes: user_id } })
                res.status(200).json('post unLiked')

            }
        }
    } catch (error) {
        console.log(error);

    }
}


export const getTimeLinePosts = async (req, res) => {
    const user_id = req.params.user_id
    try {
        const getCurrentUserPosts = await PostModel.find({ user_id: user_id })
        const followingPosts = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(user_id),
                },
            },
            {
                $lookup:{
                    from:"posts",
                    localField:"following",
                    foreignField:"UserId",
                    as:"followingPosts"
                }
            },
            {
                $project:{
                    followingPosts  :1,
                    _id:0,
                },
            }
        ]
    )
    res.status(200).json(getCurrentUserPosts.concat(...followingPosts[0].followingPosts).sort((a,b)=>{
        return b.createdAt - a.createdAt
    }))
    } catch (error) {
        console.log(error);

    }
}