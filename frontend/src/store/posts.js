import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'posts',
    initialState: {
        tradeIdeas: {
            counter: 0,
            variables: {},
            name: "",
            ticker: "",
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
            posts.tradeIdeas.name = "";
            posts.tradeIdeas.ticker = "";
        },
        setMetaData: (posts, action) => {
            const [k ,v] = Object.entries(action.payload)[0];
            if (k === 'name' ) posts.tradeIdeas.name = v;
            else if (k === 'ticker') posts.tradeIdeas.ticker = v;
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
    clearTradeIdeasState,
    setMetaData
} = slice.actions;

export default slice.reducer;

export const createTradeIdea = () => (dispatch, getState) => {
    const data = getState().entities.posts.tradeIdeas.variables
    dispatch(apiCallBegan({
        url: 'create-trade-idea',
        method: 'post',
        data,
        headers: {},
        // onSuccess: removePersonalQuestion.type
    }))
}