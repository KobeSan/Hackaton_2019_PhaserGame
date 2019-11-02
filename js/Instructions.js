class Instructions extends Phaser.Scene {
  constructor() {
    super({key: 'instructions'});
  }

  preload() {
    this.load.image('backgroundInstructions','../Assets/Jordan/InstructionsBG.png');
    this.load.audio('music', '../Assets/Music/Musique_fond_video.mp3');
  }

  create(){
    this.add.image(850 , 750, 'backgroundInstructions');

    let instruction = this.add.text(1250, 1350, '< RETURN >', 
    { fontFamily: 'Verdana',
      fontSize: 40 + 'px',
      color: 'white',
    }).setScrollFactor(0);

    instruction.setInteractive({ useHandCursor: true });
    instruction.on('pointerdown', () => {
      this.scene.switch('TitleScene');
      music.stop();
    });
  }
}