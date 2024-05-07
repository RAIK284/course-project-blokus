import "./Landing.css";
import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <div id="landing">
        <span id="landingTitle">BLOKUS</span>
        <div id="landingButtons">
          <Link id="loginButton" to="/login">
            <div>Log In</div>
          </Link>
          <div style={{ width: "6em" }}></div>
          <Link id="signUpButton" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
      <div class="area" >
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >
    </>
  );
}

export default Landing;
