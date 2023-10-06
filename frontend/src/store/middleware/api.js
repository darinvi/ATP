import axios from "axios";
import * as actions from '../api.js'

const api = ({dispatch}) => next => async action => {
    if (action.type !== actions.apiCallBegan.type ) return next(action);

    
    const {url, method, data, headers, onStart, onSuccess, onError} = action.payload
    
    if (onStart) dispatch({type: onStart});
    
    next(action);

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
        
        // specific
        if (onError) dispatch({
            type: onError,
            payload: err.message
        })
    }
    

}

export default api;