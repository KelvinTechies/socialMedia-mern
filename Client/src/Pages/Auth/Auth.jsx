import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Auth.css'
import Logo from '../../img/logo.png'
import {logIn} from '../../Actions/AuthActions'
import {signUp} from '../../Actions/AuthActions'



function Auth() {
     const dispatch = useDispatch()
     const Loading =  useSelector((state)=>state.AuthReducer.loading)
    const [isSignUp, setIssignUp] = useState(false)
    
    const [confirmPassword, setconfirmPassword] = useState(true)
    const [data, setData] = useState({
        FirstName:'',
        LastName:'',
        Username:'',
        Password:'',
        repwd:''
    })

    const handleChange = (e)=>{


        setData({...data, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
      if(isSignUp){
        data.Password === data.repwd ? dispatch(signUp(data)):setconfirmPassword(false)
            
        }else{
            dispatch(logIn(data))
      }
    }

    const resetForm = ()=>{
        setconfirmPassword(true)
        setData({
            FirstName:'',
            LastName:'',
            Username:'',
            Password:'',
            repwd:''
        })
    }

    return (
        <div className='Auth'>
            {/* Left Side */}
            <div className="a-left">
                <img src={Logo} alt='cool' />
                <div className="webName">
                    <h1>Vnx Media</h1>
                    <h6>Explore A New World, Meet with New Friends, Chat wiyh Families Home and Abroad</h6>
                </div>
            </div>

            {/* Right Side */}
            <div className="a-right">
                <form className='infoForm AuthForm' onSubmit={handleSubmit} action="">
                    <h3>{isSignUp ? 'Sign Up' : 'Log In'}</h3>
                    {isSignUp && <div>

                        <input type="text" value={data.FirstName}  className='infoInput'onChange={handleChange}  name='FirstName' placeholder='First Name' />
                        <input type="text" value={data.LastName}  className='infoInput'onChange={handleChange}  name='LastName' placeholder='Last Name' />
                    </div>
                    }
                    <div>

                        <input type="text" className='infoInput'onChange={handleChange} value={data.Username}  name='Username' id="" placeholder='UserName' />
                    </div>

                    <div>
                        <input type="password" value={data.Password}  className='infoInput' onChange={handleChange} name='Password' id="" placeholder='Password ' />
                        {isSignUp && <input type="password" value={data.repwd}  onChange={handleChange} className='infoInput' name='repwd' id="" placeholder='Confirm Password ' />}
                        <span style={{display:confirmPassword ? "none" : "block", color:"red", fontSize:"12px", alignSelf:"end", marginRight:"5px" }}>
                            Password Mixmatched
                        </span>
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', cursor:'pointer' }} onClick={()=>{setIssignUp((prev)=>!prev), resetForm()}}>
                        {isSignUp ? 'Already hava an account? Login' : "If you Don't hava an account You can SignUp" }
                        </span>
                    </div>
                    <button className="button Info_Btn" type='submit' >{isSignUp ? "SignUp" : "Login"}</button>
                </form>
                    </div>
                    {/* <LogIn /> */}
        </div>
                )
            }
            
            
// function SignUp() {
                    //     return(
                    //         <div className="a-right">
                    //             <form className='infoForm AuthForm' action="">
                    //             <h3>Sign Up</h3>
                    //             <div>

                    //                 <input type="text" className='infoInput' name='firstname'  placeholder='First Name'/>
                    //                 <input type="text" className='infoInput' name='lastname'  placeholder=':Last Name'/>
                    //             </div>
                    //             <div>

                    //                 <input type="text" className='infoInput' name='Username' id="" placeholder=':UserName' />
                    //             </div>

                    //             <div>
                    //             <input type="password"  className='infoInput' name='pwd' id="" placeholder='Password '/>
                    //             <input type="password"  className='infoInput' name='cpwd' id="" placeholder='Confirm Password '/>
                    //             </div>
                    //             <div>
                    //                 <span style={{ fontSize:'12px' }}>Already havae an account? Login</span>
                    //             </div>
                    //             <button className="button Info_Btn" type='submit'>Signup</button>
                    //             </form>
                    //         </div>
                    //     )
                    // }



                    function LogIn() {
                        return (
                            <div className="a-right">
                                <form className='infoForm AuthForm' action="">
                                    <h3>LogIn</h3>

                                    <div>

                                        <input type="text" className='infoInput' name='Username' id="" placeholder=':UserName' />
                                    </div>

                                    <div>
                                        <input type="password" className='infoInput' name='pwd' id="" placeholder=' Password ' />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '12px' }}>Don't havae an account? Sign Up</span>
                                    </div>
                                    <button className="button Info_Btn" type='submit'>Login</button>
                                </form>
                            </div>
                        )
                    }

export default Auth
