import * as API from '../Api/request'

export const logIn = (formData)=>async(dispatch)=>{
    dispatch({type:"Auth_START"})
    try {
    const { data } = await API.logIn(formData)
    dispatch({type:"Auth_SUCCESS", data:data})
        
    } catch (error) {
        console.log(error);
    dispatch({type:"Auth_FAIL"})
        
    }
}

export const signUp = (formData)=>async(dispatch)=>{
    dispatch({type:"Auth_START"})
    try {
    const { data } = await API.signUp(formData)
    dispatch({type:"Auth_SUCCESS", data:data})
        
    } catch (error) {
        console.log(error);
    dispatch({type:"Auth_FAIL"})
        
    }
}

export const logOut = ()=>async(dispatch)=>{
    dispatch({type:"LOG_OUT"})
}