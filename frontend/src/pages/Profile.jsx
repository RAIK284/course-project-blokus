import "./Profile.css";
import { useEffect, useState } from "react";
import ProfileIcon from "../assets/ProfileIcon.svg";
import database, { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./Auth/AuthContext";

function Profile() {
  const { authUser, setIsLoggedIn, setAuthUser } = useAuth();
  const [nickname, setNickname] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDocRef = doc(database, "users", authUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setNickname(userData.nickname);
          setEmail(authUser.email);
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (authUser) {
      getUserData();
    }
  }, [authUser]);

  return (
    <div id="profile">
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
      <div id="profilebuttonscontainer">
        <div id="editprofilebutton">Edit</div>
        <div id="logoutbutton" onClick={handleSignOut}>
          Log Out
        </div>
      </div>
    </div>
  );
}

export default Profile;
