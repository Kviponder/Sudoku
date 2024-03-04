import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const testInput = [
    [-1, 5, -1, 9, -1, -1, -1, -1, -1],
    [8, -1, -1, -1, 4, -1, 3, -1, 7],
    [-1, -1, -1, 2, 8, -1, 1, 9, -1],
    [5, 3, 8, 6, -1, 7, 9, 4, -1],
    [-1, 2, -1, 3, -1, 1, -1, -1, -1],
    [1, -1, 9, 8, -1, 4, 6, 2, 3],
    [19, -1, 7, 4, -1, -1, -1, -1, -1],
    [-1, 4, 5, -1, -1, -1, 2, -1, 9],
    [-1, -1, -1, -1, 3, -1, -1, 7, -1],
  ];

  const [sudoBoard, setBoard] = useState(testInput);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header__title">sudoku!</h1>
        <div className="header__container">
          <p className="header__score">Score: 000</p>
          <div className="header__counter">Time: 0:00</div>
        </div>
        <table className="board">
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
              return (
                <tr key={rIndex}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                    return (
                      <td key={rIndex + cIndex}>
                        <input className="board__cell" min={1} max={9} />
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
