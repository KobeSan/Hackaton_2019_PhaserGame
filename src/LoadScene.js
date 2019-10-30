class LoadScene extends Phaser.Scene{
  constructor(){
    super({
      key: CST.SCENES.LOAD,
    })
  }
  preload(){
    this.load.image('background_img', '../Assets/Map/Graveyard/png/BG.png');
    this.load.image('background_img2', '../Assets/Map/Graveyard/png/BG-debut.png');
    this.load.image('buttonPlay', '../Assets/button/play1.png');
  }
  create(){
    this.load.image('background_img', '../Assets/Map/Graveyard/png/BG.png');
    this.add.image(400, 300, 'background_img').setScale(0.4);
    this.add.image(400, 300, 'background_img2').setScale(0.8);
    let playButton = this.add.image(400, 460, 'buttonPlay').setScale(1);
    // this.sound.play('testmusique',{
    //   loop : true
    // })

    playButton.setInteractive();

    playButton.on("pointerdown", ()=> this.scene.start('level_1') && console.log("coucou"))
  }
}