import Phaser from 'phaser';

class Menu extends Phaser.Scene {
  constructor(){
    super({
      key: 'menu'
    });
  }

	preload() {
    this.load.image('background', '../Map/Graveyard/png/Tiles/BG.png');
    this.load.image('button','./' )
	}

	create() {
		var bg = this.add.image(0,0,'background');
    bg.setOrigin(0,0);
    
    var text = this.add.text(100,100, 'Welcome to my game!');
    text.setInteractive({ useHandCursor: true });
    text.on('pointerdown', () => this.clickButton());

    clickButton();{
      this.scene.switch('gameScene');
    }
  }
  
}

export default Menu;