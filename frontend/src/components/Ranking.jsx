import "./Ranking.css";

function Ranking({rank, name, score}) {

    return (
        <div id={`container`}>
            <div id={`rank`}> {rank} </div>       
            <div id={`name`}> {name} </div>  
            <div id={`score`}> {score} </div>           
        </div> 
    );
}


export default Ranking;