import Board from './board.js';

document.addEventListener("DOMContentLoaded", function() {
  const stage = new createjs.Stage("jazz-canvas");

  const manifest = [
    {src: "sprites/RotatingBallw.png", id: "atom"},
    {src: "brick.jpg", id: "brick"}
  ];
  const loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", beginGame);
  loader.loadManifest(manifest, true, "./assets/");

  function beginGame() {
    const board = new Board(loader);
  }
});
