class Win {
  constructor(stage, startNextLevel, loader) {
    this.startNextLevel = startNextLevel;

    const congrats = new createjs.Bitmap(loader.getResult('congratulations'));
    congrats.x = (640 - congrats.getBounds().width) / 2;
    congrats.y = 60;
    stage.addChild(congrats);

    const nextLevel = new createjs.Text();
    nextLevel.font = "900 72px Futura";
    nextLevel.color = "#DAA520";
    nextLevel.text = "Next Level";
    nextLevel.shadow = congrats.shadow;
    const startBounds = nextLevel.getBounds();
    nextLevel.x = (640 - startBounds.width) / 2;
    nextLevel.y = 250;
    stage.addChild(nextLevel);

    const nextClick = new createjs.Shape();
    nextClick.graphics.beginFill("#000");
    nextClick.graphics.dr(nextLevel.x,
                           nextLevel.y,
                           startBounds.width,
                           startBounds.height );
    nextClick.alpha = 0.01;
    stage.addChild(nextClick);
    nextClick.cursor = "pointer";

    nextClick.addEventListener('click', () => {
      stage.removeAllChildren();
      startNextLevel();
    });

    stage.update();
  }
}

export default Win;
