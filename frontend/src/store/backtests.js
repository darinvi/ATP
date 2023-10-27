import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'backtests',
    initialState: {
        dividends: null,
    },
    reducers: {
        populateDividendStats: (backtests, action) => {
            backtests.dividends = action.payload
        }
    }
});

const {
    populateDividendStats,
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
