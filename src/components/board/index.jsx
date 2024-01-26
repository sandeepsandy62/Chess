import React from "react";
import "./board-styles.css";

const Board = ({ cells }) => {
  return (
    <div className="board">
      {cells.map((cell) => {
        return <div key={cell.pos}>{cell.pos}</div>;
      })}
    </div>
  );
};

export default Board;
