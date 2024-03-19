import "./Profile.css";
import { useState } from "react";

function Profile() {
  // variable for name (useState)
  const [nickname, setNickname] = useState("AllanMuinov5");
  const [email, setEmail] = useState("allan.muinov@gmail.com");
  const [password, setPassword] = useState("Hello");

  const linkToLandingPage = () => {
    window.location.href="http://localhost:3000/";
  }

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
              onChange={(e) => 
                setNickname(e.target.value)
              }
            />
            <input 
              class="textbox"
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => 
                setEmail(e.target.value)
              }
            />
            <input 
              class="textbox"
              type="text"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => 
                setPassword(e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div id="logoutbutton" onClick={linkToLandingPage}>Log Out</div>
    </div>
  );
}

export default Profile;
