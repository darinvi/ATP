import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'posts',
    initialState: {
        tradeIdeas: {
            counter: 0,
            variables: {},
            cancelActive: [],
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
        },
        activateCancel: (posts, action) => {
            posts.tradeIdeas.cancelActive.push(action.payload);
        },
        deactivateCancel: (posts, action) => {
            posts.tradeIdeas.cancelActive = posts.tradeIdeas.cancelActive.filter(e => e !== action.payload);
        },
        clearTradeIdeasState: (posts) => {
            posts.tradeIdeas.counter = 0;
            posts.tradeIdeas.variables = {};
            posts.tradeIdeas.cancelActive = [];
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
    activateCancel,
    deactivateCancel,
    clearTradeIdeasState
} = slice.actions;

export default slice.reducer;
