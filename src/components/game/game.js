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
        squares: Array(9).fill(null),
        indexOfChangedSquare: null
      }],
      currentMove: 0,
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
    
    const moveData = {
      squares,
      indexOfChangedSquare: squareIndex
    };    
    const history = this.state.history.slice(0, this.state.currentMove + 1);
    
    this.setState({
      history: history.concat([moveData]),
      currentMove: history.length,
      xIsNext: !this.state.xIsNext,
      winner: this.calculateWinner(squares)
    });
  }

  getCurrentSquares() {
    const currentHistoryData = this.state.history[this.state.currentMove];
    return currentHistoryData.squares;
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

  renderMoveListItems() {
    const moves = this.state.history.map(({ indexOfChangedSquare }, move) => {
      let description = 'Go to game start';

      if (move) {
        const moveCoordinateX = Math.floor(indexOfChangedSquare / 3) + 1;
        const moveCoordinateY = indexOfChangedSquare % 3 + 1;
        description = `Go to move #${move} (${moveCoordinateX}, ${moveCoordinateY})`;
      }

      return (
        <li key={move}>
          <button onClick={() => this.jumpToMove(move)}>{description}</button>
        </li>
      );
    });
    return <>{moves}</>;
  }

  jumpToMove(move) {
    this.setState({
      currentMove: move,
      xIsNext: (move % 2) === 0
    });
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
          <ol>{this.renderMoveListItems()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
