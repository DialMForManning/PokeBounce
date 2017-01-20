import Intro from './intro';

class GameOver {
  constructor(score, stage, loader) {
    const gameOver = new createjs.Bitmap(loader.getResult('gameOver'));
    gameOver.x = (640 - gameOver.getBounds().width) / 2;
    gameOver.y = 80;
    stage.addChild(gameOver);

    const tryAgain = new createjs.Bitmap(loader.getResult('tryAgain'));
    const startBounds = tryAgain.getBounds();
    tryAgain.x = (640 - startBounds.width) / 2;
    tryAgain.y = 250;
    stage.addChild(tryAgain);

    const restartClick = new createjs.Shape();
    restartClick.graphics.beginFill("#000");
    restartClick.graphics.dr(tryAgain.x,
                           tryAgain.y,
                           startBounds.width,
                           startBounds.height );
    restartClick.alpha = 0.01;
    stage.addChild(restartClick);
    restartClick.cursor = "pointer";

    restartClick.addEventListener("click", () => {
      stage.removeAllChildren();
      const intro = new Intro(stage, loader);
      intro.render();
    });

    stage.update();
  }
}

export default GameOver;
