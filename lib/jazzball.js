import Board from './board.js';

document.addEventListener("DOMContentLoaded", function() {
  const stage = new createjs.Stage("jazz-canvas");

  const manifest = [
    {src: "RotatingBall.png", id: "atom"}
  ];

  const loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", beginGame);
  loader.loadManifest(manifest, true, "./assets/sprites/");

  function beginGame() {
    const board = new Board(loader);
  }
});
