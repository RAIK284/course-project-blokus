import "./Home.css";
import NavBar from "../components/NavBar.jsx";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div id="home">
      <NavBar></NavBar>
      <h1>Home Page</h1>
      <Link to="/leaderboard">
        <button id="leaderboard">Leaderboard</button>
      </Link>
      <Link to="/game">
        <button id="playGame">Play Game</button>
      </Link>
      <button id="profile">Profile</button>
    </div>
  );
}

export default Home;
