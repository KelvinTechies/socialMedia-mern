import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
    UserId:{type:String, required:true},
    Desc:{type:String},
    Likes:[],
    image:String,

}, {timeStamps:true})


const PostModel = mongoose.model('Posts', PostSchema)

export default PostModel

