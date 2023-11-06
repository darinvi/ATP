import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'home',
    initialState: {
        allPosts : [],
        filteredPosts : [],
    },
    reducers: {
        addPosts: (home, action) => {
            home.allPosts = [...home.allPosts, ...action.payload];
        },
        filterPostType: (home, action) => {
            home.filteredPosts.push(action.payload)
        },
        removeFiltered: (home, action) => { 
            home.filteredPosts = home.filteredPosts.filter( type => type != action.payload)
        },
    }
});

const {
    addPosts,
} = slice.actions;

export const {
    filterPostType,
    removeFiltered
} = slice.actions;

export default slice.reducer;

export const loadAllPosts = (data) => (dispatch) => {
    for (let endpoint of ['/playbooks-all']) {
        console.log(endpoint, 'endpooint')
        dispatch(apiCallBegan({
            url: endpoint,
            method: "GET",
            data:{},
            headers: {},
            onSuccess: addPosts.type
        }))
    }
}
