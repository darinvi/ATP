import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: 'home',
    initialState: {
        allPosts : {},
        postCounter: 0,
        filteredPosts : [],
        maximized: false,
        maximizedData: null, // the post type will be added to the posts so I will get the type from there
        playbooks: {
            table: null,
            tableLoading: false,
            commentsLoading: false,
            commentCreateLoading: false,
            deletingId: null,
            editingId: null,
            commentType: "General",
            collection: 'general_comments',
            comments: [],
            error: false
        }
    },
    reducers: {
        addPosts: (home, action) => {
            for (let post of action.payload) {
                post['counter'] = home.postCounter;
                home.allPosts[home.postCounter++] = post;
            }
        },
        filterPostType: (home, action) => {
            home.filteredPosts.push(action.payload)
            localStorage.getItem('feedFilters', home.filteredPosts)
        },
        removeFiltered: (home, action) => { 
            home.filteredPosts = home.filteredPosts.filter( type => type != action.payload)
            localStorage.setItem('feedFilters', home.filteredPosts)
        },
        resetPosts: (home) => {
            home.allPosts = {};
            home.postCounter = 0;
        },
        // next, modify this to be a onSuccess function when minimized pressed after a fetch of the comments of a given playbook.
        setMaximized: (home, action) => { 
            home.maximized = !home.maximized; 
            home.maximizedData = action.payload;
        },
        setTableData: (home, action, bool) => {
            home.playbooks.table = action.payload;
            home.playbooks.tableLoading = false;
        },
        clearTableData: (home) => {
            home.table = null;
            home.playbooks.tableLoading = false;
        },
        setTableLoading: (home) => {
            home.playbooks.tableLoading = true;
        },
        setCommentsLoading: (home) => {
            home.playbooks.comments = [];
            home.playbooks.commentsLoading = true;
        },
        setCommentCreateLoading: (home) => {
            home.playbooks.commentCreateLoading = true;
        },
        setCommentDeleteLoading: (home, action) => {
            home.playbooks.deletingId = action.payload;
        },
        setCommentEditLoading: (home, action) => {
            home.playbooks.editingId = action.payload;
        },
        handleComments: (home, action) => {
            home.playbooks.commentType = action.payload[1];
            home.playbooks.collection = `${action.payload[0]}_comments`;
        },
        clearComments: (home) => {
            home.playbooks.commentType = "General";
            home.playbooks.collection = "general_comments";
            home.playbooks.comments = [];
        },
        setComments: (home, action) => {
            home.playbooks.comments = action.payload;
            home.playbooks.commentsLoading = false;
        },
        handlePBCommentCreate: (home, action) => {
            home.playbooks.commentCreateLoading = false;
            home.playbooks.comments.unshift(action.payload);
        },
        handlePBError: (home) => {
            home.playbooks.error = true;
            home.playbooks.commentCreateLoading = false;
        },
        clearPBError: (home) => {
            home.playbooks.error = false;
            home.playbooks.commentCreateLoading = false;
        },
        handlePBDelete: (home, action) => {
            home.playbooks.comments = home.playbooks.comments.filter(e => e._id != action.payload);
            home.playbooks.deletingId = null;
        },
        handlePBEdit: (home, action) => {
            const comment = home.playbooks.comments.find(e => e._id == action.payload[0]);
            comment.comment = action.payload[1];
            home.playbooks.editingId = null;
        },
        setNextPost: (home, action) => {
            home.maximizedData = home.allPosts[action.payload];
        },

    }
});

const {
    addPosts,
    setTableData,
    setTableLoading,
    setComments,
    setCommentsLoading,
    setCommentCreateLoading,
    handlePBCommentCreate,
    handlePBError,
    handlePBDelete,
    setCommentDeleteLoading,
    handlePBEdit,
    setCommentEditLoading
} = slice.actions;

export const {
    filterPostType,
    removeFiltered,
    resetPosts,
    setMaximized,
    clearTableData,
    handleComments,
    clearComments,
    clearPBError,
    setNextPost
} = slice.actions;

export default slice.reducer;

export const loadAllPosts = () => (dispatch) => {
    for (let endpoint of ['/playbooks-unseen']) {
        dispatch(apiCallBegan({
            url: endpoint,
            method: "GET",
            data:{},
            headers: {},
            onSuccess: addPosts.type
        }))
    }
}

export const getStockMetrics = () => (dispatch, getState) => {
    const ticker = getState().entities.home.maximizedData.ticker;
    const date = getState().entities.home.maximizedData.date.split('T')[0];
    dispatch(setTableLoading())
    dispatch(apiCallBegan({
        url: 'get_stock_metrics',
        method: "post",
        data:{ticker, date},
        headers: {},
        onSuccess: setTableData.type,
        onError: clearTableData.type
    }))
}

export const loadPlaybookComments = () => (dispatch, getState) => {
    const collection = getState().entities.home.playbooks.collection;
    const playbook_id = getState().entities.home.maximizedData.id;
    dispatch(setCommentsLoading())
    dispatch(apiCallBegan({
        url: 'load-playbook-comments',
        method: "post",
        data:{playbook_id, collection},
        headers: {},
        onSuccess: setComments.type,
        // onError: 
    }))
}

export const leavePlaybookComment = (comment) => (dispatch, getState) => {
    dispatch(setCommentCreateLoading());
    const collection = getState().entities.home.playbooks.collection;
    const playbook = getState().entities.home.maximizedData.id;
    dispatch(apiCallBegan({
        url: 'create-playbook-comment',
        method: "post",
        data:{playbook, comment, collection},
        headers: {},
        onSuccess: handlePBCommentCreate.type,
        onError: handlePBError.type
    }));
}

export const deletePBComment = (id) => (dispatch, getState) => {
    const collection = getState().entities.home.playbooks.collection;
    dispatch(setCommentDeleteLoading(id))
    dispatch(apiCallBegan({
        url: 'delete-playbook-comment',
        method: "post",
        data:{id, collection},
        headers: {},
        onSuccess: handlePBDelete.type,   
    }))
}

export const editPBComment = (id, comment) => (dispatch, getState) => {
    const collection = getState().entities.home.playbooks.collection;
    dispatch(setCommentEditLoading(id))
    dispatch(apiCallBegan({
        url: 'edit-playbook-comment',
        method: "post",
        data:{id, collection, comment},
        headers: {},
        onSuccess: handlePBEdit.type,   
    }))
}

export const handleNextPost = (id) => (dispatch) => {
    dispatch(setNextPost(id));
    dispatch(getStockMetrics());
    dispatch(loadPlaybookComments());
}