import express from 'express'
import multer from 'multer'

const uploadRoute = express.Router()


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/Images")
    },
    filename:(req, file, cb)=>{
        console.log(req.file) 
        
        cb(null, req.body.name)
    }
})

const upload = multer({storage:storage}).single('file')


uploadRoute.post('/', (req, res)=>{
    try {
        upload(req, res, (err)=>{
            if(err){
                console.log(err) 

            }else{
                return res.status(200).json("File Uploaded Successfully")
                console.log(req.file) 
            }
        })
               
            } catch (error) {
                console.log(error)
            }
})

// .post('/', upload.single("file", (req, res)=>{
//     try {
//         return res.status(200).json("File Uploaded Successfully")
//     } catch (error) {
//         console.log(error)
//     }
// }))

export default uploadRoute