class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $('li').on('click', event => {
      let $square = $(event.currentTarget);
      let pos = $square.data('pos');
      this.game.playMove(pos);
      // console.log(this.game.board.grid[pos[0]][pos[1]]);
      $square.text(this.game.board.grid[pos[0]][pos[1]]);
      $square.addClass("white");
      // console.log($square.data('pos'));
      if (this.game.isOver()) {
        // alert("Congratulations, " + this.game.winner() + "!");
        let $winnerMsg = $('<h2></h2>');
        if (this.game.winner()) {
          $winnerMsg.text("Congratulations, " + this.game.winner() + "!");
        } else {
          $winnerMsg.text("Draw!");
        }
        this.$el.append($winnerMsg);

        if (this.game.winner() === 'x') {
          $('li').each( function(idx, el) {
            if ($(el).text() === 'x') $(el).addClass("green");
          });
        } else if (this.game.winner() === 'o') {
          $('li').each( function(idx, el) {
            if ($(el).text() === 'o') $(el).addClass("green");
          });
        }
        $('li').off('click');
      }
      
    });
  }

  makeMove($square) {}

  setupBoard() {
    let $ul = $('<ul></ul>');
    // $ul.text('lalalalala');
    for (var i = 0; i < 9; i++) {
      let $li = $('<li></li>');
      $li.data("pos", idxToPos(i));
      $ul.append($li);
    }
    this.$el.append($ul);
  }
}

const idxToPos = function(i) {
  if (i === 0) return [0,0];
  if (i === 1) return [0,1];
  if (i === 2) return [0,2];
  if (i === 3) return [1,0];
  if (i === 4) return [1,1];
  if (i === 5) return [1,2];
  if (i === 6) return [2,0];
  if (i === 7) return [2,1];
  if (i === 8) return [2,2];
};

module.exports = View;
