import Game from './game';
import HowTo from './how_to';

class Intro {
  constructor(stage, loader) {
    this.loader = loader;
    this.go = this.go.bind(this);
    this.stage = stage;
    this.stage.enableMouseOver();
    this.logo = new createjs.Bitmap(loader.getResult("logo"));
    this.logo.x = 5;
    this.logo.y = 30;

    this.startGame = new createjs.Bitmap(loader.getResult("startGame"));
    this.startGame.x = 170;
    this.startGame.y = 230;
    this.startClick = new createjs.Shape();
    this.startClick.graphics.beginFill("#000");
    this.startClick.graphics.dr(this.startGame.x,
                                this.startGame.y,
                                300,
                                50 );
    this.startClick.alpha = 0.01;
    this.startClick.addEventListener("click", this.go);
    this.startClick.cursor = "pointer";

    this.howToScreen = new HowTo(this.stage,
                                 loader.getResult("instructions"));
    this.howTo = new createjs.Bitmap(loader.getResult("howTo"));
    this.howTo.x = 170;
    this.howTo.y = 300;
    this.howToClick = new createjs.Shape();
    this.howToClick.graphics.beginFill("#000");
    this.howToClick.graphics.dr(this.howTo.x,
                                this.howTo.y,
                                300, 50);
    this.howToClick.alpha = 0.01;
    this.howToClick.addEventListener("click", () => {
      this.howToScreen.render();
    });
    this.howToClick.cursor = "pointer";
  }

  render() {
    this.stage.removeAllChildren();
    this.stage.addChild(this.logo);
    this.stage.addChild(this.startGame);
    this.stage.addChild(this.startClick);
    this.stage.addChild(this.howTo);
    this.stage.addChild(this.howToClick);
    this.stage.update();
  }

  go() {
    this.stage.removeAllChildren();
    const game = new Game(this.stage, this.loader);
    game.startNextLevel();
  }
}

export default Intro;
