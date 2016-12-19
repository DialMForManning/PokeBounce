import Wall from './wall';

class SubDivFiller {
  constructor(board) {
    this.board = board;
    board.buildPink = "checking";
    board.buildGreen = "checking";

    this.subDivs = {};
    this.checked = {};
    this.DELTAS = [[-20, -20],
                   [-20, 0],
                   [-20, 20],
                   [0, -20],
                   [0, 20],
                   [20, -20],
                   [20, 0],
                   [20, 20]];

    this.findSubDivs();
    this.fillSubDivs();
  }

  isWall(pos) {
    if (pos[0] < 20 || pos[0] > 600 || pos[1] < 40 || pos[1] > 380)
      return true;

    const sPos = pos.join();
    if (this.board.walls[sPos] || this.board.fills[sPos]) return true;
    return false;
  }

  findSubDivs() {
    let divNum = 0;

    for (let x = 20; x < 620; x += 20) {
      for (let y = 0; y < 400; y += 20) {
        if(!this.isWall([x,y]) && !this.checked[[x,y].join()]) {
          this.subDivs[divNum] = [];
          this.compileSubDiv([x,y], divNum);
          divNum++;
        }
      }
    }
  }

  compileSubDiv(pos, divNum) {
    this.subDivs[divNum].push(pos.join());
    this.checked[pos.join()] = true;
    this.neighbors(pos, divNum).forEach(neighbor => {
      this.compileSubDiv(neighbor, divNum);
    });
  }

  neighbors(pos) {
    const neighbors = [];

    this.DELTAS.forEach(delta => {
      const checkPos = [pos[0] + delta[0], pos[1] + delta[1]];
      if (!this.isWall(checkPos) && !this.checked[checkPos.join()]) {
        this.checked[checkPos] = true;
        neighbors.push(checkPos);
      }
    });

    return neighbors;
  }

  fillSubDivs() {
    const that = this;
    this.board.pokeballs.forEach(pokeball => {
      const pokeballPos = [Math.floor(pokeball.body.x/20) * 20,
                       Math.floor(pokeball.body.y/20) * 20].join();


      Object.keys(that.subDivs).forEach(divNum => {
        if (that.subDivs[divNum].includes(pokeballPos)) {
          delete that.subDivs[divNum];
        }
      });
    });

    Object.keys(that.subDivs).forEach(divNum => {
      that.subDivs[divNum].forEach(block => {
        const fillPos = block.split(",").map(num => parseInt(num));
        const newFill = new Wall('wall', fillPos, that.board.loader);
        that.board.fills[block] = true;
        that.board.stage.addChild(newFill.body);
      });
    });

    this.board.game.renderScoreBoard(this.board);
    this.board.game.checkWin(this.board);
  }
}

export default SubDivFiller;
