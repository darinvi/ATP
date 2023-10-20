import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'mentor',
    initialState: {
        unanswered: [],
    },
    reducers: {
        populateUnansweredQuestions: (mentor, action) => {
            mentor.unanswered = action.payload
        },
        removeAnsweredQuestion: (mentor, action) => {
            mentor.unanswered = mentor.unanswered.filter( q => q.id != action.payload.question_id)
        },
    }
});

const {
    populateUnansweredQuestions,
    removeAnsweredQuestion
} = slice.actions;
export default slice.reducer;


export const askQuestion = (data) => (dispatch) => {
    dispatch(apiCallBegan({
        url: 'ask-mentor/',
        method: 'POST',
        data: data,
        headers: {},
    }))
}

export const getUnansweredQuestions = () => (dispatch) => {
    dispatch(apiCallBegan({
        url: 'get-unanswered-questions',
        method: 'GET',
        data: {},
        headers: {},
        onSuccess: populateUnansweredQuestions.type
    }))
}

export const answerQuestion = (id, answer) => (dispatch) => {
    dispatch(apiCallBegan({
        url: 'create-mentor-answer',
        method: 'POST',
        data: {question_id: id, answer},
        headers: {},
        onSuccess: removeAnsweredQuestion.type
    }))
}