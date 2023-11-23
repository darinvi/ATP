import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'home',
    initialState: {
        allPosts : [],
        filteredPosts : [],
        maximized: false,
        maximizedData: null, // the post type will be added to the posts so I will get the type from here
        maximizedTable: null,
        tableLoading: false
    },
    reducers: {
        addPosts: (home, action) => {
            home.allPosts = [...home.allPosts, ...action.payload];
        },
        filterPostType: (home, action) => {
            home.filteredPosts.push(action.payload)
            localStorage.getItem('feedFilters', home.filteredPosts)
        },
        removeFiltered: (home, action) => { 
            home.filteredPosts = home.filteredPosts.filter( type => type != action.payload)
            localStorage.setItem('feedFilters', home.filteredPosts)
        },
        resetPosts: (home) => {
            home.allPosts = [];
        },
        // next, modify this to be a onSuccess function when minimized pressed after a fetch of the comments of a given playbook.
        setMaximized: (home, action) => { 
            home.maximized = !home.maximized; 
            home.maximizedData = action.payload;
        },
        setTableData: (home, action, bool) => {
            home.maximizedTable = action.payload;
            home.tableLoading = false;
        },
        clearTableData: (home) => {
            home.maximizedTable = null;
            home.tableLoading = false;
        },
        setTableLoading: (home) => {
            home.tableLoading = true;
        }
    }
});

const {
    addPosts,
    setTableData,
    setTableLoading
} = slice.actions;

export const {
    filterPostType,
    removeFiltered,
    resetPosts,
    setMaximized,
    clearTableData
} = slice.actions;

export default slice.reducer;

export const loadAllPosts = () => (dispatch) => {
    for (let endpoint of ['/playbooks-unseen']) {
        dispatch(apiCallBegan({
            url: endpoint,
            method: "GET",
            data:{},
            headers: {},
            onSuccess: addPosts.type
        }))
    }
}

export const getStockMetrics = (ticker, date) => (dispatch) => {
    dispatch(setTableLoading())
    dispatch(apiCallBegan({
        url: 'get_stock_metrics',
        method: "post",
        data:{ticker, date},
        headers: {},
        onSuccess: setTableData.type,
        onError: clearTableData.type
    }))
}