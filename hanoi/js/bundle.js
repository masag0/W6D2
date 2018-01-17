/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const HanoiGame = __webpack_require__(1);
const HanoiView = __webpack_require__(2);

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});

console.log('i am here');


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Game {
  constructor() {
    this.towers = [[3, 2, 1], [], []];
  }

  isValidMove(startTowerIdx, endTowerIdx) {
      const startTower = this.towers[startTowerIdx];
      const endTower = this.towers[endTowerIdx];

      if (startTower.length === 0) {
        return false;
      } else if (endTower.length === 0) {
        return true;
      } else {
        const topStartDisc = startTower[0];
        const topEndDisc = endTower[0];
        return topStartDisc > topEndDisc;
      }
  }

  isWon() {
      // move all the discs to the last or second tower
      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  }

  move(startTowerIdx, endTowerIdx) {
      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
        this.towers[endTowerIdx].unshift(this.towers[startTowerIdx].shift());
        return true;
      } else {
        return false;
      }
  }

  print() {
      console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
      this.print();
      reader.question("Enter a starting tower: ", start => {
        const startTowerIdx = parseInt(start);
        reader.question("Enter an ending tower: ", end => {
          const endTowerIdx = parseInt(end);
          callback(startTowerIdx, endTowerIdx);
        });
      });
  }

  run(reader, gameCompletionCallback) {
      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
        if (!this.move(startTowerIdx, endTowerIdx)) {
          console.log("Invalid move!");
        }

        if (!this.isWon()) {
          // Continue to play!
          this.run(reader, gameCompletionCallback);
        } else {
          this.print();
          console.log("You win!");
          gameCompletionCallback();
        }
      });
  }
}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);