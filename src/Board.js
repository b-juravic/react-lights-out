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
  function createBoard(nrows, ncols) {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    let row = [];
    while (initialBoard.length < nrows) {
      let random = [true, false];
      let idx = Math.floor(Math.random() * 2);
      if( row.length < ncols) {
        row.push(random[idx]);
      } else {
        initialBoard.push(row);
        row = [];
      }
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
      let boardCopy = oldBoard.slice();
      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }


  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
