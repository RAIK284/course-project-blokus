# Blokus

<strong>Installations Needed (cd into respective folders):</strong>

- Backend Folder: <strong>pip install Flask Flask-SocketIO Flask-Cors</strong>
- Frontend Folder: <strong>npm install</strong>

<strong>How to Run:</strong>

- Open two terminals in VSCode
- In terminal one, enter the command: <strong>cd backend | python app.py</strong>
- In terminal two, enter the command: <strong>cd frontend | npm start</strong>
- The app is now running at the url <strong>localhost:3000</strong>

<strong>Code Structure</strong><br/>
&nbsp;&nbsp;The frontend stores the game logic and user interfaces for the game. It uses a page/component rendering style to retrieve and display game data. Our user authentication system is also in our frontend and utilizes Firebase Authentication. User information and statistics are stored using Firebase Cloud Storage.</br>
&nbsp;&nbsp;Our backend houses web sockets that facilitate online gameplay. These routes are called from a game lobby in the frontend, then emit game data to every user in a specific game lobby.

File Tree:

    /Blokus
    ├── README.md
    ├── backend
    │   └── app.py
    └── frontend
        ├── babel.config.js
        ├── jest.config.js
        ├── package-lock.json
        ├── package.json
        ├── public
        │   ├── favicon.ico
        │   ├── index.html
        │   ├── manifest.json
        │   └── robots.txt
        ├── src
        │   ├── Router.jsx
        │   ├── assets
        │   │   ├── * all of our images *
        │   ├── components
        │   │   ├── Avatar.css
        │   │   ├── Avatar.jsx
        │   │   ├── Board.css
        │   │   ├── Board.jsx
        │   │   ├── BoardBlock.css
        │   │   ├── BoardBlock.jsx
        │   │   ├── KeyHolder.css
        │   │   ├── KeyHolder.jsx
        │   │   ├── PieceBlock.css
        │   │   ├── PieceBlock.jsx
        │   │   ├── PieceBox.css
        │   │   ├── PieceBox.jsx
        │   │   ├── PieceHolder.css
        │   │   ├── PieceHolder.jsx
        │   │   ├── Ranking.css
        │   │   ├── Ranking.jsx
        │   │   ├── home page pieces
        │   │   │   ├── BlueBlock.css
        │   │   │   ├── BlueBlock.jsx
        │   │   │   ├── GreenBlock.css
        │   │   │   ├── GreenBlock.jsx
        │   │   │   ├── RedBlock.css
        │   │   │   └── RedBlock.jsx
        │   │   └── modals
        │   │       ├── EndGameModal.css
        │   │       ├── EndGameModal.jsx
        │   │       ├── RulesModal.css
        │   │       ├── RulesModal.jsx
        │   │       ├── StartOrJoinGameModal.css
        │   │       └── StartOrJoinGameModal.jsx
        │   ├── firebase.js
        │   ├── gameLogic
        │   │   ├── board.js
        │   │   ├── bot.js
        │   │   ├── checks.js
        │   │   ├── lobbies.js
        │   │   ├── pieceData.js
        │   │   └── playerData.js
        │   ├── index.css
        │   ├── index.js
        │   ├── layout
        │   │   ├── App.css
        │   │   ├── App.jsx
        │   │   ├── NavBar.css
        │   │   └── NavBar.jsx
        │   └── pages
        │       ├── Auth
        │       │   ├── AuthContext.js
        │       │   ├── AuthDetails.jsx
        │       │   ├── Login.css
        │       │   ├── Login.jsx
        │       │   ├── SignUp.css
        │       │   └── SignUp.jsx
        │       ├── Game.css
        │       ├── Game.jsx
        │       ├── Home.css
        │       ├── Home.jsx
        │       ├── Landing.css
        │       ├── Landing.jsx
        │       ├── Leaderboard.css
        │       ├── Leaderboard.jsx
        │       ├── Profile.css
        │       └── Profile.jsx
        └── tests
            ├── checks.test.js
            └── playerData.test.js
