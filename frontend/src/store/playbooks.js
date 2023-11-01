import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'playbooks',
    initialState: {
        selectedFeatures: [],
        selectedTags: [],
    },
    reducers: {
        selectFeature: (playbooks, action) => {
            playbooks.selectedFeatures.push(action.payload);
        },
        removeFeature: (playbooks, action) => {
            playbooks.selectedFeatures = playbooks.selectedFeatures.filter( feature => feature !== action.payload);
        },
        selectTag: (playbooks, action) => {
            playbooks.selectedTags.push(action.payload);
        },
        removeTag: (playbooks, action) => {
            playbooks.selectedTags = playbooks.selectedTags.filter( tag => tag !== action.payload);
        },
    }
});

export const {
    selectFeature,
    removeFeature,
    selectTag,
    removeTag
} = slice.actions;
export default slice.reducer;

// export const  = () => (dispatch) => {
//     dispatch(apiCallBegan({
//         url: 'ask-mentor/',
//         method: 'POST',
//         data: {},
//         headers: {},
//     }))
// }
