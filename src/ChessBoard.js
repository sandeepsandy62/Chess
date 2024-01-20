import React, { useState } from "react";
import ChessPiece from "./ChessPiece";

const ChessBoard = () => {
  const [squares, setSquares] = useState(initializeBoard());
  const [selectedSquare, setSelectedSquare] = useState(null);

  function initializeBoard() {
    // Initialize the chessboard with default values
    const squares = Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 8 }, (_, col) => ({
        row,
        col,
        isDark: (row + col) % 2 === 1,
        piece: null,
      }))
    );

    // Set up initial chess pieces
    squares[0][0].piece = { type: "♜", color: "black" }; // Rook
    squares[0][1].piece = { type: "♞", color: "black" }; // Knight
    squares[0][2].piece = { type: "♝", color: "black" }; // Bishop
    squares[0][3].piece = { type: "♛", color: "black" }; // Queen
    squares[0][4].piece = { type: "♚", color: "black" }; // King
    squares[0][5].piece = { type: "♝", color: "black" }; // Bishop
    squares[0][6].piece = { type: "♞", color: "black" }; // Knight
    squares[0][7].piece = { type: "♜", color: "black" }; // Rook

    for (let i = 0; i < 8; i++) {
      squares[1][i].piece = { type: "♟", color: "black" }; // Pawn
      squares[6][i].piece = { type: "♟", color: "white" }; // Pawn
    }

    squares[7][0].piece = { type: "♜", color: "white" }; // Rook
    squares[7][1].piece = { type: "♞", color: "white" }; // Knight
    squares[7][2].piece = { type: "♝", color: "white" }; // Bishop
    squares[7][3].piece = { type: "♛", color: "white" }; // Queen
    squares[7][4].piece = { type: "♚", color: "white" }; // King
    squares[7][5].piece = { type: "♝", color: "white" }; // Bishop
    squares[7][6].piece = { type: "♞", color: "white" }; // Knight
    squares[7][7].piece = { type: "♜", color: "white" }; // Rook

    return squares;
  }

  function handleSquareClick(row, col) {
    const clickedSquare = squares[row][col];

    if (!selectedSquare) {
      // If no piece is selected, select the clicked square if it contains a piece
      if (clickedSquare.piece) {
        setSelectedSquare(clickedSquare);
      }
    } else {
      // If a piece is already selected, attempt to move the piece
      const isValidMove = validateMove(selectedSquare, clickedSquare);

      if (isValidMove) {
        // Move the piece to the new location
        const newSquares = movePiece(selectedSquare, clickedSquare);
        setSquares(newSquares);
      }

      // Clear the selected piece, whether the move was successful or not
      setSelectedSquare(null);
    }
  }

  function validateMove(startSquare, endSquare) {
    // TODO: Implement move validation logic (e.g., check rules for each piece type)
    return true; // For simplicity, always allow moves in this example
  }

  function movePiece(startSquare, endSquare) {
    // Clone the current state to avoid modifying it directly
    const newSquares = [...squares];

    // Copy the piece from the starting square to the ending square
    newSquares[endSquare.row][endSquare.col].piece = startSquare.piece;

    // Clear the piece from the starting square
    newSquares[startSquare.row][startSquare.col].piece = null;

    return newSquares;
  }

  return (
    <div className="chess-board">
      {squares.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((square, colIndex) => (
            <div
              key={`${square.row}-${square.col}`}
              className={`w-16 h-16 border ${
                square.isDark ? "bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500" : "bg-gray-variant"
              }`}
              onClick={() => handleSquareClick(square.row, square.col)}
            >
              {square.piece && (
                <ChessPiece
                  type={square.piece.type}
                  color={square.piece.color}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;