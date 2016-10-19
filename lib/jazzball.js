document.addEventListener("DOMContentLoaded", function() {
  const stage = new createjs.Stage("jazz-canvas");

  const manifest = [
    {src: "RotatingBall_1d.png", id: "atom"}
  ];

  const loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", beginGame);
  loader.loadManifest(manifest, true, "./assets/sprites/");

  function beginGame() {
    const atomSprite = new createjs.SpriteSheet({
      framerate: 30,
      images: [loader.getResult("atom")],
      frames: {
        width: 16,
        height: 16,
        regX: 8,
        regY: 8,
        spacing: 0
      },
      animations: {
        spin: [0, 34, 'spin', 1.5]
      }
    });

    const atom = new createjs.Sprite(atomSprite, 'spin');
    atom.y = 20;

    stage.addChild(atom);

    createjs.Ticker.timingMode = createjs.Ticker.setInterval(33.33333);
    createjs.Ticker.addEventListener("tick", tick);

      console.log(atom);

    function tick(event) {
      atom.x += 5;

      stage.update(event);
    }
  }

});
