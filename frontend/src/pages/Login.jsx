import "./Login.css";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("allan.muinov@gmail.com");
  const [password, setPassword] = useState("Hello");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const linkToSignUp = () => {
    window.location.href="http://localhost:3000/SignUp"
  }

  const linkToHomePageLoggedIn = () => {
    window.location.href="http://localhost:3000/home"
    setIsLoggedIn(true);
  }

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
      <div id="loginbutton" onClick={linkToHomePageLoggedIn} >Log In</div>
      <span id="rusignupmessage">Don't have an account? <span id="rusignuplink" onClick={linkToSignUp}>Sign up!</span></span>
    </div>
  );
}

export default Login;
