import "./SignUp.css";
import { useState } from "react";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import CheckIcon from "../../assets/CheckIcon.svg";
import RedX from "../../assets/RedX.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import database, { auth } from "../../firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";

function SignUp() {
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const allFieldsFilled =
    nickname && firstName && lastName && email && password && confirmpassword;

  const passwordConfirmed =
    password.length >= 8 &&
    confirmpassword.length >= 8 &&
    password === confirmpassword;

  const checkNicknameTaken = async () => {
    const usersRef = collection(database, "users");
    const q = query(usersRef, where("nickname", "==", nickname));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Check if nickname is unique
    const nicknameTaken = await checkNicknameTaken(nickname);

    if (!allFieldsFilled) {
      setError("All fields are required.");
    } else if (nicknameTaken) {
      setError("Nickname taken.");
    } else if (password.length < 8) {
      setError("Password must be 8 characters or longer.");
    } else if (!passwordConfirmed) {
      setError("Password re-entered incorrectly.");
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Access the UID of the newly created user
        const uid = userCredential.user.uid;

        // Now you can use this UID to add the user to Firestore
        const docRef = doc(database, "users", uid);
        const payload = {
          nickname: nickname,
          firstName: firstName,
          lastName: lastName,
          profileImage: "",
          gamesPlayed: 0,
          gamesWon: 0,
          totalPieces: 0,
        };
        await setDoc(docRef, payload);

        window.location.href = "/home";
      } catch (error) {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("Email already in use.");
        }
      }
    }
  };

  return (
    <form className="Signup" onSubmit={handleSignUp}>
      Create an Account to Play
      <div className="signup-box">
        <div className="su-image-box">
          <img alt="Profile" src={ProfileIcon} className="su-profile-pic" />
        </div>
        <div className="su-info-container">
          <input
            className="su-textbox"
            type="text"
            placeholder="Enter Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <input
            className="su-textbox"
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) =>
              setFirstName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            required
          />
          <input
            className="su-textbox"
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) =>
              setLastName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            required
          />
          <input
            className="su-textbox"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              className="su-textbox"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <span className="password-instructions">
              Must be 8 or more characters
            </span>
          </div>

          <div className="password-validation">
            <input
              className="su-textbox"
              type="password"
              placeholder="Re-enter Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
        </div>
        {(password.length > 0 || confirmpassword) && (
          <img
            alt="Check"
            src={passwordConfirmed ? CheckIcon : RedX}
            className="password-check"
          />
        )}
        {error && <span className="su-error">{error}</span>}
      </div>
      <div className="su-button" type="submit" onClick={handleSignUp}>
        Sign Up
      </div>
      <span className="su-login-message">
        Already have an account?{" "}
        <Link className="su-login-link" to={"/login"}>
          Log in here!
        </Link>
      </span>
    </form>
  );
}

export default SignUp;
