import "./Leaderboard.css";
import Ranking from "../components/Ranking";
import AvatarIcon from "../assets/Avatar.svg";
import { useEffect, useState } from "react";
import database, { auth } from "../firebase";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { useAuth } from "./Auth/AuthContext";

function Leaderboard() {

  const { authUser, setAuthUser } = useAuth();
  const [userData, setUserData] = useState("");
  const [usersData, setUsersData] = useState("");



  const sortedData = [];
  // const [nickname, setNickname] = useState("Loading ...");
  // const [email, setEmail] = useState("Loading ...");
  // const [editMode, setEditMode] = useState(false);
  // const [isNicknameDirty, setIsNicknameDirty] = useState(false);
  // const [isEmailDirty, setIsEmailDirty] = useState(false);
  // const [message, setMessage] = useState("");

  // get all the firestore info for the current logged in user
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDocRef = doc(database, "users", authUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {

          const userData = userDocSnapshot.data();
          console.log(userData);
          setUserData(userData);
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

  // get all the firestore info for the users
  useEffect(() => {
      const getUsersData = async () => {
        try {
          const usersCollectionRef = collection(database, "users");
          const usersSnapshot = await getDocs(usersCollectionRef);

          const usersData = [];
          usersSnapshot.forEach(doc => {
            if (doc.exists()) {
              usersData.push(doc.data());
            } else {
              console.log("Document does not exist for user with ID:", doc.id);
            }
          });

          console.log(usersData);
        } catch (error) {
          console.error("Error fetching users data:", error);
        }
      };

      getUsersData();
  }, []);

  // sorting all the users 
  // sortedData = getUsersData().sort(function(a, b) {
  //   return parseFloat(a.totalPieces) - parseFloat(b.totalPieces);
  // });

  console.log(usersData.sort((a, b) => parseFloat(a.totalPieces) - parseFloat(b.totalPieces)));


  


  
  return <div id="leaderboard">

    <div id="individualContainer">
      <div id="individualTitle">{userData.nickname}'s stats</div>
      <img id="individualAvatar" src={AvatarIcon} alt="Avatar" />
      <div className="individualInfo">rank: #1</div>
      <div className="individualInfo">score: 97</div>
      <div className="individualInfo">wins: 24</div>
      <div className="individualInfo">losses: 2</div>
    </div>

    <div id="globalContainer">
      <div id="globalTitle">Global Leaderboard</div>
      <div id="subtitles">
        <div>Rank</div>
        <div id="nameMargin">Name</div>
        <div>Score</div>
      </div>
      <div id="rankings">
        <Ranking rank="1" name="catluver123" score="97" />
        <Ranking rank="2" name="user38501346" score="85" />
        <Ranking rank="3" name="player3" score="80" />
        <Ranking rank="4" name="player4" score="74" />
        <Ranking rank="5" name="chicken" score="36" />
        <Ranking rank="6" name="PikePresident" score="35" />
        <Ranking rank="7" name="user023487" score="29" />
        <Ranking rank="8" name="IDK" score="23" />
        <Ranking rank="9" name="funfriend" score="18" />
        <Ranking rank="10" name="iloveblocks" score="17" />
        <div id="dotdotdot">. . .</div>
        <Ranking rank="45" name={userData.nickname} score={userData.totalPieces} />
      </div>
    </div>

  </div>;
}

export default Leaderboard;
