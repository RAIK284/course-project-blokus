import "./SignUp.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import AuthDetails from "./AuthDetails";

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="signup">
      Create an Account to Play!
      <div id="signupbox">
        <div id="suimagebox">
          <img src={ProfileIcon} id="suprofilepic" />
        </div>
        <div id="suinfocontainer">
          <div id="suinfotext">
            <div class="suinfobox">Nickname:</div>
            <div class="suinfobox">Email:</div>
            <div class="suinfobox">Password:</div>
            <div class="suinfobox">Confirm Password:</div>
          </div>
          <form id="suinputtext" onSubmit={handleSignUp}>
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
            <button id="signupbutton" type="submit">
              Sign Up
            </button>
          </form>
          <AuthDetails />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
