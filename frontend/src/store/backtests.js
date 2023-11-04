import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'backtests',
    initialState: {
        dividends: null,
        closeDiffs: null,
    },
    reducers: {
        populateDividendStats: (backtests, action) => {
            backtests.dividends = action.payload
        },
        populateCloseDiffs: (backtests, action) => {
            backtests.closeDiffs = action.payload.diffs
        },
    }
});

const {
    populateDividendStats,
    populateCloseDiffs
} = slice.actions;
export default slice.reducer;

export const getDividendStats = (ticker) => (dispatch) => {
    dispatch(apiCallBegan({
        url: `get-dividend-stats/${ticker}`,
        method: 'GET',
        data: {},
        headers: {},
        onSuccess: populateDividendStats.type
    }))
}

// Have to add symbol types
export const loadCloseDiffs = () => (dispatch) => {
    dispatch(apiCallBegan({
        url: `get-close-diffs`,
        method: 'GET',
        data: {},
        headers: {},
        onSuccess: populateCloseDiffs.type
    }))
}
