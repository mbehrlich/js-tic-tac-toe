class Board{
  constructor(){
    // this.grid = [new Array(3), new Array(3), new Array(3)];
    this.grid = [ [" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
  }

  isValidMove(pos){
    let x = pos[0], y = pos[1];
    if (x < 0 || x > 2 || y < 0 || y > 2){
      return false;
    } else if (isNaN(pos[0]) || isNaN(pos[1])) {
      return false;
    } else {
      return !this.isOccupied(pos);
    }
  }

  isOccupied(pos){
    let x = pos[0], y = pos[1];
    if (this.grid[x][y] === " "){
      return false;
    } else {
      return true;
    }
  }

  printBoard() {

    this.grid.forEach((row) => {
      let temp = "";
      // console.log(row);
      for (let i = 0; i < 3; i++){
        if (row[i]){
          temp += row[i] + "|";
        } else {
          temp += " |";
        }

      }
      console.log(temp);
      console.log("______");
    });
  }

  placeMark(mark, pos){
    let x = pos[0], y = pos[1];
    if (this.isValidMove(pos)){
      this.grid[x][y] = mark;
      return true;
    } else {
      return false;
    }
  }

  isOver() {
    let over = true;
    this.grid.forEach((row) => {
      for(let i = 0 ; i < 3; i++){
        if(row[i] === " "){
          over = false;
        }
      }
    });
    return over;
  }

  horizontalWins(mark){
    let win = false;
    this.grid.forEach((row) => {
      if(row.every((el) => el === mark)) {
        win = true;
      }
    });
    return win;
  }

  verticalWins(mark){
    return(checkVeriticalWins(this.grid.transpose(), mark));
  }

  diagonalWins(mark){
    let diag1 = [this.grid[0][0], this.grid[1][1], this.grid[2][2]];
    let diag2 = [this.grid[0][2], this.grid[1][1], this.grid[2][0]];
    let diagonals = [diag1, diag2];
    // console.log(diagonals);
    let win = false;
    diagonals.forEach((row) => {
      if(row.every((el) => el === mark)) {
        win = true;
      }
    });
    return win;

  }

  isWon(mark){
    if(this.verticalWins(mark) || this.horizontalWins(mark) || this.diagonalWins(mark)){
      return true;
    }
    return false;
  }
}

Array.prototype.transpose = function(){
  let result = [];

  for(let i = 0; i < this[0].length; i++){
    let subResult = [];
    for(let j = 0; j < this.length; j++){
      subResult.push(this[j][i]);
    }
    result.push(subResult);
  }
  return result;
};

function checkVeriticalWins(board, mark){
  let win = false;
  board.forEach((row) => {
    if(row.every((el) => el === mark )) {
      win = true;
    }
  });
  return win;
}

module.exports = Board;

// let b = new Board();
// // b.printBoard();
// b.placeMark("O",[0,2]);
// b.placeMark("O",[1,1]);
// b.placeMark("O",[2,0]);
// // b.placeMark("X",[1,2]);
// b.printBoard();
// // console.log(b.horizontalWins("X"));
// // console.log(b.verticalWins("X"));
// // console.log(b.diagonalWins("X"));
// console.log(b.isWon("O"));
