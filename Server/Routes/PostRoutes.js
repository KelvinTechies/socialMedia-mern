import express from 'express'
import { createPost, getAPost, updateAPost, LikeAPost, getTimeLinePosts, DeleteAPost } from '../Controllers/PostController.js'



const PostRouter = express.Router()

PostRouter.post('/', createPost)
PostRouter.get('/:post_id', getAPost)
PostRouter.put('/:post_id', updateAPost)
PostRouter.put('/:post_id/like', LikeAPost)
PostRouter.get('/:user_id/timeline', getTimeLinePosts)
PostRouter.delete('/:post_id', DeleteAPost)

export default PostRouter;