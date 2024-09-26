import React, { useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
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
      const [gamestate, setGameState] = useState(false);
      const handleLogout = () => {
        axios.get("http://localhost:8086/api/auth/logout").then(res => {
          localStorage.removeItem("token");
          window.location.reload();
        })
      }
    
      const makeMove = async (row:number, col:number) => {
        if (board[row][col] !== "-") return;
    
        const newBoard = board.map((rowArr, rIdx) =>
          rowArr.map((cell, cIdx) => (rIdx === row && cIdx === col ? "X" : cell))
        );
        setBoard(newBoard); 
        const token = localStorage.getItem('token');
    
        const response = await axios.post(
          "http://localhost:8087/api/tictactoe/move?isPlayerMove=true",
          { board: newBoard, currentPlayer: "X" },
          {
          headers: { Authorization: `Bearer ${token}` }
          }
        );
        const _data = [];
        for(const key of response.data.board){
            _data.push(key.split(""));
        }
        setBoard(_data);
        setCurrentPlayer(response.data.currentPlayer);
        
        if(response.data.winner === 'N'){
          alert("No Winner in this game!");
          setGameState(true);
        } else if(response.data.winner !== '-'){
          alert("Winner is "+ response.data.winner);
          setGameState(true);
        }
      };
    
      return (
        <div className="App">
          <h1>Tic Tac Toe</h1>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          <div className="board">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <button
                    key={colIndex}
                    className="cell"
                    onClick={() => makeMove(rowIndex, colIndex)}
                    disabled={gamestate}
                    type='button'
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
