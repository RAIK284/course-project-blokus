export let players = ['blue', 'red', 'yellow', 'green'];

// index of which player's turn it is (ex: index 0 = yellow turn)
export let currentPlayerTurnIndex = 0;

export function end_turn(){
    if (currentPlayerTurnIndex == players.length - 1){
        currentPlayerTurnIndex = 0;
    } else {
        currentPlayerTurnIndex++;
    }
}

// there are 21 pieces, each has a set index; true means the player has the piece
export let player_pieces = {
    yellow: Array(21).fill(true),
    red: Array(21).fill(true),
    blue: Array(21).fill(true),
    green: Array(21).fill(true),
}

// which pieces can actually be played
export let playable_pieces = {
    yellow: Array(21).fill(true),
    red: Array(21).fill(true),
    blue: Array(21).fill(true),
    green: Array(21).fill(true),
}

// who is still in the game
export let can_play = {
    yellow: true,
    red: true,
    blue: true,
    green: true,
}