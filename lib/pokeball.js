class Pokeball {
  constructor(pos, atomImg, id) {
    this.spriteSheet = new createjs.SpriteSheet({
      images: [atomImg],
      frames: {
        width: 20,
        height: 20,
        regX: 10,
        regY: 10,
        spacing: 0
      },
      animations: {
        spin: [0, 35, 'spin', 0.5]
      }
    });
    const speed = 3;
    this.id = id;

    let goodX = false;
    let xVel;
    while (!goodX) {
      xVel = (Math.random() * speed * 2) - speed;
      goodX = (Math.abs(xVel) > 0.7 && Math.abs(xVel) < (speed - 0.7));
    }

    let yVel = Math.sqrt(Math.pow(speed,2) - Math.pow(xVel,2));
    if (Math.round(Math.random()) === 1) { yVel *= -1; }
    this.vel = [xVel, yVel];
    this.body = new createjs.Sprite(this.spriteSheet, 'spin');
    this.body.x = pos[0];
    this.body.y = pos[1];
  }

  updatePos() {
    this.body.x += this.vel[0];
    this.body.y += this.vel[1];
  }
}

export default Pokeball;
