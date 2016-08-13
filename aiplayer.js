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
    let losingPos = [];
    let center = [];
    let corners = [];
    let cornerCheck = [[0, 0], [2, 2], [2, 0], [0, 2]];

    possMoves.forEach(pos=>{
      let oppMark = ( this.mark === 'X' ? 'O' : 'X');
      let clonedB = new Board(this.cloneBoard());
      let clonedB2 = new Board(this.cloneBoard());
      clonedB.placeMark(this.mark, pos);
      if (clonedB.isWon(this.mark)) {
        winningPos.push(pos);
      }
      clonedB2.placeMark(oppMark, pos);
      if (clonedB2.isWon(oppMark)) {
        losingPos.push(pos);
      }
      if (arrayEquals(pos, [1, 1])) {
        center = pos;
      } else {
        cornerCheck.forEach( (corner) => {
          if (arrayEquals(corner, pos)) {
            corners.push(pos);
          }
        });
      }
    });

    if (winningPos.length !== 0) {
      return winningPos[0];
    } else if (losingPos.length !== 0) {
      return losingPos[0];
    } else {
      if (center.length !== 0) {
        return center;
      } else if (corners.length !== 0){
        return corners[Math.floor(Math.random() * corners.length)];
      } else {
        return possMoves[Math.floor(Math.random() * possMoves.length)];
      }
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

function arrayEquals(arr1, arr2) {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

module.exports = AiPlayer;
