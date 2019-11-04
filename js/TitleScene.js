class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene'
    });
  }
  preload() {
    this.load.image('background_img','../Assets/Jordan/BG-solo-jordan.png');
    this.load.image('logo', '../Assets/Jordan/logo.png')
    this.load.audio('music', '../Assets/Music/Musique_fond_video.mp3');
  }
  create() {
    this.add.image(850 , 750, 'background_img');
    this.add.image(800, 500, 'logo').setScale(0.3);
    let play = this.add.text(680, 1080, '< PLAY >', 
      { fontFamily: 'Verdana',
        fontSize: 70 + 'px',
        color: 'white',
      }).setScrollFactor(0);

    play.setInteractive({ useHandCursor: true });
    play.on('pointerdown', () => {
      this.scene.switch('level1');
      music.stop();
    });

    let instruction = this.add.text(635, 1200, '< INSTRUCTIONS >', 
      { fontFamily: 'Verdana',
        fontSize: 40 + 'px',
        color: 'white',
      }).setScrollFactor(0);
    
    instruction.setInteractive({ useHandCursor: true });
    instruction.on('pointerdown', () => {
      this.scene.switch('instructions');
    });


    music = this.sound.add('music');
    music.play();
  }
 }