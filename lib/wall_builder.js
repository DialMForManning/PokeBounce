import Wall from './wall';

class WallBuilder {
  constructor(board, color, dir, e) {
    this.board = board;
    this.color = color;
    this.dir = dir;

    this.targetY = Math.floor(e.stageY / 20) * 20;
    this.targetX = Math.floor(e.stageX / 20) * 20;

    this.yPink = (e.stageY % 20 < 10) ? this.targetY - 20 : this.targetY;
    this.xPink = (e.stageX % 20 < 10) ? this.targetX : this.targetX + 20;

    this.yGreen = board.dir === "vertical" ? this.yPink + 20 : this.yPink;
    this.xGreen = board.dir === "vertical" ? this.xPink : this.xPink + 20;
    this.propogate = this.propogate.bind(this);

    const buildPink = window.setInterval(this.propogate, 80);
  }

  propogate() {
    switch(this.color) {
      case "pink":
        const newPink = new Wall('pink',
                                  [this.xPink, this.yPink],
                                  this.board.loader);
        this.board.pinks.push(newPink);
        this.board.stage.addChild(newPink.body);
        if (this.dir === "vertical") {
          this.yPink -= 20;
        } else {
          this.xPink -= 20;
        }
        break;

      case "green":
        const newGreen = new Wall('green',
                                  [this.xGreen, this.yGreen],
                                  this.board.loader);
        this.board.greens.push(newGreen);
        this.board.stage.addChild(newGreen.body);
        if (this.dir === "vertical") {
          this.yGreen += 20;
        } else {
          this.xGreen += 20;
        }
        break;
    }
  }

  updateStarter() {

  }
}

export default WallBuilder;
