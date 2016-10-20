class Tile {
  constructor(type, pos, brickImg) {
    switch(type) {
      case "wall":
        this.body = new createjs.Bitmap(brickImg);
        break;
      case "red":

        break;
      case "blue":

        break;
      default:
        throw "invalid tile type";
    }
    this.body.x = pos[0];
    this.body.y = pos[1];
  }
}

export default Tile;
