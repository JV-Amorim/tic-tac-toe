import React from 'react';
import './game.css';
import Board from '../board/board.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { winner: null };
  }

  handleSquareValueChange(squares) {
    const winner = this.calculateWinner(squares);
    this.setState({ winner });
  }

  calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            winner={this.state.winner}
            onSquareValueChange={(squares) => this.handleSquareValueChange(squares)}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
