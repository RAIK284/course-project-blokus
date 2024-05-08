import "./Landing.css";
import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="LandingContainer">
      <div className="Landing">
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
      {/* STRETCH GOAL: animated background */}
      <div className="area">
        <ul className="circles">
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
      </div>
    </div>
  );
}

export default Landing;
