import React from 'react';
import './game.css';
import Board from '../board/board.js';

const winningLineCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      winner: null
    };
  }

  handleSquareClickEvent(squareIndex) {
    const squares = this.getCurrentSquares().slice();

    if (squares[squareIndex] || this.state.winner) {
      return;
    }

    squares[squareIndex] = this.getNextPlayerCharacter();

    this.setState({
      history: this.state.history.concat([{ squares }]),
      xIsNext: !this.state.xIsNext,
      winner: this.calculateWinner(squares)
    });
  }

  getCurrentSquares() {
    const history = this.state.history;
    const lastHistoryData = history[history.length - 1];
    return lastHistoryData.squares;
  }

  getNextPlayerCharacter() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  calculateWinner(squares) {
    for (let i = 0; i < winningLineCombinations.length; i++) {
      const [a, b, c] = winningLineCombinations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const winner = this.state.winner;
    const status = winner ? `Winner: ${winner}` : `Next player: ${this.getNextPlayerCharacter()}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.getCurrentSquares()}
            onSquareClick={(squareIndex) => this.handleSquareClickEvent(squareIndex)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
