from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import requests
import random

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app,cors_allowed_origins="*")

# key: lobby code, value: {players, board, startedGame}
game_lobbies = {}

@app.route("/test", methods=['GET'])
def test():
    return jsonify('test')

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('create_game')
def handle_create_game(data):
    player_id = data['playerId']
    lobby_code = str(random.randint(0, 999999)).zfill(6)
    while lobby_code in game_lobbies:
        lobby_code = str(random.randint(0, 999999)).zfill(6)
    game_lobbies[lobby_code] = {
        'players': [],
        'board': [[]],
        'startedGame': False
    }
    print('New game lobby created: ' + str(lobby_code))
    socketio.emit('game_created', {'lobbyCode': lobby_code, 'playerId': player_id})

@socketio.on('join_game')
def handle_join_game(data):
    player_id = data['playerId']
    lobby_code = data['lobbyCode']
    if lobby_code not in game_lobbies:
        print('Invalid game lobby')
        socketio.emit('invalid_lobby', {'playerId': player_id})
    else:
        currentPlayers = game_lobbies[lobby_code]['players']
        # if lobby not full, add player to current players in lobby
        if len(currentPlayers) <= 3 and player_id not in currentPlayers:
            currentPlayers.append(player_id)
            print('Player joined game lobby: ' + str(lobby_code))
            socketio.emit('joined_game', {'lobbyCode': lobby_code, 'playerId': player_id})
        elif len(currentPlayers) >= 4:
            print('Lobby full: ' + str(lobby_code))
            socketio.emit('lobby_full', {'lobbyCode': lobby_code, 'playerId': player_id})
        print(game_lobbies)

@socketio.on('find_open_game')
def handle_find_open_game(data):
    player_id = data['playerId']
    for lobby_code, lobby_data in game_lobbies.items():
        players = lobby_data['players']
        startedGame = lobby_data['startedGame']
        if len(players) < 4 and startedGame == False:
            socketio.emit('open_game_found', {'lobbyCode': lobby_code, 'playerId': player_id})
            return
    socketio.emit('no_open_game_found', {'playerId': player_id})

@socketio.on('piece_played')
def handle_piece_played(data):
    lobby_code = data['lobbyCode']
    board = data['board']
    game_lobbies[lobby_code]['board'] = board
    print('Piece successfully played, lobby: ' + str(lobby_code))
    socketio.emit('piece_played', {'lobbyCode': lobby_code, 'board': board})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    app.run(debug=True)