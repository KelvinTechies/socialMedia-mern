import User from '../Models/UserModels.js'
import getToken from '../JwtToken/getToken.js'
import  jwt from 'jsonwebtoken'




 export const registerUser = async(req, res)=>{
    const {FirstName, LastName, Username, Password} = req.body
    try {
        const oldUser = await User.findOne({Username})

        if(oldUser){
            res.status(401).json({message:"Username already exists"})
            
        }else{

            const newUser = new User({FirstName, LastName, Username, Password})
            const token = jwt.sign({user_id:newUser.Username}, process.env.JWT_SECRET, {expiresIn:'1d'})
            await newUser.save()
            res.status(201).json({newUser, token})
        }


        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const LoginUser = async(req, res)=>{
    const {Username, Password } = req.body;

    try {
        if(!Username || !Password){
            res.status(401).json({message:"All fields are required"})
        }else{
            const user = await User.findOne({Username})

            if(!user){
                res.status(401).json({message:"User does not exists"})
            }else{
               const newUser = await user.comparePwd(Password)
               if(newUser){
            const token = jwt.sign({user_id:newUser.Username}, process.env.JWT_SECRET, {expiresIn:'1d'})
                   
                   res.status(200).json({user, token})
               }else{
                res.status(401).json({message:"Pwd Mixmatched"})
                   
               }
            }
        }
    } catch (error) {
        console.log('An error Ocurred when Looging in');
        
    }
}
