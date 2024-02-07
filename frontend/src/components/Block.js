import '../styles/components/Block.css';

function Block({ player }) {
  return (
    <div id="block">
        {player &&
            <div id="piece" className={player}>
                <div id="innerPiece"></div>
            </div>
        }
    </div>
  );
}

export default Block;
