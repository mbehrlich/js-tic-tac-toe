class AiPlayer {
  constructor(name, mark, board) {
    this.name = name;
    this.mark = mark;
    this.board = board;
  }

  getMove(callback) {
    let x = Math.floor(Math.random() * 3);
    let y = Math.floor(Math.random() * 3);
    let pos = [x,y];
    callback(pos);
  }
  // getMove(callback) {
  //   this.reader.question(`${this.name}, please enter the row and column you wish to mark, separated by a comma`, (answer) => {
  //     let pos = this.parseAnswer(answer);
  //     callback(pos);
  //   });
  // }
  //
  // parseAnswer(answer) {
  //   return answer.split(',').map( (el) => {
  //     return parseInt(el);
  //   });
  // }
}

module.exports = AiPlayer;
