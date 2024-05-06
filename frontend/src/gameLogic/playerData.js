export let players = ["blue", "red", "yellow", "green"];

export let bots_playing = ["", "", "", ""];

// index of which player's turn it is (ex: index 0 = yellow turn)
export let currentPlayerTurnIndex = 0;

export function set_turn_index(value) {
  currentPlayerTurnIndex = value;
}

export function reset_player_data() {
  currentPlayerTurnIndex = 0;
  player_pieces = {
    yellow: Array(21).fill(true),
    red: Array(21).fill(true),
    blue: Array(21).fill(true),
    green: Array(21).fill(true),
  };
  can_play = {
    yellow: true,
    red: true,
    blue: true,
    green: true,
  };
  bots_playing = ["", "", "", ""];
}

export function end_turn() {
  if (currentPlayerTurnIndex === players.length - 1) {
    currentPlayerTurnIndex = 0;
  } else {
    currentPlayerTurnIndex++;
  }
  // if new player can't play, then end turn again
  if (!can_play[players[currentPlayerTurnIndex]]) {
    end_turn();
  } else {
    return currentPlayerTurnIndex;
  }
}

export function determine_winner(
  playerNames,
  player_pieces,
  total_blocks_for_player,
  pieces_blocks_counts
) {
  let endPlayers = [];
  playerNames.forEach((player, index) => {
    let endPlayer = {
      name: "",
      score: (total_blocks_for_player + 1) * -1,
      color: "",
    };
    let color = players[index];
    let total_placed = 0;
    let score = 0;
    for (let i = 0; i < player_pieces[color].length; i++) {
      if (player_pieces[color][i]) {
        let piece_size = pieces_blocks_counts[i];
        total_placed += piece_size;
      }
    }
    if (total_placed === 0) score = 25;
    else score = 89 - total_placed - 89;
    endPlayer.name = player;
    endPlayer.score = score;
    endPlayer.color = color;
    endPlayers.push(endPlayer);
  });
  endPlayers.sort((a, b) => b.score - a.score);
  return endPlayers;
}

// there are 21 pieces, each has a set index; true means the player has the piece
export let player_pieces = {
  yellow: Array(21).fill(true),
  red: Array(21).fill(true),
  blue: Array(21).fill(true),
  green: Array(21).fill(true),
};

// which pieces can actually be played
export let playable_pieces = {
  yellow: Array(21).fill(true),
  red: Array(21).fill(true),
  blue: Array(21).fill(true),
  green: Array(21).fill(true),
};

// who is still in the game
export let can_play = {
  yellow: true,
  red: true,
  blue: true,
  green: true,
};
