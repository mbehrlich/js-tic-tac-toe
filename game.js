const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Board = require('./board');
const Player = require('./player');

class Game {
  constructor(player1, player2) {
    this.board = new Board();
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
  }

  run(completion) {
    this.board.printBoard();
    this.currentPlayer.getMove((pos) => {
      if (this.board.placeMark(this.currentPlayer.mark, pos)) {
        if (this.board.isWon(this.currentPlayer.mark) || this.board.isOver()) {
          this.board.printBoard();
          completion();
        } else {
        this.switchPlayers();
        this.run(completion);
        }
      } else {
      this.run(completion);
      }
    });
  }

  switchPlayers() {
    this.currentPlayer = ( this.currentPlayer === this.player1 ? this.player2 : this.player1 );
  }


}

let p1 = new Player('matt', 'X', reader);
let p2 = new Player('rush', 'O', reader);
let game = new Game(p1, p2);
game.run( () => {
  console.log("GAME OVER");
  reader.close();
  // p1.reader.close();
  // p2.reader.close();
});
