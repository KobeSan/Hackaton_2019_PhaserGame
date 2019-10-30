class Menu extends Phaser.Scene {
  constructor(){
    super({
      key: CST.SCENES.MENU,
    })
  }

  preload(){
    this.load.image('background_img', '../Assets/Map/Graveyard/png/BG.png');
    this.load.image('background_img2', '../Assets/Map/Graveyard/png/BG-debut.png');
    this.load.image('buttonPlay', '../Assets/button/play1.png');
    // this.load.audio('testmusique', './Assets/musiqueNul.mp3');
  }

  create(){
    this.add.image(400, 300, 'background_img').setScale(0.4);
    this.add.image(400, 300, 'background_img2').setScale(0.8);
    let playButton = this.add.image(400, 460, 'buttonPlay').setScale(1);
    // this.sound.play('testmusique',{
    //   loop : true
    // })
  
    playButton.setInteractive();

    playButton.on("pointerdown", ()=>{
      console.log("test")
  })

  }
  update(){
  
  }
}