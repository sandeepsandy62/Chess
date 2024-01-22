import React from 'react'
import Game from "../model/chess"
import Board from "../assets/chessBoard.png"
import { Stage , Layer } from 'react-konva'
import Piece from "./piece"
import piecemap from "./piecemap"
import {v4 as uuidv4} from "uuid"

function Chessgame() {

  var state = {
    gameState: new Game("white"),
    draggedPieceTargetId: "", //empty string means no piece is being dragged
    playerTurnToMoveIsWhite: true ,
    whiteKingInCheck : false ,
    blackKingInCheck : false 
  }

  const startDragging = (event) => {
    console.log("drag started : " , event.target.id())
  }

  const endDragging = (event)=>{
    console.log("drag started : " , event.target.id())
  }

  return (
    <React.Fragment>
      <div style={
        {
          backgroundImage:`url(${Board})`,
          width:"720px",
          height:"720px",
          marginTop:"10px",
          marginLeft:"10px"
        }
      }>
        <Stage width = {720} height = {720}>
                <Layer>
                {state.gameState.getBoard().map((row,{rowIndex,columnIndex}) => {
                        return (<React.Fragment key={`${rowIndex}-${uuidv4()}`}>
                                {row.map((square) => {
                                  console.log(square)
                                    if (square.isOccupied()) {                                    
                                        return (
                                            <Piece 
                                                key={`${rowIndex}-${columnIndex}-${square.getPieceIdOnThisSquare()}`}
                                                x = {square.getCanvasCoord()[0]}
                                                y = {square.getCanvasCoord()[1]} 
                                                imgurls = {piecemap[square.getPieceName()]}
                                                isWhite = {square.getPieceColor() === "white"}
                                                draggedPieceTargetId = {state.draggedPieceTargetId}
                                                onDragStart = {startDragging}
                                                onDragEnd = {endDragging}
                                                id = {square.getPieceIdOnThisSquare()}
                                                thisPlayersColorIsWhite = {true}
                                                playerTurnToMoveIsWhite = {state.playerTurnToMoveIsWhite}
                                                whiteKingInCheck = {state.whiteKingInCheck}
                                                blackKingInCheck = {state.blackKingInCheck}
                                                />)
                                    }
                                    return
                                })}
                            </React.Fragment>)
                    })}
                </Layer>
            </Stage>

      </div>
    </React.Fragment>
  )
}

export default Chessgame