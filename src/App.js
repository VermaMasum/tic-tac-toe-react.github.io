// // 

// import React, { useState, useEffect } from "react";
// import { database, ref, set, onValue } from "./firebase";
// import "./App.css";

// function App() {
//   const [board, setBoard] = useState(Array(9).fill(""));
//   const [currentPlayer, setCurrentPlayer] = useState("X");
//   const [winner, setWinner] = useState(null);

//   const gameRef = ref(database, "game");

//   // Update board in Firebase
//   const makeMove = (index) => {
//     if (!board[index] && !winner) {
//       const newBoard = [...board];
//       newBoard[index] = currentPlayer;
//       setBoard(newBoard);

//       // Switch player
//       const nextPlayer = currentPlayer === "X" ? "O" : "X";
//       setCurrentPlayer(nextPlayer);

//       // Update Firebase
//       set(gameRef, { board: newBoard, currentPlayer: nextPlayer });
//     }
//   };

//   // Check for winner
//   const checkWinner = (board) => {
//     const winningCombinations = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];

//     for (let combo of winningCombinations) {
//       const [a, b, c] = combo;
//       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//         return board[a];
//       }
//     }

//     if (board.every((cell) => cell)) return "Draw";
//     return null;
//   };

//   // Sync board from Firebase
//   useEffect(() => {
//     const unsubscribe = onValue(gameRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setBoard(data.board || Array(9).fill(""));
//         setCurrentPlayer(data.currentPlayer || "X");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Check winner after every move
//   useEffect(() => {
//     const result = checkWinner(board);
//     setWinner(result);
//   }, [board]);

//   return (
//     <div className="App">
//       <h1>Tic Tac Toe</h1>
//       <h2>Current Player: {winner ? "Game Over" : currentPlayer}</h2>
//       <div className="board">
//         {board.map((cell, index) => (
//           <div
//             key={index}
//             className={`cell ${cell ? "disabled" : ""}`}
//             onClick={() => makeMove(index)}
//           >
//             {cell}
//           </div>
//         ))}
//       </div>
//       {winner && <h2>Winner: {winner === "Draw" ? "It's a Draw!" : winner}</h2>}
//       <button
//         onClick={() => {
//           setBoard(Array(9).fill(""));
//           setWinner(null);
//           set(gameRef, { board: Array(9).fill(""), currentPlayer: "X" });
//         }}
//       >
//         Reset Game
//       </button>
//     </div>
//   );
// }

// export default App;
// App.js

//.............................................

// import React, { useState } from 'react';
// import './App.css';  // Importing CSS

// const App = () => {
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [isXNext, setIsXNext] = useState(true);
//   const [winner, setWinner] = useState(null);

//   // Function to handle click on each square
//   const handleClick = (index) => {
//     const boardCopy = [...board];
//     if (winner || boardCopy[index]) return; // Don't allow click if there's already a winner or square filled
//     boardCopy[index] = isXNext ? 'X' : 'O';
//     setBoard(boardCopy);
//     setIsXNext(!isXNext);
//     checkWinner(boardCopy);
//   };

//   // Function to check for a winner
//   const checkWinner = (boardCopy) => {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];
//       if (boardCopy[a] && boardCopy[a] === boardCopy[b] && boardCopy[a] === boardCopy[c]) {
//         setWinner(boardCopy[a]);
//         return;
//       }
//     }
//   };

//   const renderSquare = (index) => {
//     return (
//       <button className="square" onClick={() => handleClick(index)}>
//         {board[index]}
//       </button>
//     );
//   };

//   return (
//     <div className="game-container">
//       <h1>Tic Tac Toe</h1>
//       <div className="game-board">
//         {board.map((_, index) => renderSquare(index))}
//       </div>
//       {winner && <div className="winner">Winner: {winner}</div>}
//       {!winner && <div className="turn">Next Player: {isXNext ? 'X' : 'O'}</div>}
//       <button className="reset" onClick={() => { setBoard(Array(9).fill(null)); setWinner(null); setIsXNext(true); }}>
//         Reset Game
//       </button>
//     </div>
//   );
// };

// export default App;

//.......................................................

// import React, { useState, useEffect } from 'react';
// import './App.css';  // Importing CSS

// const App = () => {
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [isXNext, setIsXNext] = useState(true);
//   const [winner, setWinner] = useState(null);

//   // Function to handle click on each square
//   const handleClick = (index) => {
//     const boardCopy = [...board];
//     if (winner || boardCopy[index]) return; // Don't allow click if there's already a winner or square filled
//     boardCopy[index] = isXNext ? 'X' : 'O';
//     setBoard(boardCopy);
//     setIsXNext(!isXNext);
//   };

//   // Function to check for a winner
//   const checkWinner = () => {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];
//       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//         setWinner(board[a]);
//         return;
//       }
//     }
//   };

//   // Effect hook to check winner whenever the board is updated
//   useEffect(() => {
//     checkWinner();
//   }, [board]);

//   const renderSquare = (index) => {
//     return (
//       <button className="square" onClick={() => handleClick(index)}>
//         {board[index]}
//       </button>
//     );
//   };

//   return (
//     <div className="game-container">
//       <h1>Tic Tac Toe</h1>
//       <div className="game-board">
//         {board.map((_, index) => renderSquare(index))}
//       </div>
//       {winner && <div className="winner">Winner: {winner}</div>}
//       {!winner && <div className="turn">Next Player: {isXNext ? 'X' : 'O'}</div>}
//       <button className="reset" onClick={() => { setBoard(Array(9).fill(null)); setWinner(null); setIsXNext(true); }}>
//         Reset Game
//       </button>
//     </div>
//   );
// };

