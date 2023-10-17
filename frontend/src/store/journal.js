import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'journal',
    initialState: {
        tags: null,
        error: null,
        currentJournals: null,
        currentJournals: null,
        loading: false,
        requested: false,
    },
    reducers: {
        setTags: (journal, action) => {
            journal.tags = action.payload
        },
        tagAdded: (journal, action) => {
            journal.tags.push(action.payload)
        },
        tagDeleted: (journal, action) => {
            journal.tags = journal.tags.filter(tag => tag.id !== action.payload.id);
        },
        tagAddFailed: (journal, action) => {
            journal.error['errorTime'] = Date.now();
            journal.error['message'] = `Create failed. Please contact dev with error: \n "${action.payload}"`;
        },
        clearError: (journal, action) => {
            // How do I indicate whether created succesfully?
        },
        journalCreated: (journal, action) => {
            console.log('success')
        },
        setCurrentJournals: (journal, action) => {
            journal.currentJournals = action.payload.journals;
            journal.loading = false;
            journal.requested = false;
        },
        setLoading:(journal, action) => {
            journal.loading = true;
        },
        clearJournals: (journal, action) => {
            journal.currentJournals = null;
        },
        setRequested: (journal, action) => {
            journal.requested = true;
        },
    }
});

const {
    setTags,
    tagAdded,
    tagDeleted,
    tagAddFailed,
    journalCreated,
    setCurrentJournals,
    setLoading,
    clearJournals,
    setRequested
} = slice.actions;

export default slice.reducer;

export const clearJournalList = clearJournals;

const URL = 'tags/'

export const loadTags = () => (dispatch) => {
    dispatch(apiCallBegan({
        url: URL,
        method: 'GET',
        data: {},
        headers: {},
        onSuccess: setTags.type,
        // onError: 
    }))
}

export const createTag = (name, description) => (dispatch) => {
    dispatch(apiCallBegan({
        url: 'tags/',
        data: {
            name,
            description
        },
        headers: {},
        method: 'POST',
        onSuccess: tagAdded.type,
        // onError: tagAddFailed.type,
    }))
}

export const deleteTag = (id) => (dispatch) => {
    dispatch(apiCallBegan({
        url: `tags/${id}/`,
        data: {},
        headers: {},
        method: 'DELETE',
        // onSuccess: loadTags.type, // CAN'T UPDATE THE STATE ON DELETE
        // onError: tagAddFailed.type,
    }))
}

export const submitDailyJournal = (journal) => (dispatch) => {
    dispatch(apiCallBegan({
        url: 'daily-journal-create/',
        method: 'POST',
        data: journal,
        headers: {},
        onSuccess: journalCreated.type
    }))
}

export const loadPersonalJournals = () => (dispatch) => {
    dispatch(setLoading());
    dispatch(setRequested());
    dispatch(apiCallBegan({
        url: 'get-user-journals',
        method: 'GET',
        data: {},
        headers: {},
        onSuccess: setCurrentJournals.type,
    }))
}

export const loadTraineesJournals = () => (dispatch) => {
    dispatch(setLoading());
    dispatch(setRequested());
    dispatch(apiCallBegan({
        url: 'get-trainees-journals',
        method: "GET",
        data: {},
        headers: {},
        onSuccess: setCurrentJournals.type
    }))
}

export const loadTraineesTags = (trainees_pks) => (dispatch) => {
    dispatch(apiCallBegan({
        url:'get-trainees-tags',
        method: 'POST',
        data: {'trainees' : trainees_pks},
        headers: {},
        onSuccess: setTags.type
    }))
}