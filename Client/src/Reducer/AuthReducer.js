const AuthReducer = (state = { authData: null, loading: false, error: false }, action) => {
    switch (action.type) {
        case "Auth_START":
            return { ...state, loading: true, error: false }
        // break;
        case "Auth_SUCCESS":
            localStorage.setItem("Profile", JSON.stringify({ ...action ?.data}))
            return { ...state, authData: action.data, loading: false, error: false }
        case "Auth_FAIL":
            return { ...state, loading: false, error: true }


        case "UPDATING_START":
            return { ...state, uploading: true, error: false }

        case "UPDATING_SUCCESS":
            localStorage.setItem("Profile", JSON.stringify({ ...action ?.data}))
            return { ...state, uploading: false, error: true }

        case "UPDATING_FAIL":
            return { ...state,  uploading: false, error: true }

        case "FOLLOW_USER":
            return { ...state,  authData: {...state.authData, user:{...state.authData.user, following:[...state.authData.user.following, action.data]}}}

        case "UN_FOLLOW_USER":
            return { ...state,  authData: {...state.authData, user:{...state.authData.user, following:[...state.authData.user.following.filter(personId!== action.data)]}}}

        
        case "LOG_OUT":
            localStorage.clear()
            return { ...state, authData: null, loading: false, error: false }
        default:
            return state;
    }
}

export default AuthReducer