import Board from './board';
import LevelStart from './level_start';

class Game {
  constructor(stage, loader) {
    this.stage = stage;
    this.loader = loader;

    this.level = 0;
    this.levelStarter = new LevelStart(this.stage);
    this.startNextLevel = this.startNextLevel.bind(this);
  }

  startNextLevel() {
    this.level++;
    const board = new Board(this.stage, this.loader);
    board.render(this.level + 1);
    this.levelStarter.render(board);
  }
}

export default Game;
