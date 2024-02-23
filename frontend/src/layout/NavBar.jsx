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
        <img src={HomeIcon} alt="Home" id="homeButton" />
      </Link>
      <span id="navBarTitle">BLOKUS</span>
      <img src={HelpIcon} alt="Help" id="helpButton" />
    </div>
  );
}

export default NavBar;
