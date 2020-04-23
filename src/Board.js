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

function Board({ nrows=6, ncols=6, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  // function createBoard(nrows, ncols) {
  //   let initialBoard = [];
  //   // TODO: create array-of-arrays of true/false values
  //   let row = [];
  //   while (initialBoard.length < nrows) {
  //     let random = [true, false];
  //     let idx = Math.floor(Math.random() * 2);
  //     // row.push(Math.random() < chanceLightStartsOn);
  //     if( row.length < ncols) {
  //       row.push(random[idx]);
  //     } else {
  //       initialBoard.push(row);
  //       row = [];
  //     }
  //   }
  //   console.log('BOARD!!!!!!', initialBoard);
  //   return initialBoard;
  // }
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.

    // If false there is a winner!
    return board.every((row) => !row.includes(true));

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

      // TODO: Make a (deep) copy of the oldBoard
      // const boardCopy = [...oldBoard];
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y-1, x, boardCopy);
      flipCell(y+1, x, boardCopy);
      flipCell(y, x-1, boardCopy);
      flipCell(y, x+1, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }


  // if the game is won, just show a winning msg & render nothing else


  // TODO

  // make table board

  let tableBoard = [];

  for(let y = 0; y < nrows; y++){
    let rows = [];
    for(let x = 0; x < ncols; x++){
      let coord = `${y}-${x}`;
      let cell = (<Cell 
        key={coord}
        flipCellsAroundMe={() => flipCellsAround(coord)}
        isLit={board[y][x]}
        />)
      rows.push(cell);
    }
    tableBoard.push(<tr key={y}>{rows}</tr>);
  }
  console.log(board);

  return(
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  )

  // TODO
}

export default Board;
