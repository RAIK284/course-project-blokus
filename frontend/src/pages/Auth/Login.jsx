import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="login">
      Log In to your Account
      <div id="loginbox">
        <div id="loimagebox">
          <img src={ProfileIcon} id="loprofilepic" />
        </div>
        <div id="loinfocontainer">
          <div id="loinfotext">
            <div class="loinfobox">Email:</div>
            <div class="loinfobox">Password:</div>
          </div>
          <form id="loinputtext" onSubmit={handleLogIn}>
            <input
              class="lotextbox"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              class="lotextbox"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button id="loginbutton" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
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
