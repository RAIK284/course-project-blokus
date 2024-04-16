import React, { useState, useEffect } from "react";
import AvatarIcon from "../assets/Avatar.svg";
import "./Avatar.css";
import { players } from "../gameLogic/playerData";
import { in_online_game, lobby_code, set_avatar, socket } from "../gameLogic/lobbies";

function Avatar({ player, index, setAvatar }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [ind, setInd] = useState(index);
    const [isPlayer, setIsPlayer] = useState(true);
    let preCalls = 0;

    useEffect(() => {
        if (preCalls == 0 && ind <= 3 && (player == "c1" || player == "c2" || player == "c3" || player == "c4")) {
            preCalls++;
            setIsPlayer(false);
            setInd(prevIndex => prevIndex + 4);
        }
    }, []);

    const openCloseModal = () => {
        if (!isPlayer){
            setModalOpen(!modalOpen);
        }
    }

    const handleAvatarClick = (option) => {
        setAvatar(index, option);
        setInd(prevIndex => prevIndex - 4);
        setModalOpen(!modalOpen);
        setIsPlayer(true);
        if (in_online_game){
            set_avatar(lobby_code, index, option);
        }
    }

    socket.on('avatar_set', (data) => {
        if (in_online_game && lobby_code == data['lobbyCode']){
            let outerIndex = data['index'];
            let outerOption = data['option'];
            setAvatar(outerIndex, outerOption);
            setInd(prevIndex => prevIndex - 4);
            setModalOpen(!modalOpen);
            setIsPlayer(true);
        }
    });

    return (
        <div onClick={openCloseModal} id={`container${ind}`}>
            <img id={`avatar${ind}`} src={AvatarIcon} alt="Avatar" />
            {
                isPlayer ?
                    <div id={`bottomText${ind}`}> {player} </div>
                :
                    <div id={`bottomText${ind}`}> + </div>
            }
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