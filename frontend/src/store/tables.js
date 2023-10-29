import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'tables',
    initialState: {
        prefs: null,
        cefs: null
    },
    reducers: {
        populatePrefsData: (tables, action) => {
            tables.prefs = action.payload
        },
        clearTablesData: (tables) => {
            tables.prefs = null;
            tables.cefs = null;
        }
    }
});

const {
    populatePrefsData,
} = slice.actions;
export default slice.reducer;

export const {
    clearTablesData
} = slice.actions

export const getPrefsData = () => (dispatch) => {
    dispatch(apiCallBegan({
        url: 'load-table-data',
        method: 'GET',
        data: {},
        headers: {},
        onSuccess: populatePrefsData.type
    }))
}

