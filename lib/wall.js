class Wall {
  constructor(type, pos, loader) {
    this.type = type;
    this.loader = loader;

    switch(type) {
      case "wall":
        this.body = new createjs.Bitmap(loader.getResult('brick'));
        break;
      case "pink":
        this.body = new createjs.Bitmap(loader.getResult('brickPink'));
        break;
      case "green":
        this.body = new createjs.Bitmap(loader.getResult('brickGreen'));
        break;
      default:
        throw "invalid tile type";
    }
    this.body.x = pos[0];
    this.body.y = pos[1];
  }
}

export default Wall;
