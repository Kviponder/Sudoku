import Board from "../Board/Board";
import boards from "../utils/consts";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // const initial = [
  //   [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  //   [8, -1, -1, -1, 4, -1, 3, -1, 7],
  //   [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  //   [5, 3, 8, 6, -1, 7, 9, 4, -1],
  //   [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  //   [1, -1, 9, 8, -1, 4, 6, 2, 3],
  //   [9, -1, 7, 4, -1, -1, -1, -1, -1],
  //   [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  //   [-1, -1, -1, -1, 3, -1, -1, 7, -1],
  // ];

  const [sudoBoard, setBoard] = useState(
    makeDeepCopy(boards[getRandomInt(boards.length)])
  );
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);

  function makeDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function onInputChange(e, row, col) {
    let value = parseInt(e.target.value) || -1,
      grid = makeDeepCopy(sudoBoard);
    if (value === -1 || (value >= 1 && value <= 9)) {
      grid[row][col] = value;
    }
    setBoard(grid);
  }

  const pauseGame = () => {
    if (running) {
      setRunning(false);
      return;
    }
    setRunning(true);
  };

  function checkRow(grid, row, num) {
    return grid[row].indexOf(num) === -1;
  }

  function checkCol(grid, col, num) {
    return grid.map((row) => row[col]).indexOf(num) === -1;
  }

  function checkBox(grid, row, col, num) {
    let boxArr = [],
      rowStart = row - (row % 3),
      colStart = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        boxArr.push(grid[rowStart + i][colStart + j]);
      }
    }
    return boxArr.indexOf(num) === -1;
  }

  function checkValid(grid, row, col, num) {
    if (
      checkRow(grid, row, num) &&
      checkCol(grid, col, num) &&
      checkBox(grid, row, col, num)
    ) {
      return true;
    }
    return false;
  }

  function getNext(row, col) {
    return col !== 8 ? [row, col + 1] : row != 8 ? [row + 1, 0] : [0, 0];
  }

  function solver(grid, row = 0, col = 0) {
    if (grid[row][col] !== -1) {
      let isLast = row >= 8 && col >= 8;
      if (!isLast) {
        let [newRow, newCol] = getNext(row, col);
        return solver(grid, newRow, newCol);
      }
    }
    for (let num = 1; num <= 9; num++) {
      if (checkValid(grid, row, col, num)) {
        grid[row][col] = num;
        let [newRow, newCol] = getNext(row, col);
        if (!newRow && !newCol) {
          return true;
        }
        if (solver(grid, newRow, newCol)) {
          return true;
        }
      }
    }
    grid[row][col] = -1;
    return false;
  }

  function solveBoard() {
    let sudoku = makeDeepCopy(sudoBoard);
    solver(sudoku);
    setBoard(sudoku);
    console.log("dsadas");
  }

  function compareBoard(current, solved) {
    let res = {
      isComplete: true,
      isSolvable: true,
    };
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (current[i][j] != solved[i][j]) {
          if (current[i][j] != -1) {
            res.isSolvable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
  }

  function checkGame() {
    let sudoku = makeDeepCopy(sudoBoard);
    solver(sudoku);
    let compare = compareBoard(sudoBoard, sudoku);
    if (compare.isComplete) {
      alert("You solved it!!!");
    } else if (compare.isSolvable) {
      alert("You can do it! Keep going!");
    } else {
      alert("Something isnt correct...");
    }
  }

  function newGame() {
    let sudoku = makeDeepCopy(boards[getRandomInt(boards.length)]);
    setBoard(sudoku);
  }

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header__title">Sudoku!</h1>
        <div className="header__container">
          <p className="header__score">Score: 000</p>
          <div className="header__counter">
            Time:
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
          </div>
        </div>
      </header>
      <Board sudoBoard={sudoBoard} onInputChange={onInputChange} />
      <div className="button__container">
        <button className="button" onClick={solveBoard}>
          Pause
        </button>
        <button className="button" onClick={checkGame}>
          Check
        </button>
        <button className="button" onClick={newGame}>
          New
        </button>
      </div>
    </div>
  );
}

export default App;
