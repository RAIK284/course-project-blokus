import React, { useEffect } from "react";
import "./EndGameModal.css";
import AvatarIcon from "../../assets/Avatar.svg";
import {
  find_open_game,
  in_online_game,
  player_id,
  socket,
} from "../../gameLogic/lobbies";
import { useNavigate } from "react-router-dom";
import { reset_game } from "../../gameLogic/board";

import database from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../../pages/Auth/AuthContext";

function EndGameModal({
  endPlayers,
  setEndPlayers,
  isOpen,
  setOpen,
  setClose,
}) {
  const navigate = useNavigate();
  const { authUser } = useAuth();

  socket.on("game_over", (data) => {
    let endPlayers = data["endPlayers"];
    setEndPlayers(endPlayers);
    setOpen();
  });

  const playAgainClick = () => {
    reset_game();
    setClose();
    if (in_online_game) {
      find_open_game();
    } else {
      navigate("/game");
    }
  };

  const returnHomeClick = () => {
    navigate("/home");
  };

  const updateUserData = async () => {
    let userData;
    // fetching user values
    try {
      const userDocRef = doc(database, "users", authUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        userData = userDocSnapshot.data();
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    // setting new user values
    try {
      // identify the user info we want to change
      const docRef = doc(database, "users", authUser.uid);
      // get user game information
      const userGameInfo = endPlayers.find(
        (player) => player.name === userData.nickname
      );
      const wonGame = userData.nickname === endPlayers[0].name;
      // set the fields we want to change
      const payload = {
        nickname: userData.nickname,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImage: userData.profileImage,
        gamesPlayed: userData.gamesPlayed + 1,
        gamesWon: userData.gamesWon + (wonGame ? 1 : 0),
        totalPieces: userData.totalPieces + userGameInfo.score,
      };
      // actually update in the database
      setDoc(docRef, payload);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (in_online_game) {
      updateUserData();
    }
  }, [authUser]);

  return (
    isOpen && (
      <div id="endModalOverlay">
        <div id="endModal">
          <div id="endModalContent">
            {in_online_game && endPlayers[0].name === player_id ? (
              <div id="endTitleTxt">YOU WON!</div>
            ) : in_online_game ? (
              <div id="endTitleTxt">YOU LOST.</div>
            ) : (
              <div id="endTitleTxt">
                {endPlayers[0].name.toUpperCase()} WINS!
              </div>
            )}
            <div className="endPlayerHolder">
              <div className="endPlayerRank">1st</div>
              <div className="endPlayerName">
                <img
                  className={`endPlayerAvatar end${endPlayers[0].color}`}
                  src={AvatarIcon}
                  alt="Avatar"
                />
                <div>{endPlayers[0].name}</div>
              </div>
              <div className="endPlayerScore">{endPlayers[0].score}</div>
            </div>
            <div className="endPlayerHolder">
              <div className="endPlayerRank">2nd</div>
              <div className="endPlayerName">
                <img
                  className={`endPlayerAvatar end${endPlayers[1].color}`}
                  src={AvatarIcon}
                  alt="Avatar"
                />
                <div>{endPlayers[1].name}</div>
              </div>
              <div className="endPlayerScore">{endPlayers[1].score}</div>
            </div>
            <div className="endPlayerHolder">
              <div className="endPlayerRank">3rd</div>
              <div className="endPlayerName">
                <img
                  className={`endPlayerAvatar end${endPlayers[2].color}`}
                  src={AvatarIcon}
                  alt="Avatar"
                />
                <div>{endPlayers[2].name}</div>
              </div>
              <div className="endPlayerScore">{endPlayers[2].score}</div>
            </div>
            <div className="endPlayerHolder">
              <div className="endPlayerRank">4th</div>
              <div className="endPlayerName">
                <img
                  className={`endPlayerAvatar end${endPlayers[3].color}`}
                  src={AvatarIcon}
                  alt="Avatar"
                />
                <div>{endPlayers[3].name}</div>
              </div>
              <div className="endPlayerScore">{endPlayers[3].score}</div>
            </div>
            <div id="endButtonHolder">
              <div id="playAgainBtn" onClick={playAgainClick}>
                Play Again
              </div>
              <div id="returnHomeBtn" onClick={returnHomeClick}>
                Return Home
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default EndGameModal;
