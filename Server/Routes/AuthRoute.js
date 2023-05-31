import express from 'express'
import { registerUser, LoginUser } from '../Controllers/Auth.js'
const router = express.Router()


// router.get('/', async(req, res)=>{
//     res.send('The Route is working');
    
// })
router.post('/register', registerUser)
router.post('/login', LoginUser)




export default router