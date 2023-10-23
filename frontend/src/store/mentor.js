import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'mentor',
    initialState: {
        unanswered: [],
        personal: [],
    },
    reducers: {
        populateUnansweredQuestions: (mentor, action) => {
            mentor.unanswered = action.payload
        },
        populatePersonalQuestions: (mentor, action) => {
            mentor.personal = action.payload
        },
        removeAnsweredQuestion: (mentor, action) => {
            mentor.unanswered = mentor.unanswered.filter( q => q.id != action.payload.question_id)
        },
        removePersonalQuestion: (mentor, action) => {
            mentor.personal = mentor.personal.filter( q => q.id != action.payload.question_id)
        }
    }
});

const {
    populateUnansweredQuestions,
    removeAnsweredQuestion,
    populatePersonalQuestions,
    removePersonalQuestion
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

export const getPersonalQuestions = () => (dispatch) => {
    dispatch(apiCallBegan({
        url: 'ask-mentor',
        method: 'GET',
        data: {},
        headers: {},
        onSuccess: populatePersonalQuestions.type
    }))
}


export const deleteAnsweredQuestion = (id) => (dispatch) => {
    dispatch(apiCallBegan({
        url: `ask-mentor/${id}/`,
        method: 'DELETE',
        data: {},
        headers: {},
        onSuccess: removePersonalQuestion.type
    }))

}