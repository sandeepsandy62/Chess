// App.js

import React from "react";
import ChessBoard from "./ChessBoard";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-900 via-teal-700 to-teal-500 text-white">
      <div className="text-4xl font-bold mb-6">Chess Master</div>
      <ChessBoard />
      <div className="mt-6 text-sm text-gray-900">
        <p>Play against opponents worldwide and enhance your chess skills.</p>
      </div>
    </div>
  );
};

export default App;
