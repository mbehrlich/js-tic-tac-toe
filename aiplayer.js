const Board = require('./board');

class AiPlayer {
  constructor(name, mark, board) {
    this.name = name;
    this.mark = mark;
    this.board = board;
  }

  getMove(callback) {
    // let x = Math.floor(Math.random() * 3);
    // let y = Math.floor(Math.random() * 3);
    // let pos = [x,y];
    let pos = this.calculateMove();
    callback(pos);
  }

  calculateMove(){
    let possMoves = this.possibleMoves();
    let winningPos = [];

    possMoves.forEach(pos=>{
      let clonedB = new Board(this.cloneBoard());
      clonedB.placeMark(this.mark, pos);
      if (clonedB.isWon(this.mark)) {
        winningPos.push(pos);
      }
    });

    if (winningPos.length === 0) {
      return possMoves[Math.floor(Math.random() * possMoves.length)];
    }else {
      return winningPos[0];
    }
  }

  cloneBoard(){
    let cloned = [];
    this.board.grid.forEach(row => {
      cloned.push(row.slice(0));
    });
    return cloned;
  }

  possibleMoves(){
    let result = [];
    this.board.grid.forEach((row, rowID) => {
      row.forEach((el, colID) => {
        if (el === " "){
          result.push([rowID, colID]);
        }
      });
    });
    return result;
  }



}

module.exports = AiPlayer;
