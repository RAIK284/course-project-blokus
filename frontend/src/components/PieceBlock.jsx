import "./PieceBlock.css";

function PieceBlock({ show }){
  return (
    <div id="pieceBlock" className={show == false ? 'transparent' : ''}>
    </div>
  );
}

export default PieceBlock;
