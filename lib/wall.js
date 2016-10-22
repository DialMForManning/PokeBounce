class Wall {
  constructor(type, pos, loader) {
    this.type = type;
    this.loader = loader;

    switch(type) {
      case "wall":
        this.body = new createjs.Bitmap(loader.getResult('brick'));
        this.body.x = pos[0];
        this.body.y = pos[1];
        break;
      case "red":

        break;
      case "blue":

        break;
      default:
        throw "invalid tile type";
    }
  }
}

export default Wall;
