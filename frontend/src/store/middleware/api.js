import axios from "axios";
import * as actions from '../api.js'
import { loadUser, logout } from "../auth.js";

const api = ({dispatch}) => next => async action => {
    if (action.type !== actions.apiCallBegan.type ) return next(action);
    
    const {url, method, data, headers, onStart, onSuccess, onError} = action.payload
    
    if (onStart) dispatch({type: onStart});
    
    next(action);

    const token = localStorage.getItem('token')

    if (!token) {
        dispatch(logout())
    }
    
    // content type by default. Add the token
    if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json'
    } 
    headers['Authorization'] = `Token ${token}`
    
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:8000/api',
            url,
            method,
            data,
            headers
        });
        // general
        dispatch(actions.apiCallSuccess(response.data));
        
        // specific
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data})

    } catch(err) {
        // general

        dispatch(actions.apiCallFailed(err.message))

        if (err.request.status === 401) {
            dispatch(logout())
        }
        // specific

        
        let onErrorMessage;
        if (err.response.data.message) {
            onErrorMessage = err.response.data.message;
        } else {
            onErrorMessage = 'No specific message'
        }

        console.log(onErrorMessage)
        console.log(err)

        if (onError) dispatch({
            type: onError,
            payload: {
                'general':err.message, 
                'message': onErrorMessage
            }
        })
    }
    

}

export default api;