import "./Landing.css";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";

function Landing() {
  return (
    <div id="landing">
      <span id="landingTitle">BLOKUS</span>
      <div id="landingButtons">
        <Link id="loginButton" to="/Login">
          <div>Login</div>
        </Link>
        <div style={{ width: "6em" }}></div>
        <Link id="signUpButton" to="/SignUp">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Landing;
