const {
    players,
    bots_playing,
    currentPlayerTurnIndex,
    reset_player_data,
    end_turn,
    determine_winner,
    player_pieces,
    playable_pieces,
    can_play
} = require('../src/gameLogic/playerData');

describe('Game functionality', () => {

    test('Reset player data', () => {
        reset_player_data();
        expect(currentPlayerTurnIndex).toBe(0);
        expect(Object.keys(player_pieces)).toEqual(expect.arrayContaining(players));
        expect(Object.keys(playable_pieces)).toEqual(expect.arrayContaining(players));
        expect(can_play).toEqual({ yellow: true, red: true, blue: true, green: true });
        expect(bots_playing).toEqual(['', '', '', '']);
    });

});
