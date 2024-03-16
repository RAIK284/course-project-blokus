
export const total_blocks_for_player = 89;

export const pieces_blocks_counts = [ 5, 3, 5, 5, 5, 5, 1, 4, 4, 5, 5, 4, 5, 5, 5, 5, 2, 5, 3, 4, 4 ];

export function rotate_piece(pieceIndex) {
    const piece = pieces[pieceIndex];
    const rotatedPiece = [];
    // transpose the piece
    for (let i = 0; i < piece[0].length; i++) {
        rotatedPiece.push([]);
        for (let j = piece.length - 1; j >= 0; j--) {
            rotatedPiece[i].push(piece[j][i]);
        }
    }
    pieces[pieceIndex] = rotatedPiece;
}

export function flip_piece(pieceIndex) {
    let piece = pieces[pieceIndex]
    // loop through half of the rows
    for (let i = 0; i < piece.length / 2; i++) {
        // swap rows across the horizontal axis
        const temp = piece[i];
        piece[i] = piece[piece.length - 1 - i];
        piece[piece.length - 1 - i] = temp;
    }
    pieces[pieceIndex] = piece;
}

/*
    2d subarrays of each Blokus piece
    Each piece is made up of smaller blocks
    1: block, 0: no block
*/
export let pieces = [
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

const originalPieces = pieces.map(piece => piece.map(subPiece => subPiece.slice()));

export function reset_pieces(){
    pieces = originalPieces.map(piece => piece.map(subPiece => subPiece.slice()));
}