class Atom {
  constructor(pos, atomImg, id) {
    this.spriteSheet = new createjs.SpriteSheet({
      framerate: 10,
      images: [atomImg],
      frames: {
        width: 20,
        height: 20,
        regX: 10,
        regY: 10,
        spacing: 0
      },
      animations: {
        spin: [0, 35]
      }
    });

    this.id = id;

    this.vel = [4, 2];
    this.body = new createjs.Sprite(this.spriteSheet, 'spin');
    this.body.x = pos[0];
    this.body.y = pos[1];
  }

  updatePos() {
    this.body.x += this.vel[0];
    this.body.y += this.vel[1];
  }
}

export default Atom;
