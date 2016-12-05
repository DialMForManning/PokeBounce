class LevelStart {
  constructor (stage, loader) {
    this.level = 0;
    this.stage = stage;
    this.loader = loader;
  }

  render(board) {
    const levelText = new createjs.Bitmap(this.loader.getResult('level' + this.level));
    levelText.x = (640 - levelText.getBounds().width) / 2;
    levelText.y = 80;
    this.stage.addChild(levelText);

    const startButton = new createjs.Bitmap(this.loader.getResult('start'));
    const startBounds = startButton.getBounds();
    startButton.x = (640 - startBounds.width) / 2;
    startButton.y = 250;
    this.stage.addChild(startButton);

    const startClick = new createjs.Shape();
    startClick.graphics.beginFill("#000");
    startClick.graphics.dr(startButton.x,
                           startButton.y,
                           startBounds.width,
                           startBounds.height );
    startClick.alpha = 0.01;
    this.stage.addChild(startClick);
    startClick.cursor = "pointer";

    const starters = [levelText, startButton, startClick];
    startClick.addEventListener("click", this.start(board, starters));

    this.stage.update();
  }

  start(board, starters) {
    return(e) => {
      starters.forEach((starter) => this.stage.removeChild(starter));
      board.start();
    };
  }
}

export default LevelStart;
