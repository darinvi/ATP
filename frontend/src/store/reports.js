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
        filteredData: null,
        filters: [],
        lastLogin: 0, // Log out token after 2hours and request new Or try to dispatch a log out on a specific error from server
        accounts: null,
        reportRange: [],
        type: null,
        loading: false,
        tradeFilters: []
    },
    reducers: {
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
        setLoading: (reports, action) => {
            reports.loading = true;
        },
        setFiltered: (reports, action) => {
            reports.currentData = resetFiltered(reports.currentData);
            reports.currentData = applySelectedFilters(reports.currentData, action.payload);
        },
        clearFiltered: (reports) => {
            reports.currentData.map( e => {
                return {...e, filtered:true}
            })
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

export const {
    setFiltered,
    clearFiltered
} = slice.actions

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
            "action": "positions",
            "startDate": start,
            "endDate": end,
            "type": "all",
            "page": 1,
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
            "action": "report",
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

function applyFilters(data, filterVariable, comparisonType, filterValue) {
    filterValue = parseFloat(filterValue)
    return data.map(trade => {
        if (trade.filtered === false) return trade;
        let isHigher;
        switch (filterVariable) {
            case 'net':
                isHigher = trade.net > filterValue;
                trade['filtered'] = comparisonType === 'Greater' ? (isHigher ? true : false) : (isHigher ? false : true)
                return trade
            case 'net (absolute)':
                isHigher = Math.abs(trade.net) > filterValue
                trade['filtered'] = comparisonType === 'Greater' ? (isHigher ? true : false) : (isHigher ? false : true)
                return trade
            case 'gross':
                isHigher = trade.gross > filterValue
                trade['filtered'] = comparisonType === 'Greater' ? (isHigher ? true : false) : (isHigher ? false : true)
                return trade
            case 'gross (absolute)':
                isHigher = Math.abs(trade.gross > filterValue)
                trade['filtered'] = comparisonType === 'Greater' ? (isHigher ? true : false) : (isHigher ? false : true)
                return trade
                case 'time opened':
                    // Implement time comparison logic here
                break;
            case 'time closed':
                // Implement time comparison logic here
                break;
            case 'duration held':
                // Implement duration comparison logic here
                break;
            case 'entry price':
                isHigher = trade.entry_price > filterValue
                trade['filtered'] = comparisonType === 'Greater' ? (isHigher ? true : false) : (isHigher ? false : true)
                return trade
            case 'quantity':
                isHigher = trade.quantity > filterValue
                trade['filtered'] = comparisonType === 'Greater' ? (isHigher ? true : false) : (isHigher ? false : true)
                return trade
            default:
                return true; // No filter applied if the variable is not recognized
        }
    });
}


function applySelectedFilters(data, selectedFilters) {
    let filteredData = [...data];

    selectedFilters.forEach(filter => {
        const [filterVariable, comparisonType, filterValue] = filter;
        filteredData = applyFilters(filteredData, filterVariable, comparisonType, filterValue);
    });

    return filteredData;
}

function resetFiltered(data){
    for (let d of data) {
        d['filtered'] = true;
    }
    return data
}