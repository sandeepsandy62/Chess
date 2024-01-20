// ChessPiece.js

import React from "react";

const ChessPiece = ({ type, color }) => {
  return (
    <div
      className={`w-12 h-12 flex items-center justify-center text-3xl font-bold ${
        color === "white" ? "text-black" : "text-white"
      }`}
    >
      {type}
    </div>
  );
};

export default ChessPiece;
