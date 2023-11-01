import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'playbooks',
    initialState: {
        selectedFeatures: [],
    },
    reducers: {
        selectFeature: (playbooks, action) => {
            playbooks.selectedFeatures.push(action.payload);
        },
        removeFeature: (playbooks, action) => {
            playbooks.selectedFeatures = playbooks.selectedFeatures.filter( feature => feature !== action.payload);
        }
    }
});

export const {
    selectFeature,
} = slice.actions;
export default slice.reducer;

// export const askQuestion = () => (dispatch) => {
//     dispatch(apiCallBegan({
//         url: 'ask-mentor/',
//         method: 'POST',
//         data: {},
//         headers: {},
//     }))
// }
