import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=6, ncols=6, chanceLightStartsOn=.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        // value of each cell should be random true/false
        let randomTrueFalse = Math.random() < chanceLightStartsOn;
        row.push(randomTrueFalse)
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // Check the board in state to determine whether the player has won.
    // If all false, lights out & there is a winner!
    return board.every(row => !row.includes(true));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      // ex. coord like "2-3"
      // splits string on - and maps the 2 and 3 to numbers we can use
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // In the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y-1, x, boardCopy);
      flipCell(y+1, x, boardCopy);
      flipCell(y, x-1, boardCopy);
      flipCell(y, x+1, boardCopy);

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // make table board: rows of Cell components

  let tableBoard = [];

  for(let y = 0; y < nrows; y++){
    let row = [];
    for(let x = 0; x < ncols; x++){
      let coord = `${y}-${x}`;
      let cell = (
      <Cell
        key={coord}
        flipCellsAroundMe={() => flipCellsAround(coord)}
        isLit={board[y][x]}
        />
        );
      row.push(cell);
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }
  console.log(board);

  return(
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
