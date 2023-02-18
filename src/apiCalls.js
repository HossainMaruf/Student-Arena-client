import axios from 'axios';
export const loginCall = async (userCredentials, dispatch) => {
    dispatch({type: 'LOGIN_START'});
    try {
        const res = await axios.post("auth/login", userCredentials);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        // console.log(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
    } catch(error) {
        dispatch({type: "LOGIN_FAILURE", payload: error});       
    }
}

export const updateCall = async(userCredentials, dispatch) => {
    try {
         const res = await axios.put("/users/"+userCredentials.userID, userCredentials);
         dispatch({type:'UPDATE_SUCCESS', payload: res.data});
        localStorage.setItem('user', JSON.stringify(res.data));

    } catch(error) {
        dispatch({type:'UPDATE_FAILURE', payload: error});
    }
}