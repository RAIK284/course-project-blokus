import "./Profile.css";
import { useState } from "react";
import ProfileIcon from "../assets/ProfileIcon.svg";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "./Auth/AuthContext";

function Profile() {
  const { authUser, setIsLoggedIn, setAuthUser } = useAuth();
  const [nickname, setNickname] = useState("TODO");
  const [email, setEmail] = useState(authUser.email);
  const [password, setPassword] = useState(authUser.password);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
        setIsLoggedIn(false);
        console.log("signout successful");
        window.location.href = "/";
      })
      .catch((error) => console.log(error));
  };

  if (!authUser) {
    window.location.href = "/";
  }

  return (
    <div id="profile">
      Your Profile
      <div id="profilebox">
        <div id="imagebox">
          <img alt="Profile" src={ProfileIcon} id="profilepic" />
        </div>
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
      <button id="logoutbutton" onClick={handleSignOut}>
        Log Out
      </button>
    </div>
  );
}

export default Profile;
