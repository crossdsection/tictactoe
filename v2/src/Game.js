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
    indexesFlag: {
      "0_0": false,
      "0_1": false,
      "0_2": false,
      "1_0": false,
      "1_1": false,
      "1_2": false,
      "2_0": false,
      "2_1": false,
      "2_2": false
    },
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

  checkWin = (currentMove, row, col) => {
    for( const winningSet of this.state.winningSets ) {
      let firstValue = this.state.currentMatrix[ winningSet[0][0] ][ winningSet[0][1] ];
      let secondValue = this.state.currentMatrix[ winningSet[1][0] ][ winningSet[1][1] ];
      let thirdValue = this.state.currentMatrix[ winningSet[2][0] ][ winningSet[2][1] ];
      if( firstValue === secondValue && secondValue === thirdValue && firstValue !== "" ) {
        return this.state.currentMove;
      } 
    }
    if(currentMove === 'X') {
      let flagOMoved = false;
      let indexesAvailable = [];
      for( let index in this.state.indexesFlag ) {
        if( !this.state.indexesFlag[index] ) {
          indexesAvailable.push(index);
        }
      }
      for( const winningSet of this.state.winningSets ) {
        let flagFound = false;
        for( const pos of winningSet ) {
          if( pos[0] === row && pos[1] === col ) {
            flagFound = true;
          }
        }
        if( flagFound ) {
          let firstValue = this.state.currentMatrix[ winningSet[0][0] ][ winningSet[0][1] ];
          let secondValue = this.state.currentMatrix[ winningSet[1][0] ][ winningSet[1][1] ];
          let thirdValue = this.state.currentMatrix[ winningSet[2][0] ][ winningSet[2][1] ];
          if( firstValue === secondValue && firstValue === currentMove && thirdValue === "" ) {
            this.handleSquareClick( winningSet[2][0], winningSet[2][1] );
            flagOMoved = true;
            break;
          } else if( thirdValue === secondValue && thirdValue === currentMove && firstValue === "") {
            this.handleSquareClick( winningSet[0][0], winningSet[0][1] );
            flagOMoved = true;
            break;
          } else if( firstValue === thirdValue && firstValue === currentMove && secondValue === "") {
            this.handleSquareClick( winningSet[1][0], winningSet[1][1] );
            flagOMoved = true;
            break;
          } 
        }
      }
      if( !flagOMoved ) {
        const [ row, col ] = indexesAvailable[ Math.round(Math.random() * (indexesAvailable.length - 1)) ].split("_");
        this.handleSquareClick( row, col );
      }
    }
    return false;
  }

  handleSquareClick = (i, j) => {
    this.setState((prevState) => {
      if( prevState.currentMatrix[i][j] === "" && prevState.won === "" ) {
        prevState.currentMatrix[i][j] = prevState.currentMove;
        prevState.indexesFlag[ i + "_" + j ] = true;
        let result = this.checkWin( prevState.currentMove, i, j );
        prevState.won = (result !== false) ? (result === 'X') ? 'user' : 'machine' : "";
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
        <Alert show={this.state.won !== ""} variant="success">
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
