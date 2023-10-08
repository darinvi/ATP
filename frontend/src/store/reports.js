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
        lastTokenTime: null, // Log out token agter 2hours and request new Or try to dispatch a log out on a specific error from server
        accounts: null,
        reportRange: []
    },
    reducers:{
        populateData: (reports, action) => {
            reports.currentData = action.payload.reports
        },  
        setTokenSuccess: (reports, action) => {
            localStorage.setItem('reportToken', action.payload.response);
            reports.reportToken = action.payload.response
        },
        // status code 500: 
        // ["Invalid or expired token.", Incorrect password or User Id / E-mail., ]
        setTokenFailed: (reports, action) => {
            localStorage.removeItem('reportToken')
            reports.currentData = [];
        },
        clearToken: (reports, action) => {
            localStorage.removeItem('reportToken');
            reports.reportToken = null;
            reports.currentData = [];
            reports.accounts = [];
        },
        resetReports: (reports, action) => {
            reports.currentData = [];
        },
        removeReportToken: (reports, action) => {

        },
        setAccounts: (reports, action) => {
            reports.accounts = action.payload.response
        }
    }
});

const {
    populateData,
    setTokenSuccess,
    setTokenFailed,
    clearToken,
    resetReports,
    setAccounts
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
        // onError: 
    }))
}

export const loadData = (token) => (dispatch, getState) => {
    // CHECK WHETHER 1.5/2 HOURS HAVE PASSED HERE
}

export const clearReportData = resetReports;
export const tokenUndefined = clearToken;