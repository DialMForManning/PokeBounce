import Atom from './atom';
import Tile from './tile';

class Board {
  constructor(loader) {
    this.stage = new createjs.Stage("jazz-canvas");
    this.atom = new Atom([32, 32], loader.getResult("atom"));

    this.borders = [];
    for (var i = 0; i < 32; i++) {
      for (var j = 0; j < 20; j++) {
        if ((j === 0 || j === 19) || (i === 0 || i === 31 )) {
          const x = i * 20;
          const y = j * 20 + 20;
          this.borders.push(new Tile('wall', [x,y], loader.getResult('brick')));
        }
      }
    }

    this.borders.forEach((border) => {
      this.stage.addChild(border.body);
    });
    this.stage.addChild(this.atom.body);

    this.tick = this.tick.bind(this);
    createjs.Ticker.timingMode = createjs.Ticker.setInterval(15);
    createjs.Ticker.addEventListener("tick", this.tick);
  }

  tick(event) {
    this.atom.updatePos();
    this.stage.update();
  }
}

export default Board;
