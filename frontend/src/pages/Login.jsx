import "./Login.css";
import { useState } from "react";

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
            <div class="lotextbox">{email}</div>
            <div class="lotextbox">{password}</div>
          </div>
        </div>
      </div>
      <div id="loginbutton">Log In</div>
      Don't have an account? Sign up!
    </div>
  );
}

export default Login;
