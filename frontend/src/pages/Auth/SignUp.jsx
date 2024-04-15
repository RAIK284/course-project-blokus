import "./SignUp.css";
import { useState } from "react";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

function SignUp() {
  // variable for name (useState)
  const [nickname, setNickname] = useState("AllanMuinov5");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("******");

  const handleSignUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form id="signup" onSubmit={handleSignUp}>
      Create an Account to Play
      <div id="signupbox">
        <div id="suimagebox">
          <img alt="Profile" src={ProfileIcon} id="suprofilepic" />
        </div>
        <div id="suinfocontainer">
          <div id="suinfotext">
            <div class="suinfobox">Nickname:</div>
            <div class="suinfobox">Email:</div>
            <div class="suinfobox">Password:</div>
            <div class="suinfobox">Confirm Password:</div>
          </div>
          <div id="suinputtext">
            <input
              class="sutextbox"
              type="text"
              placeholder="Enter Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <input
              class="sutextbox"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              class="sutextbox"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              class="sutextbox"
              type="text"
              placeholder="Re-type Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button id="signupbutton" type="submit">
        Sign Up
      </button>
      <span id="suloginmessage">
        Already have an account?{" "}
        <Link id="suloginlink" to={"/Login"}>
          Log in here!
        </Link>
      </span>
    </form>
  );
}

export default SignUp;
