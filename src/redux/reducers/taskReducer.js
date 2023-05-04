import { createReducer } from "@reduxjs/toolkit";

export const taskReducer = createReducer({ tasks: [] }, {

    addTaskRequest: (state) => {
        state.loading = true;
    },
    addTaskSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    addTaskFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    deleteTaskRequest: (state) => {
        state.loading = true;
    },
    deleteTaskSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    deleteTaskFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    allTasksRequest: (state) => {
        state.loading = true;
    },
    allTasksSuccess: (state, action) => {
        state.loading = false;
        state.tasks = action.payload
    },
    allTasksFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    }
});

export const selectedTaskReducer = createReducer({ taskData: {} }, {

    EditTaskRequest: (state) => {
        state.loading = true;
    },
    EditTaskSuccess: (state, action) => {
        state.loading = false;
        state.taskData = action.payload
    },
    EditTaskFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    UpdateTaskRequest: (state) => {
        state.loading = true;
    },
    UpdateTaskSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    UpdateTaskFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    removeSelectedTaskRequest: (state) => {
        state.taskData = {};
    },

    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    }
});
