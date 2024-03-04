import "./PieceBlock.css";

function PieceBlock({ show, player }){
  return (
    <div id="pieceBlock" className={`${player + "Piece"} ${!show ? `'transparent'` : ""}`}>
      { player &&
        <div id="pieceInnerPiece"></div>
      }
    </div>
  );
}

export default PieceBlock;
