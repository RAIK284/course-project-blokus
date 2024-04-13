import io from 'socket.io-client';
import { board_matrix } from './board';

export const socket = io('http://localhost:5000');
export let in_online_game = false;
export let lobby_code = -1;

export function set_lobby_code(value){
    lobby_code = value;
}

export function set_in_online_game(value){
    in_online_game = value;
}

export const create_game = () => {
    socket.emit('create_game');
}

export const join_game = (lobbyCode) => {
    socket.emit('join_game', { 
        lobbyCode: lobbyCode,
        playerName: 'b'
    });
}

export const piece_played = (lobbyCode, board) => {
    socket.emit('piece_played', { 
        lobbyCode: lobbyCode,
        board: board
    });
}

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});