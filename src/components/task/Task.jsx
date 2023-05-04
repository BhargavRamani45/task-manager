import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createTask, getAllTasks } from "../../redux/actions/task";
import { useNavigate } from "react-router-dom";

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

const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TO DO");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.tasks);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createTask(title, description, status));
    dispatch(getAllTasks("", ""));
    navigate("/task-report");
  };

  return (
    <Container>
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
    </Container>
  );
};

export default Task;
