import "./SignUp.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  // variable for name (useState)
  const [nickname, setNickname] = useState("AllanMuinov5");
  const [email, setEmail] = useState("allan.muinov@gmail.com");
  const [password, setPassword] = useState("******");
  const [confirmpassword, setConfirmPassword] = useState("******");

  return (
    <div id="signup">
      Create an Account to Play!
      <div id="signupbox">
        <div id="suimagebox"></div>
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
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              class="sutextbox"
              type="text"
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
      <Link id="signupbutton" to={"/home"}>
        Sign Up
      </Link>
    </div>
  );
}

export default SignUp;
