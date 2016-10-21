import Atom from './atom';
import Tile from './tile';

class Board {
  constructor(loader) {
    this.stage = new createjs.Stage("jazz-canvas");
    this.atom = new Atom([200, 300], loader.getResult("atom"));

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
    window.atom = this.atom;
    this.tick = this.tick.bind(this);
    createjs.Ticker.timingMode = createjs.Ticker.setInterval(5);
    createjs.Ticker.addEventListener("tick", this.tick);
  }

  tick(event) {
    this.borders.forEach((border) => {
      const xmin = border.body.x;
      const xmax = xmin + 20;
      const ymin = border.body.y;
      const ymax = ymin + 20;

      if (xmin < this.atom.body.x && xmax > this.atom.body.x) {
        if (Math.abs(ymin+10 - this.atom.body.y) <= 20) {
          this.atom.vel = [this.atom.vel[0], this.atom.vel[1] * -1];
          this.atom.updatePos();
          this.stage.update();
        }
      }

      if (ymin < this.atom.body.y && ymax > this.atom.body.y) {
        if (Math.abs(xmin+10 - this.atom.body.x) <= 20) {
          this.atom.vel = [this.atom.vel[0] * -1, this.atom.vel[1]];
          this.atom.updatePos();
          this.stage.update();
        }
      }
    });

    this.atom.updatePos();
    this.stage.update();
  }
}

export default Board;
