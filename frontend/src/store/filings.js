import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

// Will hold the endpoints (concat with the prefix)
// ListFilings will list based on this state-  filings: {endpoint, date, type}
// On new filing filed (from the api), there will be a dispatch of fetch filings from a in memory database (all users will fetch the same)
//

const slice = createSlice({
    name: 'filings',
    initialState: {
        // prefix: 'https://www.sec.gov/Archives/edgar/data/',
        filings: [],
        currentHTML: "",
        filters: [],
        showTime: false,
        lastPage: "",
        loading: false,
    },
    reducers:{
        populateFilings: (filings, action) => {
            filings.filings = action.payload.filings
        },  
        setCurrentHTML: (filings, action) => {
            filings.loading = false;
            filings.currentHTML = action.payload.text
        },
        resetFilings: (filings, action) => {
            filings.filings = [];
            if (filings.lastPage !== "home") {
                filings.currentHTML = "";
            }
        },
        showTime: (filings) => {
            filings.showTime = true;
        },
        hideTime: (filings) => {
            filings.showTime = false;
        },
        setLastPage: (filings, action) => {
            filings.lastPage = action.payload;
        },
        setLoading: (filings) => {
            filings.loading = true;
        },
    }
});

const {
    populateFilings,
    setCurrentHTML,
    resetFilings,
    setLoading
} = slice.actions;
export const {
    showTime,
    hideTime,
    setLastPage  
} = slice.actions;

export default slice.reducer;

export const loadFilings  = () => (dispatch, getState) => {
    dispatch(apiCallBegan({
        url: 'get-filings',
        method: 'POST',
        data: {
            // 'filters': getState().filings.filters
        },
        headers: {},
        onSuccess: populateFilings.type,
    }))
}

export const getFiling = (url) => (dispatch) => {
    dispatch(setLoading());
    dispatch(apiCallBegan({
        url: 'filings',
        method: 'POST',
        data: {
            url
        },
        headers: {},
        onSuccess: setCurrentHTML.type,
    }))
}

export const cleanFilings = resetFilings;
