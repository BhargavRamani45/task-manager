import { configureStore } from "@reduxjs/toolkit"
import { selectedTaskReducer, taskReducer } from "./reducers/taskReducer";

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        editTask: selectedTaskReducer
    }
});

export const server = "https://rd.ragingdevelopers.com/taskApi/api/v1";
export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default store;