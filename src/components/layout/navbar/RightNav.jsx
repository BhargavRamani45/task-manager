import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #24292e;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const Button = styled.button`
  cursor: pointer;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid #0d6efd;
  border-radius: 0.375rem;
  background: #0d6efd;
  display: inline-block;
  padding: 10px;
  padding-left: 0.75rem;
  padding-right: -0.625rem;
  font-family: "MonoLisa";
  margin: -13px;
  margin-right: 0.25rem !important;
  margin-left: 0.25rem !important;
`;

const RightNav = ({ open }) => {
  const { loginWithRedirect, logout } = useAuth0();

  const logoutHandler = () => {
    localStorage.removeItem("authKey");
    localStorage.removeItem("authEmail");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const isAuthenticated = localStorage.getItem("authKey") ?? false;
  return (
    <Ul open={open}>
      <li>
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
      </li>
      {isAuthenticated && isAuthenticated ? (
        <>
          <li>
            <Link to="/add-task" style={{ textDecoration: "none" }}>
              Add Task
            </Link>
          </li>
          <li>
            <Link to="/task-report" style={{ textDecoration: "none" }}>
              Task Report
            </Link>
          </li>
          <li>
            <Link to="/me" style={{ textDecoration: "none" }}>
              Profile
            </Link>
          </li>
          <li>
            <Button type="button" onClick={() => logoutHandler()}>
              SignOut
            </Button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Button onClick={() => loginWithRedirect()}>SignIn</Button>
          </li>
        </>
      )}
    </Ul>
  );
};

export default RightNav;
