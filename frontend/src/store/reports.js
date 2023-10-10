import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";


const errorMessages = [
    'Invalid token'
]

const slice = createSlice({
    name: 'reports',
    initialState: {
        reportToken: localStorage.getItem('reportToken'),
        currentData: [],
        filters: [],
        lastLogin: null, // Log out token after 2hours and request new Or try to dispatch a log out on a specific error from server
        accounts: null,
        reportRange: []
    },
    reducers:{
        populateData: (reports, action) => {
            reports.currentData = action.payload.reports
        },  
        setTokenSuccess: (reports, action) => {
            localStorage.setItem('reportToken', action.payload.response);
            reports.reportToken = action.payload.response;
            reports.lastLogin = Date.now();
        },
        setTokenFailed: (reports, action) => {
            localStorage.removeItem('reportToken')
            reports.currentData = [];
        },
        clearState: (reports, action) => {
            localStorage.removeItem('reportToken');
            reports.reportToken = null;
            reports.currentData = [];
            reports.accounts = [];
        },
        clearData: (reports, action) => {
            reports.currentData = [];
        },
        removeReportToken: (reports, action) => {
            
        },
        setAccounts: (reports, action) => {
            reports.accounts = action.payload.response
        },
        genericError: (reports, action) => {
            if (action.payload.message === "Invalid or expired token.") {
                localStorage.removeItem('reportToken');
                reports.reportToken = null;
                reports.currentData = [];
            } 
        }
    }
});

const {
    populateData,
    setTokenSuccess,
    setTokenFailed,
    clearState,
    clearData,
    setAccounts,
    genericError
} = slice.actions;

export default slice.reducer;

const URL = 'call-propreports'

export const getReportToken = (username, password) => (dispatch) => {
    dispatch(apiCallBegan({
        url: URL,
        method: 'POST',
        data: {
            'action': 'login',
            'user': username,
            'password': password
        },
        headers: {},
        onSuccess: setTokenSuccess.type,
        onError: setTokenFailed.type
    }))
}

// fix it so it uses getState 
export const loadAccounts = (token) => (dispatch) => {
    dispatch(apiCallBegan({
        method: 'POST',
        headers: {},
        url: URL,
        data: {
            'action': 'accounts',
            'page': 1,
            'groupId': -4,
            'token': token
        },
        onSuccess: setAccounts.type,
        onError: genericError.type
    }))
}

export const loadData = (token) => (dispatch, getState) => {
    // CHECK WHETHER 1.5/2 HOURS HAVE PASSED HERE
}

export const clearReportState = clearState;
export const clearReportData = clearData;