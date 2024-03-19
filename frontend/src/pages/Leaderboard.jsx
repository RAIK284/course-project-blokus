import "./Leaderboard.css";
import Ranking from "../components/Ranking";
import AvatarIcon from "../assets/Avatar.svg";

function Leaderboard() {
  return <div id="leaderboard">

    <div id="individualContainer">
      <div id="individualTitle">catluver123's stats</div>
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
        <Ranking rank="45" name="you" score="2" />
      </div>
    </div>

  </div>;
}

export default Leaderboard;
