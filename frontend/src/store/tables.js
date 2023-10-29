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
            tables.prefs = action.payload.data
        },
        clearTablesData: (tables) => {
            tables.prefs = null;
            tables.cefs = null;
        },
        sortByAvgVolume: (table, action) => {
            if (action.payload === true) {
                table.prefs = table.prefs.sort((a, b) => a.avg_volume - b.avg_volume);
            } else {
                table.prefs = table.prefs.sort((a, b) => b.avg_volume - a.avg_volume);
            }
        },
        sortByDivAmount: (table, action) => {
            if (action.payload === true) {
                table.prefs = table.prefs.sort((a, b) => a.amount - b.amount);
            } else {
                table.prefs = table.prefs.sort((a, b) => b.amount - a.amount);
            }
        },
        sortByDate: (table, action) => {
            if (action.payload === true) {
                table.prefs = table.prefs.sort((a, b) => {
                    return new Date(a.max_ex_date) - new Date(b.max_ex_date);
                });
            } else {
                table.prefs = table.prefs.sort((a, b) => {
                    return new Date(b.max_ex_date) - new Date(a.max_ex_date);
                });
            }
        },
        sortByATR: (table, action) => {
            if (action.payload === true) {
                table.prefs = table.prefs.sort((a, b) => a.atr - b.atr);
            } else {
                table.prefs = table.prefs.sort((a, b) => b.atr - a.atr);
            }
        },
        sortByTicker: (table, action) => {
            if (action.payload === true) {
                table.prefs = table.prefs.sort((a, b) => a.ticker.localeCompare(b.ticker));
            } else {
                const sorted = table.prefs.sort((a, b) => a.ticker.localeCompare(b.ticker));
                table.prefs = sorted.reverse();
            }
        },
        sortByIndustry: (table, action) => {
            if (action.payload === true) {
                table.prefs = table.prefs.sort((a, b) => a.industry.localeCompare(b.industry));
            } else {
                const sorted = table.prefs.sort((a, b) => a.industry.localeCompare(b.industry));
                table.prefs = sorted.reverse();
            }
        }
    }
});

const {
    populatePrefsData,
} = slice.actions;
export default slice.reducer;

export const {
    clearTablesData,
    sortByAvgVolume,
    sortByDivAmount,
    sortByDate,
    sortByTicker,
    sortByIndustry,
    sortByATR,
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

