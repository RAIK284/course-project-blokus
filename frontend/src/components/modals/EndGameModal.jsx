import React, { useState } from "react";
import "./EndGameModal.css";
import AvatarIcon from "../../assets/Avatar.svg";
import { find_open_game, in_online_game, player_id, socket } from "../../gameLogic/lobbies";
import { Link, useNavigate } from "react-router-dom";
import { reset_game } from "../../gameLogic/board";

function EndGameModal({ endPlayers, setEndPlayers, isOpen, setOpen, setClose }) {
    const navigate = useNavigate();

    socket.on('game_over', ( data ) => {
        let endPlayers = data['endPlayers'];
        console.log(endPlayers);
        setEndPlayers(endPlayers);
        setOpen();
    });

    const playAgainClick = () => {
        reset_game();
        setClose();
        if (in_online_game){
            find_open_game();
        } else {
            navigate('/game');
        }
    };

    const returnHomeClick = () => {
        navigate('/home');
    };

    return (
        isOpen && (
            <div id="endModalOverlay">
                <div id="endModal">
                    <div id="endModalContent">
                        {
                            in_online_game && endPlayers[0].name == player_id ?
                                <div id="endTitleTxt">YOU WON!</div>
                            :
                                in_online_game ?
                                    <div id="endTitleTxt">YOU LOST.</div>
                                :
                                    <div id="endTitleTxt">{endPlayers[0].name.toUpperCase()} WINS!</div>
                        }
                        <div className="endPlayerHolder">
                            <div className="endPlayerRank">1st</div>
                            <div className="endPlayerName">
                                <img className={`endPlayerAvatar end${endPlayers[0].color}`} src={AvatarIcon} />
                                <div>{endPlayers[0].name}</div>
                            </div>
                            <div className="endPlayerScore">{endPlayers[0].score}</div>
                        </div>
                        <div className="endPlayerHolder">
                            <div className="endPlayerRank">2nd</div>
                            <div className="endPlayerName">
                                <img className={`endPlayerAvatar end${endPlayers[1].color}`} src={AvatarIcon} />
                                <div>{endPlayers[1].name}</div>
                            </div>
                            <div className="endPlayerScore">{endPlayers[1].score}</div>
                        </div>
                        <div className="endPlayerHolder">
                            <div className="endPlayerRank">3rd</div>
                            <div className="endPlayerName">
                                <img className={`endPlayerAvatar end${endPlayers[2].color}`} src={AvatarIcon} />
                                <div>{endPlayers[2].name}</div>
                            </div>
                            <div className="endPlayerScore">{endPlayers[2].score}</div>
                        </div>
                        <div className="endPlayerHolder">
                            <div className="endPlayerRank">4th</div>
                            <div className="endPlayerName">
                                <img className={`endPlayerAvatar end${endPlayers[3].color}`} src={AvatarIcon} />
                                <div>{endPlayers[3].name}</div>
                            </div>
                            <div className="endPlayerScore">{endPlayers[3].score}</div>
                        </div>
                        <div id="endButtonHolder">
                            <div id="playAgainBtn" onClick={playAgainClick}>Play Again</div>
                            <div id="returnHomeBtn" onClick={returnHomeClick}>Return Home</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default EndGameModal;
