// const readline = require('readline');
// const reader = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

class Player {
  constructor(name, mark, board, reader) {
    this.name = name;
    this.mark = mark;
    this.board = board;
    this.reader = reader;
  }

  getMove(callback) {
    this.board.printBoard();
    this.reader.question(`${this.name}, please enter the row and column you wish to mark, separated by a comma`, (answer) => {
      let pos = this.parseAnswer(answer);
      callback(pos);
    });
  }

  parseAnswer(answer) {
    return answer.split(',').map( (el) => {
      return parseInt(el);
    });
  }
}

module.exports = Player;

// let a = new Player('matt', 'X');
// a.getMove(function() {});
