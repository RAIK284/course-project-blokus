import { players, player_pieces, playable_pieces, can_play, end_turn, determine_winner, reset_player_data } from './playerData';
import { pieces, reset_pieces, rotate_piece } from './pieceData';

export let board_matrix = Array.from({ length: 20 }, () => Array(20).fill(''));

export function reset_game(){
    board_matrix = Array.from({ length: 20 }, () => Array(20).fill(''));
    reset_player_data();
}

// play a piece on the board (basically performs a player's turn)
export function play_piece(boardRow, boardCol, player, piece_index){
    let piece = pieces[piece_index];
    // loop through piece 2d array
    for (let r = 0; r < piece.length; r++){
        for (let c = 0; c < piece[r].length; c++ ){
            if (piece[r][c] == 1){
                board_matrix[boardRow + r][boardCol + c] = player;
            }
        }
    }
    player_pieces[player][piece_index] = false;
    end_round_checks();
}

// plays a piece on the board randomly if player timer runs out
export function play_random_piece(player, descending = false){
    // create array of all 21 piece indeces
    let indeces_array = [];
    for (let i = 20; i >= 0; i--) {
        indeces_array.push(i);
    }
    if (!descending){
        // randomly sort the array of indeces
        indeces_array.sort(() => Math.random() - 0.5);
    }
    while (indeces_array.length > 0){
        // get random piece index
        let piece_index = indeces_array[0];
        // if player has that piece
        if (player_pieces[player][piece_index]){
            // all possible plays with that piece (each item being 2d matrix of row, col and rotations)
            let possible_piece_plays = [];
            // loop through each rotation
            for (let rotation = 0; rotation < 3; rotation++){
                // loop through board 2d array
                for (let boardRow = 0; boardRow < board_matrix.length; boardRow++) {
                    for (let boardCol = 0; boardCol < board_matrix[boardRow].length; boardCol++) {
                        // check if a piece can be played at the spot, if so add to possible plays
                        if (can_play_piece(boardRow, boardCol, piece_index, player)){
                            possible_piece_plays.push([boardRow, boardCol, rotation]);
                        }
                    }
                }
                rotate_piece(piece_index);
            }
            reset_pieces();
            // if there is a possible play
            if (possible_piece_plays.length > 0){
                // get random play from possible plays, play it
                let possiblePlaysIndex = Math.floor(Math.random() * possible_piece_plays.length);
                let randomPlay = possible_piece_plays[possiblePlaysIndex];
                let playRotations = randomPlay[2];
                // rotate back to random play piece rotation
                for (let revertRotation = 0; revertRotation < playRotations; revertRotation++){
                    rotate_piece(piece_index);
                }
                play_piece(randomPlay[0], randomPlay[1], player, piece_index);
                reset_pieces();
                return;
            }
        }
        indeces_array.shift();
    }
}

// checks to do after every round
function end_round_checks(){
    set_player_game_overs();
    if (is_game_over()){
        alert("game over");
        alert("winner: " + determine_winner());
    } else {
        end_turn();
    }
}

// check if game is over (no one can play any pieces)
function is_game_over(){
    if (!can_play['yellow'] && !can_play['red'] && !can_play['blue'] && !can_play['green'])
        return true;
    return false;
}

// check if the game is over for players
function set_player_game_overs() {
    // loop through players
    players.forEach((player) => {
        let player_can_play = false;
        // loop through board_matrix
        for (let row = 0; row < board_matrix.length; row++) {
            for (let col = 0; col < board_matrix[row].length; col++) {
                // loop through pieces
                for (let piece_index = 0; piece_index < pieces.length; piece_index++){
                    // which pieces can the player play, if any at all?
                    if (player_pieces[player] && can_play_piece(row, col, piece_index, player)){
                        player_can_play = true;
                        //playable_pieces[player][piece_index] = true;
                    } else {
                        //playable_pieces[player][piece_index] = false;
                    }
                }
            }
        }
        // sets if the player can play any pieces
        can_play[player] = player_can_play;
    });
}

// checks if pieces can be played based on their piece index
export function can_play_piece(boardRow, boardCol, piece_index, player){
    let piece = pieces[piece_index];
    let has_diagonals = false;
    let on_board_edge = false;
    let all_blocks_valid = true;
    // loop through piece 2d array
    for (let r = 0; r < piece.length; r++){
        for (let c = 0; c < piece[r].length; c++ ){
            // if current block isn't empty
            if (piece[r][c] == 1){
                if (!valid_block(boardRow + r, boardCol + c, player)){
                    all_blocks_valid = false;
                    break;
                } else {
                    if (diagonals_present(boardRow + r, boardCol + c, player)){
                        has_diagonals = true;
                    } else if (on_player_edge(boardRow + r, boardCol + c, player)){
                        on_board_edge = true;
                    }
                }
            }
        }
    }
    if (all_blocks_valid && (has_diagonals || on_board_edge))
        return true;
    return false;
}

// check if the block is valid (fits within rule sets)
function valid_block(r, c, player){
    let not_past_walls = r >= 0 && r < board_matrix.length && c >= 0 && c < board_matrix[r].length;
    if (not_past_walls) {
        let block_empty = board_matrix[r][c] == '';
        let not_touching_own_blocks = 
            (r == board_matrix.length - 1 || board_matrix[r + 1][c] != player) && 
            (r == 0 || board_matrix[r - 1][c] != player) && 
            (c == board_matrix[0].length - 1 || board_matrix[r][c + 1] != player) && 
            (c == 0 || board_matrix[r][c - 1] != player);
        if (block_empty && not_touching_own_blocks)
            return true;
    }
    return false;
}

// check if the block has diagonal touch with correct circumstances
function diagonals_present(r, c, player){
    let top_left = 
        r > 0 && c > 0 && 
        board_matrix[r - 1][c - 1] == player && 
        board_matrix[r - 1][c] != player && 
        board_matrix[r][c - 1] != player;
    let bottom_left = 
        r < board_matrix.length - 1 && c < board_matrix[0].length - 1 && 
        board_matrix[r + 1][c + 1] == player && 
        board_matrix[r + 1][c] != player && 
        board_matrix[r][c + 1] != player;
    let top_right = 
        r > 0 && c < board_matrix[0].length - 1 && 
        board_matrix[r - 1][c + 1] == player && 
        board_matrix[r - 1][c] != player && 
        board_matrix[r][c + 1] != player;
    let bottom_right = 
        r < board_matrix.length - 1 && c > 0 && 
        board_matrix[r + 1][c - 1] == player && 
        board_matrix[r + 1][c] != player && 
        board_matrix[r][c - 1] != player;
    if (top_left || bottom_left || top_right || bottom_right)
        return true;
    return false;
}

// check if the block is on the edge the player can play on
function on_player_edge(r, c, player){
    let blue_edge = player == 'blue' && r == 0 && c == 0;
    let red_edge = player == 'red' && r == 0 && c == board_matrix.length - 1;
    let green_edge = player == 'green' && r == board_matrix.length - 1 && c == board_matrix.length - 1;
    let yellow_edge = player == 'yellow' && r == board_matrix.length - 1 && c == 0;
    if (blue_edge || red_edge || green_edge || yellow_edge)
        return true;
    return false;
}