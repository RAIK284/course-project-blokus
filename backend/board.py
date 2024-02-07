from piece_data import *

# 2d matrix made up of strings, each representing a player
board = [['' for _ in range(20)] for _ in range(20)]

board[0][0] = 'r'
board[1][0] = 'r'
board[2][0] = 'r'
board[3][0] = 'r'

board[19][16] = 'b'
board[19][17] = 'b'
board[19][18] = 'b'
board[19][19] = 'b'