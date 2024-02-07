players = ['yellow', 'red', 'blue', 'green']

# there are 21 pieces, each has a set index; True means the player has the piece
player_pieces = {
    'yellow': [True] * 21,
    'red': [True] * 21,
    'blue': [True] * 21,
    'green': [True] * 21,
}

# which pieces can actually be played
playable_pieces = {
    'yellow': [True] * 21,
    'red': [True] * 21,
    'blue': [True] * 21,
    'green': [True] * 21,
}

# who is still in the game
can_play = {
    'yellow': True,
    'red': True,
    'blue': True,
    'green': True,
}