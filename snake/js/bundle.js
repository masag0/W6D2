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

const View = __webpack_require__(1);
let $el = $('.easel');
let $window = $('html');
let v = new View($window);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);