class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.render();
    this.clicked = '';

    let view = this;
    $('ul').each ( function(idx, ul) {
      $(ul).on("click", (event) => {
        let ids = {
          a: 0,
          b: 1,
          c: 2
        };
        if (!view.clicked) {
          view.clicked = $(event.currentTarget).attr('id');
          $(event.currentTarget).toggleClass('red');
          console.log("moving from: " + ids[view.clicked]);
        } else {
          let lastUl = $('ul#'+view.clicked);
          lastUl.toggleClass('red');
          let moveTo = $(event.currentTarget).attr('id');
          console.log("moving to: " + ids[moveTo]);
          view.game.move(ids[view.clicked], ids[moveTo]);
          view.clicked = '';
          view.render();
          if (view.game.isWon()) {
            $('li').addClass('green');
            alert("Good work, you!");
          }
        }
      });
    });

  }

  setupTowers() {
    const $ul0 = $('<ul></ul>');
    for (var i = 0; i < 3; i++) {
      let $li = $('<li></li>');
      let ids = ['a','b','c'];
      $li.attr('id', ids[2-i]);
      $ul0.append($li);
    }
    $ul0.attr('id', 'a');
    const $ul1 = $('<ul></ul>');
    $ul1.attr('id', 'b');
    const $ul2 = $('<ul></ul>');
    $ul2.attr('id', 'c');
    this.$el.append($ul0);
    this.$el.append($ul1);
    this.$el.append($ul2);
  }

  render() {
    const towers = this.game.towers;
    $('ul').each( function(idx, ul) {
      $(ul.children).remove();
    });
    const arr = ['a','b','c'];
    for (let i = 0; i < towers.length; i++) {
      let $ul = $(`ul#${arr[i]}`);
      for (let j = 0; j < towers[i].length; j++) {
        let id = towers[i][j]-1;
        let $li = $('<li></li>');
        $li.attr('id', arr[id]);
        $ul.append($li);
      }

    }
  }
}

module.exports = View;
