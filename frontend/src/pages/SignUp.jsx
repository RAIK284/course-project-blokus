import "./SignUp.css";

function SignUp() {

  return (
    <div id="signup">
      Sign Up Now!
      <div id="profilebox">
        <div id="imagebox">
        </div>
        <div id="userinfo">
          <div id="infobox">
            Nickname:
            <br></br>
            <br></br>
            <div id="textbox">
            <input type="text" size="40"/>
            </div>
          </div>
          <div id="infobox">
            Username:
            <br></br>
            <br></br>
            <div id="textbox">
            <input type="text" size="40"/>
            </div>
          </div>
          <div id="infobox">
            Password:
            <br></br>
            <br></br>
            <div id="textbox">
            <input type="text" size="40"/>
            </div>
          </div>
        </div>
      </div>
      <div id="logoutbutton">
        Log Out
      </div>
    </div>
  );
}

export default SignUp;
