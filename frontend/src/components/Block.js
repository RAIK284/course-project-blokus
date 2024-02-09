import '../styles/components/Block.css';

function Block({ onClick, onHover, onMouseLeave, player, myPlayer, highlight }) {
  return (
    <div id="block" onClick={onClick} onMouseOver={onHover} onMouseLeave={onMouseLeave}>
      {(player || highlight) &&
        <div id="piece" className={`${player} ${highlight ? `${myPlayer} highlight` : ''}`}>
            <div id="innerPiece"></div>
        </div>
      }
    </div>
  );
}

export default Block;
