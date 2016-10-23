import Wall from './wall';

class WallBuilder {
  constructor(board, color, dir, e) {
    this.board = board;
    this.color = color;
    this.dir = dir;
    this.complete = false;

    this.targetY = Math.floor(e.stageY / 20) * 20;
    this.targetX = Math.floor(e.stageX / 20) * 20;

    if (board.dir === "vertical") {
      this.yPink = (e.stageY % 20 < 10) ? this.targetY - 20 : this.targetY;
      this.yGreen = this.yPink + 20;
      this.xPink = this.targetX;
      this.xGreen = this.targetX;

    } else {
      this.xPink = (e.stageX % 20 < 10) ? this.targetX : this.targetX + 20;
      this.xGreen = this.xPink - 20;
      this.yPink = this.targetY;
      this.yGreen = this.targetY;
    }

    this.propogate = this.propogate.bind(this);
    this.checkComplete = this.checkComplete.bind(this);
    this.finalize = this.finalize.bind(this);
    this.updateNextPos = this.updateNextPos.bind(this);
    this.kill = this.kill.bind(this);

    this.builder = window.setInterval(this.propogate, 80);
  }

  propogate() {
    this.checkComplete(this.color);

    if (this.complete) {
      window.clearInterval(this.builder);
      this.finalize(this.color);
    } else {
      const newPos =
        this.color === "pink" ? [this.xPink, this.yPink] : [this.xGreen, this.yGreen];
      const newBrick = new Wall(this.color, newPos, this.board.loader);
      const toUpdate =
        this.color === "pink" ? this.board.pinks : this.board.greens;
      const modifier = this.color === "pink" ? -20 : 20;

      toUpdate.push(newBrick);
      this.board.stage.addChild(newBrick.body);
      this.updateNextPos();
    }
  }

  updateNextPos() {
    const modifier = this.color === "pink" ? -20 : 20;

    if (this.dir === "vertical") {
      if (this.color === "pink") {
        this.yPink -= 20;
      } else {
        this.yGreen += 20;
      }
    } else {
      if (this.color === "pink") {
        this.xPink += 20;
      } else {
        this.xGreen -= 20;
      }
    }
  }

  checkComplete(color) {
    let nextPos;
    switch(color) {
      case "pink":
        nextPos = [this.xPink, this.yPink].join();
        if (this.board.walls[nextPos] || this.board.fills[nextPos]) {
          this.complete = true;
        }
        break;
      case "green":
        nextPos = [this.xGreen, this.yGreen].join();
        if (this.board.walls[nextPos] || this.board.fills[nextPos]) {
          this.complete = true;
        }
        break;
    }
  }

  finalize() {
    let toFinalize =
      this.color === "pink" ? this.board.pinks : this.board.greens;
    const that = this;

    toFinalize.forEach((brick) => {
      that.board.stage.removeChild(brick.body);
      const newWall =
        new Wall('wall', [brick.body.x, brick.body.y], that.board.loader);
      that.board.walls[[brick.body.x, brick.body.y].join()] = newWall;
      that.board.stage.addChild(newWall.body);
    });

    if (this.color === "pink") {
      this.board.pinks = [];
      this.board.buildPink = "complete";
    } else {
      this.board.greens = [];
      this.board.buildGreen = "complete";
    }
  }

  kill(type) {
    window.clearInterval(this.builder);
    if (type === "pink") {
      this.board.buildPink = "killed";
    } else {
      this.board.buildGreen = "killed";
    }
  }
}

export default WallBuilder;
