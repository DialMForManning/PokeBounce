import Atom from './atom';
import Wall from './wall';
import WallBuilder from './wall_builder';
import SubDivFiller from './sub_div_filler';

class Board {
  constructor(game) {
    this.START_POS = [
      [200, 200],
      [300, 200],
      [400, 200],
      [100, 200],
      [200, 300],
      [300, 300],
      [400, 300],
      [100, 300],
      [200, 100],
      [300, 100],
      [400, 100],
      [100, 100],
      [500, 100],
      [500, 200],
      [500, 300]
    ];

    this.game = game;
    this.loader = game.loader;
    this.stage = game.stage;

    this.dir = "vertical";
    this.canvas = document.getElementById("jazz-canvas");
    this.atoms = [];
    this.walls = {};
    this.fills = {};
    this.pinks = [];
    this.greens = [];
    this.build = true;
    this.buildPink = "killed";
    this.buildGreen = "killed";

    this.buildListener = new createjs.Shape();
    this.buildListener.graphics.beginFill("#fff");
    this.buildListener.graphics.dr(20, 40, 600, 360);
    this.buildListener.alpha = 0.05;

    this.buildWall = this.buildWall.bind(this);
    this.switchDir = this.switchDir.bind(this);
    this.killBuilder = this.killBuilder.bind(this);
    this.start = this.start.bind(this);

    window.addEventListener('contextmenu', this.switchDir);
    window.addEventListener('keydown', this.switchDir);

    this.tick = this.tick.bind(this);
  }

  buildWall(e) {
    if (event.button === 0 &&
      (typeof this.buildPink === "string") &&
      (typeof this.buildGreen === "string")) {
      this.buildPink = new WallBuilder(this, "pink", this.dir, e);
      this.buildGreen = new WallBuilder(this, "green", this.dir, e);
    }
  }

  switchDir(e) {
    if (e.type === "contextmenu" || e.code === "Space") {
      e.preventDefault();
      this.dir = (this.dir === "vertical") ? "horizontal" : "vertical";
      this.canvas.className = this.dir;
      this.build = false;
    }
  }

  render(numAtoms) {
    this.atoms = [];
    this.walls = {};

    for (let a = 0; a < numAtoms; a++) {
      this.atoms.push(new Atom(this.START_POS[a], this.game.loader.getResult("atom"), a));
    }

    for (let i = 0; i < 32; i++) {
      for (let j = 0; j < 20; j++) {
        const x = i * 20;
        const y = j * 20 + 20;
        if ((j === 0 || j === 19) || (i === 0 || i === 31 )) {
          this.walls[[x,y].join()] = (new Wall('wall', [x,y], this.game.loader));
        }
      }
    }

    const that = this;
    Object.keys(this.walls).forEach((wallPos) => {
      that.stage.addChild(that.walls[wallPos].body);
    });

    this.atoms.forEach((atom) => {
      this.stage.addChild(atom.body);
    });

    this.stage.addChild(this.buildListener);
    this.stage.update();
  }

  start() {
    this.buildListener.addEventListener('click', this.buildWall);
    createjs.Ticker.addEventListener("tick", this.tick);
  }

  end() {
    createjs.Ticker.removeAllEventListeners();
  }

  checkWallCollisions(atom, walls) {
    walls.forEach((wall) => {
      const xmin = wall.body.x;
      const xmax = xmin + 20;
      const ymin = wall.body.y;
      const ymax = ymin + 20;

      if (xmin < atom.body.x && xmax > atom.body.x) {
        if (Math.abs(ymin+10 - atom.body.y) <= 20) {
          switch(wall.type){
            case "wall":
              this.wallBounce(atom, 1);
              break;
            default:
              this.killBuilder(wall.type);
              break;
          }
        }
      }

      if (ymin < atom.body.y && ymax > atom.body.y) {
        if (Math.abs(xmin+10 - atom.body.x) <= 20) {
          switch(wall.type){
            case "wall":
              this.wallBounce(atom, 0);
              break;
            default:
              this.killBuilder(wall.type);
              break;
          }
        }
      }
    });
  }

  wallBounce(atom, vInd) {
    atom.vel[vInd] *= -1;
    atom.updatePos();
  }

  killBuilder(type) {
    if (type === "pink") {
      if (this.buildPink != "killed") {
        this.buildPink.kill(type);
        this.pinks.forEach((pink) => {
          this.stage.removeChild(pink.body);
        });
        this.pinks = [];
      }
    } else {
      if (this.buildGreen !== "killed") {
        this.buildGreen.kill(type);
        this.greens.forEach((green) => {
          this.stage.removeChild(green.body);
        });
        this.greens = [];
      }
    }
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
          other.updatePos();
        }
      }
    }
  }

  tick(event) {
    if (this.buildPink === "complete" && this.buildGreen === "complete") {
      const checkSubDivs = new SubDivFiller(this);
    }
    this.checkAtomCollisions();
    this.atoms.forEach((atom)=> {
      this.checkWallCollisions(atom,
        Object.keys(this.walls).map((wallPos) => {
          return this.walls[wallPos];
        })

    );
      this.checkWallCollisions(atom, this.pinks);
      this.checkWallCollisions(atom, this.greens);
      atom.updatePos();
    });



    this.stage.update();
  }
}

export default Board;
