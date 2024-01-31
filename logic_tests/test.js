let board = Array.from({ length: 20 }, () => Array(20).fill(''));

let players = ['yellow', 'red', 'blue', 'green'];

let pieces = [
    [ 
        [1, 1, 1, 1, 1]
    ],
    [
        [1, 1],
        [1, 0]
    ],
    [
        [1, 1, 1, 1],
        [0, 0, 0, 1]
    ],
    [
        [1, 1, 1],
        [1, 0, 1]
    ],
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [1]
    ],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [1, 1, 1, 1]
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [0, 1],
        [0, 1],
        [1, 1]
    ],
    [
        [1, 1, 1, 1],
        [0, 0, 1, 0]
    ],
    [
        [1, 1, 0],
        [1, 1, 1]
    ],
    [
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [1],
        [1]
    ],
    [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, 0]
    ],
    [
        [1, 1, 1]
    ],
    [
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 1]
    ]
];

// there are 21 pieces, each has a set index; true means the player has the piece
let player_pieces = {
    yellow: Array(21).fill(true),
    red: Array(21).fill(true),
    blue: Array(21).fill(true),
    green: Array(21).fill(true),
}

// which pieces can actually be played
let playable_pieces = {
    yellow: Array(21).fill(true),
    red: Array(21).fill(true),
    blue: Array(21).fill(true),
    green: Array(21).fill(true),
}

// who is still in the game
let can_play = {
    yellow: true,
    red: true,
    blue: true,
    green: true,
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
        // loop through board
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
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
function can_play_piece(boardRow, boardCol, piece_index, player){
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
                        diagonals = true;
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
    let not_past_walls = r >= 0 && r < board.length && c >= 0 & c < board[r].length;
    if (not_past_walls) {
        let block_empty = board[r][c] == '';
        let not_touching_own_blocks = 
            (r == board.length - 1 || board[r + 1][c] != player) && 
            (r == 0 || board[r - 1][c] != player) && 
            (c == board[0].length - 1 || board[r][c + 1] != player) && 
            (c == 0 || board[r][c - 1] != player);
        if (block_empty && not_touching_own_blocks)
            return true;
    }
    return false;
}

// check if the block has diagonal touch with correct circumstances
function diagonals_present(r, c, player){
    // top left
    if (r > 0 && c > 0 && board[r - 1][c - 1] == player && board[r - 1][c] != player && board[r][c - 1] != player)
        return true;
    // bottom left
    else if (r < board.length - 1 && c < board[0].length - 1 && board[r + 1][c + 1] == player && board[r + 1][c] != player && board[r][c + 1] != player)
        return true;
    // top right
    else if (r > 0 && c < board[0].length - 1 && board[r - 1][c + 1] == player && board[r - 1][c] != player && board[r][c + 1] != player)
        return true;
    // bottom right
    else if (r < board.length - 1 && c > 0 && board[r + 1][c - 1] == player && board[r + 1][c] != player && board[r][c - 1] != player)
        return true;
    return false;
}

// -------------------------------------------------------------

console.log("start");

// simulates 4 rounds
players.forEach((player) => {
    // checks if the current player is still in the game
    if (can_play[player]) {
        //place_piece();
        set_player_game_overs();
        if (is_game_over()){
            // game is done
        }
    }
});

console.log("end");