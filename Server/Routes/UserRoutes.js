import express from 'express'
import { getUser, getAllUsers, UpdateUser, DeleteUser, FollowUser, UnFollowUser } from '../Controllers/UserController.js'

const UserRoutes = express.Router();

UserRoutes.get('/', getAllUsers)
UserRoutes.get('/:id', getUser)
UserRoutes.put('/:id', UpdateUser)
UserRoutes.put('/:id/follow', FollowUser)
UserRoutes.put('/:id/unfollow', UnFollowUser)
UserRoutes.delete('/:id', DeleteUser)

export default UserRoutes