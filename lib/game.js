import Board from './board';
import LevelStart from './level_start';
import GameOver from './game_over';
import Win from './win';

class Game {
  constructor(stage, loader) {
    createjs.Ticker.framerate = 100;
    this.stage = stage;
    this.loader = loader;

    this.cumulativeScore = 0;
    this.levelScore = 0;
    this.levelStarter = new LevelStart(stage, loader);
    this.startNextLevel = this.startNextLevel.bind(this);

    const scoresFont = "16px Futura";
    const scoresColor = "#fff";

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

    this.highScore = new createjs.Text();
    this.highScore.font = scoresFont;
    this.highScore.color = scoresColor;
    this.highScore.x = 500;
    this.highScore.y = 420;
    this.highScore.text = `High Score: ${(localStorage.highScore || 0)}`;
  }

  startNextLevel() {
    this.levelStarter.level++;
    this.cumulativeScore += this.levelScore;
    this.levelScore = 0;

    const board = new Board(this);
    this.lives = this.levelStarter.level + 1;
    this.areaCaptured = 0;
    this.levelStarter.render(board);

    board.render(this.lives);
    this.renderScoreBoard(board);
  }

  renderScoreBoard(board) {
    this.stage.removeChild(this.livesLeft);
    this.stage.removeChild(this.score);
    this.stage.removeChild(this.area);
    this.stage.removeChild(this.highScore);

    this.calculateAreaCaptured(board);
    this.area.text = `Area Captured: ${this.areaCaptured}%`;
    this.score.text = `Score: ${this.levelScore + this.cumulativeScore}`;
    this.livesLeft.text = `Lives: ${this.lives}`;

    this.stage.addChild(this.livesLeft);
    this.stage.addChild(this.score);
    this.stage.addChild(this.area);
    this.stage.addChild(this.highScore);
    this.stage.update();
    this.checkLose(board);
  }

  calculateAreaCaptured(board) {
    const captured = Object.keys(board.walls).length - 100 +
                     Object.keys(board.fills).length;

    this.areaCaptured = Math.floor(captured/540 * 100);

    this.calculateLevelScore();
  }

  calculateLevelScore() {
    this.levelScore = this.areaCaptured * 3;

    if (this.areaCaptured > 75) {
      this.levelScore += (this.areaCaptured - 75) * 13;
    }
  }

  checkWin(board) {
    if (this.areaCaptured >= 75) {
      board.end();
      new Win(this.stage, this.startNextLevel, this.loader);
    }
  }

  checkLose(board) {
    if (this.lives <= 0) {
      if(board.buildPink !== "killed") { board.killBuilder("pink"); }
      if(board.buildGreen !== "killed") { board.killBuilder("green"); }
      board.end();
      this.cumulativeScore += this.levelScore;
      if (!localStorage.highScore ||
        this.cumulativeScore > localStorage.highScore) {
        localStorage.setItem('highScore', this.cumulativeScore);
      }
      debugger
      new GameOver(this.cumulativeScore, this.stage, this.loader);
    }
  }
}

export default Game;
