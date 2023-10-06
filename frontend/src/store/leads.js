import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'leads',
    initialState: {
        list: [],
        loading: false
    },
    reducers:{
        leadsRequested: (leads, action) => {
            leads.loading = true;
        },
        leadsReceived: (leads, action) => {
            leads.list = action.payload;
            leads.loading = false;
        },
        leadsRequestFailed: (leads, action) => {
            leads.loading = false;
        }
    }
});

const {
    leadsRequested,
    leadsReceived,
    leadsRequestFailed,
} = slice.actions;
export default slice.reducer;

const leadsURL = 'leads/'

export const loadLeads = token => apiCallBegan({
    url: leadsURL,
    method: 'get',
    data: {},
    headers: {'Authorization': `Token ${token}`},
    onStart: leadsRequested.type,
    onSuccess: leadsReceived.type,
    onError: leadsRequestFailed.type 
})