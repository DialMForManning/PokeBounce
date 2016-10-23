class LevelStart {
  constructor (stage) {
    this.level = 1;
    this.stage = stage;
    this.start = this.start.bind(this);
    this.render = this.render.bind(this);
  }

  render(board) {
    const levelText = new createjs.Text();
    levelText.font = "900 72px Futura";
    levelText.color = "	#DC143C";
    levelText.text = `LEVEL ${this.level}`;
    levelText.shadow = new createjs.Shadow("#fff", 0, 0, 10);
    levelText.x = (640 - levelText.getBounds().width) / 2;
    levelText.y = 60;
    this.stage.addChild(levelText);

    const startButton = new createjs.Text();
    startButton.font = "900 72px Futura";
    startButton.color = "#DAA520";
    startButton.text = "START";
    startButton.shadow = levelText.shadow;
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
