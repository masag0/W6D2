class Board {
  constructor() {
    this.snake = new Snake();
    this.apples = new Coord(0,0);
  }
}

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    $el.on('keydown', event => {
      this.handleKeyEvent(event);
    });
  }

  handleKeyEvent(event) {
    console.log(event.keyCode);
  }
}


class Snake {
  constructor() {
    this.direction = "N";
    this.segments = [new Coord(9,9)];
  }

  move() {
    this.segments.pop();
    let head = this.segments[0];
    this.segments.unshift(head.plus(Snake.DIFFERENTIALS[this.direction]));
  }

  turn(dir) {
    this.direction = dir;
  }

  static DIFFERENTIALS() {
    return {
      "N": new Coord(0, -1),
      "S": new Coord(0, 1),
      "E": new Coord(1, 0),
      "W": new Coord(-1, 0)
    };
  }

  static DIRECTIONS() {
    return ["N", "E", "S", "W"];
  }
}

class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(c2) {
    return [[this.x + c2.x], [this.y + c2.y]];
  }

  equals(c2) {
    return (this.x === c2.x && this.y === c2.y);
  }

  isOpposite() {

  }
}

module.exports = View;
