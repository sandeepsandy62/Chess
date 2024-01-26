import React, { useState , useRef , useEffect} from 'react';
import {Chess} from 'chess.js';
import {ChessBoard, createBoard} from "../../functions";
import Board from '../../components/board';


/**
* Forsyth–Edwards Notation (FEN) is a standard notation for describing a particular board position of a chess game. 
* The purpose of FEN is to provide all the necessary information to restart a game from a particular position.
*/
    

//Starting position (in FEN)     
const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

function Game() {
    const [fen,setFen] = useState(FEN);

    /**
     * useRef is a React Hook that lets you reference a value that’s not needed for rendering.
     * useRef returns a ref object with a single current property initially set to the initial value you provided.
     */
    const {current : chess } = useRef(new Chess(fen));
    const [board,setBoard] = useState(createBoard(fen));

    useEffect(()=>{
        setBoard(createBoard(fen))
    },[fen]);

  return (
    <div className='game'>
        <Board cells={board}/>
    </div>
  )
}

export default Game;