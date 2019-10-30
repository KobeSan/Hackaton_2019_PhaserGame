import TitleScene from './TitleScene';

let titleScene = new TitleScene();

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600
};

let game = new Phaser.Game(config);
game.scene.add('TitleScene', titleScene);
game.scene.start('TitleScene');