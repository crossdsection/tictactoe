import React from 'react';
import logo from './logo.svg';
import './Game.css';

const superObj = {
  currentChance : "user",
  computerPlayer : {
    playerName: "machine",
    playerMove: "O"
  },
  userPlayer : {
    playerName: "user",
    playerMove: "X"
  },
  currentMatrix: []
};

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue : ""
    };
    this.makeAMark = function() {
      if( this.state.currentValue === "" ) {
        if( superObj.currentChance === superObj.userPlayer.playerName ){
          this.setState({ currentValue : superObj.userPlayer.playerMove});
        } else {
          this.setState({ currentValue : superObj.computerPlayer.playerMove});
        }
        superObj.currentChance = ( superObj.currentChance === superObj.userPlayer.playerName ) ? superObj.computerPlayer.playerName : superObj.userPlayer.playerName;
      }
    }
  }

  render() {
    const heightAvailable = 0.33 * window.innerHeight;

    return (
      <div align="center" id={ this.props.row + "_" + this.props.column} className="square" onClick={ () => this.makeAMark() } style={ {fontSize : heightAvailable - 10} }>
        <div style={ { width : "100%", height: "100%", lineHeight: "100%"}}> {this.state.currentValue} </div>
      </div>
    );
  }
}

class Board extends React.Component {
  renderSquare(i, j) {
    return <Square key={i+j} row={i} column={j} />;
  }

  renderBoardRow(i) {
    let squareItems = [];
    for( var j = 0; j < 3; j++ ){
      squareItems.push(this.renderSquare(i, j));
    }
    return <div key={i} className="board-row"> {squareItems} </div>;
  }
  
  render() {
    const boardWidth = window.innerHeight;
    const boardItems = [];
    for( let i = 0; i < 3; i++ ){
      boardItems.push(this.renderBoardRow(i));
    }

    return (
      <div className="game-board" style={{width: boardWidth}}>
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
