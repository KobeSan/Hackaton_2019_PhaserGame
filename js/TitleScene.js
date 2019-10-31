class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene'
    });
  }
  preload() {
    this.load.image('background_img', '../Assets/Map/Graveyard/png/BG.png');
  }
  create() {
    this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'background_img').setScale(0.4);
    this.add.text(350, 100, 'Vampire Run');
    let play = this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'PLAY');
    play.setInteractive({ useHandCursor: true });
    play.on('pointerdown', () => this.scene.switch('level1'));
  }
 }