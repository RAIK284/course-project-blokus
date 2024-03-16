import "./Profile.css";
import { useState } from "react";

function Profile() {
  // variable for name (useState)
  const [nickname, setNickname] = useState("Allan");
  const [email, setEmail] = useState("allan.muinov@gmail.com");
  const [password, setPassword] = useState("Hello");

  return (
    <div id="profile">
      Your Profile
      <div id="profilebox">
        <div id="imagebox"></div>
        <div id="infocontainer">
          <div id="infotext">
            <div class="infobox">Nickname:</div>
            <div class="infobox">Email:</div>
            <div class="infobox">Password:</div>
          </div>
          <div id="inputtext">
            <div class="textbox">{nickname}</div>
            <div class="textbox">{email}</div>
            <div class="textbox">{password}</div>
          </div>
        </div>
      </div>
      <div id="logoutbutton">Log Out</div>
    </div>
  );
}

export default Profile;