// export default App;

//......................................................
// import React, { useState, useEffect } from 'react';
// import './App.css';  // Importing CSS

// const App = () => {
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [isXNext, setIsXNext] = useState(true);
//   const [winner, setWinner] = useState(null);

//   // Function to handle click on each square
//   const handleClick = (index) => {
//     const boardCopy = [...board];
//     if (winner || boardCopy[index]) return; // Don't allow click if there's already a winner or square filled
//     boardCopy[index] = isXNext ? 'X' : 'O';
//     setBoard(boardCopy);
//     setIsXNext(!isXNext);
//   };

//   // Function to check for a winner
//   const checkWinner = () => {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];
//       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//         setWinner(board[a]);
//         return;
//       }
//     }
//   };

//   // Function to check if the game is a draw
//   const checkDraw = () => {
//     return board.every(cell => cell !== null);
//   };

//   // Effect hook to check winner and draw whenever the board is updated
//   useEffect(() => {
//     checkWinner();
//     if (!winner && checkDraw()) {
//       setWinner('Draw');
//     }
//   }, [board, winner]);

//   const renderSquare = (index) => {
//     return (
//       <button className="square" onClick={() => handleClick(index)}>
//         {board[index]}
//       </button>
//     );
//   };

//   return (
//     <div className="game-container">
//       <h1>Tic Tac Toe</h1>
//       <div className="game-board">
//         {board.map((_, index) => renderSquare(index))}
//       </div>
//       {winner && <div className="winner">{winner === 'Draw' ? 'Draw!' : `Winner: ${winner}`}</div>}
//       {!winner && <div className="turn">Next Player: {isXNext ? 'X' : 'O'}</div>}
//       <button className="reset" onClick={() => { setBoard(Array(9).fill(null)); setWinner(null); setIsXNext(true); }}>
//         Reset Game
//       </button>
//     </div>
//   );
// };

// export default App;

//..................................................
// import React, { useState, useEffect } from 'react';
// import './App.css';  // Importing CSS

// const App = () => {
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [isXNext, setIsXNext] = useState(true);
//   const [winner, setWinner] = useState(null);

//   // Function to handle click on each square
//   const handleClick = (index) => {
//     const boardCopy = [...board];
//     if (winner || boardCopy[index]) return; // Don't allow click if there's already a winner or square filled
//     boardCopy[index] = isXNext ? 'X' : 'O';
//     setBoard(boardCopy);
//     setIsXNext(!isXNext);
//   };

//   // Function to check for a winner
//   const checkWinner = () => {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];
//       if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//         setWinner(board[a]);
//         return;
//       }
//     }
//   };

//   // Function to check if the game is a draw
//   const checkDraw = () => {
//     return board.every(cell => cell !== null);  // All cells filled
//   };

//   // Effect hook to check winner and draw whenever the board is updated
//   useEffect(() => {
//     checkWinner();  // Check if there's a winner

//     // Check if the game is a draw
//     if (!winner && checkDraw()) {
//       setWinner('Draw');  // Set the winner to 'Draw' if the board is full and there's no winner
//     }
//   }, [board, winner]);

//   const renderSquare = (index) => {
//     return (
//       <button className="square" onClick={() => handleClick(index)}>
//         {board[index]}
//       </button>
//     );
//   };

//   return (
//     <div className="game-container">
//       <h1>Tic Tac Toe</h1>
//       <div className="game-board">
//         {board.map((_, index) => renderSquare(index))}
//       </div>
//       {winner && <div className="winner">{winner === 'Draw' ? 'Draw!' : `Winner: ${winner}`}</div>}
//       {!winner && <div className="turn">Next Player: {isXNext ? 'X' : 'O'}</div>}
//       <button className="reset" onClick={() => { setBoard(Array(9).fill(null)); setWinner(null); setIsXNext(true); }}>
//         Reset Game
//       </button>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import './App.css';  // Importing the CSS file

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Function to handle click on each square
  const handleClick = (index) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return; // Don't allow click if there's already a winner or square filled
    boardCopy[index] = isXNext ? 'X' : 'O';
    setBoard(boardCopy);
    setIsXNext(!isXNext);
  };

  // Function to check for a winner
  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
  };

  // Function to check if the game is a draw
  const checkDraw = () => {
    return board.every(cell => cell !== null);  // All cells filled
  };

  // Effect hook to check winner and draw whenever the board is updated
  useEffect(() => {
    checkWinner();  // Check if there's a winner

    // Check if the game is a draw
    if (!winner && checkDraw()) {
      setWinner('Draw');  // Set the winner to 'Draw' if the board is full and there's no winner
    }
  }, [board, winner]);

  const renderSquare = (index) => {
    const value = board[index];
    return (
      <button 
        className={`square ${value}`} 
        onClick={() => handleClick(index)}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        {board.map((_, index) => renderSquare(index))}
      </div>
      {winner && <div className="winner">{winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`}</div>}
      {!winner && <div className="turn">Next Player: {isXNext ? 'X' : 'O'}</div>}
      <button className="reset" onClick={() => { setBoard(Array(9).fill(null)); setWinner(null); setIsXNext(true); }}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
