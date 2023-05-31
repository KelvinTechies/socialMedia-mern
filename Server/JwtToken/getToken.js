import  jwt from 'jsonwebtoken'


const getToken = (uid)=>{
    jwt.sign({user_id:uid}, process.env.JWT_SECRET, {expiresIn:'1d'})
    
}

export default getToken