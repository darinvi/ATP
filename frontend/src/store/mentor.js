import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'mentor',
    initialState: {
    },
    reducers:{
        
    }
});

const {
} = slice.actions;
export default slice.reducer;


export const createQuestion = () => (dispatch) => {
    dispatch(apiCallBegan({
        url:'',
        method: 'POST',
    }))
}