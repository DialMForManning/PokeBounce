import Atom from './atom.js';

document.addEventListener("DOMContentLoaded", function() {
  const stage = new createjs.Stage("jazz-canvas");

  const manifest = [
    {src: "RotatingBall.png", id: "atom"}
  ];

  const loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", beginGame);
  loader.loadManifest(manifest, true, "./assets/sprites/");

  function beginGame() {
    const atom = new Atom([20,20], loader.getResult("atom"));
    stage.addChild(atom.body);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);

    function tick(event) {
      atom.updatePos();

      stage.update();
    }
  }

});
