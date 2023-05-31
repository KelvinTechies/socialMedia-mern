import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './Routes/AuthRoute.js'
import UserRoutes from './Routes/UserRoutes.js'
import PostRoutes from './Routes/PostRoutes.js'
import uploadRoute from './Routes/UploadRoute.js'



const PORT = 5000
const app = express()

// To serve Images for public


app.use(express.static('public'));
app.use('/Images', express.static("Images"))


app.use(bodyParser.json({limit:'30mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}))
app.use(cors())


dotenv.config()


// Routes
app.use('/auth', router)
app.use('/user', UserRoutes)
app.use('/upload', uploadRoute)
app.use('/posts', PostRoutes)




mongoose.connect(process.env.MONGO_URI)
.then(()=>app.listen(process.env.PORT || 5000, ()=>console.log(`Listening on ${process.env.PORT}`)

))