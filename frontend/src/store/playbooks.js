import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'playbooks',
    initialState: {
        selectedFeatures: [],
        selectedTags: {},
        // comments: {},
        playbook: {},
        ticker: null,
        playbookList: null,
    },
    reducers: {
        selectFeature: (playbooks, action) => {
            playbooks.selectedFeatures.push(action.payload);
        },
        removeFeature: (playbooks, action) => {
            playbooks.selectedFeatures = playbooks.selectedFeatures.filter( feature => feature !== action.payload);
        },
        selectTag: (playbooks, action) => {
            playbooks.selectedTags[action.payload.id] = action.payload.name;
            playbooks.playbook['tags'] = Object.keys(playbooks.selectedTags);
        },
        removeTag: (playbooks, action) => {
            delete playbooks.selectedTags[action.payload];
            playbooks.playbook['tags'] = Object.keys(playbooks.selectedTags);
        },
        addFeatureText: (playbook, action) => {
            const [key, value] = action.payload;
            playbook.playbook[key] = value;
        },
        removeFeatureText: (playbook, action) => {
            delete playbook.playbook[action.payload];
        },
        inputTicker: (playbook, action) => {
            playbook.ticker = action.payload;
        },
        setPlaybookList: (playbook, action) => {
            playbook.playbookList = action.payload
        }
    }
});
 
export const {
    selectFeature,
    removeFeature,
    selectTag,
    removeTag,
    addFeatureText,
    removeFeatureText,
    inputTicker,
    setPlaybookList
} = slice.actions;
export default slice.reducer;

export const createPlaybook = (ticker, play, isPublic) => (dispatch, getState) => {
    const playbook = getState().entities.playbooks.playbook;
    dispatch(apiCallBegan({
        url: 'playbooks/',
        method: 'POST',
        data: {...playbook, ticker, play, public: isPublic},
        headers: {},
    }))
}

export const loadPublicPlaybooks = () => (dispatch) => {
    dispatch(apiCallBegan({
        url: 'playbooks-all',
        method: "GET",
        data:{},
        headers: {},
        onSuccess: setPlaybookList.type
    }))
}

export const managePlaybookSeen = (id, action) => (dispatch) => {
    dispatch(apiCallBegan({
        url: 'playbooks-manage-seen',
        method: "POST",
        data:{
            id,
            action
        },
        headers: {},
        onSuccess: setPlaybookList.type
    }))
}