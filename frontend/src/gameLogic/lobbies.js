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

socket.on('piece_played', ( data ) => {
    let lobbyCode = data['lobbyCode'];
    let board = data['board'];
    // set board_matrix to board
    if (board){
        const board_dimensions = 20;
        for (let r = 0; r < board_dimensions; r++) {
            for (let c = 0; c < board_dimensions; c++) {
                board_matrix[r][c] = board[r][c];
            }
        }
    }
    console.log('Piece played, back to frontend, lobby: ' + lobbyCode);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});