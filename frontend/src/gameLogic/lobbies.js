import io from 'socket.io-client';
import { board_matrix } from './board';

export const socket = io('http://localhost:5000');

export const join_game = ( lobbyCode ) => {
    socket.emit('join_game', { 
        lobbyCode: lobbyCode,
        playerName: 'b'
    });
}

export const piece_played = ( lobbyCode, board ) => {
    socket.emit('piece_played', { 
        lobbyCode: lobbyCode,
        board: board
    });
}

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('lobby_full', ( data ) => {
    let lobbyCode = data['lobbyCode'];
    console.log('Lobby ' + lobbyCode + ' is full!');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});