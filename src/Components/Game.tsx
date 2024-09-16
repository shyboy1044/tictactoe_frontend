import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const API_URL = "http://localhost:8086/api/game";

const Game: React.FC = () => {
    const emptyBoard = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"],
      ];
    
      const [board, setBoard] = useState(emptyBoard);
      const [currentPlayer, setCurrentPlayer] = useState("X");
    
      const makeMove = async (row:number, col:number) => {
        if (board[row][col] !== "-") return;
    
        const newBoard = board.map((rowArr, rIdx) =>
          rowArr.map((cell, cIdx) => (rIdx === row && cIdx === col ? "X" : cell))
        );
        setBoard(newBoard);
    
        const response = await axios.post(
          "http://localhost:8086/api/tictactoe/move?isPlayerMove=true",
          { board: newBoard, currentPlayer: "X" }
        );
        const _data = [];
        for(const key of response.data.board){
            _data.push(key.split(""));
        }
        setBoard(_data);
        setCurrentPlayer(response.data.currentPlayer);
      };
    
      return (
        <div className="App">
          <h1>Tic Tac Toe</h1>
          <div className="board">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <button
                    key={colIndex}
                    className="cell"
                    onClick={() => makeMove(rowIndex, colIndex)}
                  >
                    {cell}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
};

export default Game;
