import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import {
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { set_player_id, set_player_name } from "../../gameLogic/lobbies";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import database, { auth } from "../../firebase";
import Close from "../../assets/_X_.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [displayError, setDisplayError] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
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
        if (
          error.code === "auth/invalid-credential" ||
          error.code === "auth/invalid-email"
        ) {
          setDisplayError("Invalid login credentials.");
          console.log(displayError);
        }
      });
  };

  const handleResetPassword = async (userEmail) => {
    try {
      await sendPasswordResetEmail(auth, userEmail);
      alert("Password reset email sent. Please check your inbox.");
      setShowResetModal(false); // Close the modal after successful reset
    } catch (error) {
      console.error("Password reset error:", error);
      alert("Failed to send password reset email. Please try again.");
    }
  };

  const openResetModal = () => {
    setShowResetModal(true);
  };

  const closeResetModal = () => {
    setShowResetModal(false);
  };

  return (
    <form id="login" onSubmit={handleLogIn}>
      Log in to your Account
      <div id="loginbox">
        <div id="loimagebox">
          <img alt="Profile" src={ProfileIcon} id="loprofilepic" />
        </div>
        <div id="loinfocontainer">
          <input
            className="lotextbox"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="lotextbox"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Display Login Error */}
        {displayError && <span className="login-error">{displayError}</span>}
      </div>
      {/* Log In Button */}
      <div type="submit" className="loginbutton" onClick={handleLogIn}>
        Log In
      </div>
      <span id="rusignupmessage">
        Don't have an account?{" "}
        <Link id="rusignuplink" to={"/signup"}>
          Sign up!
        </Link>
      </span>
      {/* Forgot Password Link (Modal Trigger) */}
      <div className="forgot-password-link" onClick={openResetModal}>
        Forgot Password?
      </div>
      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="close" onClick={closeResetModal}>
              <img src={Close} alt="Close Modal Button" />
            </div>
            <span className="forgot-password-title">Forgot Password?</span>
            <span className="reset-password-instructions">
              Enter your email address to reset your password:
            </span>
            <input
              className="modal-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div
              className="modal-button"
              onClick={() => handleResetPassword(email)}
            >
              Reset Password
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default Login;
