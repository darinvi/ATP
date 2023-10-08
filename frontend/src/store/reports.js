import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'reports',
    initialState: {
        reportToken: localStorage.getItem('reportToken'),
        currentData: [],
        filters: [],
        // Log out token agter 2hours and request new
        lastTokenTime: null,
        accounts: null,
    },
    reducers:{
        populateData: (reports, action) => {
            reports.currentData = action.payload.reports
        },  
        setTokenSuccess: (reports, action) => {
            localStorage.setItem('reportToken', action.payload.token);
            reports.reportToken = action.payload.response
        },
        // status code 500: 
        // ["Invalid or expired token.", Incorrect password or User Id / E-mail., ]
        setTokenFailed: (reports, action) => {
            localStorage.removeItem('reportToken')
            reports.currentData = [];
        },
        resetReports: (reports, action) => {
            reports.currentData = [];
        },
        removeReportToken: (reports, action) => {

        },
        setAccounts: (reports, action) => {
            reports.accounts = action.payload.accounts
        }

    }
});

const {
    populateData,
    setTokenSuccess,
    setTokenFailed,
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

// export const getReportData = (username, password) => (dispatch) => {
//     dispatch(apiCallBegan({
//         url: URL,
//         method: 'POST',
//         data: {
//             'action': 'login',
//             'user': username,
//             'password': password
//         },
//         headers: {},
//         onSuccess: setTokenSuccess.type,
//         onError: setTokenFailed.type
//     }))
// }

// fix it so it uses getState 
export const loadAccounts = (token) => (dispatch) => {
    dispatch(apiCallBegan({
        method: 'POST',
        headers: {},
        url: URL,
        data: {
            'action': 'accounts',
            'token': token
        }
    }))
}

export const clearReportData = resetReports;
