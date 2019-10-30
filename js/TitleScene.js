class TitleScene extends Phaser.Scene {
  constructor(){
    super({
      key: 'TitleScene'
    });
  }

  preload(){
    this.load.image('background_img', '../Assets/Map/Graveyard/png/BG.png');
  }

  create(){
    this.add.sprite(400, 300, 'background_img').setScale(0.4);
    this.add.text(350, 100, 'Vampire Run');
  }
}