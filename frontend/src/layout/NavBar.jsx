import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import LogoSvg from "../assets/Big BLOKUS.svg";
import HomeIcon from "../assets/Home Icon.svg";
import HelpIcon from "../assets/Help Icon.svg";

function NavBar() {
  return (
    <div id="navBar">
      <Link to="/">
        <button id="homeButton">
          <img src={HomeIcon} alt="Home" />
        </button>
      </Link>
      <img src={LogoSvg} alt="Logo" id="logo" />

      <button id="helpButton">
        <img src={HelpIcon} alt="Help" />
      </button>
    </div>
  );
}

export default NavBar;
