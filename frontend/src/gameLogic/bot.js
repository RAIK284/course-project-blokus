import { board_matrix, play_piece, play_random_piece } from "./board";
import { flip_piece, reset_pieces, rotate_piece } from "./pieceData";
import { player_pieces } from "./playerData";

// router from components to bot play piece functions
export function bot_play_piece(player, difficulty){
    switch (difficulty){
        case "easy": easy_bot_play_piece(player); break;
        case "medium": medium_bot_play_piece(player); break;
        case "hard": hard_bot_play_piece(player); break;
    }
}

// easy bot: randomly places a piece
function easy_bot_play_piece(player){
    play_random_piece(player);
}

// medium bot: plays the largest piece it can
function medium_bot_play_piece(player){
    play_random_piece(player, true);
}

// hard bot: barasona opening into largest piece playing, predicts one turn ahead to see if it will get trapped
function hard_bot_play_piece(player){
    let turn = player_pieces[player].filter(value => value === false).length + 1;
    if (turn == 1){
        // F piece
        let piece_index = 15;
        let rotations = 0;
        let play_location = [-1, -1];
        // find correct rotation count and play location by player
        switch (player){
            case "blue":
                play_location = [0, 0];
                break;
            case "red": 
                play_location = [0, board_matrix.length - 3];
                rotations += 1; 
                break;
            case "yellow": 
                play_location = [board_matrix.length - 3, 0];
                rotations += 3; 
                break;
            case "green": 
                play_location = [board_matrix.length - 3, board_matrix.length - 3];
                rotations += 2; 
                break;
        }
        // rotate piece for player corner to fit barasona play
        for (let rotate = 0; rotate < rotations; rotate++){
            rotate_piece(piece_index);
        }
        play_piece(play_location[0], play_location[1], player, piece_index);
        reset_pieces();
    } 
    else if (turn == 2){
        // X piece
        let piece_index = 5;
        let play_location = [-1, -1];
        // find correct rotation count and play location by player
        switch (player){
            case "blue":
                play_location = [2, 2];
                break;
            case "red": 
                play_location = [2, board_matrix.length - 5];
                break;
            case "yellow": 
                play_location = [board_matrix.length - 5, 2];
                break;
            case "green": 
                play_location = [board_matrix.length - 5, board_matrix.length - 5];
                break;
        }
        play_piece(play_location[0], play_location[1], player, piece_index);
        reset_pieces();
    } 
    else if (turn == 3){
        // W piece
        let piece_index = 10;
        let rotations = 0;
        let play_location = [-1, -1];
        // find correct rotation count and play location by player
        switch (player){
            case "blue":
                play_location = [4, 4];
                rotations += 2;
                break;
            case "red": 
                play_location = [4, board_matrix.length - 7];
                rotations += 3; 
                break;
            case "yellow": 
                play_location = [board_matrix.length - 7, 4];
                rotations += 1; 
                break;
            case "green": 
                play_location = [board_matrix.length - 7, board_matrix.length - 7];
                break;
        }
        // rotate piece for player corner to fit barasona play
        for (let rotate = 0; rotate < rotations; rotate++){
            rotate_piece(piece_index);
        }
        play_piece(play_location[0], play_location[1], player, piece_index);
        reset_pieces();
    } 
    else if (turn == 4){
        // N piece
        let piece_index = -1;
        let rotations = 0;
        let flips = 0;
        let play_location = [-1, -1];
        // find correct rotation count and play location by player
        switch (player){
            case "blue":
                piece_index = 12;
                play_location = [5, 6];
                flips += 1;
                rotations += 3;
                break;
            case "red": 
                piece_index = 17;
                play_location = [5, 10];
                rotations += 1; 
                break;
            case "yellow": 
                piece_index = 17;
                play_location = [10, 5];
                flips += 1;
                break;
            case "green": 
                piece_index = 12;
                play_location = [12, 11];
                break;
        }
        // flip and rotate piece for player corner to fit barasona play
        for (let flip = 0; flip < flips; flip++){
            flip_piece(piece_index);
        }
        for (let rotate = 0; rotate < rotations; rotate++){
            rotate_piece(piece_index);
        }
        play_piece(play_location[0], play_location[1], player, piece_index);
        reset_pieces();
    } 
    else {
        // need to add prediction
        play_random_piece(player, true);
    }
}