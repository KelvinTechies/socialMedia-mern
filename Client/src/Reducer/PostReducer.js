const PostReducer=(
    state= {posts:[], loading:false, error:false, uploading:false}, action)=>{
        switch (action.type) {
            case "UPLOAD_START":
                return {...state, uploading:true, error:false}
                // break;
            case "UPLOAD_SUCCESSFUL":
                return {...state, posts:[action.data, ...state.posts], uploading:false, error:false}
                // break;
            case "UPLOAD_FAILED":
                return {...state, uploading:false, error:true}
                // break;
        
            default:
                return state;
        }
    }


export default PostReducer