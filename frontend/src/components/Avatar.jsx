import React, { useState, useEffect } from "react";
import AvatarIcon from "../assets/Avatar.svg";
import "./Avatar.css";
import { players } from "../gameLogic/playerData";

function Avatar({ player, index, setAvatar }) {
    const [modalOpen, setModalOpen] = useState(false);

    let bottomText = player
    if (player.includes("bot")){
        switch (index) {
            case 0: player = "blue"; break;
            case 1: player = "yellow"; break;
            case 2: player = "red"; break;
            case 3: player = "green"; break;
        }
    }
    else if (player != "red" && player != "blue" && player != "green" && player != "yellow") {
        bottomText = "+";
    }

    const openCloseModal = () => {
        if (bottomText == "+"){
            setModalOpen(!modalOpen);
        }
    }

    const handleAvatarClick = (option) => {
        setAvatar(index, option);
        setModalOpen(!modalOpen);
    }

    return (
        <div onClick={openCloseModal} id={`${player}Container`}>
            <img id={`${player}Avatar`} src={AvatarIcon} alt="Avatar" />
            <div id={`${player}BottomText`}> {bottomText} </div>
            {
                modalOpen &&
                    <div id="choicePopup">
                        <div onClick={() => handleAvatarClick("local")}>Local Player</div>
                        <div onClick={() => handleAvatarClick("easy")}>Easy Bot</div>
                        <div onClick={() => handleAvatarClick("medium")}>Medium Bot</div>
                        <div onClick={() => handleAvatarClick("hard")}>Hard Bot</div>
                    </div>
            }               
        </div>
    );
}


export default Avatar;