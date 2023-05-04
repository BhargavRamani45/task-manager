import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Profile = ({ isLoading, isAuthenticated, user }) => {
  const { logout } = useAuth0();

  const logoutHandler = () => {
    localStorage.removeItem("authKey");
    localStorage.removeItem("authEmail");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading ...</div>;
  }

  const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: auto;
    text-align: center;
    font-family: "MonoLisa";
  `;

  const Button = styled.button`
    border: none;
    outline: 0;
    display: inline-block;
    padding: 8px;
    color: white;
    background-color: #000;
    text-align: center;
    cursor: pointer;
    width: 100%;
    font-size: 18px;
    margin-top: 10px;
  `;

  return (
    isAuthenticated && (
      <>
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>User Profile</h2>
        <Card>
          <img src={user.picture} alt={user.name} style={{ width: "100%" }} />
          <p>{user.name}</p>
          <p>
            <Button type="button" onClick={() => logoutHandler()}>
              SignOut
            </Button>
          </p>
        </Card>
      </>
    )
  );
};

export default Profile;
