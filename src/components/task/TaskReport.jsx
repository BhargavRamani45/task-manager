import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteTask, getAllTasks } from "../../redux/actions/task";
import { Link } from "react-router-dom";

const Container = styled.div`
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  font-family: "MonoLisa";
`;

const ResponsiveTable = styled.div`
  overflow-x: auto;
`;

const SearchInput = styled.input`
  width: auto;
  background-position: 10px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
`;

const SearchDropdown = styled.select`
  width: auto;
  background-position: 10px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  margin-left: 20px;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid #bb2d3b;
  border-radius: 0.375rem;
  background: #bb2d3b;
  display: inline-block;
  padding: 10px;
  padding-left: 0.75rem;
  padding-right: -0.625rem;
  font-family: "MonoLisa";
  margin: -13px;
  margin-right: 0.25rem !important;
  margin-left: 0.25rem !important;
`;

const TaskReport = () => {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const { loading, tasks } = useSelector((state) => state.tasks);

  const deleteHandler = async (taskId) => {
    await dispatch(deleteTask(taskId));
    dispatch(getAllTasks(status, keyword));
  };

  useEffect(() => {
    dispatch(getAllTasks(status, keyword));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, keyword, dispatch]);

  return (
    <Container>
      <SearchInput
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for title.."
        title="Type in a title"
      />
      <SearchDropdown
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="TO DO">To Do</option>
        <option value="IN PROCESS">IN PROCESS</option>
        <option value="IN PROCESS">Done</option>
      </SearchDropdown>
      {loading && loading ? (
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : (
        <>
          {tasks.length > 0 ? (
            <ResponsiveTable>
              <table>
                <thead>
                  <th>Action</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </thead>
                <tbody>
                  {tasks.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <Link
                          className="editButton"
                          to={`/update-task/${item.id}`}
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          type="button"
                          onClick={() => deleteHandler(item.id)}
                        >
                          Delete
                        </DeleteButton>
                      </td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.status}</td>
                      <td>{String(new Date(item.created_at)).split("G")[0]}</td>
                      <td>
                        {item.updated_at !== null ? (
                          String(new Date(item.updated_at)).split("G")[0]
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ResponsiveTable>
          ) : (
            <div style={{ textAlign: "center" }}>Task Not Found</div>
          )}
        </>
      )}
    </Container>
  );
};

export default TaskReport;
