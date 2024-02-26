import "./Profile.css";

function Profile() {

  return (
    <div id="profile">
      Your Profile
      <div id="profilebox">
        <div id="imagebox">
        </div>
        <div id="userinfo">
          Nickname:<br></br>
          <br></br>
          Email:<br></br>
          <br></br>
          Password:<br></br>
        </div>
      </div>
      <div id="logoutbutton">
        Log Out
      </div>
    </div>
  );
}

export default Profile;
