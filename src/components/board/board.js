import React from 'react';
import './board.css';
import Square from '../square/square.js';

class Board extends React.Component {
  renderSquare(index) {
    return (
      <Square
        value={this.props.squares[index]}
        onClick={() => this.props.onSquareClick(index)}
      />
    );
  }

  render() {
    const boardRows = [];

    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const currentRowSquares = [];

      for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
        const currentSquareIndex = rowIndex * 3 + columnIndex;
        const square = this.renderSquare(currentSquareIndex);
        currentRowSquares.push(square);
      }
      
      const boardRow = <div className="board-row">{currentRowSquares}</div>;
      boardRows.push(boardRow);
    }

    return (
      <div>{boardRows}</div>
    );
  }
}

export default Board;
