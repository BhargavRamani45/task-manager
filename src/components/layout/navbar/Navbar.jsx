import React from "react";
import styled from "styled-components";
import Burger from "./Burger";
import { Link } from "react-router-dom";

const Theme = {
  colors: {
    bg: `#fff`,
    dark: `#24292e`,
    light: `#EEEEEE`,
    red: `#ff5851`,
  },
  fonts: {
    body: `MonoLisa, sans-serif`,
    heading: `MonoLisa, sans-serif`,
  },
};

const Nav = styled.nav`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1020;
  height: 55px;
  color: ${Theme.colors.light};
  background: ${Theme.colors.dark};
  font-family: ${Theme.fonts.heading};
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          Task Manager
        </Link>
      </div>
      <Burger />
    </Nav>
  );
};

export default Navbar;
