import "./Profile.css";
import { useEffect, useState } from "react";
import ProfileIcon from "../assets/ProfileIcon.svg";
import database, { auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";
import { useAuth } from "./Auth/AuthContext";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Close from "../assets/_X_.svg";

function Profile() {
  const { authUser, setAuthUser } = useAuth();
  const [userData, setUserData] = useState("");
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isNicknameDirty, setIsNicknameDirty] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isFirstNameDirty, setIsFirstNameDirty] = useState(false);
  const [isLastNameDirty, setIsLastNameDirty] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState("");

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameDirty(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailDirty(true);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    );
    setIsFirstNameDirty(true);
  };

  const handleLastNameChange = (e) => {
    setLastName(
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    );
    setIsLastNameDirty(true);
  };

  const handleSave = async () => {
    try {
      // only update the email if the user has changed something
      if (isEmailDirty) {
        await updateEmail(authUser, email);
        await sendEmailVerification(authUser);
        setMessage("Email address updated successfully.");
        setEmail(email);
      }

      // only update the nickname if the user has changed something
      // identify the user info we want to change
      const docRef = doc(database, "users", authUser.uid);
      // set the fields we want to change
      const payload = {
        nickname: isNicknameDirty ? nickname : userData.nickname,
        firstName: isFirstNameDirty ? firstName : userData.firstName,
        lastName: isLastNameDirty ? lastName : userData.lastName,
        profileImage: userData.profileImage,
        gamesPlayed: userData.gamesPlayed,
        gamesWon: userData.gamesWon,
        totalPieces: userData.totalPieces,
      };
      // actually update in the database
      setDoc(docRef, payload);

      setEditMode(false);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
        window.location.href = "/";
      })
      .catch((error) => console.log(error));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (profileImage !== null) {
      const imageRef = ref(storage, `profile-images/${profileImage.name}`);
      uploadBytes(imageRef, profileImage).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          const docRef = doc(database, "users", authUser.uid);
          // set the fields we want to change
          const payload = {
            nickname: isNicknameDirty ? nickname : userData.nickname,
            firstName: isFirstNameDirty ? firstName : userData.firstName,
            lastName: isLastNameDirty ? lastName : userData.lastName,
            profileImage: url,
            gamesPlayed: userData.gamesPlayed,
            gamesWon: userData.gamesWon,
            totalPieces: userData.totalPieces,
          };
          // actually update in the database
          setDoc(docRef, payload);
          setShowModal(false);
          setProfileImageURL(url);
        });
      });
    }
  };

  // get all the firestore info for the current logged in user
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDocRef = doc(database, "users", authUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
          // get the nickname from firestore and set it in the frontend state
          setNickname(userData.nickname);

          // get the email from firebase auth and set it in the frontend state
          setEmail(authUser.email);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);

          setProfileImageURL(userData.profileImage);
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
          <img
            className="profile-picture"
            src={profileImageURL || ProfileIcon}
            height="150px"
            width="150px"
            alt="Profile"
            onClick={handleOpenModal} // Open the modal when clicking the image
          />
        </div>
        <div id="infocontainer">
          {editMode ? (
            <>
              <div className="field-info">
                <div className="textbox-label">Nickname:</div>
                <input
                  class="editbox"
                  type="text"
                  placeholder="Enter New Nickname"
                  value={nickname}
                  onChange={handleNicknameChange}
                />
              </div>

              <div className="field-info">
                <div className="textbox-label">First Name:</div>
                <input
                  class="editbox"
                  type="text"
                  placeholder="Enter New First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>

              <div className="field-info">
                <div className="textbox-label">Last Name:</div>
                <input
                  class="editbox"
                  type="text"
                  placeholder="Enter New Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>

              <div className="field-info">
                <div className="textbox-label">Email:</div>
                <input
                  class="editbox"
                  type="text"
                  placeholder="Enter New Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </>
          ) : (
            <>
              <div className="field-info">
                <div className="textbox-label">Nickname:</div>
                <div className="textbox">{nickname}</div>
              </div>
              <div className="field-info">
                <div className="textbox-label">First Name:</div>
                <div className="textbox">{firstName}</div>
              </div>
              <div className="field-info">
                <div className="textbox-label">Last Name:</div>
                <div className="textbox">{lastName}</div>
              </div>
              <div className="field-info">
                <div className="textbox-label">Email:</div>
                <div className="textbox">{email}</div>
              </div>
            </>
          )}
          <div id="cpbutton" onClick={handleResetPassword}>
            Change Password
          </div>
        </div>
        {message && <span className="edit-message">{message}</span>}
      </div>
      <div id="profilebuttonscontainer">
        <div
          id="editprofilebutton"
          onClick={editMode ? handleSave : handleEdit}
        >
          {editMode ? "Save" : "Edit"}
        </div>
        <div id="logoutbutton" onClick={handleSignOut}>
          Log Out
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="close" onClick={handleCloseModal}>
              <img src={Close} alt="Close Modal Button" />
            </div>
            <div className="input-buttons">
              <input
                className="profile-pic-input"
                type="file"
                onChange={handleImageChange}
              />
              <button className="upload-button" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
