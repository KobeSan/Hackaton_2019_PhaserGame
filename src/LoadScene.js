class LoadScene extends Phaser.Scene{
  constructor(){
    super({
      key: CST.SCENES.LOAD,
    })
  }
  preload(){
    this.load.image('background_img', '../Assets/Map/Graveyard/png/BG.png');

  }
  create(){
    this.add.image(400, 300, 'background_img').setScale(0.4)
    this.scene.start(CST.SCENES.MENU, "hello from load scene");
  }
}