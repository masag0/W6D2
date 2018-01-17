const HanoiGame = require('./node/game');
const HanoiView = require('./hanoi-view');

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});

console.log('i am here');
