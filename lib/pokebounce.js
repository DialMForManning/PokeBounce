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
    {src: "images/start.png", id: "start"},
    {src: "images/tryAgain.png", id: "tryAgain"},
    {src: "images/gameOver.png", id: "gameOver"},
    {src: "images/level1.png", id: "level1"},
    {src: "images/level2.png", id: "level2"},
    {src: "images/level3.png", id: "level3"},
    {src: "images/level4.png", id: "level4"},
    {src: "images/level5.png", id: "level5"},
    {src: "images/level6.png", id: "level6"},
    {src: "images/level7.png", id: "level7"},
    {src: "images/level8.png", id: "level8"},
    {src: "images/level9.png", id: "level9"},
    {src: "images/level10.png", id: "level10"},
    {src: "images/level11.png", id: "level11"},
    {src: "images/level12.png", id: "level12"},
    {src: "images/level13.png", id: "level13"},
    {src: "images/level14.png", id: "level14"},
    {src: "images/level15.png", id: "level15"}
  ];
  const loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", showIntro);
  loader.loadManifest(manifest, true, "./assets/");

  function showIntro() {
    const intro = new Intro(loader);
    intro.render();
  }
});
