class HowTo {
  constructor(stage, howToImg) {
    this.stage = stage;
    this.instructions = new createjs.Bitmap(howToImg);
    this.instructions.x = 120;
    this.instructions.y = 116;
    this.instructions.shadow = new createjs.Shadow("#fff", 0, 0, 10);
    this.instructions.addEventListener("click", () => {
      stage.removeChild(this.instructions);
      stage.update();
    });
    this.instructions.cursor = "pointer";
    this.render = this.render.bind(this);
  }

  render() {
    this.stage.addChild(this.instructions);
    this.stage.update();
  }
}

export default HowTo;