let config = {
  type: Phaser.AUTO,
  width: 1900,
  height: 920,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
    },
  scene : [
    LoadScene, Menu, 
  ]
};


let game = new Phaser.Game(config);
// game.scene.add('Menu', Menu);
// game.scene.start('Menu');