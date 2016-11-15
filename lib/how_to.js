class HowTo {
  constructor(stage, howToImg) {
    this.stage = stage;
    this.instructions = new createjs.Bitmap(howToImg);
    this.instructions.x = 0;
    this.instructions.y = 0;
    this.instructions.shadow = new createjs.Shadow("#fff", 0, 0, 10);
    this.instructions.addEventListener("click", () => {
      stage.removeChild(this.instructions);
      stage.update();
    });
    this.instructions.cursor = "pointer";
  }

  render() {
    this.stage.addChild(this.instructions);
    this.stage.update();
  }
}

export default HowTo;
