import { server, token } from "../store";
import axios from "axios";

const config = {
    headers: {
        "Authorization": "Bearer " + token,
        "authMail": localStorage.getItem("authEmail")
    }
}

export const getAllTasks = (status = "", keyword = "") => async (dispatch) => {
    try {
        dispatch({ type: "allTasksRequest" })

        const { data } = await axios.get(`${server}/tasks?keyword=${keyword}&status=${status}`, config);

        dispatch({ type: 'allTasksSuccess', payload: data.tasks });
    } catch (error) {
        dispatch({ type: "allTasksFail", payload: error.response.data.message });
    }
};

export const createTask = (title, description, status) => async (dispatch) => {
    try {
        dispatch({ type: "addTaskRequest" })

        const { data } = await axios.post(`${server}/createtask`, { title, description, status }, {
            headers: {
                'Content-type': 'application/json',
                "Authorization": "Bearer " + token,
                "authMail": localStorage.getItem("authEmail")
            },
        });
        dispatch({ type: "addTaskSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "addTaskFail", payload: error.response.data.message });
    }
};

export const editTask = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: "EditTaskRequest" })

        const { data } = await axios.get(`${server}/edittask/${taskId}`, config);
        dispatch({ type: "EditTaskSuccess", payload: data.taskData });
    } catch (error) {
        dispatch({ type: "EditTaskFail", payload: error.response.data.message });
    }
};

export const updateTask = (taskId, title, description, status) => async (dispatch) => {
    try {
        dispatch({ type: "UpdateTaskRequest" })

        const { data } = await axios.post(`${server}/updatetask/${taskId}`, {
            title, description, status
        }, {
            headers: {
                'Content-type': 'application/json',
                "Authorization": "Bearer " + token,
                "authMail": localStorage.getItem("authEmail")
            },
        });
        dispatch({ type: "UpdateTaskSuccess", payload: data.taskData });
    } catch (error) {
        dispatch({ type: "UpdateTaskFail", payload: error.response.data.message });
    }
};

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: "deleteTaskRequest" })

        const { data } = await axios.delete(`${server}/deletetask/${taskId}`, config);
        dispatch({ type: "deleteTaskSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "deleteTaskFail", payload: error.response.data.message });
    }
};
export const removeSelectedTask = () => async (dispatch) => {
    dispatch({ type: "removeSelectedTaskRequest" })
};