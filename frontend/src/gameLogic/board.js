import { players, player_pieces, playable_pieces, can_play } from './player_data';
import { pieces } from './piece_data';

export let board_matrix = Array.from({ length: 20 }, () => Array(20).fill(''));
board_matrix[0][0] = 'red';
board_matrix[1][0] = 'red';
board_matrix[2][0] = 'red';
board_matrix[3][0] = 'red';
board_matrix[19][16] = 'blue';
board_matrix[19][17] = 'blue';
board_matrix[19][18] = 'blue';
board_matrix[19][19] = 'blue';


// check if game is over (no one can play any pieces)
export function is_game_over(){
    if (!can_play['yellow'] && !can_play['red'] && !can_play['blue'] && !can_play['green'])
        return true;
    return false;
}

// check if the game is over for players
export function set_player_game_overs() {
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
                    } else {
                        playable_pieces[player][piece_index] = false;
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
                    }
                }
            }
        }
    }
    if (all_blocks_valid && has_diagonals)
        return true;
    return false;
}

// check if the block is valid (fits within rule sets)
function valid_block(r, c, player){
    let not_past_walls = r >= 0 && r < board_matrix.length && c >= 0 & c < board_matrix[r].length;
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