class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene'
    });
  }
  preload() {
    this.load.image('cimetiere', '../Assets/Map/BG-debut.png');
    this.load.image('background_img','../Assets/Map/Graveyard/png/BG.png');
    this.load.image('button', '../Assets/button/play1.png');
    this.load.image('logo', '../Assets/logo.png')
    this.load.audio('music', '../Assets/Music/Musique_fond_video.mp3');

  }
  create() {
    music = this.sound.add('music');
    music.play();
    this.add.image(window.innerWidth/2, window.innerHeight/2, 'background_img').setDisplaySize(window.innerWidth,window.innerHeight);
    this.add.image(window.innerWidth/2, window.innerHeight/2, 'cimetiere').setDisplaySize(window.innerWidth,window.innerHeight);
    this.add.image(window.innerWidth/2 - 100, window.innerHeight/2 - 200, 'logo').setScale(0.2)
    let play = this.add.image(window.innerWidth / 2, 620, 'button').setScale(2);
    play.setInteractive({ useHandCursor: true });
    play.on('pointerdown', () => this.scene.switch('level1'));
  }
 }