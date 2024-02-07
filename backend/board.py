from piece_data import *
from player_data import *

# 2d matrix made up of strings, each representing a player
board = [['' for _ in range(20)] for _ in range(20)]

# testing board colors
board[0][0] = 'r'
board[1][0] = 'r'
board[2][0] = 'r'
board[3][0] = 'r'
board[19][16] = 'b'
board[19][17] = 'b'
board[19][18] = 'b'
board[19][19] = 'b'

# check if game is over (no one can play any pieces)
def is_game_over():
    if not can_play['yellow'] and not can_play['red'] and not can_play['blue'] and not can_play['green']:
        return True
    return False

# check if the game is over for players
def set_player_game_overs():
    # loop through players
    for player in players:
        player_can_play = False
        # loop through board
        for row in range(len(board)):
            for col in range(len(board[row])):
                # loop through pieces
                for piece_index in range(len(pieces)):
                    # which pieces can the player play, if any at all?
                    if player_pieces[player] and can_play_piece(row, col, piece_index, player):
                        player_can_play = True
                    else:
                        playable_pieces[player][piece_index] = False
        # sets if the player can play any pieces
        can_play[player] = player_can_play

# checks if pieces can be played based on their piece index
def can_play_piece(board_row, board_col, piece_index, player):
    piece = pieces[piece_index]
    has_diagonals = False
    all_blocks_valid = True
    # loop through piece 2d array
    for r in range(len(piece)):
        for c in range(len(piece[r])):
            # if current block isn't empty
            if piece[r][c] == 1:
                if not valid_block(board_row + r, board_col + c, player):
                    all_blocks_valid = False
                    break
                else:
                    if diagonals_present(board_row + r, board_col + c, player):
                        has_diagonals = True
        if not all_blocks_valid:
            break
    if all_blocks_valid and has_diagonals:
        return True
    return False

# check if the block is valid (fits within rule sets)
def valid_block(r, c, player):
    not_past_walls = r >= 0 and r < len(board) and c >= 0 and c < len(board[r])
    if not_past_walls:
        block_empty = board[r][c] == ''
        not_touching_own_blocks = (
            (r == len(board) - 1 or board[r + 1][c] != player) and
            (r == 0 or board[r - 1][c] != player) and
            (c == len(board[0]) - 1 or board[r][c + 1] != player) and
            (c == 0 or board[r][c - 1] != player)
        )
        if block_empty and not_touching_own_blocks:
            return True
    return False

# check if the block has diagonal touch with correct circumstances
def diagonals_present(r, c, player):
    top_left = (
        r > 0 and c > 0 and
        board[r - 1][c - 1] == player and
        board[r - 1][c] != player and
        board[r][c - 1] != player
    )
    bottom_left = (
        r < len(board) - 1 and c < len(board[0]) - 1 and
        board[r + 1][c + 1] == player and
        board[r + 1][c] != player and
        board[r][c + 1] != player
    )
    top_right = (
        r > 0 and c < len(board[0]) - 1 and
        board[r - 1][c + 1] == player and
        board[r - 1][c] != player and
        board[r][c + 1] != player
    )
    bottom_right = (
        r < len(board) - 1 and c > 0 and
        board[r + 1][c - 1] == player and
        board[r + 1][c] != player and
        board[r][c - 1] != player
    )
    if top_left or bottom_left or top_right or bottom_right:
        return True
    return False
