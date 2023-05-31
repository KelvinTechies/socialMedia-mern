import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    ProfilePicture:String,
    CoverPicture:String,
    About:String,
    LivesIn:String,
    worksAt:String,
    Country:String,
    RelationShip:String,
    followers:[],
    following:[]
}, {timeStamps:true})

UserSchema.pre('save', async function (nxt){
    if(!this.isModified('Password')){                               
        nxt()
    }else{
        const salt = await bcrypt.genSalt(10);
        this.Password = await bcrypt.hash(this.Password, salt)

    }
    
})


UserSchema.methods.comparePwd = async function (pwd){
    const matched = await bcrypt.compare(pwd, this.Password)
    return matched
}

const User = mongoose.model('Users', UserSchema)

export default User;