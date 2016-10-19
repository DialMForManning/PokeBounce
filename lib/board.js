import Atom from './atom';

class Board {
  constructor(loader) {
    this.stage = new createjs.Stage("jazz-canvas");
    this.atom = new Atom([20,20], loader.getResult("atom"));
    this.stage.addChild(this.atom.body);

    this.tick = this.tick.bind(this);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", this.tick);
  }

  tick(event) {
    this.atom.updatePos();
    this.stage.update();
  }
}

export default Board;
