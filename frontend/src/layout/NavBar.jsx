import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import HomeIcon from "../assets/Home Icon.svg";
import HelpIcon from "../assets/Help Icon.svg";

function NavBar({ isLoggedIn }) {
  return (
    <div id="navBar">
      {isLoggedIn && (
        <Link to="/home">
          <img src={HomeIcon} alt="Home" id="homeButton" />
        </Link>
      )}

      <Link to={isLoggedIn ? "/home" : "/"}>
        <span id="navBarTitle">BLOKUS</span>
      </Link>

      {isLoggedIn && <img src={HelpIcon} alt="Help" id="helpButton" />}
    </div>
  );
}

export default NavBar;
