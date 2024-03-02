import "./Landing.css";
import React from "react";
import { Link } from "react-router-dom";

function Landing({ onLogin }) {
  return (
    <div id="landing">
      <span id="landingTitle">BLOKUS</span>
      <div id="landingButtons">
        <Link to="/home">
          <div id="loginButton" onClick={onLogin}>
            Login
          </div>
        </Link>

        <div style={{ width: "6em" }}></div>

        <Link to="/home">
          <div id="signUpButton" onClick={onLogin}>
            SignUp
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
