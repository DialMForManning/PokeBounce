import Atom from './atom';
import Tile from './tile';

class Board {
  constructor(loader) {
    this.stage = new createjs.Stage("jazz-canvas");
    this.atoms = [];
    this.atoms.push(new Atom([100, 200], loader.getResult("atom"), 1));
    this.atoms.push(new Atom([200, 200], loader.getResult("atom"), 2));
    this.atoms.push(new Atom([300, 200], loader.getResult("atom"), 2));
    this.atoms.push(new Atom([100, 300], loader.getResult("atom"), 2));
    this.atoms.push(new Atom([200, 300], loader.getResult("atom"), 2));
    this.atoms.push(new Atom([300, 300], loader.getResult("atom"), 2));

    this.walls = [];
    for (var i = 0; i < 32; i++) {
      for (var j = 0; j < 20; j++) {
        if ((j === 0 || j === 19) || (i === 0 || i === 31 )) {
          const x = i * 20;
          const y = j * 20 + 20;
          this.walls.push(new Tile('wall', [x,y], loader.getResult('brick')));
        }
      }
    }

    this.walls.forEach((wall) => {
      this.stage.addChild(wall.body);
    });
    this.atoms.forEach((atom) => {
      this.stage.addChild(atom.body);
    });
    this.tick = this.tick.bind(this);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", this.tick);
  }

  checkWallCollisions(atom) {
    this.walls.forEach((wall) => {
      const xmin = wall.body.x;
      const xmax = xmin + 20;
      const ymin = wall.body.y;
      const ymax = ymin + 20;

      if (xmin < atom.body.x && xmax > atom.body.x) {
        if (Math.abs(ymin+10 - atom.body.y) <= 20) {
          atom.vel = [atom.vel[0], atom.vel[1] * -1];
          atom.updatePos();
          this.stage.update();
        }
      }

      if (ymin < atom.body.y && ymax > atom.body.y) {
        if (Math.abs(xmin+10 - atom.body.x) <= 20) {
          atom.vel = [atom.vel[0] * -1, atom.vel[1]];
          atom.updatePos();
        }
      }
    });
  }

  checkAtomCollisions() {
    const that = this;

    for (var i = 0; i < that.atoms.length; i++) {
      for (var j = i+1 ; j < that.atoms.length; j++) {
        const atom = that.atoms[i];
        const other = that.atoms[j];
        const pos1 = [atom.body.x, atom.body.y];
        const pos2 = [other.body.x, other.body.y];

        const dist = Math.sqrt(
          Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );

        if (dist < 20) {
          const placeVel = atom.vel;
          atom.vel = other.vel;
          other.vel = placeVel;
          atom.updatePos();
        }
      }
    }
  }

  tick(event) {
    this.checkAtomCollisions();
    this.atoms.forEach((atom)=> {
      this.checkWallCollisions(atom);
      atom.updatePos();
    });



    this.stage.update();
  }
}

export default Board;
