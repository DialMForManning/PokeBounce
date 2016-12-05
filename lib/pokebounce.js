import Intro from './intro';

document.addEventListener("DOMContentLoaded", function() {
  const stage = new createjs.Stage("jazz-canvas");

  const manifest = [
    {src: "sprites/pokeball.png", id: "pokeball"},
    {src: "images/brick.jpg", id: "brick"},
    {src: "images/PokeBounce.png", id: "logo"},
    {src: "images/howToPlay.png", id: "howTo"},
    {src: "images/startGame.png", id: "startGame"},
    {src: "images/brickGreen.jpg", id: "brickGreen"},
    {src: "images/brickPink.jpg", id: "brickPink"},
    {src: "images/instructions.jpg", id: "instructions"},
    {src: "images/congratulations.png", id: "congratulations"},
    {src: "images/nextLevel.png", id: "nextLevel"},
    {src: "images/start.png", id: "start"}
  ];
  const loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", showIntro);
  loader.loadManifest(manifest, true, "./assets/");

  function showIntro() {
    const intro = new Intro(loader);
    intro.render();
  }
});
