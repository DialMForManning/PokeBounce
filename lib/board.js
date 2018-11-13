import Pokeball from './pokeball';
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
    this.canvas = document.getElementById("pokecanvas");
    this.canvas.className = this.dir;
    this.pokeballs = [];
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

    window.addEventListener('contextmenu', this.switchDir);
    window.addEventListener('keydown', this.switchDir);

    this.tick = this.tick.bind(this);
  }

  buildWall(e) {
    if (e.button === 0 &&
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

  render(numPokeballs) {
    this.pokeballs = [];
    this.walls = {};

    for (let a = 0; a < numPokeballs; a++) {
      this.pokeballs.push(new Pokeball(this.START_POS[a], this.game.loader.getResult("pokeball"), a));
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

    this.pokeballs.forEach((pokeball) => {
      this.stage.addChild(pokeball.body);
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

  checkWallCollisions(pokeball, walls) {
    walls.forEach((wall) => {
      const xmin = wall.body.x;
      const xmax = xmin + 20;
      const ymin = wall.body.y;
      const ymax = ymin + 20;

      if (xmin < pokeball.body.x && xmax > pokeball.body.x) {
        if (Math.abs(ymin+10 - pokeball.body.y) <= 20) {
          switch(wall.type){
            case "wall":
              this.wallBounce(pokeball, 1);
              break;
            default:
              this.killBuilder(wall.type);
              break;
          }
        }
      }

      if (ymin < pokeball.body.y && ymax > pokeball.body.y) {
        if (Math.abs(xmin+10 - pokeball.body.x) <= 20) {
          switch(wall.type){
            case "wall":
              this.wallBounce(pokeball, 0);
              break;
            default:
              this.killBuilder(wall.type);
              break;
          }
        }
      }
    });
  }

  wallBounce(pokeball, vInd) {
    pokeball.vel[vInd] *= -1;
    pokeball.updatePos();
  }

  killBuilder(type) {
    if (type === "pink") {
      if (typeof this.buildPink !== "string") {
        this.buildPink.kill(type);
        this.pinks.forEach((pink) => {
          this.stage.removeChild(pink.body);
        });
        this.pinks = [];
      }
    } else {
      if (typeof this.buildGreen !== "string") {
        this.buildGreen.kill(type);
        this.greens.forEach((green) => {
          this.stage.removeChild(green.body);
        });
        this.greens = [];
      }
    }
  }

  checkPokeballCollisions() {
    const that = this;

    for (var i = 0; i < that.pokeballs.length; i++) {
      for (var j = i+1 ; j < that.pokeballs.length; j++) {
        const pokeball = that.pokeballs[i];
        const other = that.pokeballs[j];
        const pos1 = [pokeball.body.x, pokeball.body.y];
        const pos2 = [other.body.x, other.body.y];

        const dist = Math.sqrt(
          Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );

        if (dist < 20) {
          const placeVel = pokeball.vel;
          pokeball.vel = other.vel;
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
    this.checkPokeballCollisions();
    this.pokeballs.forEach((pokeball)=> {
      this.checkWallCollisions(pokeball,
        Object.keys(this.walls).map((wallPos) => {
          return this.walls[wallPos];
        })

    );
      this.checkWallCollisions(pokeball, this.pinks);
      this.checkWallCollisions(pokeball, this.greens);
      pokeball.updatePos();
    });



    this.stage.update();
  }
}

export default Board;
