const Board = ({ sudoBoard, onInputChange }) => {
  return (
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
                        sudoBoard[row][col] === -1 ? "" : sudoBoard[row][col]
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
  );
};

export default Board;
