import AvatarIcon from "../assets/Avatar.svg";
import "./Avatar.css";

function Avatar({ player }) {

    let bottomText = player
    if (player == "") {
        player = "computer";
        bottomText = "+";
    }

    return (
        <div id={`${player}Container`}>
            <img id={`${player}Avatar`} src={AvatarIcon} alt="Avatar" />
            <div id={`${player}BottomText`}> {bottomText} </div>                
        </div> 
    );
}


export default Avatar;