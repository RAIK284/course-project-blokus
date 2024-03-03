import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import StartOrJoinGameModal from "../components/modals/StartOrJoinGameModal.jsx";
import "../components/PieceBlock.css";
import RedBlock from "../components/home page pieces/RedBlock.jsx";
import GreenBlock from "../components/home page pieces/GreenBlock.jsx";
import BlueBlock from "../components/home page pieces/BlueBlock.jsx";

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
          <div id="leaderboardButtonContainer">
            <RedBlock />
            <span id="leaderboardText">Leaderboard</span>
          </div>
        </Link>

        <div id="horizontalGap"></div>

        <div id="playButtonContainer" onClick={openStartOrJoinGameModal}>
          <GreenBlock />
          <span id="playText">Play</span>
        </div>

        <div id="horizontalGap"></div>

        <Link to="/profile">
          <div id="profileButtonContainer">
            <BlueBlock />
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
