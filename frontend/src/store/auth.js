import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem("token"),
        authenticated: null,
        loading: false,
        user:null,
        mentor: null,
        trainees: [],
    },
    reducers:{
        userLoading: (auth, action) => {
            auth.loading = true;
        },
        userLoaded: (auth, action) => {
            auth.authenticated = true;
            auth.loading = false;
            auth.user = action.payload;
        },
        authError: (auth, action) => {
            localStorage.removeItem("token");
            auth.token = null;
            auth.user = null;
            auth.authenticated = false;
            auth.loading = false;
        },
        loginSuccess: (auth, action) => {
            localStorage.setItem('token', action.payload.token);
            auth.token = action.payload.token;
            auth.authenticated = true;
            auth.loading = false;
            // auth.user = action.payload;
        },
        loginFail: (auth, action) => {
            localStorage.removeItem("token");
            auth.token = null;
            auth.user = null;
            auth.authenticated = false;
            auth.loading = false;
        },
        userLoggedOut: (auth, action) => {
            localStorage.removeItem("token");
            auth.token = null;
            auth.user = null;
            auth.authenticated = false;
            auth.loading = false;
            auth.mentor = null;
            auth.trainees = [];
        },
        setMentorStatus: (auth, action) => {
            auth.mentor = action.payload.mentor;
            auth.trainees = action.payload.trainees;
        }

    }
});

const {
    userLoading, 
    userLoaded,
    authError,
    loginSuccess,
    loginFail,
    userLoggedOut,
    setMentorStatus
} = slice.actions;

export default slice.reducer;

export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch(userLoading());
    
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type':'application/json',
        }
    }
    // if token add to config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    axios.get('http://localhost:8000/api/auth/user', config)
        .then(res => {
            dispatch({
                type: userLoaded.type,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(authError())
        })
}

export const login = (username, password) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type':'application/json',
        }
    }

    // Request body
    const body = JSON.stringify({ username, password });
    
    axios.post('http://localhost:8000/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: loginSuccess.type,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch(loginFail())
        })
}

export const logout = () => (dispatch, getState) => {
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type':'application/json',
        }
    }
    // if token add to config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    axios.get('http://localhost:8000/api/auth/user', config)
        .then(res => {
            dispatch({
                type: userLoggedOut.type,
                payload: res.data
            })
        })
}

export const loadMentorStatus = () => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: 'get-mentor-status',
        method: 'GET',
        data: {},
        headers: {},
        onSuccess: setMentorStatus.type
    }))
}