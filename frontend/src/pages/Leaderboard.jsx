import "./Leaderboard.css";
import Ranking from "../components/Ranking";
import AvatarIcon from "../assets/Avatar.svg";
import { useEffect, useState } from "react";
import database, { auth } from "../firebase";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { useAuth } from "./Auth/AuthContext";

function Leaderboard() {

  const { authUser } = useAuth();
  const [userData, setUserData] = useState("");
  const [usersData, setUsersData] = useState([]);

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
        usersSnapshot.forEach((doc) => {
          if (doc.exists()) {
            usersData.push(doc.data());
          } else {
            console.log("Document does not exist for user with ID:", doc.id);
          }
        });
        usersData.sort((a, b) => b.totalPieces - a.totalPieces);
        console.log(usersData);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };
    getUsersData();
  }, []);

  const currentUserRank = () => {
    usersData.findIndex(current => current.id === userData.id)
  }; 

  const getTopTen = () => {
    setUsersData(usersData.slice(0, 10));
  };

const userIsInTopTen = () => {
    getTopTen();
    (usersData.find(current => current.id === userData.id) !== undefined);
};


  console.log(userIsInTopTen());

  return <div id="leaderboard">

    <div id="individualContainer">
      <div id="individualTitle">{userData.nickname}'s stats</div>
      <img id="individualAvatar" src={AvatarIcon} alt="Avatar" />
      <div className="individualInfo">rank: #1</div>
      <div className="individualInfo">score: {userData.totalPieces}</div>
      <div className="individualInfo">wins: {userData.gamesWon}</div>
      <div className="individualInfo">losses: {userData.gamesPlayed - userData.gamesWon}</div>
    </div>

    <div id="globalContainer">
      <div id="globalTitle">Global Leaderboard</div>
      <div id="subtitles">
        <div>Rank</div>
        <div id="nameMargin">Name</div>
        <div>Score</div>
      </div>
      <div id="rankings">
        {usersData.map((oneUsersData, index) => (
          <Ranking rank={index+1} name={oneUsersData.nickname} score={oneUsersData.totalPieces} />
        ))}

        {(!userIsInTopTen()) &&
          (<><div id="dotdotdot">. . .</div>
            <Ranking rank={currentUserRank} name={userData.nickname} score={userData.totalPieces} /> </>)
        }

      </div>
    </div>

  </div>;
}

export default Leaderboard;
