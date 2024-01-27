import React, { useState , useRef , useEffect , useContext} from 'react';
import {Chess} from 'chess.js';
import {ChessBoard, createBoard} from "../../functions";
import Board from '../../components/board';
import {GameContext} from "../../context/GameContext";
import {types} from "../../context/actions";
import { getGameOverState } from '../../functions';
import GameOver from '../../components/gameover';


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

    

    const fromPos = useRef();
    const {dispatch,gameOver} = useContext(GameContext);

    useEffect(()=>{

      const [gameOver,status] = getGameOverState(chess);
      if(gameOver){
        dispatch({type: types.GAME_OVER , status , player: chess.turn()});
        return ;
      }

      dispatch({
        type:types.SET_TURN,
        player: chess.turn(),
        check: chess.inCheck(),
      });
    },[fen,dispatch,chess]);
    
    const makeMove = (pos) => {
      const from = fromPos.current;
      const to = pos;
      chess.move({from,to});
      dispatch({type:types.CLEAR_POSSIBLE_MOVES});
      setFen(chess.fen());
    }

    const setFromPos = (pos) => {
      fromPos.current = pos;
      dispatch({
        type:types.SET_POSSIBLE_MOVES,
        moves:chess.moves({square:pos}),
      })
    };

    if(gameOver){
      return <GameOver/>
    }

  return (
    <div className='game'>
        <Board cells={board} makeMove={makeMove} setFromPos={setFromPos}/>
    </div>
  )
}

export default Game;