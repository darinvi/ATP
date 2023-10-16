import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";


const errorMessages = [
    'Invalid token'
]

const slice = createSlice({
    name: 'reports',
    initialState: {
        reportToken: localStorage.getItem('reportToken'),
        currentData: null,
        filters: [],
        lastLogin: 0, // Log out token after 2hours and request new Or try to dispatch a log out on a specific error from server
        accounts: null,
        reportRange: [],
        type: null,
        loading: false,
        tradeFilters: []
    },
    reducers:{
        setTokenSuccess: (reports, action) => {
            localStorage.setItem('reportToken', action.payload.response);
            reports.reportToken = action.payload.response;
            reports.lastLogin = Date.now();
        },
        setTokenFailed: (reports, action) => {
            localStorage.removeItem('reportToken')
            reports.currentData = null;
        },
        clearState: (reports, action) => {
            // localStorage.removeItem('reportToken');
            reports.reportToken = null;
            reports.currentData = null;
            reports.accounts = null;
            reports.loading = false;
        },
        clearData: (reports, action) => {
            reports.currentData = null;
            reports.loading = false;
        },
        removeReportToken: (reports, action) => {
            
        },
        setAccounts: (reports, action) => {
            reports.accounts = action.payload.response
        },
        genericError: (reports, action) => {
            if (action.payload.err === "Invalid or expired token.") {
                localStorage.removeItem('reportToken');
                reports.reportToken = null;
                reports.currentData = null;
            } 
            reports.loading = false;
        },
        setCurrentData: (reports, action) => {
            reports.currentData = action.payload.response;
            reports.loading = false;
        },
        setCurrentType: (reports, action) => {
            reports.type = action.payload
        },
        setLoading:(reports, action) => {
            reports.loading = true;
        },
    }
});

const {
    setTokenSuccess,
    setTokenFailed,
    clearState,
    clearData,
    setAccounts,
    genericError,
    setCurrentData,
    setCurrentType,
    setLoading,
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

export const loadPositions = (token, start, end, id) => (dispatch) => {
    dispatch(setLoading());
    dispatch(apiCallBegan({
        method: 'POST',
        headers: {},
        url: URL,
        data: {
            "action":"positions",
            "startDate": start,
            "endDate": end,
            "type": "all",
            "page":1,
            "accountId": id,
            "token": token
        },
        onSuccess: setCurrentData.type
    }))
}

export const loadTrades = (token, start, end, id) => (dispatch) => {
    dispatch(setLoading());
    dispatch(apiCallBegan({
        method: 'POST',
        headers: {},
        url: URL,
        data: {
            "action":"report",
            "startDate": start,
            "endDate": end,
            "type": "trades",
            "accountId": id,
            "baseCurrency": "USD",
            "token": token
        }, 
        onSuccess: setCurrentData.type
    }))
}


export const clearReportState = clearState;
export const clearReportData = clearData;
export const setCalledType = setCurrentType;