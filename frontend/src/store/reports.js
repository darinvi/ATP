import { createSlice, findNonSerializableValue } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

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
        tradeFilters: [],
        checkedTrades: [],
        tradeTags: [],
        activeSelect: "",
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
            reports.currentData.map(e => {
                return { ...e, filtered: true }
            })
        },
        handleCheckedTrades: (reports, action) => {
            const [hash, checked] = action.payload;
            if (checked && !reports.checkedTrades.includes(hash)) {
                reports.checkedTrades.push(hash);
            } else {
                reports.checkedTrades = reports.checkedTrades.filter(e => e !== hash);
            }
        },
        addTradeTag: (reports, action) => {
            if (!reports.tradeTags.includes(action.payload)) reports.tradeTags.push(action.payload);
        },
        setTradeTags: (reports, action) => {
            reports.tradeTags = action.payload;
        },
        setActiveSelect: (reports, action) => {
            reports.activeSelect = action.payload;
        }
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
    addTradeTag,
    setTradeTags
} = slice.actions;

export const {
    setFiltered,
    clearFiltered,
    handleCheckedTrades,
    setActiveSelect
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
export const createTradeTag = (body) => (dispatch) => {
    console.log(body)
    dispatch(apiCallBegan({
        method: 'POST',
        headers: {},
        url: 'reports/create-trade-tag',
        data: body,
        onSuccess: addTradeTag.type,
        // onError: genericError.type
    }))
}

export const getTradeTags = () => (dispatch) => {
    dispatch(apiCallBegan({
        method: 'GET',
        headers: {},
        url: 'reports/get-trade-tags',
        data: {},
        onSuccess: setTradeTags.type,
        // onError: genericError.type
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

// SELECTORS

export const selectCheckedTrades = (state) => state.entities.reports.checkedTrades;
export const tradeTags = (state) => state.entities.reports.tradeTags;
export const getActiveSelect = (state) => state.entities.reports.activeSelect;

export const clearReportState = clearState; 
export const clearReportData = clearData;
export const setCalledType = setCurrentType;

function applyFilters(data, filterVariable, comparisonType, filterValueOriginal) {
    const filterValue = parseFloat(filterValueOriginal)
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
                    isHigher = Math.abs(trade.gross) > filterValue
                    trade['filtered'] = comparisonType === 'Greater' ? (isHigher ? true : false) : (isHigher ? false : true)
                    return trade
            case 'time opened':// Make sure to have a vlaidator in the front end, always send hh:mm:ss even if only hh:mm provided.
                const [h, m, s] = trade.time_open.split(":").map(e => parseFloat(e)) // hour, minute, seconds
                const [fvh, fvm, fvs] = filterValueOriginal.split(":").map(e => parseFloat(e)) // filter value h, m, s
                isHigher = h > fvh ||
                (h === fvh && m > fvm) ||
                (h === fvh && m === fvm && s > fvs)
                trade['filtered'] = comparisonType === 'Greater' ? (isHigher ? true : false) : (isHigher ? false : true)
                return trade
            case 'time closed':
                const [hc, mc, sc] = trade.time_closed.split(":").map(e => parseFloat(e)) // hour, minute, seconds
                const [fvhc, fvmc, fvsc] = filterValueOriginal.split(":").map(e => parseFloat(e)) // filter value h, m, s
                isHigher = hc > fvhc ||
                (hc === fvhc && mc > fvmc) ||
                (hc === fvhc && mc === fvmc && sc > fvsc)
                trade['filtered'] = comparisonType === 'Greater' ? (isHigher ? true : false) : (isHigher ? false : true)
                return trade
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

function resetFiltered(data) {
    for (let d of data) {
        d['filtered'] = true;
    }
    return data
}



function applyFiltersTotals() {
    return
}