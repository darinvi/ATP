import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'posts',
    initialState: {
        tradeIdeas: {
            counter: 0,
            variables: {},
        }
    },
    reducers: {
        addVariable: (posts) => {
            posts.tradeIdeas.variables[posts.tradeIdeas.counter++] = {
                'name': '',
                'description':'',
            };
        },
        modifyName: (posts, action) => {
            const [counter, data] = action.payload;
            posts.tradeIdeas.variables[counter].name = data ;
        },
        modifyDescription: (posts, action) => {
            const [counter, data] = action.payload;
            posts.tradeIdeas.variables[counter].description = data ;
        },
        removeVariable: (posts, action) => {
            delete posts.tradeIdeas.variables[action.payload];
        }
    }
});

const {

} = slice.actions;

export const {
    addVariable,
    modifyName,
    modifyDescription,
    removeVariable,
} = slice.actions;

export default slice.reducer;
