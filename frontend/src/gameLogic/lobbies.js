import io from 'socket.io-client';
import { currentPlayerTurnIndex } from './playerData';

export const socket = io('http://localhost:5000');
export let in_online_game = false;
export let lobby_code = -1;
export let player_id = "";
export let player_name = "";
export let player_email = "";

export function set_lobby_code(value) {
    lobby_code = value;
}

export function set_in_online_game(value) {
    in_online_game = value;
}

export function set_player_id(value) {
    player_id = value;
}

export function set_player_name(value) {
    player_name = value;
}

export function set_player_email(value) {
    player_email = value;
}

export const create_game = () => {
    console.log(player_id)
    socket.emit('create_game', {
        playerId: player_id,
        playerName: player_name
    });
};

export const start_game = (lobbyCode) => {
    socket.emit('start_game', {
        lobbyCode: lobbyCode
    });
};

export const join_game = (lobbyCode) => {
    console.log(player_name)
    socket.emit('join_game', {
        lobbyCode: lobbyCode,
        playerId: player_id,
        playerName: player_name
    });
};

export const find_open_game = () => {
    socket.emit('find_open_game', {
        playerId: player_id
    });
};

export const set_avatar = (lobbyCode, index, option) => {
    socket.emit('set_avatar', {
        lobbyCode: lobbyCode,
        playerId: player_id,
        index: index,
        option: option
    });
}

export const piece_played = (lobbyCode, board, bot_played) => {
    if (bot_played) {
        socket.emit('piece_played', {
            lobbyCode: lobbyCode,
            board: board,
            playerId: -1,
            turn: currentPlayerTurnIndex
        });
    } else {
        socket.emit('piece_played', {
            lobbyCode: lobbyCode,
            board: board,
            playerId: player_id,
            turn: currentPlayerTurnIndex
        });
    }
}

export const game_over = (lobbyCode, end_players) => {
    socket.emit('game_over', {
        lobbyCode: lobbyCode,
        endPlayers: end_players
    });
};
