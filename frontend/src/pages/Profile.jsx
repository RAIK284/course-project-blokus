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
import { storage, storageRef } from "../firebase";

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
  const [profileImage, setProfileImage] = useState(null);

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
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleUploadImage = async () => {
    try {
      console.log("Profile image selected:", profileImage);

      if (profileImage) {
        const filePath = `profile-images/${profileImage}`;
        console.log("Uploading image to:", filePath);

        const fileRef = storageRef(filePath);
        console.log("File Reference:", fileRef);

        await fileRef.put(profileImage);
        console.log("File uploaded successfully!");

        const imageUrl = await fileRef.getDownloadURL();
        console.log("Download URL:", imageUrl);

        const userDocRef = doc(database, "users", authUser.uid);
        await setDoc(userDocRef, { profileImage: imageUrl }, { merge: true });
        console.log("Profile image URL updated in Firestore.");

        // Update local state
        setUserData((userData) => ({
          ...userData,
          profileImage: imageUrl,
        }));

        setProfileImage(null); // Clear selected image
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
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
            alt="Profile"
            src={userData.profileImage || ProfileIcon}
            id="profilepic"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="imageInput"
          />
          <label htmlFor="imageInput" id="uploadButton">
            Upload Image
          </label>
          {/* Button to upload the selected image */}
          {profileImage && (
            <button onClick={handleUploadImage}>Confirm Upload</button>
          )}
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
    </div>
  );
}

export default Profile;
