import Menu from './Menu';
import level_1 from './level_1';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: false
    }
  }
}


const menu = new Menu();
const level1 = new level_1();


let game = new Phaser.Game(config);

game.scene.add('Menu', menu);
game.scene.add('level1', level1)

game.scene.start('level1')