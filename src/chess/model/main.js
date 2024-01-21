import ChessPiece from "../model/chesspiece.js";
import Square from "../model/square.js";
import Game from "../model/chess.js";

function printChessboard(chessboard) {
    for (let i = 0; i < chessboard.length; i++) {
        let rowString = '';
        for (let j = 0; j < chessboard[i].length; j++) {
            const square = chessboard[i][j];
            if (square.pieceOnThisSquare) {
                rowString += (square.pieceOnThisSquare.id[1] + square.pieceOnThisSquare.id[2]);
            } else {
                rowString += '-';
            }
            rowString += ' ';
        }
        console.log(rowString);
    }
}


function main() {
    var game = new Game("white");
    printChessboard(game.chessBoard)
}

// Call the main function
main();
