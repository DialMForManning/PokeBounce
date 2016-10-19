class Atom {
  constructor(pos, atomImg) {
    this.spriteSheet = new createjs.SpriteSheet({
      framerate: 30,
      images: [atomImg],
      frames: {
        width: 16,
        height: 16,
        regX: 8,
        regY: 8,
        spacing: 0
      },
      animations: {
        spin: [0, 544]
      }
    });

    this.body = new createjs.Sprite(this.spriteSheet, 'spin');
    this.body.x = pos[0];
    this.body.y = pos[1];
  }

  updatePos() {
    this.body.x += 1;
  }
}

export default Atom;
