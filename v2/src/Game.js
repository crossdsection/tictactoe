import React from "react";
import "./Game.css";
import Alert from 'react-bootstrap/Alert';

class Square extends React.Component {
  render() {
    const heightAvailable = 0.33 * window.innerHeight;

    const { currentValue, squareClicked, row, column } = this.props;

    return (
      <div
        align="center"
        id={row + "_" + column}
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
    currentMove: "X",
    currentMatrix: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    winningSets: [
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]],
      [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]],
      [[0,2],[1,2],[2,2]],
      [[0,0],[1,1],[2,2]],
      [[0,2],[1,1],[2,0]]
    ],
    won: ""
  };

  renderSquare(i, j) {
    const { currentMatrix } = this.state;
    return (
      <Square
        key = {i + j}
        row={i}
        column={j}
        currentValue={currentMatrix[i][j]}
        squareClicked={this.handleSquareClick}
      />
    );
  }

  checkWin = () => {
    for( const winningSet of this.state.winningSets ) {
      let firstValue = this.state.currentMatrix[ winningSet[0][0] ][ winningSet[0][1] ];
      let secondValue = this.state.currentMatrix[ winningSet[1][0] ][ winningSet[1][1] ];
      let thirdValue = this.state.currentMatrix[ winningSet[2][0] ][ winningSet[2][1] ];
      if( firstValue === secondValue && secondValue === thirdValue && firstValue !== "" ) {
        return this.state.currentMove;
      } 
    }
    return false;
  }

  handleSquareClick = (i, j) => {
    this.setState((prevState) => {
      if( prevState.currentMatrix[i][j] === "" && prevState.won === "" ) {
        prevState.currentMatrix[i][j] = prevState.currentMove;
        prevState.won = (this.checkWin() !== false) ? (this.checkWin() === 'X') ? 'user' : 'machine' : "";
        prevState.currentMove = (prevState.currentMove === 'X') ? 'O' : 'X';
      }
      return {
        currentMatrix: prevState.currentMatrix,
        currentMove: prevState.currentMove
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
      <>
        <Alert show={this.state.won != ""} variant="success">
          <Alert.Heading>{this.state.won} won!!</Alert.Heading>
        </Alert>
        <div className="game-board" style={{ width: boardWidth }}>
          {boardItems}
        </div>
      </>
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
