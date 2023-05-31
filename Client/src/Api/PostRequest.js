import axios from 'axios'

const API = axios.create({baseURL:"http://localhost:5000"})

export const getTimeLinePosts = (user_id)=>API.get(`/posts/${user_id}/timeline`)
export const likePost = (post_id, UserId)=>API.put(`/posts/${post_id}/like`, {UserId:UserId})