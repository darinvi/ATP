import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'journal',
    initialState: {
        tags: null,
        traineeTags: null,
        error: null,
        currentJournals: null,
        loading: false,
        requested: false,
    },
    reducers: {
        setTags: (journal, action) => {
            journal.tags = action.payload
        },
        clearTraineeTags: (journal, action) => {
            journal.tags = null;
        },
        tagAdded: (journal, action) => {
            journal.tags.push(action.payload)
        },
        tagDeleted: (journal, action) => {
            journal.tags = journal.tags.filter( tag => tag.id !== action.payload.id);
        },
        tagAddFailed: (journal, action) => {
            journal.error['errorTime'] = Date.now();
            journal.error['message'] = `Create failed. Please contact dev with error: \n "${action.payload}"`;
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
        setTraineeTags: (journal, action) => {
            journal.traineeTags = action.payload;
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
    setRequested,
    clearTraineeTags,
    setTraineeTags
} = slice.actions;
export default slice.reducer;


export const clearJournalList = clearJournals;
export const clearTraineeTagList = clearTraineeTags;

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
        url: `delete-tag/${id}`,
        data: {},
        headers: {},
        method: 'GET',
        onSuccess: tagDeleted.type,
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
        onSuccess: setTraineeTags.type
    }))
}

export const addCommentToTraineeJournal = (comment, id) => (dispatch) => {
    dispatch(apiCallBegan({
        url: 'add-comment-existing-journal',
        method: 'POST',
        data: {comment, id},
        headers: {},
        // onSuccess
    }))
}