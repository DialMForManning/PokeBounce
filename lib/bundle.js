/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _intro = __webpack_require__(1);
	
	var _intro2 = _interopRequireDefault(_intro);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var stage = new createjs.Stage("jazz-canvas");
	
	  var manifest = [{ src: "sprites/pokeball.png", id: "pokeball" }, { src: "images/brick.jpg", id: "brick" }, { src: "images/PokeBounce.png", id: "logo" }, { src: "images/howToPlay.png", id: "howTo" }, { src: "images/startGame.png", id: "startGame" }, { src: "images/brickGreen.jpg", id: "brickGreen" }, { src: "images/brickPink.jpg", id: "brickPink" }, { src: "images/instructions.jpg", id: "instructions" }, { src: "images/congratulations.png", id: "congratulations" }, { src: "images/nextLevel.png", id: "nextLevel" }, { src: "images/start.png", id: "start" }, { src: "images/tryAgain.png", id: 'tryAgain' }];
	  var loader = new createjs.LoadQueue(false);
	  loader.addEventListener("complete", showIntro);
	  loader.loadManifest(manifest, true, "./assets/");
	
	  function showIntro() {
	    var intro = new _intro2.default(loader);
	    intro.render();
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(2);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _how_to = __webpack_require__(11);
	
	var _how_to2 = _interopRequireDefault(_how_to);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Intro = function () {
	  function Intro(loader) {
	    var _this = this;
	
	    _classCallCheck(this, Intro);
	
	    this.loader = loader;
	    this.go = this.go.bind(this);
	    this.stage = new createjs.Stage("jazz-canvas");
	    this.stage.enableMouseOver();
	    this.logo = new createjs.Bitmap(loader.getResult("logo"));
	    this.logo.x = 5;
	    this.logo.y = 30;
	
	    this.startGame = new createjs.Bitmap(loader.getResult("startGame"));
	    this.startGame.x = 170;
	    this.startGame.y = 230;
	    this.startClick = new createjs.Shape();
	    this.startClick.graphics.beginFill("#000");
	    this.startClick.graphics.dr(this.startGame.x, this.startGame.y, 300, 50);
	    this.startClick.alpha = 0.01;
	    this.startClick.addEventListener("click", this.go);
	    this.startClick.cursor = "pointer";
	
	    this.howToScreen = new _how_to2.default(this.stage, loader.getResult("instructions"));
	    this.howTo = new createjs.Bitmap(loader.getResult("howTo"));
	    this.howTo.x = 170;
	    this.howTo.y = 300;
	    this.howToClick = new createjs.Shape();
	    this.howToClick.graphics.beginFill("#000");
	    this.howToClick.graphics.dr(this.howTo.x, this.howTo.y, 300, 50);
	    this.howToClick.alpha = 0.01;
	    this.howToClick.addEventListener("click", function () {
	      _this.howToScreen.render();
	    });
	    this.howToClick.cursor = "pointer";
	  }
	
	  _createClass(Intro, [{
	    key: 'render',
	    value: function render() {
	      this.stage.removeAllChildren();
	      this.stage.addChild(this.logo);
	      this.stage.addChild(this.startGame);
	      this.stage.addChild(this.startClick);
	      this.stage.addChild(this.howTo);
	      this.stage.addChild(this.howToClick);
	      this.stage.update();
	    }
	  }, {
	    key: 'go',
	    value: function go() {
	      this.stage.removeAllChildren();
	      var game = new _game2.default(this.stage, this.loader);
	      game.startNextLevel();
	    }
	  }]);
	
	  return Intro;
	}();
	
	exports.default = Intro;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(3);
	
	var _board2 = _interopRequireDefault(_board);
	
	var _level_start = __webpack_require__(8);
	
	var _level_start2 = _interopRequireDefault(_level_start);
	
	var _game_over = __webpack_require__(9);
	
	var _game_over2 = _interopRequireDefault(_game_over);
	
	var _win = __webpack_require__(10);
	
	var _win2 = _interopRequireDefault(_win);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(stage, loader) {
	    _classCallCheck(this, Game);
	
	    createjs.Ticker.framerate = 100;
	    this.stage = stage;
	    this.loader = loader;
	
	    this.cumulativeScore = 0;
	    this.levelScore = 0;
	    this.levelStarter = new _level_start2.default(stage, loader);
	    this.startNextLevel = this.startNextLevel.bind(this);
	
	    var scoresFont = "16px Futura";
	    var scoresColor = "#fff";
	
	    this.livesLeft = new createjs.Text();
	    this.livesLeft.font = scoresFont;
	    this.livesLeft.color = scoresColor;
	    this.livesLeft.x = 20;
	    this.livesLeft.y = 1;
	
	    this.area = new createjs.Text();
	    this.area.font = scoresFont;
	    this.area.color = scoresColor;
	    this.area.y = 420;
	    this.area.x = this.livesLeft.x;
	
	    this.score = new createjs.Text();
	    this.score.font = scoresFont;
	    this.score.color = scoresColor;
	    this.score.x = 500;
	    this.score.y = 1;
	  }
	
	  _createClass(Game, [{
	    key: 'startNextLevel',
	    value: function startNextLevel() {
	      this.levelStarter.level++;
	      this.cumulativeScore += this.levelScore;
	      this.levelScore = 0;
	
	      var board = new _board2.default(this);
	      this.lives = this.levelStarter.level + 1;
	      this.areaCaptured = 0;
	      this.levelStarter.render(board);
	
	      board.render(this.lives);
	      this.renderScoreBoard(board);
	    }
	  }, {
	    key: 'renderScoreBoard',
	    value: function renderScoreBoard(board) {
	      this.stage.removeChild(this.livesLeft);
	      this.stage.removeChild(this.score);
	      this.stage.removeChild(this.area);
	
	      this.calculateAreaCaptured(board);
	      this.area.text = 'Area Captured: ' + this.areaCaptured + '%';
	      this.score.text = 'Score: ' + (this.levelScore + this.cumulativeScore);
	      this.livesLeft.text = 'Lives: ' + this.lives;
	
	      this.stage.addChild(this.livesLeft);
	      this.stage.addChild(this.score);
	      this.stage.addChild(this.area);
	      this.stage.update();
	      this.checkLose(board);
	    }
	  }, {
	    key: 'calculateAreaCaptured',
	    value: function calculateAreaCaptured(board) {
	      var captured = Object.keys(board.walls).length - 100 + Object.keys(board.fills).length;
	
	      this.areaCaptured = Math.floor(captured / 540 * 100);
	
	      this.calculateLevelScore();
	    }
	  }, {
	    key: 'calculateLevelScore',
	    value: function calculateLevelScore() {
	      this.levelScore = this.areaCaptured * 3;
	
	      if (this.areaCaptured > 75) {
	        this.levelScore += (this.areaCaptured - 75) * 13;
	      }
	    }
	  }, {
	    key: 'checkWin',
	    value: function checkWin(board) {
	      if (this.areaCaptured >= 75) {
	        board.end();
	        new _win2.default(this.stage, this.startNextLevel, this.loader);
	      }
	    }
	  }, {
	    key: 'checkLose',
	    value: function checkLose(board) {
	      if (this.lives <= 0) {
	        if (board.buildPink !== "killed") {
	          board.killBuilder("pink");
	        }
	        if (board.buildGreen !== "killed") {
	          board.killBuilder("green");
	        }
	        board.end();
	        this.cumulativeScore += this.levelScore;
	        new _game_over2.default(this.cumulativeScore, this.stage, this.loader);
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _pokeball = __webpack_require__(4);
	
	var _pokeball2 = _interopRequireDefault(_pokeball);
	
	var _wall = __webpack_require__(5);
	
	var _wall2 = _interopRequireDefault(_wall);
	
	var _wall_builder = __webpack_require__(6);
	
	var _wall_builder2 = _interopRequireDefault(_wall_builder);
	
	var _sub_div_filler = __webpack_require__(7);
	
	var _sub_div_filler2 = _interopRequireDefault(_sub_div_filler);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board(game) {
	    _classCallCheck(this, Board);
	
	    this.START_POS = [[200, 200], [300, 200], [400, 200], [100, 200], [200, 300], [300, 300], [400, 300], [100, 300], [200, 100], [300, 100], [400, 100], [100, 100], [500, 100], [500, 200], [500, 300]];
	
	    this.game = game;
	    this.loader = game.loader;
	    this.stage = game.stage;
	
	    this.dir = "vertical";
	    this.canvas = document.getElementById("jazz-canvas");
	    this.canvas.className = this.dir;
	    this.pokeballs = [];
	    this.walls = {};
	    this.fills = {};
	    this.pinks = [];
	    this.greens = [];
	    this.build = true;
	    this.buildPink = "killed";
	    this.buildGreen = "killed";
	
	    this.buildListener = new createjs.Shape();
	    this.buildListener.graphics.beginFill("#fff");
	    this.buildListener.graphics.dr(20, 40, 600, 360);
	    this.buildListener.alpha = 0.05;
	
	    this.buildWall = this.buildWall.bind(this);
	    this.switchDir = this.switchDir.bind(this);
	
	    window.addEventListener('contextmenu', this.switchDir);
	    window.addEventListener('keydown', this.switchDir);
	
	    this.tick = this.tick.bind(this);
	  }
	
	  _createClass(Board, [{
	    key: 'buildWall',
	    value: function buildWall(e) {
	      if (event.button === 0 && typeof this.buildPink === "string" && typeof this.buildGreen === "string") {
	        this.buildPink = new _wall_builder2.default(this, "pink", this.dir, e);
	        this.buildGreen = new _wall_builder2.default(this, "green", this.dir, e);
	      }
	    }
	  }, {
	    key: 'switchDir',
	    value: function switchDir(e) {
	      if (e.type === "contextmenu" || e.code === "Space") {
	        e.preventDefault();
	        this.dir = this.dir === "vertical" ? "horizontal" : "vertical";
	        this.canvas.className = this.dir;
	        this.build = false;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render(numPokeballs) {
	      var _this = this;
	
	      this.pokeballs = [];
	      this.walls = {};
	
	      for (var a = 0; a < numPokeballs; a++) {
	        this.pokeballs.push(new _pokeball2.default(this.START_POS[a], this.game.loader.getResult("pokeball"), a));
	      }
	
	      for (var i = 0; i < 32; i++) {
	        for (var j = 0; j < 20; j++) {
	          var x = i * 20;
	          var y = j * 20 + 20;
	          if (j === 0 || j === 19 || i === 0 || i === 31) {
	            this.walls[[x, y].join()] = new _wall2.default('wall', [x, y], this.game.loader);
	          }
	        }
	      }
	
	      var that = this;
	      Object.keys(this.walls).forEach(function (wallPos) {
	        that.stage.addChild(that.walls[wallPos].body);
	      });
	
	      this.pokeballs.forEach(function (pokeball) {
	        _this.stage.addChild(pokeball.body);
	      });
	
	      this.stage.addChild(this.buildListener);
	      this.stage.update();
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.buildListener.addEventListener('click', this.buildWall);
	      createjs.Ticker.addEventListener("tick", this.tick);
	    }
	  }, {
	    key: 'end',
	    value: function end() {
	      createjs.Ticker.removeAllEventListeners();
	    }
	  }, {
	    key: 'checkWallCollisions',
	    value: function checkWallCollisions(pokeball, walls) {
	      var _this2 = this;
	
	      walls.forEach(function (wall) {
	        var xmin = wall.body.x;
	        var xmax = xmin + 20;
	        var ymin = wall.body.y;
	        var ymax = ymin + 20;
	
	        if (xmin < pokeball.body.x && xmax > pokeball.body.x) {
	          if (Math.abs(ymin + 10 - pokeball.body.y) <= 20) {
	            switch (wall.type) {
	              case "wall":
	                _this2.wallBounce(pokeball, 1);
	                break;
	              default:
	                _this2.killBuilder(wall.type);
	                break;
	            }
	          }
	        }
	
	        if (ymin < pokeball.body.y && ymax > pokeball.body.y) {
	          if (Math.abs(xmin + 10 - pokeball.body.x) <= 20) {
	            switch (wall.type) {
	              case "wall":
	                _this2.wallBounce(pokeball, 0);
	                break;
	              default:
	                _this2.killBuilder(wall.type);
	                break;
	            }
	          }
	        }
	      });
	    }
	  }, {
	    key: 'wallBounce',
	    value: function wallBounce(pokeball, vInd) {
	      pokeball.vel[vInd] *= -1;
	      pokeball.updatePos();
	    }
	  }, {
	    key: 'killBuilder',
	    value: function killBuilder(type) {
	      var _this3 = this;
	
	      if (type === "pink") {
	        if (typeof this.buildPink !== "string") {
	          this.buildPink.kill(type);
	          this.pinks.forEach(function (pink) {
	            _this3.stage.removeChild(pink.body);
	          });
	          this.pinks = [];
	        }
	      } else {
	        if (typeof this.buildGreen !== "string") {
	          this.buildGreen.kill(type);
	          this.greens.forEach(function (green) {
	            _this3.stage.removeChild(green.body);
	          });
	          this.greens = [];
	        }
	      }
	    }
	  }, {
	    key: 'checkPokeballCollisions',
	    value: function checkPokeballCollisions() {
	      var that = this;
	
	      for (var i = 0; i < that.pokeballs.length; i++) {
	        for (var j = i + 1; j < that.pokeballs.length; j++) {
	          var pokeball = that.pokeballs[i];
	          var other = that.pokeballs[j];
	          var pos1 = [pokeball.body.x, pokeball.body.y];
	          var pos2 = [other.body.x, other.body.y];
	
	          var dist = Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	
	          if (dist < 20) {
	            var placeVel = pokeball.vel;
	            pokeball.vel = other.vel;
	            other.vel = placeVel;
	            other.updatePos();
	          }
	        }
	      }
	    }
	  }, {
	    key: 'tick',
	    value: function tick(event) {
	      var _this4 = this;
	
	      if (this.buildPink === "complete" && this.buildGreen === "complete") {
	        var checkSubDivs = new _sub_div_filler2.default(this);
	      }
	      this.checkPokeballCollisions();
	      this.pokeballs.forEach(function (pokeball) {
	        _this4.checkWallCollisions(pokeball, Object.keys(_this4.walls).map(function (wallPos) {
	          return _this4.walls[wallPos];
	        }));
	        _this4.checkWallCollisions(pokeball, _this4.pinks);
	        _this4.checkWallCollisions(pokeball, _this4.greens);
	        pokeball.updatePos();
	      });
	
	      this.stage.update();
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Pokeball = function () {
	  function Pokeball(pos, atomImg, id) {
	    _classCallCheck(this, Pokeball);
	
	    this.spriteSheet = new createjs.SpriteSheet({
	      images: [atomImg],
	      frames: {
	        width: 20,
	        height: 20,
	        regX: 10,
	        regY: 10,
	        spacing: 0
	      },
	      animations: {
	        spin: [0, 35, 'spin', 0.5]
	      }
	    });
	    var speed = 3;
	    this.id = id;
	
	    var goodX = false;
	    var xVel = void 0;
	    while (!goodX) {
	      xVel = Math.random() * speed * 2 - speed;
	      goodX = Math.abs(xVel) > 0.7 && Math.abs(xVel) < speed - 0.7;
	    }
	
	    var yVel = Math.sqrt(Math.pow(speed, 2) - Math.pow(xVel, 2));
	    if (Math.round(Math.random()) === 1) {
	      yVel *= -1;
	    }
	    this.vel = [xVel, yVel];
	    this.body = new createjs.Sprite(this.spriteSheet, 'spin');
	    this.body.x = pos[0];
	    this.body.y = pos[1];
	  }
	
	  _createClass(Pokeball, [{
	    key: 'updatePos',
	    value: function updatePos() {
	      this.body.x += this.vel[0];
	      this.body.y += this.vel[1];
	    }
	  }]);
	
	  return Pokeball;
	}();
	
	exports.default = Pokeball;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Wall = function Wall(type, pos, loader) {
	  _classCallCheck(this, Wall);
	
	  this.type = type;
	  this.loader = loader;
	
	  switch (type) {
	    case "wall":
	      this.body = new createjs.Bitmap(loader.getResult('brick'));
	      break;
	    case "pink":
	      this.body = new createjs.Bitmap(loader.getResult('brickPink'));
	      break;
	    case "green":
	      this.body = new createjs.Bitmap(loader.getResult('brickGreen'));
	      break;
	    default:
	      throw "invalid tile type";
	  }
	  this.body.x = pos[0];
	  this.body.y = pos[1];
	};
	
	exports.default = Wall;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _wall = __webpack_require__(5);
	
	var _wall2 = _interopRequireDefault(_wall);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var WallBuilder = function () {
	  function WallBuilder(board, color, dir, e) {
	    _classCallCheck(this, WallBuilder);
	
	    this.board = board;
	    this.color = color;
	    this.dir = dir;
	    this.complete = false;
	
	    this.targetY = Math.floor(e.stageY / 20) * 20;
	    this.targetX = Math.floor(e.stageX / 20) * 20;
	
	    if (board.dir === "vertical") {
	      this.yPink = e.stageY % 20 < 10 ? this.targetY - 20 : this.targetY;
	      this.yGreen = this.yPink + 20;
	      this.xPink = this.targetX;
	      this.xGreen = this.targetX;
	    } else {
	      this.xPink = e.stageX % 20 < 10 ? this.targetX : this.targetX + 20;
	      this.xGreen = this.xPink - 20;
	      this.yPink = this.targetY;
	      this.yGreen = this.targetY;
	    }
	
	    this.propogate = this.propogate.bind(this);
	    this.checkComplete = this.checkComplete.bind(this);
	    this.finalize = this.finalize.bind(this);
	    this.updateNextPos = this.updateNextPos.bind(this);
	    this.kill = this.kill.bind(this);
	
	    this.builder = window.setInterval(this.propogate, 80);
	  }
	
	  _createClass(WallBuilder, [{
	    key: "propogate",
	    value: function propogate() {
	      this.checkComplete(this.color);
	
	      if (this.complete) {
	        window.clearInterval(this.builder);
	        this.finalize(this.color);
	      } else {
	        var newPos = this.color === "pink" ? [this.xPink, this.yPink] : [this.xGreen, this.yGreen];
	        var newBrick = new _wall2.default(this.color, newPos, this.board.loader);
	        var toUpdate = this.color === "pink" ? this.board.pinks : this.board.greens;
	        var modifier = this.color === "pink" ? -20 : 20;
	
	        toUpdate.push(newBrick);
	        this.board.stage.addChild(newBrick.body);
	        this.updateNextPos();
	      }
	    }
	  }, {
	    key: "updateNextPos",
	    value: function updateNextPos() {
	      var modifier = this.color === "pink" ? -20 : 20;
	
	      if (this.dir === "vertical") {
	        if (this.color === "pink") {
	          this.yPink -= 20;
	        } else {
	          this.yGreen += 20;
	        }
	      } else {
	        if (this.color === "pink") {
	          this.xPink += 20;
	        } else {
	          this.xGreen -= 20;
	        }
	      }
	    }
	  }, {
	    key: "checkComplete",
	    value: function checkComplete(color) {
	      var nextPos = void 0;
	      switch (color) {
	        case "pink":
	          nextPos = [this.xPink, this.yPink].join();
	          if (this.board.walls[nextPos] || this.board.fills[nextPos]) {
	            this.complete = true;
	          }
	          break;
	        case "green":
	          nextPos = [this.xGreen, this.yGreen].join();
	          if (this.board.walls[nextPos] || this.board.fills[nextPos]) {
	            this.complete = true;
	          }
	          break;
	      }
	    }
	  }, {
	    key: "finalize",
	    value: function finalize() {
	      var toFinalize = this.color === "pink" ? this.board.pinks : this.board.greens;
	      var that = this;
	
	      toFinalize.forEach(function (brick) {
	        that.board.stage.removeChild(brick.body);
	        var newWall = new _wall2.default('wall', [brick.body.x, brick.body.y], that.board.loader);
	        that.board.walls[[brick.body.x, brick.body.y].join()] = newWall;
	        that.board.stage.addChild(newWall.body);
	      });
	
	      if (this.color === "pink") {
	        this.board.pinks = [];
	        this.board.buildPink = "complete";
	      } else {
	        this.board.greens = [];
	        this.board.buildGreen = "complete";
	      }
	
	      this.board.game.renderScoreBoard(this.board);
	      this.board.game.checkWin(this.board);
	    }
	  }, {
	    key: "kill",
	    value: function kill(type) {
	      window.clearInterval(this.builder);
	      if (type === "pink") {
	        this.board.buildPink = "killed";
	      } else {
	        this.board.buildGreen = "killed";
	      }
	
	      this.board.game.lives -= 1;
	      this.board.game.renderScoreBoard(this.board);
	    }
	  }]);
	
	  return WallBuilder;
	}();
	
	exports.default = WallBuilder;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _wall = __webpack_require__(5);
	
	var _wall2 = _interopRequireDefault(_wall);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SubDivFiller = function () {
	  function SubDivFiller(board) {
	    _classCallCheck(this, SubDivFiller);
	
	    this.board = board;
	    board.buildPink = "checking";
	    board.buildGreen = "checking";
	
	    this.subDivs = {};
	    this.checked = {};
	    this.DELTAS = [[-20, -20], [-20, 0], [-20, 20], [0, -20], [0, 20], [20, -20], [20, 0], [20, 20]];
	
	    this.findSubDivs();
	    this.fillSubDivs();
	  }
	
	  _createClass(SubDivFiller, [{
	    key: "isWall",
	    value: function isWall(pos) {
	      if (pos[0] < 20 || pos[0] > 600 || pos[1] < 40 || pos[1] > 380) {
	        return true;
	      }
	
	      var sPos = pos.join();
	      if (this.board.walls[sPos] || this.board.fills[sPos]) {
	        return true;
	      }
	
	      return false;
	    }
	  }, {
	    key: "findSubDivs",
	    value: function findSubDivs() {
	      var divNum = 0;
	
	      for (var x = 20; x < 620; x += 20) {
	        for (var y = 0; y < 400; y += 20) {
	          if (!this.isWall([x, y]) && !this.checked[[x, y].join()]) {
	            this.subDivs[divNum] = [];
	            this.compileSubDiv([x, y], divNum);
	            divNum++;
	          }
	        }
	      }
	    }
	  }, {
	    key: "compileSubDiv",
	    value: function compileSubDiv(pos, divNum) {
	      var _this = this;
	
	      this.subDivs[divNum].push(pos.join());
	      this.checked[pos.join()] = true;
	      this.neighbors(pos, divNum).forEach(function (neighbor) {
	        _this.compileSubDiv(neighbor, divNum);
	      });
	    }
	  }, {
	    key: "neighbors",
	    value: function neighbors(pos) {
	      var _this2 = this;
	
	      var neighbors = [];
	
	      this.DELTAS.forEach(function (delta) {
	        var checkPos = [pos[0] + delta[0], pos[1] + delta[1]];
	        if (!_this2.isWall(checkPos) && !_this2.checked[checkPos.join()]) {
	          _this2.checked[checkPos] = true;
	          neighbors.push(checkPos);
	        }
	      });
	
	      return neighbors;
	    }
	  }, {
	    key: "fillSubDivs",
	    value: function fillSubDivs() {
	      var that = this;
	      this.board.pokeballs.forEach(function (pokeball) {
	        var pokeballPos = [Math.floor(pokeball.body.x / 20) * 20, Math.floor(pokeball.body.y / 20) * 20].join();
	
	        Object.keys(that.subDivs).forEach(function (divNum) {
	          if (that.subDivs[divNum].includes(pokeballPos)) {
	            delete that.subDivs[divNum];
	          }
	        });
	      });
	
	      Object.keys(that.subDivs).forEach(function (divNum) {
	        that.subDivs[divNum].forEach(function (block) {
	          var fillPos = block.split(",").map(function (num) {
	            return parseInt(num);
	          });
	          var newFill = new _wall2.default('wall', fillPos, that.board.loader);
	          that.board.fills[block] = true;
	          that.board.stage.addChild(newFill.body);
	        });
	      });
	
	      this.board.game.renderScoreBoard(this.board);
	      this.board.game.checkWin(this.board);
	    }
	  }]);
	
	  return SubDivFiller;
	}();
	
	exports.default = SubDivFiller;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LevelStart = function () {
	  function LevelStart(stage, loader) {
	    _classCallCheck(this, LevelStart);
	
	    this.level = 0;
	    this.stage = stage;
	    this.loader = loader;
	  }
	
	  _createClass(LevelStart, [{
	    key: "render",
	    value: function render(board) {
	      var levelText = new createjs.Text();
	      levelText.font = "900 72px Futura";
	      levelText.color = "	#DC143C";
	      levelText.text = "LEVEL " + this.level;
	      levelText.shadow = new createjs.Shadow("#fff", 0, 0, 10);
	      levelText.x = (640 - levelText.getBounds().width) / 2;
	      levelText.y = 60;
	      this.stage.addChild(levelText);
	
	      var startButton = new createjs.Bitmap(this.loader.getResult('start'));
	      var startBounds = startButton.getBounds();
	      startButton.x = (640 - startBounds.width) / 2;
	      startButton.y = 250;
	      this.stage.addChild(startButton);
	
	      var startClick = new createjs.Shape();
	      startClick.graphics.beginFill("#000");
	      startClick.graphics.dr(startButton.x, startButton.y, startBounds.width, startBounds.height);
	      startClick.alpha = 0.01;
	      this.stage.addChild(startClick);
	      startClick.cursor = "pointer";
	
	      var starters = [levelText, startButton, startClick];
	      startClick.addEventListener("click", this.start(board, starters));
	
	      this.stage.update();
	    }
	  }, {
	    key: "start",
	    value: function start(board, starters) {
	      var _this = this;
	
	      return function (e) {
	        starters.forEach(function (starter) {
	          return _this.stage.removeChild(starter);
	        });
	        board.start();
	      };
	    }
	  }]);
	
	  return LevelStart;
	}();
	
	exports.default = LevelStart;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _intro = __webpack_require__(1);
	
	var _intro2 = _interopRequireDefault(_intro);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameOver = function GameOver(score, stage, loader) {
	  _classCallCheck(this, GameOver);
	
	  var gameOver = new createjs.Text();
	  gameOver.font = "900 72px Futura";
	  gameOver.color = "	#DC143C";
	  gameOver.text = "GAME OVER";
	  gameOver.shadow = new createjs.Shadow("#fff", 0, 0, 10);
	  gameOver.x = (640 - gameOver.getBounds().width) / 2;
	  gameOver.y = 60;
	  stage.addChild(gameOver);
	
	  var tryAgain = new createjs.Bitmap(loader.getResult('tryAgain'));
	  tryAgain.font = "900 72px Futura";
	  tryAgain.color = "#DAA520";
	  tryAgain.text = "Try Again?";
	  tryAgain.shadow = gameOver.shadow;
	  var startBounds = tryAgain.getBounds();
	  tryAgain.x = (640 - startBounds.width) / 2;
	  tryAgain.y = 250;
	  stage.addChild(tryAgain);
	
	  var restartClick = new createjs.Shape();
	  restartClick.graphics.beginFill("#000");
	  restartClick.graphics.dr(tryAgain.x, tryAgain.y, startBounds.width, startBounds.height);
	  restartClick.alpha = 0.01;
	  stage.addChild(restartClick);
	  restartClick.cursor = "pointer";
	
	  restartClick.addEventListener("click", function () {
	    stage.removeAllChildren();
	    var intro = new _intro2.default(loader);
	    intro.render();
	  });
	
	  stage.update();
	};
	
	exports.default = GameOver;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Win = function Win(stage, startNextLevel, loader) {
	  _classCallCheck(this, Win);
	
	  this.startNextLevel = startNextLevel;
	
	  var congrats = new createjs.Bitmap(loader.getResult('congratulations'));
	  congrats.x = (640 - congrats.getBounds().width) / 2;
	  congrats.y = 60;
	  stage.addChild(congrats);
	
	  var nextLevel = new createjs.Bitmap(loader.getResult('nextLevel'));
	  var startBounds = nextLevel.getBounds();
	  nextLevel.x = (640 - startBounds.width) / 2;
	  nextLevel.y = 250;
	  stage.addChild(nextLevel);
	
	  var nextClick = new createjs.Shape();
	  nextClick.graphics.beginFill("#000");
	  nextClick.graphics.dr(nextLevel.x, nextLevel.y, startBounds.width, startBounds.height);
	  nextClick.alpha = 0.01;
	  stage.addChild(nextClick);
	  nextClick.cursor = "pointer";
	
	  nextClick.addEventListener('click', function () {
	    stage.removeAllChildren();
	    startNextLevel();
	  });
	
	  stage.update();
	};
	
	exports.default = Win;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HowTo = function () {
	  function HowTo(stage, howToImg) {
	    var _this = this;
	
	    _classCallCheck(this, HowTo);
	
	    this.stage = stage;
	    this.instructions = new createjs.Bitmap(howToImg);
	    this.instructions.x = 0;
	    this.instructions.y = 0;
	    this.instructions.shadow = new createjs.Shadow("#fff", 0, 0, 10);
	    this.instructions.addEventListener("click", function () {
	      stage.removeChild(_this.instructions);
	      stage.update();
	    });
	    this.instructions.cursor = "pointer";
	  }
	
	  _createClass(HowTo, [{
	    key: "render",
	    value: function render() {
	      this.stage.addChild(this.instructions);
	      this.stage.update();
	    }
	  }]);
	
	  return HowTo;
	}();
	
	exports.default = HowTo;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map