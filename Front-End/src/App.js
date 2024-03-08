import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const testInput = [
    [-1, 5, -1, 9, -1, -1, -1, -1, -1],
    [8, -1, -1, -1, 4, -1, 3, -1, 7],
    [-1, -1, -1, 2, 8, -1, 1, 9, -1],
    [5, 3, 8, 6, -1, 7, 9, 4, -1],
    [-1, 2, -1, 3, -1, 1, -1, -1, -1],
    [1, -1, 9, 8, -1, 4, 6, 2, 3],
    [9, -1, 7, 4, -1, -1, -1, -1, -1],
    [-1, 4, 5, -1, -1, -1, 2, -1, 9],
    [-1, -1, -1, -1, 3, -1, -1, 7, -1],
  ];

  const [sudoBoard, setBoard] = useState(testInput);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);

  function makeDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, col) {
    let value = parseInt(e.target.value) || -1,
      grid = makeDeepCopy(sudoBoard);
    if (value === -1 || (value >= 1 && value <= 9)) {
      grid[row][col] = value;
    }
    setBoard(grid);
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
        <table className="board">
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
              return (
                <tr key={rIndex}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                    return (
                      <td key={rIndex + cIndex}>
                        <input
                          value={
                            sudoBoard[row][col] === -1
                              ? ""
                              : sudoBoard[row][col]
                          }
                          onChange={(e) => onInputChange(e, row, col)}
                          className="board__cell"
                          disabled={sudoBoard[row][col] !== -1}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
