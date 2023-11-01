import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'playbooks',
    initialState: {
        selectedFeatures: [],
        selectedTags: [],
        playbook: {}
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
        addFeatureText: (playbook, action) => {
            const [key, value] = action.payload;
            playbook.playbook[key] = value;
        },
        removeFeatureText: (playbook, action) => {
            delete playbook.playbook[action.payload];
        }
    }
});

export const {
    selectFeature,
    removeFeature,
    selectTag,
    removeTag,
    addFeatureText,
    removeFeatureText
} = slice.actions;
export default slice.reducer;

export const createPlaybook = (data) => (dispatch, getState) => {
    const playbook = getState().entities.playbooks.playbook;
    console.log(playbook)
    // dispatch(apiCallBegan({
    //     url: 'playbooks/',
    //     method: 'POST',
    //     data: data,
    //     headers: {},
    // }))
}
