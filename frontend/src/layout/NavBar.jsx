import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import HomeIcon from "../assets/Home Icon.svg";
import HelpIcon from "../assets/Help Icon.svg";
import RulesModal from "../components/modals/RulesModal.jsx";

function NavBar({ isLoggedIn }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="navBar">
      {isLoggedIn && (
        <Link to="/home">
          <img src={HomeIcon} alt="Home" id="homeButton" />
        </Link>
      )}

      <Link to={isLoggedIn ? "/home" : "/"}>
        <span id="navBarTitle">BLOKUS</span>
      </Link>

      {isLoggedIn && (
        <img src={HelpIcon} alt="Help" id="helpButton" onClick={openModal} />
      )}

      <RulesModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default NavBar;
