// App.js
import ChessGame from "./chess/ui/chessgame";

import React from "react";

const App = () => {

  const [userName,setUserName] = React.useState('')

  return (
   <React.Fragment>
    <ChessGame />
   </React.Fragment>
  );
};

export default App;
