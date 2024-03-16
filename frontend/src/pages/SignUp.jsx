import "./SignUp.css";
import { useState } from "react";

function SignUp() {
  // variable for name (useState)
  const [nickname, setNickname] = useState("BabeBabeBabe42");
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
            <div class="sutextbox">{nickname}</div>
            <div class="sutextbox">{email}</div>
            <div class="sutextbox">{password}</div>
            <div class="sutextbox">{confirmpassword}</div>
          </div>
        </div>
      </div>
      <div id="signupbutton">Sign Up</div>
    </div>
  );
}

export default SignUp;
