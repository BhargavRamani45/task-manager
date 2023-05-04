import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  editTask,
  getAllTasks,
  removeSelectedTask,
  updateTask,
} from "../../redux/actions/task";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Container = styled.div`
  border-radius: 5px;
  padding: 20px;
  font-family: "MonoLisa";
`;

const Row = styled.div`
  ::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const LabelDiv = styled.div`
  float: left;
  width: 25%;
  margin-top: 6px;
`;

const Label = styled.label`
  padding: 12px 12px 12px 0;
  display: inline-block;
`;

const InputDIv = styled.div`
  float: left;
  width: 75%;
  margin-top: 6px;
`;

const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { loading, taskData, error } = useSelector((state) => state.editTask);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateTask(taskId, title, description, status));
    dispatch(getAllTasks("", ""));
    navigate("/task-report");
  };

  useEffect(() => {
    if (taskId && taskId !== "") dispatch(editTask(taskId));
    return () => {
      dispatch(removeSelectedTask());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      navigate("/task-report");
      dispatch({ type: "clearError" });
    }

    setTitle(taskData.title);
    setDescription(taskData.description);
    setStatus(taskData.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskData, error]);

  return (
    <Container>
      <>
        {loading && loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={submitHandler}>
            <Row>
              <LabelDiv>
                <Label htmlFor="title">Title</Label>
              </LabelDiv>
              <InputDIv>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Your title.."
                  style={{ width: "100%" }}
                  required
                />
              </InputDIv>
            </Row>
            <Row>
              <LabelDiv>
                <Label htmlFor="Status">Status</Label>
              </LabelDiv>
              <InputDIv>
                <select
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ width: "100%" }}
                  required
                >
                  <option value="TO DO">To Do</option>
                  <option value="IN PROCESS">IN PROCESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </InputDIv>
            </Row>
            <Row>
              <LabelDiv>
                <Label htmlFor="Description">Description</Label>
              </LabelDiv>
              <InputDIv>
                <textarea
                  name="description"
                  placeholder="Write something.."
                  style={{ height: 200, width: "100%" }}
                  defaultValue={""}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </InputDIv>
            </Row>
            <Row>
              {loading && loading ? (
                <input type="button" disabled defaultValue="Loading.." />
              ) : (
                <input type="submit" defaultValue="Submit" />
              )}
            </Row>
          </form>
        )}
      </>
    </Container>
  );
};

export default UpdateTask;
