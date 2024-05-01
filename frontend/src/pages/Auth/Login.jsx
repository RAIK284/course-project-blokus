import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { set_player_email, set_player_id, set_player_name } from "../../gameLogic/lobbies";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import database, { auth } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        set_player_id(userCredential.user.uid);
        // fetching and setting nickname
        try {
          const userDocRef = doc(database, "users", userCredential.user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            set_player_name(userData.nickname);
          } else {
            console.log("User document does not exist");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        navigate(`/home`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form id="login" onSubmit={handleLogIn}>
      Log In to your Account
      <div id="loginbox">
        <div id="loimagebox">
          <img alt="Profile" src={ProfileIcon} id="loprofilepic" />
        </div>
        <div id="loinfocontainer">
          <div id="loinfotext">
            <div id="loinfobox">Email:</div>
            <div id="loinfobox">Password:</div>
          </div>
          <div id="loinputtext">
            <input
              id="lotextbox"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="lotextbox"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button id="loginbutton" type="submit">
        Log In
      </button>
      <span id="rusignupmessage">
        Don't have an account?{" "}
        <Link id="rusignuplink" to={"/signup"}>
          Sign up!
        </Link>
      </span>
    </form>
  );
}

export default Login;
