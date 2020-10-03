import React from "react";
import "./Game.css";

class Square extends React.Component {
  render() {
    const heightAvailable = 0.33 * window.innerHeight;

    const { currentValue, squareClicked, row, column } = this.props;

    return (
      <div
        align="center"
        id={this.props.row + "_" + this.props.column}
        className="square"
        onClick={() => squareClicked(row, column)}
        style={{ fontSize: heightAvailable - 10 }}
      >
        <div style={{ width: "100%", height: "100%", lineHeight: "100%" }}>
          {currentValue}
        </div>
      </div>
    );
  }
}

class Board extends React.Component {
  state = {
    currentChance: "user",
    computerPlayer: {
      playerName: "machine",
      playerMove: "O",
    },
    userPlayer: {
      playerName: "user",
      playerMove: "X",
    },
    currentMatrix: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };

  renderSquare(i, j) {
    const { currentChance, computerPlayer, currentMatrix } = this.state;
    return (
      <Square
        key={i + j}
        row={i}
        column={j}
        currentValue={currentMatrix[i][j]}
        squareClicked={this.handleSquareClick}
      />
    );
  }

  handleSquareClick = (i, j) => {
    this.setState((prevState) => {
      if (prevState.currentChance === prevState.computerPlayer.playerName) {
        prevState.currentMatrix[i][j] = prevState.computerPlayer.playerMove;
      } else {
        prevState.currentMatrix[i][j] = prevState.userPlayer.playerMove;
      }
      return {
        currentChance:
          prevState.currentChance === prevState.userPlayer.playerName
            ? prevState.computerPlayer.playerName
            : prevState.userPlayer.playerName,
        currentMatrix: prevState.currentMatrix,
      };
    });
  };

  renderBoardRow(i) {
    let squareItems = [];
    for (var j = 0; j < 3; j++) {
      squareItems.push(this.renderSquare(i, j));
    }
    return (
      <div key={i} className="board-row">
        {squareItems}
      </div>
    );
  }

  render() {
    const boardWidth = window.innerHeight;
    const boardItems = [];
    for (let i = 0; i < 3; i++) {
      boardItems.push(this.renderBoardRow(i));
    }

    return (
      <div className="game-board" style={{ width: boardWidth }}>
        {boardItems}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    const gameHeight = window.innerHeight;

    return (
      <div className="game" style={{ height: gameHeight }}>
        <Board />
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
