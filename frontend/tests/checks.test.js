const { can_play_piece } = require('../src/gameLogic/checks');

describe('can_play_piece function', () => {

    const matrix = Array.from({ length: 20 }, () => Array(20).fill(''));

    test('Basic valid play on player edge', () => {
        const piece = [
            [1, 1],
            [1, 1]
        ];
        expect(can_play_piece(matrix, piece, 0, 0, 'blue')).toBe(true);
    });

});
