import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("allan.muinov@gmail.com");
  const [password, setPassword] = useState("Hello");

  return (
    <div id="login">
      Log In to your Account
      <div id="loginbox">
        <div id="loimagebox"></div>
        <div id="loinfocontainer">
          <div id="loinfotext">
            <div class="loinfobox">Email:</div>
            <div class="loinfobox">Password:</div>
          </div>
          <div id="loinputtext">
            <input
              class="lotextbox"
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              class="lotextbox"
              type="text"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Link id="loginbutton" to={"/home"}>
        Log In
      </Link>
      <span id="rusignupmessage">
        Don't have an account?{" "}
        <Link id="rusignuplink" to={"/SignUp"}>
          Sign up!
        </Link>
      </span>
    </div>
  );
}

export default Login;
