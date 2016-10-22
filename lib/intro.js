import Board from './board';

class Intro {
  constructor(loader) {
    this.board = new Board(loader);
    this.loader = loader;
    this.go = this.go.bind(this);
    this.stage = new createjs.Stage("jazz-canvas");
    this.logo = new createjs.Bitmap(loader.getResult("logo"));
    this.logo.x = 20;
    this.logo.y = 100;

    this.startGame = new createjs.Bitmap(loader.getResult("startGame"));
    this.startGame.x = 170;
    this.startGame.y = 230;
    this.startClick = new createjs.Shape();
    this.startClick.graphics.beginFill("#000");
    this.startClick.graphics.dr(this.startGame.x, this.startGame.y, 300, 50 );
    this.startClick.alpha = 0.01;
    this.startClick.addEventListener("click", this.go);

    this.howTo = new createjs.Bitmap(loader.getResult("howTo"));
    this.howTo.x = 170;
    this.howTo.y = 300;
  }

  render() {
    this.stage.removeAllChildren();
    this.stage.addChild(this.logo);
    this.stage.addChild(this.startGame);
    this.stage.addChild(this.startClick);
    this.stage.addChild(this.howTo);
    this.stage.update();
  }

  go() {
    this.stage.removeAllChildren();
    this.board.render(2);
  }
}

export default Intro;
