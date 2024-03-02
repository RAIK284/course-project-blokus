import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import StartOrJoinGameModal from "../components/modals/StartOrJoinGameModal.jsx";
import LogoSvg from "../assets/Big BLOKUS.svg";
import PieceBlock from "../components/PieceBlock.jsx";
import "../components/PieceBlock.css";
import RedPiece from "../assets/LeaderBoard.svg";
import GreenPiece from "../assets/Play.svg";
import BluePiece from "../assets/Profile.svg";

function Home() {
  const [isStartOrJoinGameModalOpen, setStartOrJoinGameModalOpen] =
    useState(false);

  const openStartOrJoinGameModal = () => {
    setStartOrJoinGameModalOpen(true);
  };

  const closeStartOrJoinGameModal = () => {
    setStartOrJoinGameModalOpen(false);
  };

  return (
    <div id="home">
      <span id="homeTitle">BLOKUS</span>

      <div id="homePageButtons">
        <Link to="/leaderboard">
          <div id="leaderBoardButtonContainer">
            <img src={RedPiece} alt="RedPiece" id="redSVG" />
            <span id="leaderboardText">Leaderboard</span>
          </div>
        </Link>

        <div id="horizontalGap"></div>

        <div id="playButtonContainer" onClick={openStartOrJoinGameModal}>
          <img src={GreenPiece} alt="GreenPiece" />
          <span id="playGameText">Play</span>
        </div>

        <div id="horizontalGap"></div>

        <Link to="/profile">
          <div id="profileButtonContainer">
            <img src={BluePiece} alt="BluePiece" />
            <span id="profileText">Profile</span>
          </div>
        </Link>
        <StartOrJoinGameModal
          isOpen={isStartOrJoinGameModalOpen}
          onClose={closeStartOrJoinGameModal}
        />
      </div>
    </div>
  );
}

export default Home;
