import '../styles/components/Block.css';

function Block({ onHover, onMouseLeave, player, highlight }) {
  return (
    <div id="block" onMouseOver={onHover} onMouseLeave={onMouseLeave}>
      {(player || highlight) &&
        <div id="piece" className={`${player} ${highlight ? 'red highlight' : ''}`}>
            <div id="innerPiece"></div>
        </div>
      }
    </div>
  );
}

export default Block;
