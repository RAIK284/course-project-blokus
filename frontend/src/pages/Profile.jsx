import "./Profile.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  // variable for name (useState)
  const [nickname, setNickname] = useState("AllanMuinov5");
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
            <input
              class="textbox"
              type="text"
              placeholder="Enter Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <input
              class="textbox"
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              class="textbox"
              type="text"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Link id="logoutbutton" to={"/"}>
        Log Out
      </Link>
    </div>
  );
}

export default Profile;
