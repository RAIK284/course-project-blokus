# Blokus

Installations Needed (cd into respective folders):

- Backend Folder: <strong>pip install Flask Flask-SocketIO Flask-Cors</strong>
- Frontend Folder: <strong>npm install</strong>

How to Run:

- Open two terminals in VSCode
- In terminal one, enter the command: <strong>cd backend | python app.py</strong>
- In terminal two, enter the command: <strong>cd frontend | npm start</strong>
- The app is now running at the url <strong>localhost:3000</strong>

File Tree:

    /Blokus
    ├── README.md
    ├── backend
    │   ├── __pycache__
    │   │   ├── board.cpython-311.pyc
    │   │   ├── piece_data.cpython-311.pyc
    │   │   └── player_data.cpython-311.pyc
    │   └── app.py
    └── frontend
        ├── babel.config.js
        ├── coverage
        │   ├── clover.xml
        │   ├── coverage-final.json
        │   ├── lcov-report
        │   │   ├── base.css
        │   │   ├── block-navigation.js
        │   │   ├── favicon.png
        │   │   ├── index.html
        │   │   ├── prettify.css
        │   │   ├── prettify.js
        │   │   ├── sort-arrow-sprite.png
        │   │   └── sorter.js
        │   └── lcov.info
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
        │   │   ├── Avatar.svg
        │   │   ├── Back button.svg
        │   │   ├── CheckIcon.svg
        │   │   ├── Help Icon.svg
        │   │   ├── Home Icon.svg
        │   │   ├── ProfileIcon.svg
        │   │   └── _X_.svg
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
