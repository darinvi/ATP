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
        filters: []
    },
    reducers:{
        populateFilings: (filings, action) => {
            filings.filings = action.payload.filings
        },  
        setCurrentHTML: (filings, action) => {
            filings.currentHTML = action.payload.text
        },
        resetFilings: (filings, action) => {
            filings.filings = [];
            filings.currentHTML = "";
        }
    }
});

const {
    populateFilings,
    setCurrentHTML,
    resetFilings,
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

export const setHTML = setCurrentHTML;

export const cleanFilings = resetFilings;
