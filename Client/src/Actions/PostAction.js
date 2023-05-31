import * as PostApi from '../Api/PostRequest'


export const getTimeLinePosts = (user_id) => async (dispatch) => {
    dispatch({ type: "RETRIEVING_START" })

    try {
        const { data } = await PostApi.getTimeLinePosts(user_id)
        dispatch({ type: "RETRIEVING_SUCCESSFULL", data: data })

    } catch (error) {
        dispatch({type: "RETRIEVING_FAIL"})
        
        console.log(error);

        }
}

//  getTimeLinePosts