import axios from 'axios'

const API = axios.create({baseURL:"http://localhost:5000"})

export const UploadImage = (data)=>API.post('/upload', data)

export const uploadPost = (data)=>API.post('/posts', data)