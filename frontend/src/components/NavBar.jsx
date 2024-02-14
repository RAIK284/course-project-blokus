import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div id="navBar">
      <Link to="/">
        <button id="home">Home</button>
      </Link>
      <span id="title">Blokus</span>
      <button id="help">Help</button>
    </div>
  );
}

export default NavBar;
