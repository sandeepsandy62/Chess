import React, { useState } from "react";
import Game from "../model/chess";
import Board from "../assets/chessBoard.png";
import { Stage, Layer } from "react-konva";
import Piece from "./piece";
import piecemap from "./piecemap";
import { v4 as uuidv4 } from "uuid";
import Square from "../model/square";
//import useSound from 'use-sound';
//import chessMove from "../assets/moveSoundEffect.mp3"

function Chessgame() {
  //const [play] = useSound(chessMove);
  const [state, setState] = useState({
    gameState: new Game("white"),
    draggedPieceTargetId: "", //empty string means no piece is being dragged
    playerTurnToMoveIsWhite: true,
    whiteKingInCheck: false,
    blackKingInCheck: false,
  });


  const startDragging = (e) => {
    //the parentheses around the object literal to ensure it is treated as an expression
    console.log("in start drag " + e.target.attrs.id)
    setState((prevState) => ({
      ...prevState,
      draggedPieceTargetId: e.target.attrs.id,
    }));
  };


  const endDragging = (e) => {
    console.log("end dragging object E : " + e.target.x() + " , " + e.target.y());
    const currentGame = state.gameState;
    const currentBoard = currentGame.getBoard();
    const finalPosition = inferCoord(e.target.x()+90 , e.target.y()+90 , currentBoard)
    console.log("final position : " + finalPosition)
    const selectedId = state.draggedPieceTargetId
    console.log("selected piece id : " + selectedId)
    movePiece(selectedId,finalPosition,currentGame,true)
  };

  const inferCoord = (x, y, chessBoard) => {
    var hashmap = {};
    var shortestDistance = Infinity;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        const canvasCoord = chessBoard[i][j].getCanvasCoord();
        const dx = canvasCoord[0] - x;
        const dy = canvasCoord[1] - y;
        const newDistance = Math.sqrt(dx ** 2 + dy ** 2);
        hashmap[newDistance] = canvasCoord;
        if (newDistance < shortestDistance) {
          shortestDistance = newDistance;
        }
      }
    }
    return hashmap[shortestDistance];
  };

  const movePiece = (selectedId, finalPosition, currentGame, isMyMove) => {
    var whiteKingInCheck = false;
    var blackKingInCheck = false;
    var blackKingCheckmated = false;
    var whiteKingCheckmated = false;
    const update = currentGame.movePiece(selectedId, finalPosition, isMyMove);
   // console.log("printing update : " + update)

    if (update === " moved in the same position") {
      revertToPreviousState(selectedId);
      return;
    } else if (update === " user tried to capture their own piece") {
      revertToPreviousState(selectedId);
      return;
    } else if (update === "b is in check" || update === "w is in check") {
      //to change fill color
      if (update[0] === "b") {
        blackKingInCheck = true;
      } else {
        whiteKingInCheck = true;
      }
    }else if(update === "b has been checkmated" || update === "w has been checkmated"){
      if(update[0] === "b"){
        blackKingCheckmated = true
      }
    }else if (update === " invalid move"){
      this.revertToPreviousState(selectedId)
      return
    }

    //play audio
    //play()

    setState((prevState)=>({
      ...prevState,
      draggedPieceTargetId: "",
      gameState:currentGame,
      playerTurnToMoveIsWhite: !prevState.playerTurnToMoveIsWhite,
      whiteKingInCheck:whiteKingInCheck,
      blackKingInCheck:blackKingInCheck
    }))

    if(!blackKingCheckmated && !whiteKingCheckmated){
      return
    }
    else if(blackKingCheckmated){
      alert("White Won By Checkmate !!")
    }else{
      alert("Black Won By Checkmate !!")
    }

  };

  const revertToPreviousState = (selectedId) => {
    const oldGs = state.gameState;
    const oldBoard = oldGs.getBoard();
    const tmpGs = new Game(true);
    const tmpBoard = [];

    for (var i = 0; i < 8; i++) {
      tmpBoard.push([]);
      for (var j = 0; j < 8; j++) {
        if (oldBoard[i][j].getPieceIdOnThisSquare() === selectedId) {
          tmpBoard[i][j].push(
            new Square(j, i, null, oldBoard[i][j].canvasCoord)
          );
        } else {
          tmpBoard[i].push(oldBoard[i][j]);
        }
      }
    }

    tmpGs.setBoard(tmpBoard);

    setState((prevState) => ({
      ...prevState,
      gameState: tmpGs,
      draggedPieceTargetId: "",
    }));

    // setState((prevState) => ({
    //   ...prevState,
    //   gameState: oldGs,
    // }));
  };

  return (
    <React.Fragment>
      <div
        style={{
          backgroundImage: `url(${Board})`,
          width: "720px",
          height: "720px",
          marginTop: "10px",
          marginLeft: "10px",
        }}
      >
        <Stage width={720} height={720}>
          <Layer>
            {state.gameState
              .getBoard()
              .map((row, { rowIndex, columnIndex }) => {
                return (
                  <React.Fragment key={`${rowIndex}-${uuidv4()}`}>
                    {row.map((square) => {
                      //console.log(square);
                      if (square.isOccupied()) {
                        return (
                          <Piece
                            key={`${rowIndex}-${columnIndex}-${square.getPieceIdOnThisSquare()}`}
                            x={square.getCanvasCoord()[0]}
                            y={square.getCanvasCoord()[1]}
                            imgurls={piecemap[square.getPieceName()]}
                            isWhite={square.getPieceColor() === "white"}
                            draggedPieceTargetId={state.draggedPieceTargetId}
                            onDragStart={startDragging}
                            onDragEnd={endDragging}
                            id={square.getPieceIdOnThisSquare()}
                            thisPlayersColorIsWhite={true}
                            playerTurnToMoveIsWhite={
                              state.playerTurnToMoveIsWhite
                            }
                            whiteKingInCheck={state.whiteKingInCheck}
                            blackKingInCheck={state.blackKingInCheck}
                          />
                        );
                      }
                      return null;
                    })}
                  </React.Fragment>
                );
              })}
          </Layer>
        </Stage>
      </div>
    </React.Fragment>
  );
}

export default Chessgame;
