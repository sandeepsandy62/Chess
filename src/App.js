// App.js
import React from "react";
import './App.css';
import Game from "./pages/Game";
import {GameProvider} from './context/GameContext';

const App = () => {
  return (
   <GameProvider>
    <Game />
   </GameProvider>
  );
};

export default App;
