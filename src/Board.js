
import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows, ncols, chanceLightStartsOn })

{
  // In itialize the board state
  const [board, setBoard] = useState(createBoard);

  // Create the board with a specified chance of lights being toggled on
  function createBoard() {
    return Array.from({ length: nrows }).map(() =>
      Array.from({ length: ncols }).map(() =>
        Math.random() < chanceLightStartsOn
      )
    );
  }

  // Check if all cells are off, if they are, its a win!
  function win() {
    return board.every(row => row.every(cell => !cell));
  }

  // Shuffles the cells around the clicked cell
  function shuffleCells(coord) {
    setBoard(oldBoard => {

  // splits x, y and assigns a inx
      const [y, x] = coord.split("-").map(Number);

      // maps the od board creates a new board copy
      const newBoard = oldBoard.map(row => [...row]);

      // Flips the cells
      const flipCell = (y, x, boardCopy) => {
      // checks to see if the cells are inbounds.
      // flips the cell
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      flipCell(y, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y + 1, x, newBoard);

      return newBoard;
    });
  }

  // This displays the winning message
  if (win()) {
    return <div>You Are The Winner</div>;
  }

  // Creates the game table holding the cells
  let table = [];
 
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell 
          key={coord} 
          coords={coord} 
          isLit={board[y][x]} 
          flipCellsAllAround={() => shuffleCells(coord)} 
          
        />
      );
    }
    table.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{table}</tbody>
    </table>
  );
}

export default Board;
