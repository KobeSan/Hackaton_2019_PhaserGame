let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene : [
    LoadScene, Menu
  ]
};

let game = new Phaser.Game(config);
// game.scene.add('Menu', Menu);
// game.scene.start('Menu');