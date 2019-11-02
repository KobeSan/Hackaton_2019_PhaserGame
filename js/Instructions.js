class Instructions extends Phaser.Scene {
  constructor() {
    super({key: 'instructions'});
  }

  preload() {
    this.load.image('background_img','../Assets/Jordan/BG-solo-jordan.png');
    this.load.audio('music', '../Assets/Music/Musique_fond_video.mp3');
  }

  create(){
    this.add.image(850 , 750, 'background_img');
    let instruction = this.add.text(635, 1200, '< INSTRUCTIONS >', 
      { fontFamily: 'Verdana',
        fontSize: 40 + 'px',
        color: 'white',
      }).setScrollFactor(0);

    play.setInteractive({ useHandCursor: true });
    play.on('pointerdown', () => {
      this.scene.switch('level1');
      music.stop();
    });


    music = this.sound.add('music');
    music.play();
  }




}