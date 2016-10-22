import Board from './board';
import Intro from './intro';

document.addEventListener("DOMContentLoaded", function() {
  const stage = new createjs.Stage("jazz-canvas");

  const manifest = [
    {src: "sprites/pokeball.png", id: "atom"},
    {src: "brick.jpg", id: "brick"},
    {src: "jazzballLogo.png", id: "logo"},
    {src: "howToPlay.png", id: "howTo"},
    {src: "startGame.png", id: "startGame"},
    {src: "brickGreen.jpg", id: "brickGreen"},
    {src: "brickPink.jpg", id: "brickPink"}
  ];
  const loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", showIntro);
  loader.loadManifest(manifest, true, "./assets/");

  function showIntro() {
    const intro = new Intro(loader);
    intro.render();
  }
});
